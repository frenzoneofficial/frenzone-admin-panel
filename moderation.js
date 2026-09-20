(() => {
  const API = 'https://api.frenzone.live';
  let currentStatus = 'sensitive';

  const token = () => localStorage.getItem('token');
  const headers = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' });
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function closePanel() {
    document.getElementById('fz-moderation-panel')?.remove();
  }

  function mediaPreview(url) {
    const wrap = el('div', 'fz-media');
    const image = el('img');
    image.src = url;
    image.alt = 'Moderated upload';
    image.loading = 'lazy';
    image.onerror = () => {
      const video = el('video');
      video.src = url;
      video.controls = true;
      video.preload = 'metadata';
      wrap.replaceChildren(video);
    };
    wrap.appendChild(image);
    return wrap;
  }

  async function decide(item, action, card) {
    const buttons = card.querySelectorAll('button');
    buttons.forEach((button) => { button.disabled = true; });
    try {
      const response = await fetch(`${API}/admin-api/moderation/${item.type}/${item.id}`, {
        method: 'PATCH', headers: headers(), body: JSON.stringify({ action }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Moderation update failed');
      card.remove();
      const grid = document.querySelector('.fz-grid');
      if (grid && !grid.children.length) grid.appendChild(el('p', 'fz-empty', 'No items in this queue.'));
    } catch (error) {
      buttons.forEach((button) => { button.disabled = false; });
      alert(error.message);
    }
  }

  function renderCard(item) {
    const card = el('article', 'fz-card');
    const top = el('div', 'fz-card-top');
    top.append(el('span', 'fz-kind', item.type === 'story' ? 'PHOTO STORY' : 'POST'));
    top.append(el('span', `fz-status fz-${item.status}`, String(item.status || '').toUpperCase()));
    card.appendChild(top);

    const media = Array.isArray(item.media) ? item.media : [];
    if (media[0]) card.appendChild(mediaPreview(media[0]));

    const author = item.author || {};
    const name = author.username || [author.firstname, author.lastname].filter(Boolean).join(' ') || 'Unknown user';
    card.appendChild(el('h3', '', name));
    card.appendChild(el('p', 'fz-date', item.createdAt ? new Date(item.createdAt).toLocaleString() : ''));
    card.appendChild(el('p', 'fz-reasons', (item.reasons || []).join(' · ') || 'Flagged by moderation'));

    const actions = el('div', 'fz-actions');
    [['allow', 'Allow'], ['shield', 'Keep shield'], ['remove', 'Do not display']].forEach(([action, label]) => {
      const button = el('button', `fz-action fz-action-${action}`, label);
      button.addEventListener('click', () => decide(item, action, card));
      actions.appendChild(button);
    });
    card.appendChild(actions);
    return card;
  }

  async function loadQueue(status) {
    currentStatus = status;
    document.querySelectorAll('.fz-filter').forEach((button) => button.classList.toggle('active', button.dataset.status === status));
    const grid = document.querySelector('.fz-grid');
    grid.replaceChildren(el('p', 'fz-empty', 'Loading moderation queue…'));
    try {
      const response = await fetch(`${API}/admin-api/moderation?status=${encodeURIComponent(status)}&limit=100`, { headers: headers() });
      if (response.status === 401 || response.status === 403) throw new Error('Your admin session has expired. Sign in again.');
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not load moderation queue');
      grid.replaceChildren();
      const items = Array.isArray(data.items) ? data.items : [];
      if (!items.length) grid.appendChild(el('p', 'fz-empty', 'No items in this queue.'));
      items.forEach((item) => grid.appendChild(renderCard(item)));
    } catch (error) {
      grid.replaceChildren(el('p', 'fz-error', error.message));
    }
  }

  function openPanel() {
    closePanel();
    const panel = el('section', 'fz-panel');
    panel.id = 'fz-moderation-panel';
    const header = el('header', 'fz-header');
    const title = el('div');
    title.append(el('h1', '', 'Sensitive content'));
    title.append(el('p', '', 'Review Sightengine-flagged posts and photo stories.'));
    const close = el('button', 'fz-close', '×');
    close.setAttribute('aria-label', 'Close moderation panel');
    close.addEventListener('click', closePanel);
    header.append(title, close);
    panel.appendChild(header);

    const filters = el('nav', 'fz-filters');
    [['sensitive', 'Shielded'], ['review', 'Needs review'], ['block', 'Not displayed']].forEach(([status, label]) => {
      const button = el('button', 'fz-filter', label);
      button.dataset.status = status;
      button.addEventListener('click', () => loadQueue(status));
      filters.appendChild(button);
    });
    panel.appendChild(filters);
    panel.appendChild(el('main', 'fz-grid'));
    document.body.appendChild(panel);
    loadQueue(currentStatus);
  }

  function installButton() {
    if (!token() || document.getElementById('fz-moderation-button')) return;
    const button = el('button', 'fz-launch', '⚠ Moderation');
    button.id = 'fz-moderation-button';
    button.addEventListener('click', openPanel);
    document.body.appendChild(button);
  }

  installButton();
  window.addEventListener('storage', installButton);
  setInterval(installButton, 2000);
})();
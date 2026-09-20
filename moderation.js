(() => {
  const API = 'https://api.frenzone.live';
  const ROUTE = '/frenzone/adultcontent';
  let currentStatus = 'sensitive';
  let loading = false;

  const token = () => localStorage.getItem('token');
  const headers = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' });
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function mediaPreview(url, index) {
    const wrap = el('div', 'fz-media');
    const image = el('img');
    image.src = url;
    image.alt = `Suspicious media ${index + 1}`;
    image.loading = 'lazy';
    image.onerror = () => {
      const video = el('video');
      video.src = url;
      video.controls = true;
      video.preload = 'metadata';
      video.setAttribute('playsinline', '');
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
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ action }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Moderation update failed');
      card.remove();
      const grid = document.querySelector('#fz-moderation-root .fz-grid');
      if (grid && !grid.children.length) grid.appendChild(el('p', 'fz-empty', 'No suspicious posts in this queue.'));
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

    const gallery = el('div', 'fz-gallery');
    const media = Array.isArray(item.media) ? item.media.filter(Boolean) : [];
    media.forEach((url, index) => gallery.appendChild(mediaPreview(url, index)));
    if (media.length) card.appendChild(gallery);

    const author = item.author || {};
    const name = author.username || [author.firstname, author.lastname].filter(Boolean).join(' ') || 'Unknown user';
    card.appendChild(el('h3', '', name));
    card.appendChild(el('p', 'fz-date', item.createdAt ? new Date(item.createdAt).toLocaleString() : ''));
    card.appendChild(el('p', 'fz-reasons', (item.reasons || []).join(' · ') || 'Flagged by Sightengine'));

    const actions = el('div', 'fz-actions');
    [['allow', 'Allow normally'], ['shield', 'Display with shield'], ['remove', 'Do not display']].forEach(([action, label]) => {
      const button = el('button', `fz-action fz-action-${action}`, label);
      button.addEventListener('click', () => decide(item, action, card));
      actions.appendChild(button);
    });
    card.appendChild(actions);
    return card;
  }

  async function loadQueue(status) {
    if (loading) return;
    currentStatus = status;
    loading = true;
    document.querySelectorAll('#fz-moderation-root .fz-filter').forEach((button) => {
      button.classList.toggle('active', button.dataset.status === status);
    });
    const grid = document.querySelector('#fz-moderation-root .fz-grid');
    if (!grid) { loading = false; return; }
    grid.replaceChildren(el('p', 'fz-empty', 'Loading suspicious posts…'));
    try {
      const response = await fetch(`${API}/admin-api/moderation?status=${encodeURIComponent(status)}&limit=100`, { headers: headers() });
      if (response.status === 401 || response.status === 403) throw new Error('Your admin session has expired. Sign in again.');
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not load suspicious posts');
      grid.replaceChildren();
      const items = Array.isArray(data.items) ? data.items : [];
      if (!items.length) grid.appendChild(el('p', 'fz-empty', 'No suspicious posts in this queue.'));
      items.forEach((item) => grid.appendChild(renderCard(item)));
    } catch (error) {
      grid.replaceChildren(el('p', 'fz-error', error.message));
    } finally {
      loading = false;
    }
  }

  function buildRoot() {
    const root = el('section', 'fz-embedded');
    root.id = 'fz-moderation-root';
    const header = el('header', 'fz-header');
    const title = el('div');
    title.append(el('h2', '', 'Suspicious Posts'));
    title.append(el('p', '', 'Sightengine-flagged post images, post videos, and photo stories.'));
    header.appendChild(title);
    root.appendChild(header);

    const filters = el('nav', 'fz-filters');
    [['sensitive', 'Display with shield'], ['review', 'Needs review'], ['block', 'Do not display']].forEach(([status, label]) => {
      const button = el('button', 'fz-filter', label);
      button.dataset.status = status;
      button.addEventListener('click', () => loadQueue(status));
      filters.appendChild(button);
    });
    root.appendChild(filters);
    root.appendChild(el('main', 'fz-grid'));
    return root;
  }

  function mount() {
    if (location.pathname !== ROUTE || !token()) return;
    if (document.getElementById('fz-moderation-root')) return;
    const oldPage = document.querySelector('.emp-content .sc-dashboard-container') ||
      document.querySelector('.emp-content > div');
    if (!oldPage) return;
    oldPage.replaceChildren(buildRoot());
    loadQueue(currentStatus);
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('popstate', () => setTimeout(mount, 0));
  setInterval(mount, 1000);
  mount();
})();
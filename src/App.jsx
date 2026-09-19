import React, { useMemo, useState } from 'react'
import {
  LayoutDashboard, Users, ShieldAlert, Radio, Bell, BarChart3, Activity,
  ClipboardList, BadgeCheck, CreditCard, Crown, KeyRound, Settings, Scale,
  Search, ChevronRight, Menu, X
} from 'lucide-react'

const nav = [
  ['Command Center', LayoutDashboard],
  ['Users', Users],
  ['Reports & Cases', ShieldAlert],
  ['Live Control', Radio],
  ['Notifications', Bell],
  ['Analytics', BarChart3],
  ['User Activity', Activity],
  ['Admin Audit', ClipboardList],
  ['KYC & Verification', BadgeCheck],
  ['Transactions & Payouts', CreditCard],
  ['Clubs', Crown],
  ['Roles & Permissions', KeyRound],
  ['Settings', Settings],
  ['Law Enforcement', Scale],
]

const cards = [
  ['Total Users', 'Backend not connected'],
  ['Active Lives', 'Backend not connected'],
  ['Open Cases', 'Backend not connected'],
  ['Pending KYC', 'Backend not connected'],
  ['Active Clubs', 'Backend not connected'],
  ['Revenue', 'Backend not connected'],
]

function EmptyModule({ title }) {
  return <section className="module">
    <div className="module-head">
      <div><span className="eyebrow">PLANNED / DESIGNED</span><h2>{title}</h2></div>
      <button className="secondary">Filters</button>
    </div>
    <div className="empty">
      <strong>{title} frontend shell is ready.</strong>
      <p>Live values and actions stay disabled until the corresponding Frenzone backend contract is verified.</p>
    </div>
  </section>
}

function Dashboard() {
  return <>
    <div className="cards">
      {cards.map(([label, value]) => <article className="card" key={label}>
        <span>{label}</span><strong>—</strong><small>{value}</small>
      </article>)}
    </div>
    <div className="grid">
      <section className="module">
        <div className="module-head"><div><span className="eyebrow">OPERATIONS</span><h2>Command Center</h2></div></div>
        <div className="rows">
          {['Moderation queue','Live operations','Payout review','System/provider status'].map(x =>
            <div className="row" key={x}><div><strong>{x}</strong><small>Awaiting backend connection</small></div><ChevronRight size={18}/></div>
          )}
        </div>
      </section>
      <section className="module">
        <div className="module-head"><div><span className="eyebrow">FINANCIAL RULE</span><h2>Revenue allocation</h2></div></div>
        <div className="split"><b>30%</b><b>42%</b><b>28%</b></div>
        <div className="split labels"><span>Store</span><span>Creator</span><span>Frenzone</span></div>
        <p className="note">Verification: Store 30% • Frenzone 70% • Creator 0%</p>
      </section>
    </div>
  </>
}

export default function App() {
  const [active, setActive] = useState('Command Center')
  const [mobile, setMobile] = useState(false)
  const Icon = useMemo(() => nav.find(([x]) => x === active)?.[1] || LayoutDashboard, [active])
  return <div className="app">
    <aside className={mobile ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="mark">F</div><div><b>FRENZONE</b><span>ADMIN PREVIEW</span></div><button className="close" onClick={()=>setMobile(false)}><X/></button></div>
      <nav>{nav.map(([name, N]) => <button className={active===name?'active':''} key={name} onClick={()=>{setActive(name);setMobile(false)}}><N size={18}/><span>{name}</span></button>)}</nav>
      <div className="safe">ISOLATED PREVIEW<br/><b>Production untouched</b></div>
    </aside>
    <main>
      <header>
        <button className="hamburger" onClick={()=>setMobile(true)}><Menu/></button>
        <div><span className="eyebrow">FRENZONE LIVE</span><h1><Icon size={27}/>{active}</h1></div>
        <div className="search"><Search size={17}/><span>Search admin</span></div>
      </header>
      <div className="content">{active==='Command Center' ? <Dashboard/> : <EmptyModule title={active}/>}</div>
    </main>
  </div>
}

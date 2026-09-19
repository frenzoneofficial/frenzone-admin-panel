import React, { useMemo, useState } from 'react'
import {
  LayoutDashboard, Users, ShieldAlert, Radio, Bell, BarChart3, Activity,
  ClipboardList, BadgeCheck, CreditCard, Crown, KeyRound, Settings, Scale,
  Search, ChevronRight, Menu, X, UserRound, Smartphone, MapPin, Clock3,
  Mail, Globe2, Filter, Download
} from 'lucide-react'

const nav = [
  ['Command Center', LayoutDashboard], ['Users', Users], ['Reports & Cases', ShieldAlert],
  ['Live Control', Radio], ['Notifications', Bell], ['Analytics', BarChart3],
  ['User Activity', Activity], ['Admin Audit', ClipboardList], ['KYC & Verification', BadgeCheck],
  ['Transactions & Payouts', CreditCard], ['Clubs', Crown], ['Roles & Permissions', KeyRound],
  ['Settings', Settings], ['Law Enforcement', Scale],
]
const cards = [['Total Users'],['Active Lives'],['Open Cases'],['Pending KYC'],['Active Clubs'],['Revenue']]
const demoUsers = [
  {name:'Lina Haddad', username:'@lina', country:'Canada', status:'Active', kyc:'Didit pending', live:'Allowed'},
  {name:'Omar K.', username:'@omar', country:'UAE', status:'Active', kyc:'Not started', live:'Standard rules'},
  {name:'Maya S.', username:'@maya', country:'France', status:'Suspended', kyc:'Verified', live:'Revoked'},
]

function Status({children}) { return <span className="status">{children}</span> }

function Dashboard() {
  return <>
    <div className="cards">{cards.map(([label]) => <article className="card" key={label}><span>{label}</span><strong>—</strong><small>Backend not connected</small></article>)}</div>
    <div className="grid">
      <section className="module"><Title eyebrow="OPERATIONS" title="Command Center"/><div className="rows">
        {['Moderation queue','Live operations','Payout review','System/provider status'].map(x=><div className="row" key={x}><div><strong>{x}</strong><small>Awaiting backend connection</small></div><ChevronRight size={18}/></div>)}
      </div></section>
      <section className="module"><Title eyebrow="FINANCIAL RULE" title="Revenue allocation"/>
        <div className="split"><b>30%</b><b>42%</b><b>28%</b></div><div className="split labels"><span>Store</span><span>Creator</span><span>Frenzone</span></div>
        <p className="note">Verification: Store 30% • Frenzone 70% • Creator 0%</p>
      </section>
    </div>
  </>
}

function Title({eyebrow,title,actions}) { return <div className="module-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{actions}</div> }

function UsersModule() {
  const [selected,setSelected]=useState(null)
  if(selected) return <UserProfile user={selected} back={()=>setSelected(null)}/>
  return <section className="module">
    <Title eyebrow="USER MANAGEMENT" title="Users" actions={<div className="actions"><button className="secondary"><Filter size={14}/> Filters</button><button className="secondary"><Download size={14}/> Export</button></div>}/>
    <div className="toolbar"><div className="field"><Search size={15}/><span>Search username, email or user ID</span></div><Status>NEEDS BACKEND VERIFICATION</Status></div>
    <div className="table-wrap"><table><thead><tr><th>User</th><th>Country</th><th>Status</th><th>Verification</th><th>Live access</th><th></th></tr></thead>
    <tbody>{demoUsers.map(u=><tr key={u.username}><td><div className="usercell"><div className="avatar"><UserRound size={16}/></div><div><b>{u.name}</b><small>{u.username}</small></div></div></td><td>{u.country}</td><td><Status>{u.status}</Status></td><td>{u.kyc}</td><td>{u.live}</td><td><button className="iconbtn" onClick={()=>setSelected(u)}><ChevronRight size={17}/></button></td></tr>)}</tbody></table></div>
    <p className="demo-warning">Preview rows are UI-only examples and are not Frenzone production records.</p>
  </section>
}

function UserProfile({user,back}) {
  const tabs=['Overview','Safety & Reports','Sessions & Behaviour','Finance']
  const [tab,setTab]=useState('Overview')
  return <div>
    <button className="back" onClick={back}>← Users</button>
    <section className="module profile-head"><div className="profile-title"><div className="avatar large"><UserRound/></div><div><span className="eyebrow">USER PROFILE • PREVIEW DATA</span><h2>{user.name}</h2><p>{user.username} • {user.country}</p></div></div><div className="actions"><button className="secondary">Message</button><button className="danger" disabled>Suspend</button></div></section>
    <div className="tabs">{tabs.map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
    {tab==='Overview' && <div className="grid">
      <section className="module"><Title eyebrow="ACCOUNT" title="Identity & status"/><Info icon={<Globe2/>} a="Country" b={user.country}/><Info icon={<BadgeCheck/>} a="Didit / KYC" b={user.kyc}/><Info icon={<Radio/>} a="Live access" b={user.live}/></section>
      <section className="module"><Title eyebrow="VERIFICATION" title="Separate verification states"/><Info icon={<BadgeCheck/>} a="Didit KYC" b="Unavailable"/><Info icon={<BadgeCheck/>} a="Admin Verified" b="Unavailable"/><Info icon={<CreditCard/>} a="Paid Verification" b="Unavailable"/></section>
    </div>}
    {tab==='Sessions & Behaviour' && <Sessions/>}
    {tab==='Safety & Reports' && <Empty title="Safety & Reports" text="Reports against this profile, posts/videos, Lives and Clubs will appear here after backend connection."/>}
    {tab==='Finance' && <Empty title="Wallet & Earnings" text="Wallet, creator earnings, purchased coins and payout history require verified financial APIs."/>}
  </div>
}

function Info({icon,a,b}) {return <div className="info"><span>{React.cloneElement(icon,{size:17})}</span><div><small>{a}</small><b>{b}</b></div></div>}

function Sessions() {
 return <div className="grid">
  <section className="module"><Title eyebrow="SESSION SUMMARY" title="User behaviour"/><Info icon={<Clock3/>} a="Last seen" b="Unavailable"/><Info icon={<Smartphone/>} a="Device / OS" b="Unavailable"/><Info icon={<MapPin/>} a="Approx. IP location" b="Unavailable"/><Info icon={<Activity/>} a="Time spent (30d)" b="Unavailable"/></section>
  <section className="module"><Title eyebrow="PRIVACY-CONTROLLED" title="Recent sessions"/><div className="empty compact"><strong>No backend session data</strong><p>Each session will show UTC start/end, duration, IP, approximate location, device, OS and app version.</p></div></section>
 </div>
}

function NotificationsModule(){
 const [mode,setMode]=useState('Email')
 return <div className="grid">
  <section className="module"><Title eyebrow="CAMPAIGN COMPOSER" title="New notification"/><div className="seg">{['Push','Email','Both'].map(x=><button className={mode===x?'active':''} onClick={()=>setMode(x)} key={x}>{x}</button>)}</div>
   <label>Audience<select><option>All eligible users</option><option>Country / countries</option><option>Specific Frenzone users</option><option>Specific registered emails</option><option>Imported eligible email list</option></select></label>
   <label>Countries<select multiple><option>Canada</option><option>United States</option><option>UAE</option><option>France</option><option>Saudi Arabia</option></select></label>
   <label>Specific recipients<div className="input"><Mail size={15}/> Search user ID, username or registered email</div></label>
   <label>Language<select><option>English</option><option>Arabic</option><option>French</option><option>Localized variants</option></select></label>
   <label>Title<input placeholder="Campaign title"/></label><label>Message<textarea placeholder="Write notification or email message"/></label>
   <button className="primary" disabled>Send unavailable until backend is connected</button>
  </section>
  <section className="module"><Title eyebrow="RECIPIENT PREVIEW" title="Audience"/><div className="preview-count">—</div><p className="muted">Eligible recipients</p><div className="empty compact"><strong>Backend not connected</strong><p>Suppressed, unsubscribed, bounced and invalid recipients will be excluded before send.</p></div></section>
 </div>
}

function Empty({title,text}){return <section className="module"><Title eyebrow="PLANNED / DESIGNED" title={title}/><div className="empty"><strong>{title} frontend shell is ready.</strong><p>{text||'Live values and actions stay disabled until the corresponding Frenzone backend contract is verified.'}</p></div></section>}
function Module({name}) {if(name==='Users')return <UsersModule/>;if(name==='Notifications')return <NotificationsModule/>;return <Empty title={name}/>}

export default function App() {
 const [active,setActive]=useState('Command Center'),[mobile,setMobile]=useState(false)
 const Icon=useMemo(()=>nav.find(([x])=>x===active)?.[1]||LayoutDashboard,[active])
 return <div className="app"><aside className={mobile?'sidebar open':'sidebar'}><div className="brand"><div className="mark">F</div><div><b>FRENZONE</b><span>ADMIN PREVIEW</span></div><button className="close" onClick={()=>setMobile(false)}><X/></button></div>
  <nav>{nav.map(([name,N])=><button className={active===name?'active':''} key={name} onClick={()=>{setActive(name);setMobile(false)}}><N size={18}/><span>{name}</span></button>)}</nav><div className="safe">ISOLATED PREVIEW<br/><b>Production untouched</b></div></aside>
  <main><header><button className="hamburger" onClick={()=>setMobile(true)}><Menu/></button><div><span className="eyebrow">FRENZONE LIVE</span><h1><Icon size={27}/>{active}</h1></div><div className="search"><Search size={17}/><span>Search admin</span></div></header>
  <div className="content">{active==='Command Center'?<Dashboard/>:<Module name={active}/>}</div></main></div>
}

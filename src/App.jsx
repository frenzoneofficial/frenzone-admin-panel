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

function ReportsModule(){
 const types=['User Profile','Live Stream','Club','Post / Video']
 return <section className="module"><Title eyebrow="MODERATION" title="Reports & Cases" actions={<div className="actions"><button className="secondary"><Filter size={14}/> Filters</button><button className="secondary"><Download size={14}/> Export</button></div>}/>
  <div className="toolbar"><div className="filter-chips">{types.map(x=><button key={x}>{x}</button>)}</div><Status>ZOHO DESK SYNC • NEEDS BACKEND</Status></div>
  <div className="table-wrap"><table><thead><tr><th>Case</th><th>Reported entity</th><th>Category</th><th>Reporter</th><th>Status</th><th>Created UTC</th></tr></thead><tbody>
   <tr><td colSpan="6"><div className="table-empty"><ShieldAlert size={22}/><b>No backend cases loaded</b><span>Abuse, nudity/sexual content, harassment, threats, spam and other report categories will be unified here and synchronized to Zoho Desk according to the verified routing rules.</span></div></td></tr>
  </tbody></table></div>
 </section>
}

function ClubsModule(){
 return <div className="grid"><section className="module"><Title eyebrow="CLUB DIRECTORY" title="Active Clubs" actions={<button className="secondary"><Filter size={14}/> Filters</button>}/>
  <div className="club-tiers"><div><b>$3.99</b><span>Monthly</span></div><div><b>$6.99</b><span>Monthly</span></div><div><b>$9.99</b><span>Monthly</span></div></div>
  <div className="empty compact"><strong>No Club backend data</strong><p>Each Club will show Club ID, owner, price, paid members, monthly subscription status, reports and subscription performance.</p></div>
 </section><section className="module"><Title eyebrow="DATA QUALITY" title="Club safeguards"/><Info icon={<Crown/>} a="Free Club tier" b="Not permitted"/><Info icon={<ShieldAlert/>} a="Invalid / zero price" b="Pricing anomaly"/><Info icon={<CreditCard/>} a="Creator monetization" b="30% / 42% / 28%"/><p className="note">Deleted Clubs leave the active directory but can remain in authorized audit/history records.</p></section></div>
}

function TransactionsModule(){
 return <><div className="cards finance-cards">{['Gross revenue','Store fees','Creator share','Frenzone share','Pending payouts','Refunds / chargebacks'].map(x=><article className="card" key={x}><span>{x}</span><strong>—</strong><small>Backend not connected</small></article>)}</div>
 <section className="module"><Title eyebrow="FINANCE" title="Transactions & Payouts" actions={<button className="secondary"><Download size={14}/> Export</button>}/>
 <div className="table-wrap"><table><thead><tr><th>Transaction ID</th><th>User / Creator</th><th>Type</th><th>Gross</th><th>Store</th><th>Creator</th><th>Frenzone</th><th>Status</th></tr></thead><tbody><tr><td colSpan="8"><div className="table-empty"><CreditCard size={22}/><b>No financial API connected</b><span>Transaction metadata and payout records will appear only after reconciliation fields are verified.</span></div></td></tr></tbody></table></div>
 <p className="demo-warning">Creator monetization validation: Store 30% • Creator 42% • Frenzone 28%. Verification: Store 30% • Frenzone 70%.</p></section></>
}

function LawModule(){
 return <section className="module restricted"><Title eyebrow="RESTRICTED ACCESS" title="Law Enforcement Reports" actions={<Status>AUTHORIZED ADMINS ONLY</Status>}/>
 <div className="table-wrap"><table><thead><tr><th>Case ID</th><th>Agency</th><th>Jurisdiction</th><th>Reference</th><th>Request type</th><th>Status</th><th>Received UTC</th></tr></thead><tbody><tr><td colSpan="7"><div className="table-empty"><Scale size={22}/><b>No law-enforcement backend connected</b><span>Access, legal-process validation, actions and disclosures require a complete audit log.</span></div></td></tr></tbody></table></div>
 </section>
}

function LiveModule(){return <div className="grid"><section className="module"><Title eyebrow="LIVE OPERATIONS" title="Active Live Sessions"/><div className="empty compact"><strong>No Live backend connected</strong><p>Solo, co-host, PK 1v1 and PK 2v2 sessions will show host, guests, viewers, duration, reports and moderation state.</p></div></section><section className="module"><Title eyebrow="MANUAL CONTROL" title="Live Access"/><Info icon={<Radio/>} a="Eligibility rules" b="Needs backend verification"/><Info icon={<KeyRound/>} a="Grant / revoke" b="Permission controlled"/><Info icon={<ClipboardList/>} a="Reason + admin + UTC" b="Required audit"/><button className="primary" disabled>Live actions unavailable</button></section></div>}

function KycModule(){return <div className="grid"><section className="module"><Title eyebrow="IDENTITY" title="KYC & Verification"/><Info icon={<BadgeCheck/>} a="Didit KYC" b="Separate state"/><Info icon={<BadgeCheck/>} a="Admin manual verification" b="Separate state"/><Info icon={<CreditCard/>} a="Paid verification entitlement" b="Separate state"/><div className="empty compact"><strong>No verification API connected</strong><p>The UI will not treat RevenueCat entitlement or manual verification as Didit approval.</p></div></section><section className="module"><Title eyebrow="MANUAL CONTROL" title="Admin Verification"/><label>Reason<textarea placeholder="Required reason for grant or removal"/></label><label>Optional expiry<input type="datetime-local"/></label><button className="primary" disabled>Verification actions unavailable</button></section></div>}

function AuditModule({activity=false}){return <section className="module"><Title eyebrow={activity?'USER BEHAVIOUR':'ADMIN SECURITY'} title={activity?'User Activity Logs':'Admin Audit Logs'} actions={<button className="secondary"><Download size={14}/> Export</button>}/><div className="table-wrap"><table><thead><tr><th>UTC</th><th>{activity?'User':'Admin'}</th><th>Action / Event</th><th>Target</th><th>IP / Context</th><th>Result</th></tr></thead><tbody><tr><td colSpan="6"><div className="table-empty"><Activity size={22}/><b>No event backend connected</b><span>{activity?'App sessions and behaviour events will be displayed here.':'Privileged actions will require attributable server-side audit records.'}</span></div></td></tr></tbody></table></div></section>}

function RolesModule(){return <section className="module"><Title eyebrow="ACCESS CONTROL" title="Roles & Permissions"/><div className="permission-grid">{['Super Admin','Operations','Moderation','Finance','Support','Analytics','Law Enforcement'].map(x=><div className="permission-card" key={x}><b>{x}</b><span>Permission matrix pending backend contract</span><Status>SERVER ENFORCEMENT REQUIRED</Status></div>)}</div></section>}

function SettingsModule(){return <div className="grid"><section className="module"><Title eyebrow="APP CONTROL" title="Version & Features"/><Info icon={<Smartphone/>} a="iOS version" b="Unavailable"/><Info icon={<Smartphone/>} a="Android version" b="Unavailable"/><Info icon={<Settings/>} a="Force update" b="Unavailable"/><Info icon={<Settings/>} a="Feature flags" b="Unavailable"/></section><section className="module"><Title eyebrow="PROVIDERS" title="Service Health"/>{['Didit','RevenueCat','Agora','Push provider','Email provider','Zoho Desk'].map(x=><div className="provider" key={x}><b>{x}</b><Status>NOT VERIFIED</Status></div>)}</section></div>}

function AnalyticsModule(){return <><div className="cards">{['DAU','WAU','MAU','D1 retention','D7 retention','D30 retention'].map(x=><article className="card" key={x}><span>{x}</span><strong>—</strong><small>Metric source not connected</small></article>)}</div><div className="grid"><Empty title="Retention & Cohorts" text="D1/D7/D14/D30, churn and reactivation require verified event definitions."/><Empty title="Engagement & Monetization" text="Live, PK, Clubs, Moments, paid content, ARPU/LTV/CAC and conversion metrics require verified sources."/></div></>}

function Empty({title,text}){return <section className="module"><Title eyebrow="PLANNED / DESIGNED" title={title}/><div className="empty"><strong>{title} frontend shell is ready.</strong><p>{text||'Live values and actions stay disabled until the corresponding Frenzone backend contract is verified.'}</p></div></section>}
function Module({name}) {
 if(name==='Users')return <UsersModule/>; if(name==='Notifications')return <NotificationsModule/>;
 if(name==='Reports & Cases')return <ReportsModule/>; if(name==='Clubs')return <ClubsModule/>;
 if(name==='Transactions & Payouts')return <TransactionsModule/>; if(name==='Law Enforcement')return <LawModule/>;
 if(name==='Live Control')return <LiveModule/>; if(name==='KYC & Verification')return <KycModule/>;
 if(name==='User Activity')return <AuditModule activity/>; if(name==='Admin Audit')return <AuditModule/>;
 if(name==='Roles & Permissions')return <RolesModule/>; if(name==='Settings')return <SettingsModule/>;
 if(name==='Analytics')return <AnalyticsModule/>;
 return <Empty title={name}/>
}

export default function App() {
 const [active,setActive]=useState('Command Center'),[mobile,setMobile]=useState(false)
 const Icon=useMemo(()=>nav.find(([x])=>x===active)?.[1]||LayoutDashboard,[active])
 return <div className="app"><aside className={mobile?'sidebar open':'sidebar'}><div className="brand"><div className="mark">F</div><div><b>FRENZONE</b><span>ADMIN PREVIEW</span></div><button className="close" onClick={()=>setMobile(false)}><X/></button></div>
  <nav>{nav.map(([name,N])=><button className={active===name?'active':''} key={name} onClick={()=>{setActive(name);setMobile(false)}}><N size={18}/><span>{name}</span></button>)}</nav><div className="safe">ISOLATED PREVIEW<br/><b>Production untouched</b></div></aside>
  <main><header><button className="hamburger" onClick={()=>setMobile(true)}><Menu/></button><div><span className="eyebrow">FRENZONE LIVE</span><h1><Icon size={27}/>{active}</h1></div><div className="search"><Search size={17}/><span>Search admin</span></div></header>
  <div className="content">{active==='Command Center'?<Dashboard/>:<Module name={active}/>}</div></main></div>
}

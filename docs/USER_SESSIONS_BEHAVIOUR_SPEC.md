# User Sessions, Device Intelligence & Behaviour — Functional Specification

## Purpose
Give authorized Frenzone admins an operational view of account sessions and product behaviour while minimizing unnecessary collection and avoiding false precision.

## Signup snapshot
Where legitimately collected and disclosed, record server-side:
- User ID
- Signup UTC timestamp
- Source IP address
- IP-derived country/region/city at coarse accuracy
- Platform: iOS / Android / Web where applicable
- Device manufacturer/model when exposed by the app/OS
- OS name/version
- App version/build
- Locale/language
- Installation/app-instance identifier where appropriate

Do not claim GPS location from an IP address. Label IP geolocation as approximate.

## Phone terminology
“Kind of phone number” and “kind of phone” are different data:
- **Phone/device:** manufacturer/model/OS, e.g. iPhone model family or Android manufacturer/model where available.
- **Phone number metadata:** country calling code and verification state. Carrier/line type may only be shown if a legitimate provider supplies it and collection/use is justified.

Do not infer a person's physical location from the phone number.

## Session log
Create one session record per authenticated app session, where architecture permits:
- Session ID
- User ID
- Login/session start UTC
- Logout/session end UTC
- Last activity UTC
- Duration
- IP address observed at session start
- Approximate IP country/region/city
- Platform
- Device manufacturer/model
- OS version
- App version
- Session termination reason where known

If the app closes/crashes or loses connectivity, calculate duration using a documented inactivity/session timeout rather than pretending an exact logout occurred.

## User Profile — Behaviour tab
Summary:
- Last seen
- Current/last IP (permission controlled)
- Approximate location
- Device/platform
- App version
- Sessions today / 7d / 30d
- Time spent today / 7d / 30d
- Average session duration
- Last 20/50 sessions

Session table:
- Start
- End / last activity
- Duration
- IP
- Approximate location
- Device
- OS
- App version

## Product behaviour
Use event analytics rather than recording raw screen content. Suggested events:
- app_open
- session_start
- session_end/timeout
- login_success
- logout
- post_view
- post_create
- like
- comment
- share
- bookmark
- profile_view
- follow/unfollow
- live_view
- live_start
- live_end
- pk_join/start/end
- gift_send
- club_view
- club_subscribe
- paid_content_purchase
- moment_view/create
- notification_open
- deep_link_open

Event records should use IDs and minimal metadata required for analytics. Do not capture passwords, OTPs, message text, payment credentials or unrelated device content.

## Admin filters
Where backend supports:
- user ID / username
- date range
- country/region
- platform
- device model
- OS/app version
- IP (restricted permission)
- session duration
- activity/event type

## Privacy/security
IP addresses and persistent device/session identifiers are personal data and should be permission restricted.
Requirements:
- documented user-facing privacy disclosure
- defined retention period
- access logging
- least-privilege admin access
- encryption in transit/at rest according to infrastructure policy
- deletion/retention workflow consistent with applicable privacy obligations
- avoid collecting precise GPS unless a product feature genuinely requires it and the user has provided the required permission/consent

Suggested permissions:
- users.sessions.view
- users.sessions.ip_view
- users.behaviour.view
- users.devices.view
- users.sessions.export

## Backend implementation
Prefer server-side capture of request IP. Do not trust an IP value submitted by the client as authoritative.

For device/app metadata, have the authenticated mobile app send a constrained device context to the backend at session start/refresh.

Session duration should be based on server-observed start + heartbeat/activity + end/timeout rules.

## Backend verification required
Before marking operational, verify:
- current authentication/session model
- whether request IP is preserved behind AWS/load balancer/proxy
- trusted proxy configuration
- existing device fields
- analytics/event pipeline
- session heartbeat/timeout strategy
- retention policy
- permissions/audit endpoint

# Moderation, Abuse Reports & Police/Law-Enforcement Logs

## Goal
Use one consistent case system for abuse, nudity/sexual content, harassment and other reported violations across every Frenzone surface while keeping law-enforcement handling separately permissioned and fully audited.

## Reported entity types
Every moderation report/case must identify exactly what was reported:
- **USER_PROFILE** — account/profile, bio, profile image or account behaviour
- **LIVE** — live stream, host, guest/co-host or live behaviour
- **CLUB** — Club, Club owner, Club content/activity
- **POST** — text/image post
- **VIDEO** — uploaded video/reel
- **MOMENT** — where applicable
- **COMMENT** — where applicable

Store both `entityType` and authoritative `entityId`, plus owner/creator ID where applicable.

## Abuse/report categories
Support structured categories such as:
- Nudity / sexual content
- Harassment / bullying
- Hate or abusive conduct
- Threats / violence
- Spam / scam
- Impersonation
- Child-safety concern
- Self-harm concern
- Illegal or prohibited content/activity
- Privacy violation
- Intellectual-property complaint
- Other

Categories should be configurable by backend policy rather than hard-coded as legal conclusions.

## Moderation case record
Each case should include where available:
- Case ID
- Report ID(s)
- entity type + entity ID
- reported user/owner ID
- reporter user ID
- category/subcategory
- reporter description
- automated moderation signal/provider result
- evidence/content reference
- created UTC
- priority/severity
- status
- assigned moderator
- actions taken
- action reason
- resolution
- resolved UTC
- appeal/review status if supported

Multiple reports about the same content may be grouped while preserving every original report.

## Reports & Cases UI
Filters:
- entity type
- report category
- status
- priority
- assigned moderator
- date range
- user/owner
- reporter
- automated moderation flag

Case detail should link safely to:
- reported profile
- post/video
- Live record
- Club
- related reports
- prior moderation history
- relevant audit events

## Moderation actions
Only expose verified backend actions and permission-gate them:
- dismiss/no violation
- warning
- strike
- content hide/remove
- Live intervention/end where supported
- Club restriction/action where supported
- temporary suspension
- ban
- escalation
- refer to law-enforcement workflow when authorized

High-impact actions require reason, admin identity, UTC timestamp and audit event.

## Evidence integrity
Do not rely only on a mutable content URL for serious cases.
Where policy and law permit, preserve sufficient immutable evidence metadata/reference for review:
- content/entity ID
- owner ID
- timestamps
- moderation result
- action history
- relevant stored evidence reference/hash where implemented

Access to sensitive evidence must be tightly permissioned and logged.

## Police / Law-Enforcement Reports
Maintain a distinct restricted module, not an ordinary moderation queue.

### Law-enforcement case/log fields
- internal case ID
- agency/requesting authority
- jurisdiction/country
- request/reference number
- request type
- date/time received UTC
- legal-process/document reference
- affected Frenzone user/entity IDs
- assigned authorized admin
- status
- actions/disclosures performed
- date/time of each action
- notes
- closure date
- linked moderation cases where relevant

### Law-enforcement audit log
Every access or action should record:
- admin identity
- UTC timestamp
- action
- case ID
- target/resource
- result
- reason where required

Do not expose this module to normal moderators by default.

## Data disclosure safeguards
A police/law-enforcement request should not automatically trigger disclosure. The workflow should allow authorized personnel to record and validate the request and applicable legal process before any disclosure. Preserve an audit trail of what was disclosed and when.

## User-level moderation history
User Profile should contain a permission-controlled **Safety & Reports** tab showing:
- reports against the user
- reports submitted by the user where appropriate
- warnings/strikes
- suspensions/bans
- reported profile/content/Live/Club links
- case outcomes
- moderator action history

Do not label a user as an abuser merely because reports exist. Distinguish allegations/reports from confirmed moderation findings.

## Club moderation history
Club detail should show:
- reports against Club
- reports against Club content/activity
- owner moderation history relevant to Club
- actions/restrictions
- deleted/removed content references where retention permits

## Live moderation history
Live detail/history should show:
- reports received during Live
- reported host/guest
- category
- timestamps
- moderator intervention
- end-Live action/reason
- related case IDs

## Backend verification required
Verify:
- current report schemas/endpoints
- reported-user endpoint and content-report endpoints
- Sightengine/moderation fields
- content removal/hide APIs
- warning/strike/suspend/ban APIs
- Live intervention APIs
- Club moderation APIs
- evidence retention/storage
- police-report storage/access model
- permissions and audit endpoint

Never display a designed action as operational until its backend endpoint and authorization are verified.

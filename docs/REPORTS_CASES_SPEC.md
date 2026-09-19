# Reports, Cases & Moderation — Functional Specification

## Unified case model
Consolidate legacy reported-post, user-report, suspicious-content and related moderation views into a single Reports & Cases workspace while retaining source/type distinctions.

## Case list
Display where available:
- Case/report ID
- Report type
- Reporter
- Target user/content/live/Club
- Reason/category
- Created UTC
- Priority/severity if backend defines it
- Assignment
- Status
- Evidence/content reference
- Action taken

## Case statuses
Suggested workflow:
- New
- In review
- Awaiting information
- Actioned
- No action
- Escalated
- Closed

Do not invent automated severity or guilt determinations. Preserve backend/provider moderation signals as signals, not final conclusions.

## Case detail
Include:
- report metadata
- reporter and target links
- referenced post/media/live/Club
- moderation-provider signal where available
- prior relevant cases/sanctions
- internal admin notes
- assignment/history
- action history
- timestamps
- audit events

## Actions
Only expose actions supported by verified backend endpoints and permissions:
- warning
- strike
- content hide/remove
- suspend
- ban
- Live moderation/end
- Club moderation/disable
- close/no-action
- escalate

Consequential actions require reason and audit log.

## Sensitive/adult content
Legacy suspicious/adult/sensitive content views should be consolidated as filters/queues when possible rather than duplicated navigation pages. Keep provider classifications and human admin decisions distinguishable.

## User reports
Preserve ability to inspect reports against a user and reports submitted by a user when permitted. Link cases back to the detailed User Profile.

## Law-enforcement reports
Keep the Law Enforcement Report workspace distinct from ordinary moderation cases because access, retention and disclosure requirements may differ. Do not expose sensitive legal-request data to general moderation roles.

## Search/filtering
Support where backend allows:
- report/case ID
- username/user ID
- content ID
- Club ID
- Live ID
- category
- status
- assigned admin
- date range

## Audit
Record admin ID, action, target, reason, UTC timestamp, previous/new state and result. Internal notes should record author and timestamp.

## Backend verification required
Inventory all legacy report/moderation endpoints and map them to the unified case model before deleting or replacing legacy screens.

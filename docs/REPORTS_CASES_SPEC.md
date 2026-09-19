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


## Zoho Desk synchronization
Frenzone reports/cases must also integrate with Zoho Desk.

Target behavior:
- create or synchronize a Zoho Desk ticket for report categories configured for support/moderation routing;
- retain the Frenzone Case ID and reported entity type/ID in the Zoho ticket;
- retain the Zoho Desk ticket ID/status in the Frenzone case;
- map reporter/contact details only when appropriate and permitted;
- include category, description, UTC timestamp and safe evidence/reference links;
- do not send unnecessary sensitive evidence or private user data to Zoho;
- synchronize status/assignment/comments only according to the verified integration contract;
- avoid duplicate Zoho tickets when the same Frenzone case is retried;
- log synchronization success/failure and last sync UTC;
- provide an admin link to the Zoho ticket when available.

Suggested case fields:
- zohoDeskTicketId
- zohoDeskTicketNumber
- zohoDeskStatus
- zohoDeskDepartmentId
- zohoDeskAssigneeId
- zohoDeskLastSyncAt
- zohoDeskSyncStatus
- zohoDeskSyncError

### Backend verification required
Before enabling, verify the existing Zoho Desk organization/department, OAuth/API credentials location, ticket-creation endpoint/service, field mappings, webhook/update strategy, retry/idempotency behavior and permissions. Zoho credentials must remain backend-only and never be embedded in the admin frontend.

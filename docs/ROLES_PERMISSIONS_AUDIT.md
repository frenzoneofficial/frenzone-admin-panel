# Roles, Permissions & Audit — Functional Specification

## Principle
Administrative authority must be enforced by the Frenzone backend. Hiding a button in the frontend is not authorization.

## Suggested permission groups

### Users
- users.view
- users.export
- users.message
- users.warning
- users.strike
- users.suspend
- users.ban
- users.live_access.grant
- users.live_access.revoke
- users.verification.manual_grant
- users.verification.remove

### Reports / moderation
- reports.view
- reports.assign
- reports.resolve
- reports.content_action

### Live
- live.view
- live.moderate
- live.end

### Clubs
- clubs.view
- clubs.members.view
- clubs.transactions.view
- clubs.moderate
- clubs.disable
- clubs.delete

### Financial
- transactions.view
- transactions.export
- payouts.view
- payouts.manage
- wallets.view
- coin_purchases.view

Financial mutation permissions, if ever introduced, must be narrower than read permissions and treated as high risk.

### KYC
- kyc.view
- kyc.review
- kyc.admin_override

KYC provider status and admin override must remain distinguishable.

### Notifications
- notifications.view
- notifications.create
- notifications.test
- notifications.send
- notifications.schedule
- notifications.cancel
- notifications.custom_link
- notifications.email

### Analytics / logs
- analytics.view
- activity_logs.view
- audit_logs.view
- audit_logs.export

### Administration
- roles.view
- roles.manage
- settings.view
- settings.manage

## Role model
Roles should be collections of explicit permissions. Avoid hard-coding access based only on a display title such as "Admin".

Suggested initial roles can include:
- Super Admin
- Operations Admin
- Moderation Admin
- Finance Admin
- Support Admin
- Analyst / Read Only

Exact role assignments require owner approval and backend support; these names do not grant authority by themselves.

## High-risk operations
At minimum:
- ban/suspend
- end Live
- manual Live access
- manual verification
- Club disable/delete
- payout management
- any wallet/coin balance mutation
- role/permission changes
- security/settings changes

Require:
- authenticated admin
- backend permission check
- reason where applicable
- target ID
- UTC timestamp
- previous/new state
- result
- audit event

## Audit event shape
Where possible record:
- audit event ID
- admin ID
- admin role
- action
- target type
- target ID
- reason
- UTC timestamp
- previous state / relevant diff
- new state / relevant diff
- request/result status
- server/request metadata appropriate for security review

Never place passwords, API secrets, full tokens or unnecessarily sensitive payment data in audit logs.

## Audit UI
Support filters for:
- date range
- admin
- action
- target type
- target ID
- success/failure
- high-risk only

Audit records should be append-oriented/immutable from ordinary admin roles. If retention/deletion is legally required, it must be handled by a separately controlled policy rather than casual UI deletion.

## Session/security expectations
Where backend supports it:
- admin authentication/session expiry
- least privilege
- MFA for privileged admins
- revoke admin session
- log privileged sign-in/security events

## Backend verification
Before implementation is called operational, verify the current admin authentication model, role storage, permission middleware and audit-log storage/API.

# Authentication, Admin Sessions & Security Events

## Purpose
Protect the rebuilt admin and make every privileged action attributable to an authenticated administrator.

## Admin authentication
Use the existing verified backend authentication contract where possible. The frontend must not contain privileged credentials or authorization secrets.

Required session information:
- admin/user ID
- role(s)
- effective permissions
- session issued/expiry state
- last authenticated UTC where exposed safely

## Authorization
Frontend permission gates improve UX but are not security controls. Every privileged backend endpoint must enforce authorization server-side.

## Admin session log
Where backend architecture supports it, retain:
- admin session ID
- admin ID
- login UTC
- logout/expiry UTC
- last activity UTC
- source IP
- approximate IP geolocation
- device/browser context
- result/status

## Security events
Record important events such as:
- successful/failed admin login
- password/security credential change
- role/permission change
- new admin creation/deactivation
- suspicious/rejected authorization attempt
- high-risk moderation action
- manual verification grant/removal
- Live Access grant/revoke
- payout action
- settings/version change
- law-enforcement case access/disclosure
- bulk notification/email campaign send/export

## High-risk re-authentication
Where backend supports it, require recent authentication or stronger confirmation for especially sensitive operations such as:
- role/permission changes
- new administrator creation
- payout-affecting operations
- law-enforcement disclosures
- security configuration changes

## Audit integrity
Audit records should be append-oriented and not editable by ordinary admins.
Each event:
- event ID
- admin ID
- action
- target type/ID
- UTC timestamp generated server-side
- source IP where appropriate
- reason
- previous/new state where relevant
- result
- correlation/request ID where available

## Session safety
- expire sessions according to backend security policy
- invalidate sessions after relevant account/security changes
- do not store long-lived privileged secrets in frontend source
- use secure transport
- avoid exposing tokens in URLs/logs
- redact sensitive provider/payment data from errors

## Backend verification
Verify the legacy/current admin authentication flow, token/session storage, refresh behavior, role middleware, logout/invalidation endpoints and audit storage before implementing final auth behavior.

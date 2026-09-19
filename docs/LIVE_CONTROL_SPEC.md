# Live Control Center — Functional Specification

## Purpose
Provide real-time operational visibility and carefully permissioned moderation for Frenzone Live without confusing normal creator eligibility with admin override access.

## Live directory
Show where backend/Agora data exists:
- Live ID
- Host user ID / username
- Live type: solo, co-host, PK 1v1, PK 2v2, multi-guest
- Start time
- Duration
- Current viewers
- Guest/co-host count
- Gift activity summary
- Report count
- Live status
- Host verification / Live eligibility state

## Live detail
Include:
- host profile link
- participants/co-hosts/guests
- viewer metrics
- chat/moderation summary
- gifts and unique gifters
- reports/cases
- PK details where applicable
- start/end timestamps
- administrative actions/history

## Eligibility vs manual access
Keep these separate:
1. normal Live eligibility calculated by product rules;
2. admin manual Live Access override.

Display the rule/reason behind eligibility when the backend exposes it.

### Manual Live Access
Actions:
- Grant Live Access
- Revoke Live Access

Require:
- permission
- reason
- admin ID
- UTC timestamp
- previous/new state
- optional expiry
- audit event

Suggested permissions:
- users.live_access.grant
- users.live_access.revoke

Do not claim the legacy endpoint is confirmed until re-verified.

## Live moderation
Only expose actions supported by verified backend/Agora integration:
- inspect reports
- warning/strike where applicable
- remove guest where supported
- end Live
- suspend host/account through normal moderation workflow

Ending a Live is high-risk and requires permission, reason and audit event.

## PK and multi-host
Support visibility for:
- 1v1 PK
- 2v2 PK
- co-host
- up to product-supported guest count

Do not invent PK scoring or winner data when the backend does not expose it.

## Metrics
Where supported:
- live duration
- unique viewers
- peak/current concurrent viewers
- watch time
- chats/comments
- gifts
- unique gifters
- reports
- PK participation

## Backend verification required
Verify:
- active Live listing endpoint
- Agora identifiers/session mapping
- Live detail endpoint
- eligibility calculation
- manual override endpoint/schema
- end-Live/moderation endpoint
- gift/report linkage
- PK/2v2 fields
- audit endpoint

Never put Agora app certificates or other provider secrets in frontend code.

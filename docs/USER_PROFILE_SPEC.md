# User Profile & Administrative Actions — Functional Specification

## Purpose
The User Profile is the single operational view for a Frenzone account. It consolidates identity/status, moderation, Live eligibility/access, verification states, wallet/earnings, coin purchases, reports, activity and administrative history.

## Identity and account status
Display where backend data exists:
- User ID
- Username / display name
- Email / phone only to authorized roles
- Account creation date
- Account status
- Creator status
- Followers/following/posts
- Last activity
- Country/language/platform when legitimately collected
- Current app version where available

## Verification — keep states separate
Never collapse these into one ambiguous admin value:
1. **KYC / Didit status**
2. **Admin manual verification**
3. **Paid verification entitlement**

A manual admin verification must not claim that Didit approved the user.

Display:
- Didit/KYC status and last update
- Manual verification state
- Manual verification admin ID
- Manual verification reason
- Manual verification UTC timestamp
- Optional expiry
- Paid verification entitlement state and expiry/renewal when available
- Derived badge/display eligibility only according to verified backend rules

### Manual verification actions
- Verify Account Manually
- Remove Manual Verification

Mutations require:
- permission
- reason
- admin ID
- UTC timestamp
- previous state
- new state
- optional expiry
- audit event

Suggested permissions:
- users.verification.manual_grant
- users.verification.remove

## Live Access
Show normal Live eligibility separately from administrative override.

Display:
- Live eligible: yes/no
- Eligibility reason/rule
- Manual override state
- Granted/revoked by admin
- Reason
- UTC timestamp
- Optional expiry

Actions:
- Grant Live Access
- Revoke Live Access

Suggested permissions:
- users.live_access.grant
- users.live_access.revoke

Every mutation requires audit logging. Backend endpoint and schema must be verified before wiring.

## Moderation
Actions where supported:
- Warning
- Strike
- Suspend
- Ban
- Shadowban/hide only where the backend legitimately supports it

Require a reason for consequential actions. Show active sanctions and prior moderation history. Do not permanently delete evidence/history merely because account status changes.

## Wallet & Earnings
Read-only by default:
- Wallet balance
- Creator earnings
- Pending payout
- Lifetime earnings
- Available payout where backend supports it

Financial values must be clearly labelled by currency/unit and source. Do not present Figma/sample numbers as live values.

Any future manual balance adjustment must be a separately permissioned high-risk workflow with reason, audit event, previous/new balance and server-side validation.

## Coin Purchase Analytics
Purchases only; do not mix with coins earned, gifted, transferred or administratively adjusted.

Summary:
- Today
- This month
- This year

Drill-down:
- Purchase date/time
- Coin amount
- Gross price
- Currency
- Store/web source
- Transaction ID
- Payment status
- Refund/reversal status

## Transactions and payouts
Link to filtered transaction/payout views for this user/creator. Preserve transaction metadata required for reconciliation.

## Reports and activity
Expose:
- Reports against user
- Reports submitted by user where permitted
- Relevant moderation cases
- User activity log
- Admin audit history for this user

## Admin messaging
Support direct admin-to-user messaging only after the actual backend/push mechanism is verified. Log sender admin, recipient user, UTC time and campaign/message ID.

## Security
Sensitive data and actions must be role/permission gated. High-risk actions should use server-side authorization, not frontend-only checks.

## Backend verification checklist
Before marking operational, verify:
- user detail endpoint/schema
- moderation endpoints
- Live access endpoint/schema
- Didit webhook/status storage
- manual verification endpoint/schema
- RevenueCat paid-verification entitlement mapping
- wallet/earnings endpoints
- coin purchase history endpoint
- transaction/payout filtering
- audit logging endpoint

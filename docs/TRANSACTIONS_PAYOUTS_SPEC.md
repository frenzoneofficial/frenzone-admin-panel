# Transactions & Payouts — Functional Specification

## Purpose
Provide a reconciliation-grade view of monetization without changing accounting truth in the frontend.

## Transaction list
Where backend data exists, support:
- Transaction ID
- User username/email
- Creator username/email
- Type
- Gross amount
- Platform/store fee
- Creator amount
- Frenzone amount
- Currency
- Status
- Store
- Environment
- Renewal / family share flags
- Subscription period
- Entitlement ID
- Content ID/model
- Club ID
- Post ID
- Original transaction ID
- App User ID / Original App User ID
- Offer code
- Cancellation reason
- Expiration reason
- Purchased at
- Expiration date
- Grace-period expiration
- createdAt / updatedAt

Support filtering, search and CSV export, subject to permission.

## Canonical split validation
For creator monetization:
- Store = 30%
- Creator = 42%
- Frenzone = 28%

For verification:
- Store = 30%
- Creator = 0%
- Frenzone = 70%

The admin may display backend-calculated values and validation warnings, but must not silently rewrite ledger/accounting records.

## Reconciliation flags
Flag records where appropriate:
- percentages conflict with canonical rule
- shares do not reconcile to gross
- missing transaction/original transaction ID
- duplicate transaction
- missing creator on creator-monetized product
- Club/Post reference missing
- refund/reversal not reflected in earnings state
- production/sandbox environment mismatch
- currency missing/inconsistent

## Payouts / withdrawals
Display where supported:
- Payout ID
- User/creator
- Payout method
- Requested amount
- Fee
- Net amount
- Currency
- Status
- Requested/processed dates
- Failure/rejection reason
- Related earnings period/transactions
- Download/export where legitimate

States should distinguish requested, pending/review, approved, processing, paid, failed, rejected, cancelled and reversed where backend supports them.

## Safety
Payout management is high-risk:
- backend authorization required
- reason required for manual status changes
- admin ID + UTC timestamp
- previous/new state
- audit event
- no secrets/full payment credentials in UI/logs

## Refunds and chargebacks
Refunded/reversed purchases must remain historically visible and be distinguishable from successful revenue. Earnings/payout reconciliation should show the financial effect rather than deleting the original event.

## Backend verification required
Verify transaction schema/endpoints, payout/withdrawal endpoints, RevenueCat/store webhook data, refund handling, creator earnings calculation, currency handling and CSV/export behavior before marking operational.

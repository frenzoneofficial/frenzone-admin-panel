# Clubs — Admin Functional Specification

## Valid Club pricing
A creator Club must use exactly one monthly tier:
- $3.99
- $6.99
- $9.99

There is no free Club tier. A Club returned with zero/free pricing must be visibly flagged as a data/configuration anomaly for investigation; the admin frontend must not normalize it into a valid free plan.

## Active Clubs directory
Each row should expose:
- Club ID
- Club name
- Owner user ID
- Owner username/display name
- Monthly price
- Created date
- Active paid member count
- Subscription state summary
- Reports count
- Club status
- Last activity

## Club detail
Include:
- Unique Club ID
- Owner identity/profile link
- Price/tier
- Creation date
- Club status
- Paid members
- Member subscription state and renewal/expiration where backend permits
- Posts/content
- Live activity
- Reports/moderation cases
- Subscription performance
- Revenue transaction drill-down
- Owner/admin actions
- Audit history

## Deletion behavior
Deleted Clubs:
- disappear from the active directory;
- must not accept new subscriptions;
- may remain in audit/history and historical financial records;
- must retain historical Club ID references needed for transactions and investigations.

Do not delete historical transaction/audit references merely because a Club was deleted.

## Financial allocation
For qualifying store-billed Club subscription revenue:
- Store: 30%
- Creator: 42%
- Frenzone: 28%

Admin transaction views must preserve gross/store/creator/Frenzone values where backend data permits.

## Membership integrity
The admin must distinguish:
- active
- trial (only if product actually supports it)
- grace period
- expired
- cancelled but active until period end
- billing issue
- refunded/reversed

Do not infer a paid member solely from presence in a Club member array if subscription/payment status is available separately.

## Data anomaly checks
Flag for investigation:
- price not in 3.99 / 6.99 / 9.99
- price missing/null/zero
- owner missing
- duplicate Club ID
- active membership without subscription/payment state where one is required
- subscription references deleted/nonexistent Club unexpectedly
- conflicting currency/price metadata

## Admin permissions / audit
Suggested permissions:
- clubs.view
- clubs.members.view
- clubs.transactions.view
- clubs.moderate
- clubs.disable
- clubs.delete

Mutating actions require admin ID, reason, UTC timestamp, previous/new status and audit log.

## Backend verification required
Before calling this operational, verify:
- Club schema and price field(s)
- membership/subscription schema
- RevenueCat/store product mapping
- Club creation endpoint validation
- deletion/soft-delete behavior
- transaction-to-Club linkage
- webhook renewal/cancellation/refund handling
- API endpoints consumed by admin

# Frenzone Admin — Financial Rules

## Canonical revenue allocation

### Creator monetization
Applies to Club subscriptions, Live gifts, paid posts/content and other creator monetization unless a separately approved product rule exists.

| Share | Percent |
|---|---:|
| Apple / Google store | 30% |
| Creator | 42% |
| Frenzone | 28% |
| Total | 100% |

The percentages above are canonical. Legacy labels or calculations must not override them.

### Verification subscription
Verification is not creator revenue.

| Share | Percent |
|---|---:|
| Apple / Google store | 30% |
| Frenzone | 70% |
| Creator | 0% |
| Total | 100% |

## Calculation requirements
For any gross store transaction `G`:
- Store fee = `G * 0.30`
- Creator share = `G * 0.42`
- Frenzone share = `G * 0.28`

For verification:
- Store fee = `G * 0.30`
- Frenzone share = `G * 0.70`
- Creator share = `0`

Use integer minor currency units (for example cents) for monetary calculations. Do not calculate payouts using floating-point display values. Rounding/reconciliation policy must be explicit in backend code.

## Admin transaction detail
Where data exists, show:
- Gross amount
- Store fee and store
- Creator share
- Frenzone share
- Currency
- Transaction ID
- Original transaction ID
- User
- Creator
- Product/type
- Content/Post/Club ID where applicable
- Environment
- Purchase date
- Renewal/subscription period
- Status
- Refund/cancellation/expiration reason where applicable

## Payout rules
- A creator payout must be based on creator earnings, not gross transaction value.
- Pending, available, paid, failed and reversed amounts must remain distinguishable.
- Refunds/chargebacks must not silently leave earnings totals unchanged.
- Manual financial changes require permission, reason and audit log.
- Admin UI must never imply that a displayed estimate is a completed payout.

## Agency presentation
Some agency-facing product material may present Creator 65% / Agency 5%. That presentation must not change the canonical store transaction split in Frenzone accounting. Agency compensation is handled separately/from the creator side according to the approved agency model. Never change Frenzone's 28% backend share merely to match a marketing/display label.

## Validation
Any recovered legacy code using conflicting percentages must be flagged for review before being reused. Do not silently rewrite production backend calculations from the admin frontend.

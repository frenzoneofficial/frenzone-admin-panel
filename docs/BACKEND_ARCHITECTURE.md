# Frenzone Final Admin Backend

This branch is the safe foundation for the final Frenzone Admin Panel. It does not change production.

## Modules
- Admin authentication and RBAC
- Users, moderation, Live, clubs, verification
- Creator Program
- Agency Program and agency staff
- Creator–agency relationships
- Web coin purchases
- Agency coin transfers
- Wallets and immutable ledger
- Earnings and commissions
- Creator and agency payouts
- Security deposits
- Invoices
- Compliance, support and audit logs

## Fixed financial rules
### Creator monetization through app stores
- Store: 30%
- Creator-side pool: 42%
- Frenzone: 28%
- Any agency commission is deducted from the creator-side pool, never from Frenzone's 28%.

### Verification
- Store: 30%
- Frenzone: 70%
- No creator share.

### Web coin store
- Public buyer: 10% off equivalent in-app coin price, maximum 2,000,000 coins/day.
- Agency buyer: 20% off equivalent in-app coin price, maximum 20,000,000 coins/day.
- Agency customer resale discount: independently configurable from 11% to 18%.

## Safety requirements
Money and coin mutations must be atomic. Never edit a ledger entry after posting it. Corrections use reversal entries. All privileged admin actions require RBAC and an audit record containing admin ID, UTC timestamp, action, target and reason where applicable.

# Frenzone Admin Rebuild — Preview Branch

This branch is the isolated rebuild workspace for the new Frenzone administration panel.

## Safety boundary
- Do not deploy this branch to the live Frenzone admin.
- Do not merge to `main` until the rebuilt panel has been reviewed and explicitly approved.
- The recovered production bundle is reference material for API/behavior mapping, not the source architecture for the rebuild.

## Fixed financial rules
For creator monetization (live gifts, paid posts/content, and Club subscriptions):
- Store (Apple/Google): **30%**
- Creator: **42%**
- Frenzone: **28%**

Verification subscription is separate:
- Store (Apple/Google): **30%**
- Frenzone: **70%**
- Creator: **0%**

No page, report, calculation, export, payout display, or analytics component may silently substitute legacy percentages.

## Rebuild principles
1. Preserve useful working behavior from the recovered old admin.
2. Remove duplicate/obsolete screens and consolidate related functions.
3. Use the new Figma information architecture.
4. Separate KYC/Didit verification, admin manual verification, and paid verification entitlement.
5. Treat wallet, payouts, transactions, coin balances, verification, bans/suspensions, and Live Access as high-risk actions.
6. Require permissions and audit trails for administrative mutations.
7. Do not display a Club as free: valid Club tiers are $3.99, $6.99, or $9.99/month.
8. Financial data shown in the UI must come from backend/API values; design placeholders must never masquerade as live data.

## Old admin inventory recovered so far
- Dashboard
- User Management / detailed user view
- Broadcast
- Version Control
- Reviews
- Suspicious Posts / sensitive reels
- Company Profit
- Transactions
- Withdrawals / Payouts
- Reported Posts
- User Reports
- Verified Users
- Update Verified Users

The inventory will be mapped into the new design rather than copied page-for-page.

## New admin target
- Command Center
- Users + detailed User Profile
- Reports & Cases
- Live Control
- Notifications + campaign history
- Analytics
- User Activity Logs
- Admin Audit Logs
- KYC & Verification
- Transactions & Payouts
- Clubs
- Roles & Permissions
- Settings
- Law Enforcement Reports

Additional User Profile controls/analytics:
- Manual Live Access grant/revoke
- Manual verification grant/remove
- Wallet & creator earnings
- Pending payout and lifetime earnings
- Coin purchase analytics: today / month / year
- Purchase drill-down with transaction metadata

## Status
Reconstruction is in progress on `new-admin-preview`. Production remains untouched.

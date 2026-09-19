# Frontend QA Checklist

## Safety
- [x] Work isolated to `new-admin-preview`.
- [x] Production `main` not intentionally modified by rebuild work.
- [x] Live admin/Netlify not deployed or changed.
- [x] Backend-dependent actions remain disabled or unavailable.
- [x] Provider secrets are not stored in frontend source.

## Navigation
- [x] Command Center
- [x] Users
- [x] Reports & Cases
- [x] Live Control
- [x] Notifications
- [x] Analytics
- [x] User Activity
- [x] Admin Audit
- [x] KYC & Verification
- [x] Transactions & Payouts
- [x] Clubs
- [x] Roles & Permissions
- [x] Settings
- [x] Law Enforcement

## Business rules represented in UI
- [x] Creator monetization: Store 30%, Creator 42%, Frenzone 28%.
- [x] Verification: Store 30%, Frenzone 70%, Creator 0%.
- [x] Club tiers: $3.99 / $6.99 / $9.99 monthly.
- [x] No free Club tier.
- [x] Didit KYC, Admin Verified and Paid Verification remain separate.
- [x] Reports show Zoho Desk synchronization state.
- [x] Law-enforcement records are represented as restricted.

## Backend-dependent QA still required
- [ ] Authentication/session behavior.
- [ ] Real permissions enforced server-side.
- [ ] User list/profile payload mapping.
- [ ] IP/session/device/activity collection.
- [ ] Live grant/revoke endpoint and audit.
- [ ] Didit/manual/paid verification mapping.
- [ ] Club price/member/subscription mapping.
- [ ] Transaction/payout reconciliation.
- [ ] Report/moderation actions and Zoho Desk ticket synchronization.
- [ ] Push/email providers and campaign metrics.
- [ ] Analytics event definitions and calculations.
- [ ] Provider health/version/settings APIs.
- [ ] Law-enforcement access controls and disclosure audit.

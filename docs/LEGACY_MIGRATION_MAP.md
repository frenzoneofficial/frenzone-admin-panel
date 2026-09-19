# Legacy → New Admin Migration Map

This document tracks how recovered legacy capabilities are preserved, consolidated or replaced. A legacy screen is not considered safely removable until its backend behavior has been inventoried.

| Legacy route / area | New destination | Migration intent |
|---|---|---|
| Dashboard | Command Center | Rebuild with operational KPIs and drill-down |
| User Management | Users | Preserve search/list/actions; modernize |
| Detailed user views | User Profile | Consolidate identity, moderation, Live, verification, finance |
| Broadcast | Notifications | Expand to push/image/deep-link/email campaigns |
| Version Control | Settings | Preserve useful app-version controls |
| Reviews | Reports & Cases / Analytics as appropriate | Inventory exact legacy behavior first |
| Suspicious Posts | Reports & Cases | Consolidate as moderation queue/filter |
| Sensitive Reels | Reports & Cases | Consolidate as moderation queue/filter |
| Adult content | Reports & Cases | Consolidate with provider signal retained |
| Company Profit | Analytics / Transactions | Replace with reconciled financial reporting |
| Transactions | Transactions & Payouts | Preserve rich metadata and export |
| Withdrawals | Transactions & Payouts | Consolidate payout/withdrawal workflows |
| Payouts | Transactions & Payouts | Consolidate |
| Reported Posts | Reports & Cases | Consolidate |
| User Reports | Reports & Cases + User Profile | Preserve against/submitted-by relationships where permitted |
| Report detail | Case Detail | Consolidate |
| Verified Users | KYC & Verification | Split KYC/admin/paid verification states |
| Update Verified Users | KYC & Verification / User Profile | Replace ambiguous update flow with explicit admin override |
| Manage Orders | Determine after endpoint inventory | Do not drop until behavior is understood |
| Appointment Calendar | Determine after endpoint inventory | Do not drop until behavior is understood |
| Profile / Manage Profile | Admin account/settings or User Profile | Determine whether admin or user profile behavior |
| Detailed route | Appropriate nested detail route | Inventory route behavior |
| Law Enforcement/Police Reports | Law Enforcement Reports | Keep separately permissioned |

## Required parity checks
Before final migration sign-off:
- inventory every legacy route
- inventory every API endpoint used by each route
- inventory every mutation/action
- inventory CSV/download/export behavior
- inventory auth/role assumptions
- map fields required by finance/reporting
- identify dead/obsolete routes only with evidence
- document intentional changes

## Cleanup rules
- Consolidation is preferred over duplicate navigation.
- Do not copy minified/deployed UI architecture as the new source architecture.
- Preserve backend behavior that is still required.
- Do not preserve known-invalid business logic simply for parity.
- Conflicting financial percentages are flagged and replaced only according to verified backend/accounting migration.
- A legacy “free” Club representation must not create a free tier in the new admin.

## Current state labels
Use these labels during migration:
- CONFIRMED EXISTING
- PLANNED / DESIGNED
- NEEDS BACKEND VERIFICATION
- MISSING

A Figma element or specification alone is never “CONFIRMED EXISTING”.

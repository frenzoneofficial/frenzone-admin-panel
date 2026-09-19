# UI Implementation Plan — New Admin Preview

## Goal
Turn the approved Figma information architecture and functional specifications into a maintainable frontend on `new-admin-preview`, without modifying production.

## Proposed frontend structure
```
src/
  app/
    router
    navigation
    permissions
  components/
    layout
    data-table
    filters
    status
    dialogs
    forms
    charts
  features/
    dashboard
    users
    reports
    live
    notifications
    analytics
    activity
    audit
    kyc
    transactions
    clubs
    roles
    settings
    law-enforcement
  services/
    api
    auth
    users
    reports
    live
    notifications
    analytics
    kyc
    transactions
    clubs
    audit
  models/
  utils/
```

Exact framework/package choices should be confirmed from reconstructed source/deployment constraints before introducing a build system.

## Navigation target
- Command Center
- Users
- Reports & Cases
- Live Control
- Notifications
- Analytics
- User Activity Logs
- Admin Audit Logs
- KYC & Verification
- Transactions & Payouts
- Clubs
- Roles & Permissions
- Settings
- Law Enforcement Reports

Detailed user/profile, campaign history and case detail screens are nested routes rather than duplicate primary navigation items.

## Shared UI requirements
### Data tables
Reusable table behavior:
- loading state
- empty state
- error state
- pagination
- sorting where API supports it
- search/filter
- permission-gated export
- row detail navigation

### Status
Use explicit labels for states. Do not rely on color alone. Unknown/missing values render as “Unavailable” rather than zero/false.

### Confirmation dialogs
High-risk mutations display:
- action
- target
- consequence
- required reason
- optional expiry where applicable
- confirmation/cancel

The backend remains authoritative after submission; refresh from server response.

### Audit metadata
Mutation requests should be able to carry/associate:
- target ID
- reason
- admin identity from authenticated session
- UTC timestamp server-side
- optional expiry
- action type

Do not trust a client-supplied admin ID as authorization.

## Financial UI component
Create a reusable revenue allocation presentation for qualifying transactions:
- Gross
- Store 30%
- Creator 42%
- Frenzone 28%

Verification variant:
- Gross
- Store 30%
- Frenzone 70%
- Creator 0%

Values must come from backend transaction data/calculation contract. UI can flag mismatch but must not mutate ledger data.

## Club UI component
Valid monthly tier badges:
- $3.99
- $6.99
- $9.99

Any null/zero/other price receives a “Pricing anomaly” state, not “Free”.

## Verification UI component
Three independent indicators:
- Didit/KYC
- Admin Verified
- Paid Verification

Never collapse these into a single ambiguous source status.

## Notification composer
Tabs/modes:
- Push
- Email
- Both

Push supports optional official Frenzone-branded image and controlled deep-link selector. Club templates use the approved official Club icon asset.

## Implementation order
1. App shell/navigation and shared components
2. Users + User Profile
3. Reports & Cases
4. Live Control
5. KYC & Verification
6. Clubs
7. Transactions & Payouts
8. Notifications
9. Analytics
10. Logs
11. Roles & Permissions
12. Settings
13. Law Enforcement Reports

Backend-integrated modules should be enabled only after endpoint/schema verification.

## Definition of done per module
- matches intended Figma structure
- responsive at supported admin widths
- loading/empty/error states
- permissions applied
- backend contract documented
- mutations audited
- no frontend secrets
- no fabricated data
- relevant tests/checks pass
- legacy capability accounted for or intentionally consolidated

# Backend Integration Matrix

This matrix prevents the rebuilt admin from treating designed controls as operational before their backend contract is verified.

| Admin area | Required backend capability | Current rebuild status |
|---|---|---|
| Users | list/search/detail | Needs endpoint/schema verification |
| Moderation | warning/strike/suspend/ban | Needs endpoint inventory |
| Live Access | eligibility + admin grant/revoke | Needs endpoint/schema verification |
| Didit KYC | status/webhook-backed state | Needs backend trace |
| Manual verification | separate admin override | Needs endpoint/schema verification |
| Paid verification | RevenueCat entitlement | Needs entitlement mapping |
| Wallet | balances/earnings | Needs endpoint/schema verification |
| Coin purchases | purchase-only history | Needs endpoint/schema verification |
| Transactions | detailed transaction list/export | Legacy behavior exists; remap endpoint/schema |
| Payouts | withdrawal/payout list/actions | Legacy behavior exists; remap endpoint/schema |
| Clubs | directory/detail/members/subscriptions | Needs endpoint/schema verification |
| Reports | reported users/content/cases | Legacy behavior exists; inventory all endpoints |
| Notifications | standard push | Needs provider/API verification |
| Image push | media payload + mobile support | Needs APNs/FCM/mobile verification |
| Deep links | destination payload + Flutter routing | Needs route contract verification |
| Email | provider/templates/events | Provider not yet confirmed |
| Analytics | event/aggregation sources | Metric-by-metric verification required |
| Audit | immutable/admin action events | Needs endpoint/storage verification |
| Roles | backend permission enforcement | Needs auth middleware verification |

## Integration rules
1. Keep API calls in a centralized client/service layer rather than scattering raw URLs through page components.
2. Keep environment configuration outside source code where secrets are involved.
3. Never put AWS keys, provider secrets, RevenueCat secrets, Didit secrets, APNs keys or FCM private credentials in frontend code.
4. UI permissions are presentation controls; backend must enforce authorization.
5. Mutations should return a clear success/error result and refresh authoritative server state.
6. High-risk actions require reason/audit metadata.
7. Normalize API errors for the admin UI without exposing sensitive backend details.
8. Preserve production/sandbox environment identifiers for financial records.
9. Dates in audit/transaction detail should retain UTC source timestamps; display localization may be added separately.
10. Unknown/missing backend values should render as unavailable, not invented defaults.

## Verification workflow per feature
For each admin module:
1. identify legacy/new endpoint;
2. capture request method/path and auth requirements;
3. capture request body/query;
4. capture success/error response shape;
5. map fields into the new UI model;
6. identify mutation risk and permission;
7. add audit requirements;
8. test against non-production/safe data where possible;
9. only then mark the feature operational.

## Production boundary
The `new-admin-preview` branch is an isolated rebuild workspace. No production deployment or `main` merge is authorized by this document.

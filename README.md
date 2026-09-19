# Frenzone Admin Preview

This branch contains the source-based rebuild of the Frenzone administration frontend.

## Safety boundary
- Development branch: `new-admin-preview`
- Production `main`: untouched by this rebuild
- Live Netlify admin: untouched
- Backend writes: disabled until endpoints, authentication, permissions, audit behavior and payloads are verified

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Backend configuration
Copy `.env.example` to a local `.env` and set `VITE_FRENZONE_API_BASE` only after the backend integration is verified. Never place API secrets, Zoho credentials, Didit secrets, RevenueCat secrets or provider private keys in Vite environment variables.

## Implemented preview areas
Command Center, Users and User Profile, Sessions & Behaviour, Reports & Cases with Zoho Desk sync state, Live Control, Notifications and campaign history, Analytics, User Activity, Admin Audit, KYC & Verification, Transactions & Payouts, Clubs, Roles & Permissions, Settings/provider health, and restricted Law Enforcement reports.

All unverified backend values are deliberately shown as unavailable rather than fabricated.

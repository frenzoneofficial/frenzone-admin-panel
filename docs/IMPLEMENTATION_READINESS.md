# Implementation Readiness Checklist

This checklist marks what must be known before a designed module becomes an operational backend-connected module.

## Global
- [ ] Confirm admin auth/token contract
- [ ] Confirm API base URL/environment strategy
- [ ] Confirm server-side permission enforcement
- [ ] Confirm audit-event storage/API
- [ ] Confirm standard pagination/filter/error conventions
- [ ] Confirm timezone/date conventions
- [ ] Confirm PII access/retention rules
- [ ] Confirm no secrets are required in frontend

## Users
- [ ] list/search endpoint
- [ ] detail endpoint
- [ ] account status fields
- [ ] warning/strike/suspend/ban mutations
- [ ] export permissions

## Sessions / Behaviour
- [ ] signup IP capture
- [ ] trusted proxy/IP handling
- [ ] device metadata contract
- [ ] session start/heartbeat/end model
- [ ] behaviour-event pipeline
- [ ] approximate IP geolocation source
- [ ] retention policy

## Live
- [ ] active Live endpoint
- [ ] Live detail
- [ ] Agora/session mapping
- [ ] eligibility rule source
- [ ] manual grant/revoke endpoint
- [ ] end/intervention endpoint
- [ ] PK/2v2 fields

## KYC / Verification
- [ ] Didit webhook flow
- [ ] KYC database fields
- [ ] manual verification fields/mutation
- [ ] RevenueCat paid-verification entitlement
- [ ] badge derivation logic

## Clubs
- [ ] Club list/detail
- [ ] owner/member relationship
- [ ] paid subscription state
- [ ] pricing source
- [ ] deletion/history behavior
- [ ] moderation/report links

## Finance
- [ ] transaction endpoint/schema
- [ ] payout/withdrawal endpoint/schema
- [ ] wallet/earnings endpoint
- [ ] coin-purchase endpoint
- [ ] refund/chargeback fields
- [ ] 30/42/28 validation
- [ ] verification 30/70 validation
- [ ] export behavior

## Reports / Moderation
- [ ] reported-user endpoint
- [ ] post/video report endpoint
- [ ] Live reports
- [ ] Club reports
- [ ] Sightengine/provider signals
- [ ] evidence reference/storage
- [ ] moderation mutations
- [ ] case status/assignment

## Law Enforcement
- [ ] restricted case storage
- [ ] permission model
- [ ] legal-document reference handling
- [ ] disclosure log
- [ ] immutable access audit

## Notifications / Email
- [ ] push provider/backend endpoint
- [ ] image-push support
- [ ] Flutter deep-link routing
- [ ] email provider/backend endpoint
- [ ] all/country/specific-user/email targeting
- [ ] language variants
- [ ] unsubscribe/suppression handling
- [ ] campaign metrics/history

## Analytics
- [ ] event definitions
- [ ] DAU/WAU/MAU source
- [ ] D1/D7/D14/D30 cohort definitions
- [ ] Live metrics
- [ ] creator metrics
- [ ] Club metrics
- [ ] revenue metrics
- [ ] refunds/fraud signals

## Settings
- [ ] app-version endpoint
- [ ] force-update behavior
- [ ] feature flags
- [ ] provider health/status endpoints

## Roles
- [ ] role endpoint
- [ ] permission endpoint
- [ ] server-side enforcement
- [ ] change audit
- [ ] session invalidation after privilege change

## Status rule
A module may be labeled:
- **CONFIRMED EXISTING** only after the backend behavior is verified;
- **PLANNED / DESIGNED** when the UX/spec exists;
- **NEEDS BACKEND VERIFICATION** when implementation depends on an unverified contract;
- **MISSING** when neither backend capability nor implementation exists.

Never convert a design/specification into “implemented” status by assumption.

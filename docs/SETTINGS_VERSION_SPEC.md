# Settings & Version Control — Functional Specification

## Purpose
Consolidate operational settings and the useful parts of legacy Version Control while preventing secrets or dangerous infrastructure controls from being exposed in the frontend.

## App version management
Where backend support exists:
- iOS current/minimum supported version
- Android current/minimum supported version
- optional force-update flag
- update message
- App Store / Play Store destination
- maintenance notice

Changes require permission and audit history.

## Feature configuration
Only backend-approved, non-secret product flags should be exposed. Each flag should show:
- key/display name
- description
- environment
- current state
- last changed by
- last changed UTC

Avoid arbitrary free-form configuration when a typed control is possible.

## Product rules
Settings may display centrally managed product rules such as:
- valid Club tiers: $3.99 / $6.99 / $9.99
- creator monetization accounting reference: Store 30% / Creator 42% / Frenzone 28%
- verification accounting reference: Store 30% / Frenzone 70%

Financial percentages should be authoritative in backend/accounting configuration; the admin frontend should not become an unprotected source of truth.

## Maintenance / status
Where backend supports it:
- API status
- database connectivity summary
- push provider status
- email provider status
- Didit webhook/status
- RevenueCat webhook/status
- Agora service status

Status cards must report actual health data or “not connected/unavailable”; never infer health from the page loading successfully.

## Secrets
Never expose or store in frontend:
- AWS access keys/root credentials
- MongoDB credentials
- JWT signing secrets
- RevenueCat secret/API keys intended for backend
- Didit secret keys
- APNs private keys
- FCM service-account/private credentials
- Agora app certificate
- email-provider secret/API keys

The admin may show masked provider/configuration state only if returned safely by the backend.

## Permissions
Suggested:
- settings.view
- settings.manage
- version.view
- version.manage
- feature_flags.view
- feature_flags.manage

High-impact changes require confirmation, reason, admin ID, UTC timestamp, previous/new value and audit event.

## Backend verification required
Inventory legacy Version Control behavior and identify the actual settings/config endpoints before implementing mutations.

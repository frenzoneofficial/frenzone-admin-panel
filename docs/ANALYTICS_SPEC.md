# Analytics & Command Center — Functional Specification

## Principle
Analytics must clearly distinguish live backend data, calculated metrics, unavailable metrics and design placeholders. Never present sample/Figma numbers as production data.

## Command Center
Top-level operational summary should include where supported:
- Total users
- DAU / WAU / MAU
- New users
- Active creators
- Active Lives
- Open moderation cases
- Pending KYC cases
- Pending payouts
- Active Clubs / paid Club members
- Revenue summary
- System/provider warnings
- Recent high-risk admin actions

Cards should link to the filtered operational view rather than being decorative only.

## Retention
Required:
- D1
- D7
- D14
- D30
- cohort retention
- returning users
- inactive 14+ days
- reactivation

Retention must use a documented cohort/event definition. Do not compare percentages calculated from different definitions without labeling them.

## Engagement
Where event data exists:
- sessions/user
- time spent
- feed engagement
- CTR
- feature adoption
- funnels
- stickiness (DAU/MAU etc.)
- Moments completion
- search/discovery engagement
- bookmarks
- comments/shares/likes

## Creator analytics
- active creators
- creator retention
- posts/creator
- follower growth
- unique gifters
- paid-content conversion
- tips
- Club conversion/retention
- creator earnings

## Live analytics
- Lives started
- unique hosts/viewers
- live duration
- watch time
- concurrent viewers where available
- chat/session
- gifts/session
- unique gifters
- PK usage/results metrics where legitimately collected
- 1v1 / 2v2 adoption
- guest/co-host usage

## Monetization
- gross revenue
- store fees
- creator share
- Frenzone share
- ARPU
- LTV where methodology exists
- CAC only when acquisition-spend attribution exists
- paywall conversion
- tips
- Club subscriptions
- verification conversion
- refunds/chargebacks
- payout totals

Creator monetization validation remains Store 30% / Creator 42% / Frenzone 28%. Verification remains Store 30% / Frenzone 70%.

## Fraud / risk
Show only supported signals:
- refund rate
- chargeback rate
- unusual transaction flags
- suspicious gift/coin activity
- moderation/security alerts

Do not label a user fraudulent solely from a heuristic score.

## Filters
Support where data permits:
- date range
- platform
- app version
- country/region
- language
- creator/viewer
- acquisition source
- product/revenue type

## Export
Analytics exports must preserve metric definition, time range, timezone and currency context.

## Backend/data verification
For each metric document:
- source collection/API/event
- numerator/denominator
- timezone
- refresh interval
- historical availability
- currency handling if financial
- whether metric is exact, sampled or estimated

A metric with no verified source should display unavailable/not connected, not zero.

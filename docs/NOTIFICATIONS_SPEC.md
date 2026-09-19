# Notifications — Functional Specification

## Channels
The new admin notification center must support:
1. Standard push notification
2. Push notification with image
3. Push notification with controlled deep link
4. Email notification
5. Push + email campaign

## Frenzone branding
- Use the official Frenzone Live orange/black logo supplied by the owner.
- Club campaigns use the official black/gold Club icon supplied by the owner.
- Do not substitute generic crown/club artwork when official assets are available.

## Campaign composer
Required fields:
- Campaign name (internal)
- Channel: Push / Email / Both
- Title
- Message/body
- Optional image
- Audience
- Language
- Send now / schedule
- Optional deep-link destination
- Optional campaign expiry
- Test-send action before launch

## Controlled deep-link destinations
Admins should select a destination type instead of entering unrestricted URLs by default:
- Home / News Feed
- User profile
- Post
- Club
- Live room
- Moment
- Verification
- Subscription / paid content
- Agency
- App screen
- Controlled custom link (permission restricted)

Destination-specific IDs are required where applicable (user ID, post ID, Club ID, live ID, etc.).

## Push templates
- General announcement
- Creator posted
- Creator went live
- Club activity
- Club subscription / renewal reminder
- Paid content
- Verification reminder / result
- Offer / promotion
- App update / feature launch
- Re-engagement
- Account/security alert
- Creator milestone
- Event / scheduled Live
- Regional/language campaign
- Custom admin message

## Email templates
At minimum:
- Welcome
- Verification
- Club subscription
- Payment / receipt notification
- Payout status
- Security alert
- Re-engagement
- Product/news update
- Creator campaign
- Custom admin campaign

Email templates should have Frenzone header/logo, responsive body, CTA button when needed, footer, support/contact information, and unsubscribe/preferences where legally/applicably required.

## Audience targeting
Support, where backend data exists:
- All users
- Individual user(s)
- Followers of creator
- Club members
- Verified / unverified
- Creator / viewer
- Active / inactive cohort
- Country/region
- Language
- Platform (iOS/Android)
- App version
- Custom backend-defined segment

Never expose sensitive targeting attributes that the product does not legitimately collect or permit admins to use.

## Campaign history
Track:
- Campaign ID
- Admin ID
- Created UTC
- Scheduled/sent UTC
- Channel
- Audience/segment
- Template
- Deep-link destination
- Delivery state
- Sent
- Delivered
- Opened
- Clicked
- Failed
- Email bounce where supported
- Unsubscribe where supported
- Provider response/error summary

Metrics must be marked unavailable rather than fabricated when the provider/backend does not expose them.

## Permissions and audit
Suggested permissions:
- notifications.view
- notifications.create
- notifications.test
- notifications.send
- notifications.schedule
- notifications.cancel
- notifications.custom_link
- notifications.email

Every send/schedule/cancel must be audit logged with admin ID, UTC timestamp, campaign ID, target definition, and action.

## Backend verification required
Before wiring production APIs, verify:
- Current push provider and credentials/configuration
- iOS APNs configuration
- Android FCM configuration
- Image-push payload support on both platforms
- Flutter deep-link routing
- Email provider
- Delivery/open/click event availability
- User notification preferences / opt-outs

Do not claim a notification capability is operational until its backend and mobile routing have been tested.

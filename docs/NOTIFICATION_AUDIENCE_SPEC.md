# Notification Audience Selection — Addendum

## Country targeting
Campaign composer must support:
- All countries
- One country
- Multiple countries

Country targeting should use the user's account/profile country or a documented campaign-location field. Do not silently substitute current IP location unless that is the explicitly defined targeting source.

## Recipient modes
For email campaigns provide:
1. **All eligible users**
2. **Country/region segment**
3. **Specific Frenzone users**
4. **Specific registered email addresses**
5. **Imported email list**, only for recipients Frenzone is legally permitted to contact and with appropriate consent/preferences

Specific users can be selected by search using user ID, username or registered email, subject to admin permissions.

## Recipient preview
Before send, show:
- audience definition
- estimated/actual eligible recipient count
- excluded/unsubscribed count where available
- countries selected
- channel
- language
- template
- schedule
- test-send status

Do not expose the full email list to admins who only have campaign-send permission but lack permission to view user email addresses.

## Eligibility and suppression
Email sending must respect:
- valid registered email
- account/contact preferences
- unsubscribe/suppression state where applicable
- provider bounce/suppression state
- applicable transactional-vs-marketing classification

Transactional/security email rules should remain separate from promotional marketing campaigns.

## Language
Support:
- one selected language
- localized variants for the same campaign
- fallback language

Country and language are separate filters; do not assume every user in a country uses the same language.

## CSV/list import safety
If list import is implemented:
- validate email syntax
- de-duplicate
- show invalid count
- prevent accidental inclusion of suppressed recipients
- record source/import admin and UTC timestamp
- do not create Frenzone user accounts merely because an email appears in an imported list

## Audit
Record campaign ID, admin ID, UTC timestamp, targeting definition, selected countries, recipient mode, eligible recipient count, exclusions, template/channel and send result.

# Portal domain model

## Agency
id, legalName, displayName, region, status, securityDepositStatus, securityDepositAmountUsd, depositStartAt, depositEndAt, dailyCoinPurchaseCap, createdAt, updatedAt.

## AgencyStaff
id, agencyId, userId, role, permissions, status, createdAt, updatedAt.

## CreatorProgram
id, userId, status, agencyRelationshipId, payoutProfileId, joinedAt, suspendedAt, suspensionReason.

## CreatorAgencyRelationship
id, creatorUserId, agencyId, status, commissionRate, effectiveFrom, effectiveUntil, approvedBy, audit metadata.

Agency commission must be taken only from the 42% creator-side pool.

## WebCoinPurchase
id, buyerUserId, buyerType PUBLIC|AGENCY, agencyId nullable, coinAmount, referenceInAppPrice, discountRate, amountCharged, paymentProvider, paymentReference, status, walletCreditStatus, idempotencyKey, createdAt.

## AgencyCoinTransfer
id, agencyId, recipientUserId, coinAmount, resaleDiscountRate, status, idempotencyKey, riskStatus, createdAt.

## Wallet
id, ownerType, ownerId, currency/asset, availableBalance, pendingBalance, version.

## LedgerEntry
id, transactionId, walletId, direction DEBIT|CREDIT, amount, category, referenceType, referenceId, reversalOf nullable, createdAt.

Ledger entries are append-only.

## Payout
id, payeeType CREATOR|AGENCY, payeeId, amount, currency, status, providerReference, requestedAt, approvedAt, paidAt.

Creator and agency payouts are separate records.

## SecurityDeposit
id, agencyId, amountUsd, status, receivedAt, releaseEligibleAt, releasedAt, reference.

## AdminAudit
id, adminUserId, action, targetType, targetId, reason, previousState, newState, ip/device metadata if legitimately collected, createdAt UTC.

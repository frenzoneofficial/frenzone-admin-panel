"use strict";

const FINANCIAL_RULES = Object.freeze({
  appStore: Object.freeze({
    storeShare: 0.30,
    creatorSidePool: 0.42,
    frenzoneShare: 0.28,
  }),
  verification: Object.freeze({
    storeShare: 0.30,
    frenzoneShare: 0.70,
  }),
  webCoinStore: Object.freeze({
    publicDiscount: 0.10,
    publicDailyCoinCap: 2_000_000,
    agencyDiscount: 0.20,
    agencyDailyCoinCap: 20_000_000,
    agencyResaleDiscountMin: 0.11,
    agencyResaleDiscountMax: 0.18,
  }),
  agency: Object.freeze({
    securityDepositUsd: 5_000,
    securityDepositMonths: 6,
  }),
});

function validateFinancialRules() {
  const a = FINANCIAL_RULES.appStore;
  if (Math.abs(a.storeShare + a.creatorSidePool + a.frenzoneShare - 1) > 1e-9) {
    throw new Error("App-store shares must total 100%");
  }
  const v = FINANCIAL_RULES.verification;
  if (Math.abs(v.storeShare + v.frenzoneShare - 1) > 1e-9) {
    throw new Error("Verification shares must total 100%");
  }
}
validateFinancialRules();

module.exports = { FINANCIAL_RULES };

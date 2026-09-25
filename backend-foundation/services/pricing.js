"use strict";
const { FINANCIAL_RULES } = require("../config/financialRules");

function calculateWebCoinPrice({ buyerType, equivalentInAppPrice }) {
  if (!Number.isFinite(equivalentInAppPrice) || equivalentInAppPrice < 0) {
    throw new Error("Invalid equivalent in-app price");
  }
  const type = String(buyerType || "").toUpperCase();
  const discount = type === "AGENCY"
    ? FINANCIAL_RULES.webCoinStore.agencyDiscount
    : type === "PUBLIC"
      ? FINANCIAL_RULES.webCoinStore.publicDiscount
      : null;
  if (discount === null) throw new Error("buyerType must be PUBLIC or AGENCY");
  return {
    buyerType: type,
    equivalentInAppPrice,
    discountRate: discount,
    amountDue: Number((equivalentInAppPrice * (1 - discount)).toFixed(2)),
  };
}

function validateAgencyResaleDiscount(rate) {
  const { agencyResaleDiscountMin: min, agencyResaleDiscountMax: max } = FINANCIAL_RULES.webCoinStore;
  if (!Number.isFinite(rate) || rate < min || rate > max) {
    throw new Error("Agency resale discount must be between 11% and 18%");
  }
  return true;
}

module.exports = { calculateWebCoinPrice, validateAgencyResaleDiscount };

# Backend Foundation

This folder is a staging specification and starter module for the final Frenzone Admin backend. It is intentionally isolated from the recovered static admin build until the actual Frenzone Node.js backend repository is mapped.

Next integration step:
1. Locate the production backend repository and identify Express/router structure, MongoDB models and auth middleware.
2. Map these domain models to existing collections rather than creating duplicates.
3. Add authenticated admin APIs with RBAC.
4. Implement MongoDB transactions for wallet/coin/payment mutations.
5. Add idempotency and immutable audit/ledger records.
6. Add tests before connecting the new admin frontend.

Do not place production credentials or secrets in this repository.

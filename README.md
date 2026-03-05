<div align="center">

# Star Atlas Factory

**TypeScript transaction builder for Star Atlas on-chain programs on Solana**

[![npm](https://img.shields.io/npm/v/@staratlas/factory.svg?color=blue)](https://www.npmjs.com/package/@staratlas/factory)
[![Solana](https://img.shields.io/badge/Solana-14F195?logo=solana&logoColor=white)](https://solana.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

*Revived fork of [staratlasmeta/factory](https://github.com/staratlasmeta/factory) for the Solana Graveyard Hackathon*

</div>

---

## Overview

Star Atlas Factory provides a TypeScript interface for building and submitting transactions to Star Atlas Solana programs. It covers the marketplace, SCORE (Ship Commission on Resources and Economy), atlas staking, and faction systems.

> **Status: REVIVED** -- Dependencies updated, Anchor 0.29, Solana Web3.js 1.91+

## Features

- **Marketplace** -- list, buy, sell, and delist NFTs on the Star Atlas marketplace
- **SCORE** -- ship staking, resource harvesting, fleet management
- **Atlas Staking** -- stake ATLAS tokens for rewards
- **Factions** -- faction enrollment and management
- **Anchor Integration** -- built on Coral Anchor 0.29 for type-safe program interaction
- **TypeScript-first** -- full type definitions for all program accounts and instructions

## Installation

```bash
npm install @staratlas/factory
```

## Quick Start

```typescript
import { createBuyInstruction } from "@staratlas/factory";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");

// Build a marketplace buy instruction
const ix = await createBuyInstruction(
  connection,
  buyerPublicKey,
  itemMint,
  quantity,
  price
);
```

## Modules

| Module | Description |
|--------|-------------|
| `marketplace/` | Marketplace listing, buying, selling, and delisting |
| `score.ts` | SCORE ship staking and resource harvesting |
| `atlas-staking/` | ATLAS token staking for rewards |
| `factions.ts` | Faction enrollment and queries |
| `anchor/` | Anchor program IDL and type bindings |
| `util/` | Shared utilities for transaction building |

## Development

```bash
# Clone
git clone https://github.com/ExpertVagabond/star-atlas-factory.git
cd star-atlas-factory

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Generate docs
npm run docs
```

## Original Project

This is a maintained fork of [staratlasmeta/factory](https://github.com/staratlasmeta/factory) by ATMTA, Inc. The original project powered the Star Atlas game economy on Solana. This fork updates dependencies and ensures compatibility with current Solana tooling.

## License

[ISC](LICENSE)

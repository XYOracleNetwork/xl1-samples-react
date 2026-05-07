[![logo][]][logo-link]

# @xyo-network/xl1-samples-react

[![main-build][]][main-build-link]
[![license-badge][]][license-link]

> A working React dApp on the XL1 blockchain — small enough to read in one sitting, complete enough to fork.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Quick Start](#quick-start)
- [What This Sample Demonstrates](#what-this-sample-demonstrates)
- [Project Layout](#project-layout)
- [Requirements](#requirements)
- [Scripts](#scripts)
- [Maintainers](#maintainers)
- [License](#license)
- [Credits](#credits)

## Description

XL1 is the XYO Layer One blockchain — a proof-of-origin, proof-of-perfect chain built on the XYO Protocol. This repository is a runnable React 19 + MUI 7 sample that exercises the public surface of [`@xyo-network/xl1-react-client-sdk`][sdk-link] end-to-end.

It is intentionally minimal:

- **One page, one transaction** — guides the user through installing the wallet, starting a local producer, and submitting a payload to the chain
- **Tri-state wallet handling** — shows the loading / absent / present pattern that real dApps need to ship
- **Zero hidden plumbing** — every hook and provider used is in `src/`, easy to copy into your own app

If you're standing up a new XL1 dApp, fork this, swap `src/Sample.tsx` for your UI, and you have a working baseline.

## Getting Started

1. Install the dependencies: `npm install`
2. Start the sample website: `npm start`
    - Visit the URL it serves (default http://localhost:3000)
3. Start the local producer: `npm run start-cli`
    - Copy the seed phrase from the CLI output into the wallet extension
4. Follow the on-page checklist to install the wallet, connect, and submit a transaction

## Quick Start

The whole sample is one component. The interesting line is `useGatewayFromWallet` — it returns a tri-state value (loading / absent / ready) that drives the rest of the UI:

```tsx
// src/Sample.tsx
import { useGatewayFromWallet } from '@xyo-network/xl1-react-client-sdk'

import { buildSamplePayloads, LocalGatewayName } from './helpers/index.ts'

export const XL1BrowserSample = () => {
  const { gateway, error: gatewayError } = useGatewayFromWallet(LocalGatewayName)

  const submitTransaction = async () => {
    const { offChainPayloads, hashPayloads } = await buildSamplePayloads()
    const [txHash] = await gateway?.addPayloadsToChain?.(hashPayloads, offChainPayloads) ?? []
    // …surface txHash to the UI
  }

  // gateway === undefined → wallet detection in progress
  // gateway === null      → wallet not installed; show prompt
  // gateway === XyoGatewayRunner → ready to submit
  return /* …MUI stack with onboarding + submit button… */
}
```

The on-chain payload is built in [`src/helpers/buildSamplePayloads.ts`](src/helpers/buildSamplePayloads.ts) — two off-chain `Id` payloads paired with their hashes, written through the gateway's `addPayloadsToChain`.

## What This Sample Demonstrates

- **Wallet detection** via `useGatewayFromWallet` and the SDK's tri-state contract
- **Onboarding flow** that adapts to the user's environment (wallet missing, wallet present but producer unreachable, all-clear)
- **Transaction submission** using `PayloadBuilder` and the XL1 protocol's `HashPayload` / `Id` payload schemas
- **Error surfacing** through MUI `Alert`s, including gateway and submission errors
- **Vite dev server** configured for `top-level-await` and React 19

## Project Layout

```
src/
├─ Sample.tsx              # the single-page dApp
├─ root.tsx                # createRoot mount
├─ components/
│   ├─ Onboarding.tsx      # adaptive setup checklist
│   ├─ WelcomeStack.tsx    # header
│   ├─ alerts/             # WalletAlerts, RunProducerAlerts, TxConfirmedAlert
│   └─ buttons/            # SubmitTransactionButton
├─ helpers/
│   ├─ buildSamplePayloads.ts
│   └─ LocalGatewayName.ts
└─ hooks/
    └─ useOnBoarding.ts    # derives wallet + producer state for Onboarding
```

## Requirements

- **Node** — see [`scripts/check-node-version.mjs`](scripts/check-node-version.mjs) (pinned via Volta to `24.1.1`)
- **XL1 Wallet** browser extension — install separately and import the seed phrase produced by `npm run start-cli`
- **Local XL1 producer** — provided by `@xyo-network/xl1-cli`, run with `npm run start-cli`

The full dependency set is in [`package.json`](package.json). React, MUI, ethers, and the `@xyo-network/*` runtime packages are pulled in transitively through `@xyo-network/xl1-react-client-sdk`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Vite dev server with HMR |
| `npm run build` | Production build to `./build` (after Node version check) |
| `npm run serve` | Build, then serve `./build` locally |
| `npm run start-cli` | Run the XL1 producer CLI (warn-level logs) |
| `npm run lint` | ESLint over the project |
| `npm run updo` | Interactive dependency upgrade via `npm-check-updates` |

## Maintainers

<table>
  <tr>
    <td align="center" valign="top" width="120">
      <a href="https://github.com/arietrouw">
        <img src="https://github.com/arietrouw.png" width="80" height="80" alt="Arie Trouw" /><br />
        <sub><b>Arie Trouw</b></sub>
      </a>
      <br />
      <a href="https://arietrouw.com">arietrouw.com</a>
    </td>
    <td align="center" valign="top" width="120">
      <a href="https://github.com/jonesmac">
        <img src="https://github.com/jonesmac.png" width="80" height="80" alt="Matt Jones" /><br />
        <sub><b>Matt Jones</b></sub>
      </a>
    </td>
    <td align="center" valign="top" width="120">
      <a href="https://github.com/JoelBCarter">
        <img src="https://github.com/JoelBCarter.png" width="80" height="80" alt="Joel Carter" /><br />
        <sub><b>Joel Carter</b></sub>
      </a>
    </td>
    <td align="center" valign="top" width="120">
      <a href="https://github.com/jordantrouw">
        <img src="https://github.com/jordantrouw.png" width="80" height="80" alt="Jordan Trouw" /><br />
        <sub><b>Jordan Trouw</b></sub>
      </a>
    </td>
  </tr>
</table>

## License

See the [LICENSE](LICENSE) file for license rights and limitations (LGPL-3.0-only).

## Credits

[Made with 🔥 and ❄️ by XYO](https://xyo.network)

[logo]: https://cdn.xy.company/img/brand/XYO_full_colored.png
[logo-link]: https://xyo.network

[main-build]: https://github.com/XYOracleNetwork/xl1-samples-react/actions/workflows/build.yml/badge.svg
[main-build-link]: https://github.com/XYOracleNetwork/xl1-samples-react/actions/workflows/build.yml

[license-badge]: https://img.shields.io/github/license/XYOracleNetwork/xl1-samples-react.svg
[license-link]: ./LICENSE

[sdk-link]: https://www.npmjs.com/package/@xyo-network/xl1-react-client-sdk

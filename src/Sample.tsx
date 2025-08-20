import {
  Alert, Button, Container, Stack, Typography,
} from '@mui/material'
import { assertEx } from '@xylabs/assert'
import { type Hash, isHash } from '@xylabs/hex'
import { isDefined, isUndefined } from '@xylabs/typeof'
import type { Id } from '@xyo-network/id-payload-plugin'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { type HashPayload } from '@xyo-network/xl1-protocol'
import { useState } from 'react'

import {
  RunProducerAlerts, TxConfirmedAlert, WalletAlerts,
} from './components/index.ts'
import { useDefaultGateway, useOnBoarding } from './hooks/index.ts'
// eslint-disable-next-line import-x/no-internal-modules
import Xl13DLogo from './images/XL1_3D_Token_Mainnet.svg'

// Data to store off-chain
const offChainPayloads: Id[] = [0, 1].map(index => ({
  schema: 'network.xyo.id',
  salt: `Hello from Sample ${index} - ${new Date().toISOString()}`,
}))

export const XL1BrowserSample = () => {
  const [error, setError] = useState<Error>()
  const [confirmed, setConfirmed] = useState<Hash>()
  const { gateway, error: gatewayError } = useDefaultGateway()
  const {
    producerIsReachable, walletIsInstalled, walletIsNotInstalled, showSubmitTransaction,
  } = useOnBoarding()

  const submitTransaction = async () => {
    setError(undefined)
    try {
      const assertedGateway = assertEx(gateway, () => 'Gateway is not defined')
      // build a hash payload with the hash of the off-chain payload
      const hashPayloads: HashPayload[] = await Promise.all([0, 1].map(async index => ({
        schema: 'network.xyo.hash',
        hash: await PayloadBuilder.hash(offChainPayloads[index]),
      })))
      const [txHash] = await assertedGateway.addPayloadsToChain?.(hashPayloads, offChainPayloads) ?? []
      if (isHash(txHash)) {
        setConfirmed(txHash)
        setError(undefined)
      } else {
        throw new Error(`Invalid transaction hash: ${txHash}`)
      }
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <Container sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <Stack width={{ xs: '100%', sm: '600px' }} gap={2} p={2}>
        <Stack gap={1}>
          {gatewayError ? <Alert severity="error">{gatewayError.message}</Alert> : null}
          <Typography variant="h4" sx={{ display: 'inline-flex' }}>
            <img src={Xl13DLogo} height={38} width={38} style={{ marginRight: '10px' }} />
            XL1 Browser Sample
          </Typography>
          <Typography variant="subtitle1">This is a sample page for adding payloads to the XL1 chain for the browser environment.</Typography>
        </Stack>

        {/* Onboarding */}
        {producerIsReachable ? <RunProducerAlerts.Found /> : <RunProducerAlerts.NotFound />}
        {producerIsReachable && <RunProducerAlerts.CopyPhrase />}
        {walletIsNotInstalled === true && <WalletAlerts.NotInstalled />}
        {walletIsInstalled === true && <WalletAlerts.Installed />}
        {walletIsInstalled === true && <WalletAlerts.Setup />}
        {error ? <Alert severity="error">{error.message}</Alert> : null}

        {/* Transaction Submission */}
        {showSubmitTransaction === true && (
          <Stack alignItems="start">
            {/* {gatewayError ? <Alert severity="error">{gatewayError.message}</Alert> : null} */}
            <Button variant="contained" onClick={() => void submitTransaction()} disabled={isUndefined(gateway)}>Submit Transaction</Button>
          </Stack>
        )}
        {isDefined(confirmed) && <TxConfirmedAlert hash={confirmed} />}
      </Stack>

    </Container>
  )
}

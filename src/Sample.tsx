import {
  Alert, Container, Stack,
} from '@mui/material'
import { assertEx } from '@xylabs/assert'
import type { Hash } from '@xylabs/hex'
import { isHash } from '@xylabs/hex'
import { isUndefined } from '@xylabs/typeof'
import { useState } from 'react'

import {
  Onboarding, SubmitTransactionButton, TxConfirmedAlert, WelcomeStack,
} from './components/index.ts'
import { buildSamplePayloads } from './helpers/index.ts'
import { useDefaultGateway } from './hooks/index.ts'

export const XL1BrowserSample = () => {
  const [error, setError] = useState<Error>()
  const [confirmed, setConfirmed] = useState<Hash>()
  const { gateway, error: gatewayError } = useDefaultGateway()

  const submitTransaction = async () => {
    setError(undefined)
    try {
      const assertedGateway = assertEx(gateway, () => 'Gateway is not defined')
      const { offChainPayloads, hashPayloads } = await buildSamplePayloads()
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
        {gatewayError ? <Alert severity="error">{gatewayError.message}</Alert> : null}
        {error ? <Alert severity="error">{error.message}</Alert> : null}
        <WelcomeStack />
        <Onboarding />
        <SubmitTransactionButton onClick={() => void submitTransaction()} disabled={isUndefined(gateway)}>Submit Transaction</SubmitTransactionButton>
        <TxConfirmedAlert hash={confirmed} />
      </Stack>

    </Container>
  )
}

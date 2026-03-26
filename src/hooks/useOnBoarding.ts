import {
  isDefined, isDefinedNotNull, isUndefined,
} from '@xylabs/typeof'
import { useGatewayFromWallet } from '@xyo-network/react-chain-client'
import { useEffect, useState } from 'react'

import { LocalGatewayName } from '../helpers/index.ts'

export const useOnBoarding = () => {
  const { gateway } = useGatewayFromWallet(LocalGatewayName)
  const [isLocalProducer, setIsLocalProducer] = useState(false)

  useEffect(() => {
    void (async () => {
      const viewer = gateway?.connection.viewer
      if (isDefinedNotNull(viewer)) {
        const currentBlock = await viewer?.currentBlockNumber()
        setIsLocalProducer(isDefined(currentBlock))
      }
    })()
  }, [gateway])

  const producerIsReachable = isLocalProducer
  const walletIsInstalled = producerIsReachable && isDefined(gateway)
  const walletIsNotInstalled = producerIsReachable ? isUndefined(gateway) : undefined
  const showSubmitTransaction = producerIsReachable && walletIsInstalled

  return {
    producerIsReachable,
    walletIsInstalled,
    walletIsNotInstalled,
    showSubmitTransaction,
  }
}

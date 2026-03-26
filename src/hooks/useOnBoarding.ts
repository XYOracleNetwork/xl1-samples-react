import { delay } from '@xylabs/delay'
import {
  isDefined, isDefinedNotNull, isUndefined,
} from '@xylabs/typeof'
import { useGatewayFromWallet } from '@xyo-network/react-chain-client'
import { useEffect, useState } from 'react'

import { LocalGatewayName } from '../helpers/index.ts'

const INTERVAL = 2000 // 2 seconds

export const useOnBoarding = () => {
  const { gateway } = useGatewayFromWallet(LocalGatewayName, 5000)
  const viewer = gateway?.connection.viewer
  const [isLocalProducer, setIsLocalProducer] = useState(false)

  useEffect(() => {
    if (isUndefined(viewer)) return

    void (async () => {
      while (!isLocalProducer) {
        try {
          const block = await viewer.currentBlock()
          setIsLocalProducer(isDefined(block))
        } catch (err) {
          console.error('Error checking if producer is local:', err)
          setIsLocalProducer(false)
        }
        await delay(INTERVAL)
      }
    })()
  }, [isLocalProducer, viewer])

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

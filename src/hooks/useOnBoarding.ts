import { isDefined, isUndefined } from '@xylabs/typeof'
import { useCheckLocalRpc } from '@xyo-network/react-chain-provider'

import { useDefaultGateway } from './useDefaultGateway.ts'

export const useOnBoarding = () => {
  const { gateway } = useDefaultGateway()
  const { isLocalProducer } = useCheckLocalRpc()

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

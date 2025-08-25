import { isDefined, isUndefined } from '@xylabs/typeof'
import { useCheckLocalRpc, useGateway } from '@xyo-network/react-chain-provider'

import { LocalGatewayName } from '../helpers/index.ts'

export const useOnBoarding = () => {
  const { gateway } = useGateway(LocalGatewayName)
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

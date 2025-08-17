import { useCheckLocalRpc } from '@xyo-network/react-chain-provider'

import { useCheckWalletInstalled } from './useCheckWalletInstalled.ts'

export const useOnBoarding = () => {
  const walletInstalled = useCheckWalletInstalled()
  const { isLocalProducer } = useCheckLocalRpc()

  const producerIsReachable = isLocalProducer
  const walletIsInstalled = producerIsReachable && walletInstalled
  const walletIsNotInstalled = producerIsReachable ? !walletInstalled : undefined
  const showSubmitTransaction = producerIsReachable && walletIsInstalled

  return {
    producerIsReachable,
    walletIsInstalled,
    walletIsNotInstalled,
    showSubmitTransaction,
  }
}

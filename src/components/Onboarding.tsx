import React from 'react'
import { useOnBoarding } from '../hooks/index.ts'
import { WalletAlerts } from './alerts/index.ts'
import { RunProducerAlerts } from './alerts/index.ts'

export const Onboarding: React.FC = () => {
  const {
    producerIsReachable,
    walletIsInstalled,
    walletIsNotInstalled,
  } = useOnBoarding()

  return <>
    {producerIsReachable ? <RunProducerAlerts.Found /> : <RunProducerAlerts.NotFound />}
    {producerIsReachable && <RunProducerAlerts.CopyPhrase />}
    {walletIsNotInstalled === true && <WalletAlerts.NotInstalled />}
    {walletIsInstalled === true && <WalletAlerts.Installed />}
    {walletIsInstalled === true && <WalletAlerts.Setup />}
  </>
}
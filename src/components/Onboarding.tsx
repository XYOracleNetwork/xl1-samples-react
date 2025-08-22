import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'
import React from 'react'

import { useOnBoarding } from '../hooks/index.ts'
import { RunProducerAlerts, WalletAlerts } from './alerts/index.ts'

export const Onboarding: React.FC = () => {
  const {
    producerIsReachable,
    walletIsInstalled,
    walletIsNotInstalled,
  } = useOnBoarding()

  return (
    <>
      <SectionHeadingTypography active={!producerIsReachable}>Start Producer and Copy Seed Phrase</SectionHeadingTypography>
      {producerIsReachable ? <RunProducerAlerts.Found /> : <RunProducerAlerts.NotFound />}
      {producerIsReachable && <RunProducerAlerts.CopyPhrase />}
      <SectionHeadingTypography active={walletIsNotInstalled}>Install and Setup Wallet</SectionHeadingTypography>
      {walletIsNotInstalled === true && <WalletAlerts.NotInstalled />}
      {walletIsInstalled === true && <WalletAlerts.Installed />}
      {walletIsInstalled === true && <WalletAlerts.Setup />}
    </>
  )
}

export const SectionHeadingTypography: React.FC<TypographyProps & { active?: boolean }> = ({ active, ...props }) => {
  return (
    <Typography variant="subtitle1" sx={{ opacity: active ? 1 : 0.33 }} {...props} />
  )
}

import { useEffect, useState } from 'react'

import { hasXyoWalletInjectable } from '../hasXyoWalletInjectable.ts'

export const useCheckWalletInstalled = () => {
  const [walletInstalled, setWalletInstalled] = useState(false)

  useEffect(() => {
    // check on initial load
    setWalletInstalled(hasXyoWalletInjectable())
    // check every second if the wallet is installed
    const interval = setInterval(() => {
      setWalletInstalled(hasXyoWalletInjectable())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return walletInstalled
}

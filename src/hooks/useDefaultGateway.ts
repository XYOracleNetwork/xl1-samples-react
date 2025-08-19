import type { XyoGatewayProvider } from '@xyo-network/xl1-protocol'
import { useEffect, useState } from 'react'

import { getXyoGateway } from '../getXyoGateway.ts'
import { usePromise } from '@xylabs/react-promise'

export const useDefaultGateway = () => {
  const [gateway, setGateway] = useState<XyoGatewayProvider>()
  const [error, setError] = useState<Error | null>(null)

  usePromise(async () => {
    try {
      const xyoGateway = await getXyoGateway({ assert: true })
      setGateway(xyoGateway)
    } catch {
      setError(new Error('XYO Gateway not available'))
    }
  }, [])

  return { gateway, error }
}

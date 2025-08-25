import type { GatewayName } from '@xyo-network/xl1-protocol'

import { useClient } from './useClient.ts'

export const useGateway = (gatewayName?: GatewayName) => {
  const {
    client, isLoading, error,
  } = useClient()
  return {
    gateway: gatewayName ? client?.gateways?.[gatewayName] : undefined,
    isLoading,
    error,
  }
}

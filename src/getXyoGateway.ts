import type { GatewayName, XyoGatewayProvider } from '@xyo-network/xl1-protocol'

const localGatewayName = 'local' as GatewayName

export const hasXyoWalletGateway = () => {
  return 'client' in globalThis.xyo
}

export function getXyoGateway(options: { assert: true }): XyoGatewayProvider
export function getXyoGateway(options?: { assert?: boolean }): XyoGatewayProvider | undefined {
  const { assert } = options ?? {}
  if (hasXyoWalletGateway()) {
    return globalThis.xyo.client?.gateways?.[localGatewayName]
  } else {
    console.error('XYO Wallet not installed')
    if (assert) {
      throw new Error('XYO Wallet not installed')
    } else {
      return undefined
    }
  }
}

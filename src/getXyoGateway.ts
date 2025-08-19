import type { GatewayName, XyoGatewayProvider } from '@xyo-network/xl1-protocol'

const localGatewayName = 'local' as GatewayName

const GATEWAY_LISTENER_TIMEOUT = 5000

export const hasXyoWalletGateway = () => {
  return 'client' in globalThis.xyo
}

export const listenForWalletInjection = (onPluginReady: () => void, onTimeout: () => void) => {
  let resolved = false
  const listener: EventListener = (e) => {
    onPluginReady()
    resolved = true
  }
  globalThis.addEventListener('xyo:plugin-ready', listener)
  setTimeout(() => {
    if (!resolved) {
      onTimeout()
    }
  }, GATEWAY_LISTENER_TIMEOUT)
}

export async function getXyoGateway(options: { assert: true }): Promise<XyoGatewayProvider>
export async function getXyoGateway(options?: { assert?: boolean }): Promise<XyoGatewayProvider | undefined> {
  const { assert } = options ?? {}
  if (hasXyoWalletGateway()) {
    return globalThis.xyo.client?.gateways?.[localGatewayName]
  } else {
    // listen for the XyoWallet to be injected
    return await new Promise<XyoGatewayProvider | undefined>((resolve, reject) => {
      listenForWalletInjection(
        () => {
          resolve(globalThis.xyo.client?.gateways?.[localGatewayName])
        },
        () => {
          reject(new Error('XYO Wallet not installed'))
        }
      )
    })
  }
}

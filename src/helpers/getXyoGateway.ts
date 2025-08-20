import type { GatewayName, XyoGatewayProvider } from '@xyo-network/xl1-protocol'

const localGatewayName = 'local' as GatewayName

const GATEWAY_LISTENER_TIMEOUT = 5000

const hasXyoWalletGateway = () => {
  return 'client' in globalThis.xyo
}

export const listenForWalletInjection = (onPluginReady: () => void, onTimeout: () => void) => {
  let resolved = false
  const listener: EventListener = () => {
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

export async function getXyoGateway(): Promise<XyoGatewayProvider | undefined> {
  return hasXyoWalletGateway()
    ? globalThis.xyo.client?.gateways?.[localGatewayName]
    // listen for the XyoWallet to be injected
    : await new Promise<XyoGatewayProvider | undefined>((resolve, reject) => {
        listenForWalletInjection(
          () => {
            resolve(globalThis.xyo.client?.gateways?.[localGatewayName])
          },
          () => {
            reject(new Error('XYO Wallet not installed'))
          },
        )
      })
}

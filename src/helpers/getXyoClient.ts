import type { XyoClient } from '@xyo-network/xl1-protocol'

const CLIENT_LISTENER_TIMEOUT = 5000

const hasXyoClient = () => {
  return 'client' in globalThis.xyo
}

export const listenForClientInjection = (onClientReady: () => void, onTimeout: () => void) => {
  let resolved = false
  const listener: EventListener = () => {
    onClientReady()
    resolved = true
  }
  globalThis.addEventListener('xyo:plugin-ready', listener)
  setTimeout(() => {
    if (!resolved) {
      onTimeout()
    }
  }, CLIENT_LISTENER_TIMEOUT)
}

export async function getXyoClient(): Promise<XyoClient | undefined> {
  return hasXyoClient()
    ? globalThis.xyo.client
    // listen for the XyoWallet to be injected
    : await new Promise<XyoClient | undefined>((resolve, reject) => {
        listenForClientInjection(
          () => {
            resolve(globalThis.xyo.client)
          },
          () => {
            reject(new Error('XYO Client not installed'))
          },
        )
      })
}

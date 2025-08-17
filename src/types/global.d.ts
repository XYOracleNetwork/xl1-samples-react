import type { XyoGlobal } from '@xyo-network/react-chain-model'

export declare global {
  interface Window {
    xyo: XyoGlobal
  }

  var xyo: XyoGlobal
}

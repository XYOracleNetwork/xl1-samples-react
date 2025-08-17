export const hasXyoWalletInjectable = () => {
  return 'xyo' in globalThis && 'walletExtensionId' in globalThis.xyo
}

import type { XyTsupConfig } from '@xylabs/toolchain'
const config: XyTsupConfig = {
  commands: {
    deplint: {
      exclude: ['@emotion/styled']
    }
  }
}

export default config

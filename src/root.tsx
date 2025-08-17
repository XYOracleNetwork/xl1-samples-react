import { assertEx } from '@xylabs/assert'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { createRoot } from 'react-dom/client'

import { XL1BrowserSample } from './Sample.tsx'

const root = createRoot(assertEx(document.querySelector('#root')))

root.render(<XL1BrowserSample />)

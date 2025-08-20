import type { StackProps } from '@mui/material'
import { Stack, Typography } from '@mui/material'

// eslint-disable-next-line import-x/no-internal-modules
import Xl13DLogo from '../images/XL1_3D_Token_Mainnet.svg'

export const WelcomeStack: React.FC<StackProps> = (props) => {
  return (
    <Stack gap={1} {...props}>
      <Typography variant="h4" sx={{ display: 'inline-flex' }}>
        <img src={Xl13DLogo} height={38} width={38} style={{ marginRight: '10px' }} />
        XL1 Browser Sample
      </Typography>
      <Typography variant="subtitle1">This is a sample page for adding payloads to the XL1 chain for the browser environment.</Typography>
    </Stack>
  )
}

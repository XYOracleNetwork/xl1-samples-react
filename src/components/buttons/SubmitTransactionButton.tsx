import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import { isUndefined } from '@xylabs/typeof'
import { useGatewayFromWallet } from '@xyo-network/react-chain-client'

import { LocalGatewayName } from '../../helpers/index.ts'
import { useOnBoarding } from '../../hooks/index.ts'

export const SubmitTransactionButton: React.FC<ButtonProps> = (props) => {
  const { gateway } = useGatewayFromWallet(LocalGatewayName)
  const { showSubmitTransaction } = useOnBoarding()

  return showSubmitTransaction
    ? <Button variant="contained" disabled={isUndefined(gateway)} sx={{ alignSelf: 'start' }} {...props}>Submit Transaction</Button>
    : null
}

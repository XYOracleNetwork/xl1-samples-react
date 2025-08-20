import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import { isUndefined } from '@xylabs/typeof'

import { useDefaultGateway, useOnBoarding } from '../../hooks/index.ts'

export const SubmitTransactionButton: React.FC<ButtonProps> = (props) => {
  const { gateway } = useDefaultGateway()
  const { showSubmitTransaction } = useOnBoarding()

  return showSubmitTransaction
    ? <Button variant="contained" disabled={isUndefined(gateway)} sx={{ alignSelf: 'start' }} {...props}>Submit Transaction</Button>
    : null
}

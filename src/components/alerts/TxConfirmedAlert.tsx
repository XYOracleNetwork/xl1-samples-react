import {
  Alert, type AlertProps, AlertTitle, Link,
} from '@mui/material'
import type { Hash } from '@xylabs/hex'

export interface TxConfirmedAlertProps extends AlertProps {
  hash?: Hash
}

export const TxConfirmedAlert: React.FC<TxConfirmedAlertProps> = ({ hash, ...props }) => {
  return (
    <Alert severity="success" {...props}>
      <AlertTitle>Transaction successfully confirmed!</AlertTitle>
      See your local
      {' '}
      <Link href={`https://explore.xyo.network/xl1/local/transaction/${hash}`} target="_blank">transaction</Link>
      {' '}
      through our Blockchain Explorer.
      {' '}
    </Alert>
  )
}

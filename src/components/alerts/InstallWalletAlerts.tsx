import type { AlertProps } from '@mui/material'
import {
  Alert, AlertTitle, Button, Link, List, ListItem,
} from '@mui/material'

const InstallWalletAlert: React.FC<AlertProps> = (props) => {
  return (
    <Alert severity="error" {...props}>
      <AlertTitle>Missing XYO Layer One Wallet</AlertTitle>
      Grab the
      {' '}
      <Link href="https://chromewebstore.google.com/detail/xl1-wallet/fblbagcjeigmhakkfgjpdlcapcgmcfbm" target="_blank">wallet</Link>
      {' '}
      from the chrome web store to use this site.
      <Button variant="contained" onClick={() => globalThis.location.reload()}>Refresh</Button>
    </Alert>
  )
}

const WalletInstalledAlert: React.FC<AlertProps> = (props) => {
  return (
    <Alert severity="success" {...props}>
      <AlertTitle>XYO Layer One Wallet Detected</AlertTitle>
    </Alert>
  )
}

const WalletSetupAlert: React.FC<AlertProps> = (props) => {
  return (
    <Alert severity="info" {...props}>
      <AlertTitle>Wallet Setup Required</AlertTitle>
      Once the wallet is installed:
      <List>
        <ListItem>
          • Open the XYO Layer One Wallet extension in your browser toolbar.
        </ListItem>
        <ListItem>
          • Setup a password.
        </ListItem>
        <ListItem>
          • Select 'Import Existing Wallet'.
        </ListItem>
        <ListItem>
          • Paste the seed phrase from the local producer CLI output.
        </ListItem>
        <ListItem>
          • Change the network switcher in the upper left-hand corner to 'Local'.
        </ListItem>
      </List>
    </Alert>
  )
}

export const WalletAlerts = {
  NotInstalled: InstallWalletAlert,
  Installed: WalletInstalledAlert,
  Setup: WalletSetupAlert,
}

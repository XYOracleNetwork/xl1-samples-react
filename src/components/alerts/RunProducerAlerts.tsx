import type { AlertProps } from '@mui/material'
import {
  Alert, AlertTitle, Button, Grow, Stack, Typography,
} from '@mui/material'
// eslint-disable-next-line import-x/no-internal-modules
import { grey } from '@mui/material/colors'
import { useState } from 'react'

import type { CollapsableAlertProps } from './CollapsibleAlert.tsx'
import { CollapsibleAlert } from './CollapsibleAlert.tsx'

const START_COMMAND = 'npm run start-cli'

const StartProducerAlert: React.FC<AlertProps> = (props) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(START_COMMAND)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy command to clipboard:', err)
    }
  }
  return (
    <Alert severity="warning" {...props}>
      <AlertTitle>Local Producer is not reachable.</AlertTitle>
      <Typography variant="body2">
        In a new terminal window, start the local producer by running the following command in the root of the project.
      </Typography>
      <Typography
        variant="body2"
        fontFamily="monospace"
        mt={1}
        px={2}
        py={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: grey[100],
          color: grey[900],
          border: `1px solid ${grey[500]}`,
          borderTopWidth: 3,
        }}
      >
        <code>{START_COMMAND}</code>
        <Stack component="span" direction="row" spacing={1} alignItems="center">
          <Grow in={copied}>
            <Typography fontWeight="bold" variant="caption" color="textSecondary">
              Copied!
            </Typography>
          </Grow>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => void handleCopy()}
          >
            Copy
          </Button>
        </Stack>
      </Typography>
    </Alert>
  )
}

const ProducerFoundAlert: React.FC<CollapsableAlertProps> = (props) => {
  return (
    <CollapsibleAlert severity="success" alertTitle="Connected to Local Blockchain" {...props}>
      You can now submit transactions to your local XYO Layer One blockchain.
    </CollapsibleAlert>
  )
}

const CopyProducerPhraseAlert: React.FC<CollapsableAlertProps> = (props) => {
  return (
    <CollapsibleAlert alertTitle="Copy the Producer Phrase" severity="info" {...props}>
      Check the CLI output for the producer seed phrase. You will need this to see balances and submit transactions in your wallet.
    </CollapsibleAlert>
  )
}

export const RunProducerAlerts = {
  NotFound: StartProducerAlert,
  Found: ProducerFoundAlert,
  CopyPhrase: CopyProducerPhraseAlert,
}

import type { AlertProps } from '@mui/material'
import {
  Alert, AlertTitle, Button, Collapse,
  Stack,
} from '@mui/material'
import { isDefined } from '@xylabs/typeof'
import React, { useState } from 'react'

export interface CollapsableAlertProps extends AlertProps {
  alertTitle?: string
}

export const CollapsibleAlert: React.FC<CollapsableAlertProps> = ({
  alertTitle, sx, ...props
}) => {
  const [open, setOpen] = useState(true)

  return (
    <Alert sx={{ '& .MuiAlert-message': { width: '100%' }, ...sx }} {...props}>
      {isDefined(alertTitle) ? <AlertTitle>{alertTitle}</AlertTitle> : null}
      <Collapse in={open} unmountOnExit sx={{ width: '100%' }}>
        {props.children}
      </Collapse>
      {open
        ? (
            <Stack width="100%" flexDirection="row" justifyContent="flex-end" mt={2}>
              <Button variant="outlined" size="small" onClick={() => setOpen(false)}>Done!</Button>
            </Stack>
          )
        : null}
    </Alert>
  )
}

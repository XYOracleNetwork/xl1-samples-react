import { Button, ButtonProps } from "@mui/material";
import { useDefaultGateway, useOnBoarding } from "../../hooks/index.ts";
import { isUndefined } from "@xylabs/typeof";

export const SubmitTransactionButton: React.FC<ButtonProps> = (props) => {
  const { gateway } = useDefaultGateway()
  const { showSubmitTransaction } = useOnBoarding()

  return showSubmitTransaction ? <Button variant="contained" disabled={isUndefined(gateway)} sx={{ alignSelf: 'start' }} {...props}>Submit Transaction</Button> : null
}
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export default function SendButton(props) {
  const classes = useStyles();

  return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={props.handleSend}
      >
        Send
      </Button>
  );
}

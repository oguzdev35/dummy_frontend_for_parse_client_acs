import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { updateDoorAPI } from '../../utility';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function StateTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleSubmit = ev => {
      ev.preventDefault();
      if(id === ''){
        setAlert(true)
        setAlertMessage("Door ID required!")
        setTimeout(() => {
          setAlert(false)
        }, 2 * 1000)
      }else {
        updateDoorAPI(name, id);
        setName('');
        setId('');
      }

  }

  return (
    <div>
      <div className={classes.alert}>
        {alert && <Alert 
          severity="error"
          >{alertMessage}</Alert>}
      </div>
      <form className={classes.root} noValidate autoComplete="off">
          <div>
              <TextField
              id="id"
              label="Door ID"
              value={id}
              onChange={ev => setId(ev.target.value)}
              variant="outlined"
              style={{width: '40vw'}}
              required
              helperText="Required"
              />
          </div>
          <div>
              <TextField
              id="name"
              label="Door Name"
              value={name}
              onChange={ev => setName(ev.target.value)}
              variant="outlined"
              style={{width: '40vw'}}
              />
          </div>
          <div>
              <Button 
                  variant="outlined"
                  style={{width: '40vw', marginLeft: '0.5vw'}}
                  onClick={handleSubmit}
              >Update Door</Button>
          </div>
      </form>
    </div>
  );
}
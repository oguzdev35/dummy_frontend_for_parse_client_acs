import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { updateDoorAPI } from '../../utility';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function StateTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');

  const handleSubmit = ev => {
      ev.preventDefault();
      updateDoorAPI(name, id);
      setName('');
      setId('');
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField
            id="outlined-name"
            label="Door ID"
            value={id}
            onChange={ev => setId(ev.target.value)}
            variant="outlined"
            style={{width: '40vw'}}
            />
        </div>
        <div>
            <TextField
            id="outlined-name"
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
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getPersonsAPI } from '../../utility';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({authorizedUserID, setAuthorizedUserID}) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);

  
  React.useEffect( () => {
    getPersonsAPI()
        .then( newUsers => {
            newUsers.forEach( ({personID}) => {
                setUsers([...users, personID])
            })
        })
        .catch( err => console.log(err))
    
  }, [])

  const handleChange = (event) => {
    setAuthorizedUserID(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Authorized User</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={authorizedUserID}
          onChange={handleChange}
        >
          {
              users.map( (id) => <MenuItem key={id} value={id}>{id}</MenuItem>)
          }
        </Select>
        <FormHelperText>Select Authorized User</FormHelperText>
      </FormControl>
    </div>
  );
}
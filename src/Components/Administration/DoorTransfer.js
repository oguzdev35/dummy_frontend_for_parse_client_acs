import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { getDoorsAPI } from '../../utility';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup({doors, setDoors}) {
  const classes = useStyles();
  
  React.useEffect( () => {

    getDoorsAPI()
        .then( fetchedDoors => {
            fetchedDoors.map( ({doorID}) => {
                setDoors(state => ([
                    ...state,
                    {
                        id: doorID,
                        status: false
                    }
                ]))
            })
        })
  }, [])

  const handleChange = (event) => {
    setDoors([])
    doors.forEach(({id, status}) => {

        if(id !== event.target.name){
            setDoors( state => ([
                ...state,
                {
                    id: id,
                    status: status
                }
            ]))
        } else {
            setDoors( state => ([
                ...state,
                {
                    id: id,
                    status: !status
                }
            ]))
        }

    })
  };
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign door (Required*)</FormLabel>
        <FormGroup>

          {doors.map( ({id, status}) => {
              return (
                <FormControlLabel
                    key={id}
                    control={<Checkbox checked={status} onChange={handleChange} name={id} />}
                    label={id}
                />
              )
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
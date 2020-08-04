import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DoorIcon from '@material-ui/icons/Class';
import DeleteIcon from '@material-ui/icons/Delete';

import { getPersonsAPI, deletePersonAPI } from '../../utility';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100vw',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    width: '50vw'
  },
}));

const listGenerator = personList => {

    const handleDoorDeletion = personID => ev => {
      deletePersonAPI(personID);
    }

    return personList.map( ({personID, name}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <DoorIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
        primary={name}
        secondary={`person id number: ${personID}`}
        />
        <ListItemSecondaryAction>
            <IconButton 
                edge="end" aria-label="delete"
                onClick={ handleDoorDeletion(personID) }
            >
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
  ))
}

export default function InteractiveList() {
  const classes = useStyles();
  const [persons, setPersons] = useState([]);

  useEffect( () => {
    getPersonsAPI()
        .then( newPersons => setPersons(newPersons))
        .catch( err => console.log(err.message))
  }, [persons])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} md={8}>
          <Typography variant="h6" className={classes.title}>
            Person List
          </Typography>
          <div className={classes.demo} style={{width: '60'}}>
            <List dense={true}>
              {listGenerator(persons)}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
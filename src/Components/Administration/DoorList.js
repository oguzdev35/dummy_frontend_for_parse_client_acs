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

import { getDoorsAPI, deleteDoorAPI } from '../../utility';

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

const listGenerator = doorList => {

    const handleDoorDeletion = doorID => ev => {
      deleteDoorAPI(doorID);
    }

    return doorList.map( ({doorID, doorName}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <DoorIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
        primary={doorName}
        secondary={`door id number: ${doorID}`}
        />
        <ListItemSecondaryAction>
            <IconButton 
                edge="end" aria-label="delete"
                onClick={ handleDoorDeletion(doorID) }
            >
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
  ))
}

export default function InteractiveList() {
  const classes = useStyles();
  const [doors, setDoors] = useState([]);

  useEffect( () => {
    getDoorsAPI()
        .then( newDoors => setDoors(newDoors))
        .catch( err => console.log(err.message))
  }, [doors])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} md={8}>
          <Typography variant="h6" className={classes.title}>
            Door List
          </Typography>
          <div className={classes.demo} style={{width: '60'}}>
            <List dense={true}>
              {listGenerator(doors)}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
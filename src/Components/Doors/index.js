import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { getDoorsAPI } from '../../utility';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, id, logs) {
  return {
    name: name,
    id: id,
    history: logs,
    accessButton: () => <Button
            variant="contained"
            color="primary"
            style={{margin: "1vw"}}
            endIcon={<Icon>send</Icon>}
        >
            Access
        </Button>
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.accessButton()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Last Access</TableCell>
                    <TableCell>Person Name</TableCell>
                    <TableCell align="right">Person ID</TableCell>
                    <TableCell align="right">Access</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.lastaccess}
                      </TableCell>
                      <TableCell>{historyRow.personId}</TableCell>
                      <TableCell align="right">{historyRow.personName}</TableCell>
                      <TableCell align="right">
                        {historyRow.access ? "Permit" : "Deny"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable() {

  const [doors, setDoors] = useState([]);

  useEffect( () => {
    getDoorsAPI()
      .then( newDoors => {
        let newList = []
        newDoors.map( ({doorID, doorName, logs}) => {
          newList.push(createData(doorName, doorID, logs))
        })
        setDoors(newList)
      })
      .catch( err => console.log(err.message))
  }, [doors])



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Door Name</TableCell>
            <TableCell align="right">Door ID</TableCell>
            <TableCell align="right">Access</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doors.map((door) => (
            <Row key={door.name} row={door} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
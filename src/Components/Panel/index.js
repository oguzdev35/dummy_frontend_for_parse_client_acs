import React from 'react';
import Parse from 'parse';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {getDoorsAPI} from '../../utility';



// immutable sort method for array
Array.prototype.immutableSort = function(comparator){
    // Shallow copying of the list
    let _arr = [...this];
    // vanilla array sorting method is mutable
    _arr.sort(comparator);
    // return modified array, suitable for piping
    return _arr;
}

const columns = [
  { id: 'personName', label: 'Person Name', minWidth: 170 },
  { id: 'doorName', label: 'Door Name', minWidth: 100 },
  {
    id: 'lastaccess',
    label: 'Last Access',
    minWidth: 170,
    align: 'right',
    format: (value) => value.string,
  },
  {
    id: 'access',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value ? 'Permitted' : 'Denied',
  },
];

function createData(personName, doorName, lastaccess, access) {
  return { personName, doorName, lastaccess, access };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [forcedRefresh, triggerForcedRefresh] = React.useState(true);

  const [doors, setDoors] = React.useState([]);

  console.log(doors)

  React.useEffect( () => {
    doors.forEach(({doorName, logs}) => {
        logs.forEach(({personName, lastaccess, access}) => {
            setRows(state => ([
                ...state,
                createData(personName, doorName, lastaccess, access)
            ]))
        })
    })
  }, [doors])

  // fetch initial data via http methods
  React.useEffect( () => {
      getDoorsAPI()
          .then( doors => setDoors(doors))
          .catch( err => console.log(err.message))
  }, [forcedRefresh])

  // livequery client initialization
  React.useEffect( () => {

      let LiveQueryClient = Parse.LiveQueryClient;
      let client = new LiveQueryClient({
      applicationId: 'myAppID',
      serverURL: 'ws://localhost:2000/parse',
      javascriptKey: '',
      masterKey: 'myMasterKey'
      });

      const Door = Parse.Object.extend('Door');
      const query = new Parse.Query(Door);

      client.on('open', () => {
          console.log('open websocket client')
      });
      
      client.open();

      // session token  will be added for Parser serverside ACL
      const subscription = client.subscribe(query, null);

      subscription.on('open', () => {
          console.log('subscription opened')
      })

      subscription.on('create', obj => {
          console.log('Object created');
          console.log(obj)
      })

      subscription.on('update', obj => {
          console.log('Object updated')
          triggerForcedRefresh(state => !state);
      })

      subscription.on('delete', obj => {
          console.log('object deleted');
      })

      subscription.on('close', () => {
          console.log('subscription closed');
      })

      return () => client.close()

  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
                .immutableSort((a, b) => b.lastaccess.number - a.lastaccess.number)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.lastaccess.number}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && 
                            (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'object') ?
                                 column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Logs per page"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
// import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableFooter from "@material-ui/core/TableFooter";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import LastPageIcon from "@material-ui/icons/LastPage";

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     flexShrink: 0,
//     marginLeft: theme.spacing(2.5),
//   },
// }));

// function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onChangePage(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         style={{ color: "white" }}
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label='first page'>
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         style={{ color: "white" }}
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label='previous page'>
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         style={{ color: "white" }}
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label='next page'>
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         style={{ color: "white" }}
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label='last page'>
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// function createData(keyname, event, time) {
//   return { keyname, event, time };
// }

// const useStyles2 = makeStyles({
//   table: {
//     minWidth: 500,
//   },
// });

// function EventTable(props) {
//   const rows = [];
//   console.log("eventTable props.event", props);
//   console.log("props.currInstance", props.currInstance);
//   if (props.events[props.currInstance - 1]) {
//     props.events[props.currInstance - 1].keyspaces[props.currDatabase].forEach(
//       (event) => {
//         const date = new Date(event.timestamp);
//         if (props.currDisplay.category === "name") {
//           if (event.key.includes(props.currDisplay.filter.toString())) {
//             rows.push(
//               createData(
//                 event.key,
//                 event.event,
//                 date.toString("MMM dd").slice(0, 24)
//               )
//             );
//           }
//         } else if (props.currDisplay.category === "event") {
//           if (event.event === props.currDisplay.filter) {
//             rows.push(
//               createData(
//                 event.key,
//                 event.event,
//                 date.toString("MMM dd").slice(0, 24)
//               )
//             );
//           }
//         } else
//           rows.push(
//             createData(
//               event.key,
//               event.event,
//               date.toString("MMM dd").slice(0, 24)
//             )
//           );
//       }
//     );
//   }
//   console.log("rows after forEach", rows);

//   // used to obtain random number value for key of table-row component
//   const getRandomInt = (max) => {
//     return Math.floor(Math.random() * max);
//   };

//   const classes = useStyles2();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TableContainer id='tableContainer' component={Paper}>
//       <Table className={classes.table} aria-label='custom pagination table'>
//         <TableHead>
//           <TableRow>
//             <TableCell style={{ color: "white" }}>Keyname</TableCell>
//             <TableCell style={{ color: "white" }} align='right'>
//               Event
//             </TableCell>
//             <TableCell style={{ color: "white" }} align='right'>
//               Timestamp
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody id='tableBody'>
//           {(rowsPerPage > 0
//             ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             : rows
//           ).map((row) => (
//             <TableRow
//               key={row.keyname + row.event + getRandomInt(100000).toString()}>
//               <TableCell
//                 style={{ color: "white" }}
//                 className='tableCell'
//                 component='th'
//                 scope='row'>
//                 {row.keyname}
//               </TableCell>
//               <TableCell
//                 className='tableCell'
//                 style={{ width: 160, color: "white" }}
//                 align='right'>
//                 {row.event}
//               </TableCell>
//               <TableCell
//                 className='tableCell'
//                 style={{ width: 160, color: "white" }}
//                 align='right'>
//                 {row.time}
//               </TableCell>
//             </TableRow>
//           ))}

//           {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <TableCell colSpan={6} />
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               style={{ color: "white" }}
//               rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
//               colSpan={3}
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               SelectProps={{
//                 inputProps: { "aria-label": "rows per page" },
//                 native: true,
//               }}
//               onChangePage={handleChangePage}
//               onChangeRowsPerPage={handleChangeRowsPerPage}
//               ActionsComponent={TablePaginationActions}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// }

// export default EventTable;

import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


function EventTable(props) {
  // console.log('props in keyspace table', props);

  const [pageSize, setPageSize] = React.useState(25);
  const [loading, setLoading] = React.useState(false);

  const handleEventPageChange = (params) => {
    console.log('props in eventTable', props, 'params in eventTable', params);
    props.updatePageNum(params.page + 1);

    const funcOptions = {
      pageSize: props.pageSize,
      pageNum: params.page + 1,
      keyNameFilter: props.currDisplay.keyNameFilter,
      keyEventFilter: props.currDisplay.keyEventFilter,
      refreshData: 0,
    };

    props.changeEventsPage(props.currInstance, props.currDatabase, funcOptions);
  };

  const handleEventPageSizeChange = (params) => {
    setPageSize(params.pageSize);
    props.updatePageSize(params.pageSize);

    //this is so if your current page is 50 and you select 100, the page will refresh with 100
    if (params.pageSize > props.pageSize) {
      const funcOptions = {
        pageSize: params.pageSize,
        pageNum: params.page + 1,
        refreshData: 0,
        keyNameFilter: props.currDisplay.keyNameFilter,
        keyEventFilter: props.currDisplay.keyEventFilter,
      };
      props.changeEventsPage(
        props.currInstance,
        props.currDatabase,
        funcOptions
      );
    }
  };

  const data =
    props.events[props.currInstance - 1].keyspaces[props.currDatabase].data;

  console.log(' props in event table', props);
  console.log('data in event table', data);

  for (let i = 0; i < data.length; i += 1) {
    data[i].id = i;
  }

  // console.log('data in keyspace table', data);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        disableColumnFilter
        autoPageSize={false}
        loading={loading}
        pagination
        paginationMode='server'
        disableSelectionOnClick={true}
        rowCount={props.myCount}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}

        onPageSizeChange={handleEventPageSizeChange}
        onPageChange={handleEventPageChange}
        columns={[
          { field: 'key', width: '25%' },
          { field: 'event', width: '25%' },
          { field: 'timestamp', width: '%' },

        ]}
        rows={data}
        isRowSelectable={false}
      />
    </div>
  );
}

export default EventTable;

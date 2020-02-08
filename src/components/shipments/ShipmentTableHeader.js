import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  tableCellTitle: {
    color: '#c3cbd8',
    fontSize: '0.6em',
    letterSpacing: '1px',
    backgroundColor: 'white',
    textTransform: 'uppercase'
  }
};

class ShipmentTableHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell
          className={classes.tableCellTitle}
          style={{ minWidth: '100px' }}
          align="center"
        >
          AWB Number
        </TableCell>
        <TableCell className={classes.tableCellTitle} align="center">
          Transporter
        </TableCell>
        <TableCell className={classes.tableCellTitle} align="center">
          Source
        </TableCell>
        <TableCell className={classes.tableCellTitle} align="center">
          Destination
        </TableCell>
        <TableCell className={classes.tableCellTitle} align="center">
          Brand
        </TableCell>
        <TableCell
          className={classes.tableCellTitle}
          style={{ minWidth: '100px' }}
          align="center"
        >
          Start Date
        </TableCell>
        <TableCell className={classes.tableCellTitle} align="center">
          ETD
        </TableCell>
        <TableCell
          className={classes.tableCellTitle}
          style={{ minWidth: '130px' }}
          align="center"
        >
          Status
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(ShipmentTableHeader);

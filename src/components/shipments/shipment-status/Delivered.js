import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

export const tableCellColor = '#353535';
export const statusDeliveredColor = '#44b856';

const styles = {
  statusDeliveredColor: {
    color: statusDeliveredColor
  },
  tableCellColor: {
    color: tableCellColor
  },
  tableRowText: {
    color: tableCellColor,
    fontSize: '0.9em'
  }
};

class DeliveredShipments extends Component {
  constructor(props) {
    super(props);
    this.deliveredItemRef = [];
  }
  componentDidMount() {
    this.deliveredItemRef[0] && this.deliveredItemRef[0].click();
    // Trigger auto-click on the first item of the shipment to display it's timeline view by default
  }
  componentDidUpdate(props) {
    if (this.props.delivered.length !== props.delivered.length) {
      this.deliveredItemRef[0] && this.deliveredItemRef[0].click();
    }
  }
  render() {
    const { delivered, classes } = this.props;
    return (
      <>
        {delivered
          ? delivered
              .sort((a, b) => a.awbno - b.awbno)
              .map((delivered, index) => (
                <TableRow
                  style={{ height: 50 }}
                  ref={ref => (this.deliveredItemRef[index] = ref)}
                  onClick={() => this.props.getClickedShipmentId(delivered._id)}
                  className="shipment_item"
                  key={delivered._id}
                >
                  <TableCell component="th" scope="row" align="center">
                    #{delivered.awbno ? delivered.awbno : ''}
                  </TableCell>
                  <TableCell className={classes.tableRowText} align="center">
                    {delivered.carrier ? delivered.carrier : ''}
                  </TableCell>
                  <TableCell className={classes.tableRowText} align="center">
                    {delivered.from ? delivered.from : 'NA'}
                  </TableCell>
                  <TableCell className={classes.tableRowText} align="center">
                    {delivered.to ? delivered.to : 'NA'}
                  </TableCell>
                  <TableCell className={classes.tableRowText} align="center">
                    {delivered.carrier ? delivered.carrier : ''}
                  </TableCell>
                  <TableCell className={classes.tableCellColor} align="center">
                    {delivered.pickup_date
                      ? moment(delivered.pickup_date).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell className={classes.tableCellColor} align="center">
                    {delivered.extra_fields
                      ? moment(
                          delivered.extra_fields.expected_delivery_date
                        ).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell
                    className={classes.statusDeliveredColor}
                    align="center"
                  >
                    {delivered.current_status ? delivered.current_status : ''}
                  </TableCell>
                </TableRow>
              ))
          : ''}
      </>
    );
  }
}

export default withStyles(styles)(DeliveredShipments);

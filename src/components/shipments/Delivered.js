import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

export default class DeliveredShipments extends Component {
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
    const delivered = this.props.delivered;
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
                  <TableCell
                    style={{ color: '#353535' }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    #{delivered.awbno ? delivered.awbno : ''}
                  </TableCell>
                  <TableCell
                    style={{ color: '#353535', fontSize: '0.9em' }}
                    align="center"
                  >
                    {delivered.carrier ? delivered.carrier : ''}
                  </TableCell>
                  <TableCell
                    style={{ color: '#353535', fontSize: '0.8em' }}
                    align="center"
                  >
                    {delivered.from ? delivered.from : 'NA'}
                  </TableCell>
                  <TableCell
                    style={{ color: '#353535', fontSize: '0.8em' }}
                    align="center"
                  >
                    {delivered.to ? delivered.to : 'NA'}
                  </TableCell>
                  <TableCell
                    style={{ color: '#353535', fontSize: '0.9em' }}
                    align="center"
                  >
                    {delivered.carrier ? delivered.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {delivered.pickup_date
                      ? moment(delivered.pickup_date).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#353535' }} align="center">
                    {delivered.extra_fields
                      ? moment(
                          delivered.extra_fields.expected_delivery_date
                        ).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#44b856' }} align="center">
                    {delivered.current_status ? delivered.current_status : ''}
                  </TableCell>
                </TableRow>
              ))
          : ''}
      </>
    );
  }
}

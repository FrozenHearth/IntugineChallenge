import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

export default class OutForDelivery extends Component {
  constructor(props) {
    super(props);
    this.outForDeliveryItemRef = [];
  }
  componentDidMount() {
    this.outForDeliveryItemRef[0] && this.outForDeliveryItemRef[0].click();
    // Trigger auto-click on the first item of the shipment to display it's timeline view by default
  }
  render() {
    const outForDelivery = this.props.outForDelivery;
    return (
      <>
        {outForDelivery
          ? outForDelivery
              .sort((a, b) => a._id - b._id)
              .map((outForDelivery, index) => (
                <TableRow
                  ref={ref => (this.outForDeliveryItemRef[index] = ref)}
                  onClick={() =>
                    this.props.getClickedShipmentId(outForDelivery._id)
                  }
                  className="shipment_item"
                  key={outForDelivery._id}
                >
                  <TableCell
                    style={{ color: '#353535' }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    #{outForDelivery.awbno ? outForDelivery.awbno : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {outForDelivery.carrier ? outForDelivery.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {outForDelivery.from ? outForDelivery.from : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {outForDelivery.to ? outForDelivery.to : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {outForDelivery.carrier ? outForDelivery.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {outForDelivery.pickup_date
                      ? moment(outForDelivery.pickup_date).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#353535' }} align="center">
                    {outForDelivery.extra_fields
                      ? moment(
                          outForDelivery.extra_fields.expected_delivery_date
                        ).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#44b856' }} align="center">
                    {outForDelivery.current_status
                      ? outForDelivery.current_status
                      : ''}
                  </TableCell>
                </TableRow>
              ))
          : ''}
      </>
    );
  }
}

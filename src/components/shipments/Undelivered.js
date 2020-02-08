import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

export default class UndeliveredShipments extends Component {
  constructor(props) {
    super(props);
    this.undeliveredItemRef = [];
  }
  componentDidMount() {
    this.undeliveredItemRef[0] && this.undeliveredItemRef[0].click();
    // Trigger auto-click on the first item of the shipment to display it's timeline view by default
  }
  render() {
    const undeliveredShipments = this.props.undeliveredShipments;
    return (
      <>
        {undeliveredShipments
          ? undeliveredShipments
              .sort((a, b) => a._id - b._id)
              .map((undeliveredShipments, index) => (
                <TableRow
                  ref={ref => (this.undeliveredItemRef[index] = ref)}
                  onClick={() =>
                    this.props.getClickedShipmentId(undeliveredShipments._id)
                  }
                  className="shipment_item"
                  key={undeliveredShipments._id}
                >
                  <TableCell
                    style={{ color: '#353535' }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    #
                    {undeliveredShipments.awbno
                      ? undeliveredShipments.awbno
                      : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {undeliveredShipments.carrier
                      ? undeliveredShipments.carrier
                      : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {undeliveredShipments.from
                      ? undeliveredShipments.from
                      : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {undeliveredShipments.to ? undeliveredShipments.to : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {undeliveredShipments.carrier
                      ? undeliveredShipments.carrier
                      : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {undeliveredShipments.pickup_date
                      ? moment(undeliveredShipments.pickup_date).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#353535' }} align="center">
                    {undeliveredShipments.extra_fields
                      ? moment(
                          undeliveredShipments.extra_fields
                            .expected_delivery_date
                        ).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#44b856' }} align="center">
                    {undeliveredShipments.current_status
                      ? undeliveredShipments.current_status
                      : ''}
                  </TableCell>
                </TableRow>
              ))
          : ''}
      </>
    );
  }
}

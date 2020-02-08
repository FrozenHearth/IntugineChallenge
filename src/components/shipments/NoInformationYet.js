import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

export default class NoInfoShipments extends Component {
  constructor(props) {
    super(props);
    this.noInfoYetItemRef = [];
  }
  componentDidMount() {
    this.noInfoYetItemRef[0] && this.noInfoYetItemRef[0].click();
    // Trigger auto-click on the first item of the shipment to display it's timeline view by default
  }
  render() {
    const noInfoShipments = this.props.noInfoShipments;
    return (
      <>
        {noInfoShipments
          ? noInfoShipments
              .sort((a, b) => a._id - b._id)
              .map((noInfoShipments, index) => (
                <TableRow
                  ref={ref => (this.noInfoYetItemRef[index] = ref)}
                  onClick={() =>
                    this.props.getClickedShipmentId(noInfoShipments._id)
                  }
                  className="shipment_item"
                  key={noInfoShipments._id}
                >
                  <TableCell
                    style={{ color: '#353535' }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    #{noInfoShipments.awbno ? noInfoShipments.awbno : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {noInfoShipments.carrier ? noInfoShipments.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {noInfoShipments.from ? noInfoShipments.from : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {noInfoShipments.to ? noInfoShipments.to : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {noInfoShipments.carrier ? noInfoShipments.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {noInfoShipments.pickup_date
                      ? moment(noInfoShipments.pickup_date).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#353535' }} align="center">
                    {noInfoShipments.extra_fields
                      ? moment(
                          noInfoShipments.extra_fields.expected_delivery_date
                        ).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#44b856' }} align="center">
                    {noInfoShipments.current_status
                      ? noInfoShipments.current_status
                      : ''}
                  </TableCell>
                </TableRow>
              ))
          : ''}
      </>
    );
  }
}

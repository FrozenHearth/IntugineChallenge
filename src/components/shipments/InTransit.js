import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

export default class InTransit extends Component {
  constructor(props) {
    super(props);
    this.inTransitItemRef = [];
  }
  componentDidMount() {
    this.inTransitItemRef[0] && this.inTransitItemRef[0].click();
    // Trigger auto-click on the first item of the shipment to display it's timeline view by default
  }
  render() {
    const inTransit = this.props.inTransit;
    return (
      <>
        {inTransit
          ? inTransit
              .sort((a, b) => a._id - b._id)
              .map((inTransit, index) => (
                <TableRow
                  ref={ref => (this.inTransitItemRef[index] = ref)}
                  onClick={() => this.props.getClickedShipmentId(inTransit._id)}
                  className="shipment_item"
                  key={inTransit._id}
                >
                  <TableCell
                    style={{ color: '#353535' }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    #{inTransit.awbno ? inTransit.awbno : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {inTransit.carrier ? inTransit.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {inTransit.from ? inTransit.from : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {inTransit.to ? inTransit.to : 'NA'}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {inTransit.carrier ? inTransit.carrier : ''}
                  </TableCell>
                  <TableCell style={{ color: '#353535' }} align="center">
                    {inTransit.pickup_date
                      ? moment(inTransit.pickup_date).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#353535' }} align="center">
                    {inTransit.extra_fields
                      ? moment(
                          inTransit.extra_fields.expected_delivery_date
                        ).format('L')
                      : 'NA'}
                  </TableCell>

                  <TableCell style={{ color: '#44b856' }} align="center">
                    {inTransit.current_status ? inTransit.current_status : ''}
                  </TableCell>
                </TableRow>
              ))
          : ''}
      </>
    );
  }
}

import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import ShipmentTableHeader from './ShipmentTableHeader';
import InTransit from './shipment-status/InTransit';
import UndeliveredShipments from './shipment-status/Undelivered';
import NoInfoShipments from './shipment-status/NoInformationYet';
import DeliveredShipments from './shipment-status/Delivered';
import OutForDelivery from './shipment-status/OutForDelivery';
import axios from 'axios';
import Timeline from '../timeline/Timeline';
import { withStyles } from '@material-ui/core/styles';
import '../../styles/Shipments.css';

const styles = {
  stickyTable: {
    border: '2px solid #e8edff',
    margin: '0 4em 0 auto'
  },
  tableContainer: {
    float: 'right',
    margin: '2em 5em 2em 3em',
    overflow: 'auto',
    maxHeight: '1200px',
    width: '600px'
  }
};

class ShipmentList extends Component {
  constructor(props) {
    super(props);
    this.delCardRef = [];
    this.state = {
      shipmentList: [],
      counterStatusCodes: {},
      clickedStatusCode: 'DEL',
      activeCounter: false,
      clickedShipmentId: ''
    };
  }
  getCounterStatusCodesLength = (counterStatusCodesList, statusCode) => {
    return counterStatusCodesList.filter(val => val === `${statusCode}`).length;
  };
  getShipmentList = () => {
    const headerConfig = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}` }
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}`,
        {
          email: `${process.env.REACT_APP_USER_EMAIL}`
        },
        headerConfig
      )
      .then(res => {
        const counterStatusCodesList = res.data.data.map(
          csc => csc.current_status_code
        );
        const delivered = this.getCounterStatusCodesLength(
          counterStatusCodesList,
          'DEL'
        );
        const inTransit = this.getCounterStatusCodesLength(
          counterStatusCodesList,
          'INT'
        );
        const undelivered = this.getCounterStatusCodesLength(
          counterStatusCodesList,
          'UND'
        );
        const noInformationYet = this.getCounterStatusCodesLength(
          counterStatusCodesList,
          'NFI'
        );
        const outForDelivery = this.getCounterStatusCodesLength(
          counterStatusCodesList,
          'OOD'
        );
        this.setState({
          shipmentList: res.data.data,
          counterStatusCodes: {
            DEL: delivered,
            INT: inTransit,
            UND: undelivered,
            NFI: noInformationYet,
            OOD: outForDelivery
          }
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getShipmentList();
  }

  clickedCounter = clickedStatusCode => {
    this.setState({
      activeCounter: !this.state.activeCounter
    });
    if (clickedStatusCode) {
      this.setState({
        clickedStatusCode
      });
    }
  };
  getDeliveredShipmentClickedId = id => {
    this.setState({
      clickedShipmentId: id
    });
  };
  getShipmentData = (shipmentList, current_status_code) => {
    return shipmentList.filter(
      csc => csc.current_status_code === `${current_status_code}`
    );
  };
  render() {
    const { shipmentList, clickedShipmentId } = this.state;
    const { classes } = this.props;

    /*------------------------------------------------
     Get filtered data(in right hand side table)
     as per the status code
    ------------------------------------------------ */

    const deliveredShipmentData = this.getShipmentData(shipmentList, 'DEL');
    const inTransitShipmentData = this.getShipmentData(shipmentList, 'INT');
    const noInfoShipments = this.getShipmentData(shipmentList, 'NFI');
    const undeliveredShipmentData = this.getShipmentData(shipmentList, 'UND');
    const outForDeliveryShipmentData = this.getShipmentData(
      shipmentList,
      'OOD'
    );
    const { counterStatusCodes, clickedStatusCode } = this.state;
    return (
      <>
        <div className="status_codes_container">
          {Object.keys(counterStatusCodes).map(key => (
            <div
              onClick={() => this.clickedCounter(key)}
              className={`status_box ${
                key === clickedStatusCode
                  ? 'active_status_box_color'
                  : 'default_status_box_color'
              }`}
              key={key}
            >
              <span className="status_code">{key}</span>
              <p className="status_code_quantity">{counterStatusCodes[key]}</p>
            </div>
          ))}
        </div>
        <div className={classes.tableContainer}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className={classes.stickyTable}
          >
            <TableHead>
              <ShipmentTableHeader />
            </TableHead>
            <TableBody style={{ cursor: 'pointer' }}>
              {deliveredShipmentData && clickedStatusCode === 'DEL' ? (
                <DeliveredShipments
                  getClickedShipmentId={this.getDeliveredShipmentClickedId}
                  delivered={deliveredShipmentData}
                />
              ) : inTransitShipmentData && clickedStatusCode === 'INT' ? (
                <InTransit
                  getClickedShipmentId={this.getDeliveredShipmentClickedId}
                  inTransit={inTransitShipmentData}
                />
              ) : undeliveredShipmentData && clickedStatusCode === 'UND' ? (
                <UndeliveredShipments
                  getClickedShipmentId={this.getDeliveredShipmentClickedId}
                  undeliveredShipments={undeliveredShipmentData}
                />
              ) : noInfoShipments && clickedStatusCode === 'NFI' ? (
                <NoInfoShipments
                  getClickedShipmentId={this.getDeliveredShipmentClickedId}
                  noInfoShipments={noInfoShipments}
                />
              ) : outForDeliveryShipmentData && clickedStatusCode === 'OOD' ? (
                <OutForDelivery
                  getClickedShipmentId={this.getDeliveredShipmentClickedId}
                  outForDelivery={outForDeliveryShipmentData}
                />
              ) : null}
            </TableBody>
          </Table>
        </div>
        <Timeline
          clickedShipmentId={clickedShipmentId}
          clickedStatusCode={clickedStatusCode}
          delivered={deliveredShipmentData}
          inTransit={inTransitShipmentData}
          undelivered={undeliveredShipmentData}
          noInfoShipments={noInfoShipments}
          outForDelivery={outForDeliveryShipmentData}
        />
      </>
    );
  }
}

export default withStyles(styles)(ShipmentList);

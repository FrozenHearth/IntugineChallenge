import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InTransit from './InTransit';
import UndeliveredShipments from './Undelivered';
import NoInfoShipments from './NoInformationYet';
import DeliveredShipments from './Delivered';
import OutForDelivery from './OutForDelivery';
import axios from 'axios';
import '../../styles/Shipments.css';
import Timeline from '../timeline/Timeline';

export class ShipmentList extends Component {
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
  getShipmentList = () => {
    const headerConfig = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}` }
    };
    axios
      .post(
        'https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments/vishu',
        {
          email: 'vishu.dbz@gmail.com'
        },
        headerConfig
      )
      .then(res => {
        const counterStatusCodesList = res.data.data.map(
          csc => csc.current_status_code
        );
        const delivered = counterStatusCodesList.filter(val => val === 'DEL')
          .length;
        const inTransit = counterStatusCodesList.filter(val => val === 'INT')
          .length;
        const undelivered = counterStatusCodesList.filter(val => val === 'UND')
          .length;
        const noInformationYet = counterStatusCodesList.filter(
          val => val === 'NFI'
        ).length;
        const outForDelivery = counterStatusCodesList.filter(
          val => val === 'OOD'
        ).length;
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
    if (
      clickedStatusCode === 'DEL' ||
      clickedStatusCode === 'INT' ||
      clickedStatusCode === 'UND' ||
      clickedStatusCode === 'NFI' ||
      clickedStatusCode === 'OOD'
    ) {
      this.setState({
        clickedStatusCode: clickedStatusCode
      });
    }
  };
  getDeliveredShipmentClickedId = id => {
    this.setState({
      clickedShipmentId: id
    });
  };
  render() {
    const shipmentList = this.state.shipmentList;

    /*------------------------------------------------
     Get filtered data(in right hand side table)
     as per the status code
    ------------------------------------------------ */

    const deliveredShipmentData = shipmentList.filter(
      csc => csc.current_status_code === 'DEL'
    );
    const inTransitShipmentData = shipmentList.filter(
      csc => csc.current_status_code === 'INT'
    );
    const noInfoShipments = shipmentList.filter(
      csc => csc.current_status_code === 'NFI'
    );
    const undeliveredShipmentData = shipmentList.filter(
      csc => csc.current_status_code === 'UND'
    );
    const outForDeliveryShipmentData = shipmentList.filter(
      csc => csc.current_status_code === 'OOD'
    );
    const counterStatusCodes = this.state.counterStatusCodes;
    const clickedStatusCode = this.state.clickedStatusCode;
    return (
      <>
        <div className="status_codes_container">
          {Object.keys(counterStatusCodes).map(key => (
            <div
              onClick={() => this.clickedCounter(key)}
              className="status_box"
              style={
                key === clickedStatusCode
                  ? { backgroundColor: '#2e5bff', color: '#fff' }
                  : { backgroundColor: '#d5deff', color: '#3460ff' }
              }
              key={key}
            >
              <span className="status_code">{key}</span>
              <p className="status_code_quantity">{counterStatusCodes[key]}</p>
            </div>
          ))}
        </div>
        <div
          style={{
            float: 'right',
            margin: '2em 5em 2em 3em',
            overflow: 'auto',
            maxHeight: '1200px',
            width: '600px'
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{
              border: '2px solid #e8edff',
              margin: '0 4em 0 auto'
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    minWidth: '100px',
                    color: '#c3cbd8',
                    fontSize: '0.6em',
                    letterSpacing: '1px',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  AWB Number
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Transporter
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Source
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Destination
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Brand
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    minWidth: '100px',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Start Date
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  ETD
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '0.6em',
                    minWidth: '130px',
                    color: '#c3cbd8',
                    backgroundColor: 'white',
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Status
                </TableCell>
              </TableRow>
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
          clickedShipmentId={this.state.clickedShipmentId}
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

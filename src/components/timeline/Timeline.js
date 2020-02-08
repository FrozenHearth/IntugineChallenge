import React, { Component } from 'react';
import DestinationIcon from '../../assets/images/destination.svg';
import WarehouseIcon from '../../assets/images/warehouse.svg';
import { withStyles } from '@material-ui/core/styles';
import '../../styles/Timeline.css';

const styles = {
  destinationIcon: {
    margin: '0 auto'
  },
  warehouseIcon: {
    margin: '0 auto'
  }
};

class Timeline extends Component {
  render() {
    const { classes } = this.props;
    const { clickedShipmentId, clickedStatusCode } = this.props;
    /* ------------------------------------------------
    Get timeline view for shipment item that is clicked
    --------------------------------------------------- */
    const deliveredTimelineView = this.props.delivered
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    const inTransitTimelineView = this.props.inTransit
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    const outForDeliveryTimelineView = this.props.outForDelivery
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    const undeliveredTimelineView = this.props.undelivered
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    return (
      <div className="timeline_container">
        <div className="destination_icon_circle">
          <img
            className={classes.destinationIcon}
            src={DestinationIcon}
            alt=""
          />
        </div>
        {clickedStatusCode === 'DEL'
          ? deliveredTimelineView
              .filter(el => el) // Filtering out undefined and null values
              .map(el =>
                Object.keys(el).map(key => (
                  <div key={key}>
                    <div className="vertical_line"></div>
                    <div className="bullet"></div>
                    <div className="left_arrow"></div>
                    <div
                      className="content"
                      style={
                        el[key].status_detail === 'DELIVERED'
                          ? { background: '#d5deff', color: '#44b856' }
                          : {}
                      }
                    >
                      <p className="shipping_status">
                        {key ? el[key].location : ''}
                      </p>
                      <p className="time">{key ? el[key].time : ''}</p>
                    </div>
                  </div>
                ))
              )
          : ''}

        {clickedStatusCode === 'INT'
          ? inTransitTimelineView
              .filter(el => el)
              .map(el =>
                Object.keys(el).map(key => (
                  <div key={key}>
                    <div className="vertical_line"></div>
                    <div className="bullet"></div>
                    <div className="left_arrow"></div>
                    <div className="content">
                      <p className="shipping_status">
                        {key ? el[key].location : ''}
                      </p>
                      <p className="time">{key ? el[key].time : ''}</p>
                    </div>
                  </div>
                ))
              )
          : ''}

        {clickedStatusCode === 'UND'
          ? undeliveredTimelineView
              .filter(el => el)
              .map(el =>
                Object.keys(el).map(key => (
                  <div key={key}>
                    <div className="vertical_line"></div>
                    <div className="bullet"></div>
                    <div className="left_arrow"></div>
                    <div className="content">
                      <p className="shipping_status">
                        {key ? el[key].location : ''}
                      </p>
                      <p className="time">{key ? el[key].time : ''}</p>
                    </div>
                  </div>
                ))
              )
          : ''}

        {clickedStatusCode === 'NFI' ? (
          <>
            <div className="vertical_line"></div>
            <div className="bullet"></div>
            <div className="left_arrow"></div>
            <div className="content">
              <p className="shipping_status">No Information Yet</p>
              <p className="time">N/A</p>
            </div>
          </>
        ) : (
          ''
        )}

        {clickedStatusCode === 'OOD'
          ? outForDeliveryTimelineView
              .filter(el => el)
              .map(el =>
                Object.keys(el).map(key => (
                  <div key={key}>
                    <div className="vertical_line"></div>
                    <div className="bullet"></div>
                    <div className="left_arrow"></div>
                    <div className="content">
                      <p className="shipping_status">
                        {key ? el[key].location : ''}
                      </p>
                      <p className="time">{key ? el[key].time : ''}</p>
                    </div>
                  </div>
                ))
              )
          : ''}

        <div className="vertical_line"></div>
        <div className="warehouse_icon_circle">
          <img className={classes.warehouseIcon} src={WarehouseIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Timeline);

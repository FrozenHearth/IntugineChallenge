import React, { Component } from 'react';
import DestinationIcon from '../../assets/images/destination.svg';
import WarehouseIcon from '../../assets/images/warehouse.svg';
import { withStyles } from '@material-ui/core/styles';
import '../../styles/Timeline.css';
import TimelineView from './TimelineView';

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
    const {
      clickedShipmentId,
      clickedStatusCode,
      delivered,
      inTransit,
      outForDelivery,
      undelivered
    } = this.props;
    /* ------------------------------------------------
    Get timeline view for shipment item that is clicked
    --------------------------------------------------- */

    const deliveredTimelineView = delivered
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    const inTransitTimelineView = inTransit
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    const outForDeliveryTimelineView = outForDelivery
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);

    const undeliveredTimelineView = undelivered
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
              .map(item =>
                Object.keys(item).map(key => (
                  <TimelineView
                    clickedStatusCode={clickedStatusCode}
                    key={key}
                    item={item}
                    itemKey={key}
                  />
                ))
              )
          : ''}

        {clickedStatusCode === 'INT'
          ? inTransitTimelineView
              .filter(el => el)
              .map(item =>
                Object.keys(item).map(key => (
                  <TimelineView
                    clickedStatusCode={clickedStatusCode}
                    key={key}
                    item={item}
                    itemKey={key}
                  />
                ))
              )
          : ''}

        {clickedStatusCode === 'UND'
          ? undeliveredTimelineView
              .filter(el => el)
              .map(item =>
                Object.keys(item).map(key => (
                  <TimelineView
                    clickedStatusCode={clickedStatusCode}
                    key={key}
                    item={item}
                    itemKey={key}
                  />
                ))
              )
          : ''}

        {clickedStatusCode === 'OOD'
          ? outForDeliveryTimelineView
              .filter(el => el)
              .map(item =>
                Object.keys(item).map(key => (
                  <TimelineView
                    clickedStatusCode={clickedStatusCode}
                    key={key}
                    item={item}
                    itemKey={key}
                  />
                ))
              )
          : ''}

        {clickedStatusCode === 'NFI' ? (
          // No need of item and key props here, as we're only rendering a simple HTML template
          <TimelineView clickedStatusCode={clickedStatusCode} />
        ) : (
          ''
        )}

        <div className="vertical_line"></div>
        <div className="warehouse_icon_circle">
          <img className={classes.warehouseIcon} src={WarehouseIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Timeline);

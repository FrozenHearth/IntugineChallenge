import React, { Component } from 'react';
import DestinationIcon from '../../assets/images/destination.svg';
import WarehouseIcon from '../../assets/images/warehouse.svg';
import { withStyles } from '@material-ui/core/styles';
import '../../styles/Timeline.css';
import { TimelineView } from './TimelineView';

const styles = {
  destinationIcon: {
    margin: '0 auto'
  },
  warehouseIcon: {
    margin: '0 auto'
  }
};
class Timeline extends Component {
  renderTimelineView = statusCode => {
    const { clickedStatusCode } = this.props;
    return statusCode
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
      );
  };

  statusCodeTimelineView = statusCode => {
    const { clickedShipmentId } = this.props;
    return statusCode
      .filter(item => item._id === clickedShipmentId)
      .map(sc => sc.scan);
  };

  render() {
    const {
      classes,
      clickedStatusCode,
      delivered,
      inTransit,
      outForDelivery,
      undelivered
    } = this.props;
    
    /* ------------------------------------------------
    Get timeline view for shipment item that is clicked
    --------------------------------------------------- 
    */

    const deliveredTimelineView = this.statusCodeTimelineView(delivered);

    const inTransitTimelineView = this.statusCodeTimelineView(inTransit);

    const outForDeliveryTimelineView = this.statusCodeTimelineView(
      outForDelivery
    );

    const undeliveredTimelineView = this.statusCodeTimelineView(undelivered);

    return (
      <div className="timeline_container">
        <div className="destination_icon_circle">
          <img
            className={classes.destinationIcon}
            src={DestinationIcon}
            alt=""
          />
        </div>
        {clickedStatusCode === 'DEL' ? (
          this.renderTimelineView(deliveredTimelineView)
        ) : clickedStatusCode === 'INT' ? (
          this.renderTimelineView(inTransitTimelineView)
        ) : clickedStatusCode === 'UND' ? (
          this.renderTimelineView(undeliveredTimelineView)
        ) : clickedStatusCode === 'OOD' ? (
          this.renderTimelineView(outForDeliveryTimelineView)
        ) : clickedStatusCode === 'NFI' ? (
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

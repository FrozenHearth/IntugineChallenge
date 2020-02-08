import React, { Component } from 'react';

export default class TimelineView extends Component {
  render() {
    const { item, itemKey, clickedStatusCode } = this.props;
    return (
      <>
        {clickedStatusCode !== 'NFI' ? (
          <div key={itemKey}>
            <div className="vertical_line"></div>
            <div className="bullet"></div>
            <div className="left_arrow"></div>
            <div
              className={`content ${
                item[itemKey].status_detail === 'DELIVERED'
                  ? 'delivery_success'
                  : ''
              }`}
            >
              <p className="shipping_status">
                {itemKey ? item[itemKey].location : ''}
              </p>
              <p className="time">{itemKey ? item[itemKey].time : ''}</p>
            </div>
          </div>
        ) : clickedStatusCode === 'NFI' ? (
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
      </>
    );
  }
}

import React, { Component } from "react";
import { connect } from "react-redux";
import { viewPayPoint } from "../actions/general";
export class PayPointItem extends Component {
  render() {
    const { payPoint } = this.props;
    return (
      <div
        className={`balance col-md-4 ${
          payPoint.percent > 0 ? "hidden-mobile" : ""
        }`}
      >
        <div className='balance-title'>{payPoint.type}</div>
        <div className='balance-value'>
          <span>&#8358;{payPoint.total}</span>
          {payPoint.percent > 0 ? (
            <span className='trending trending-down-basic'>
              <span>%{payPoint.percent}</span>
              <i className='os-icon os-icon-arrow-2-down'></i>
            </span>
          ) : null}
          <div class='balance-link'>
            <button
              className='btn btn-link btn-underlined'
              onClick={() => this.props.viewPayPoint(true)}
            >
              <span>View Statement</span>
              <i class='os-icon os-icon-arrow-right4'></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { viewPayPoint })(PayPointItem);

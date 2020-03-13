/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { viewPayPoint } from "../actions/general";
export class PayPointItem extends Component {
  render() {
    const { payPoint } = this.props;
    return (
      <div className='col-sm-4 col-xxxl-4'>
        <a className='element-box el-tablo'>
          <div className='label'>{payPoint.type}</div>
          <div className='value'>
            <span>&#8358;{payPoint.total}</span>
            {payPoint.percent > 0 ? (
              <span className='trending trending-down-basic'>
                <span>%{payPoint.percent}</span>
                <i className='os-icon os-icon-arrow-2-down'></i>
              </span>
            ) : null}
            <div className='balance-link'>
              <button
                className='btn btn-link btn-underlined'
                onClick={() => this.props.viewPayPoint(true)}
              >
                <span>View Statement</span>
                <i className='os-icon os-icon-arrow-right4'></i>
              </button>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default connect(null, { viewPayPoint })(PayPointItem);

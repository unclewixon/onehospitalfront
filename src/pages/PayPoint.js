import React, { Component } from "react";
import PayPoint from "../components/PayPoint";
import PayPointTable from "../components/PayPointTable";
import Queue from "../components/Queue";
class PayPointPage extends Component {
  render() {
    return (
      <>
        <div className='content-i'>
          <div className='content-box'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='element-wrapper'>
                  <h6 className='element-header'>Lab</h6>
                  <div className='row'>
                    <PayPoint />
                    <PayPointTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='content-panel compact'>
            <Queue />
          </div>
        </div>
      </>
    );
  }
}

export default PayPointPage;

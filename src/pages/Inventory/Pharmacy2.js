/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Queue from "../../components/Queue";
import SaleSummary from "../../components/SaleSummary";
import Overall from "../../components/Overall";

export class Pharmacy2 extends Component {
  state = {
    tab: "overall"
  };

  changeTab = tab => {
    this.setState({ tab });
  };
  render() {
    const { tab } = this.state;
    return (
      <div className='content-i'>
        <div className='content-box'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='element-wrapper'>
                <div className='os-tabs-w mx-1'>
                  <div className='os-tabs-controls'>
                    <ul className='nav nav-tabs upper'>
                      <li className='nav-item'>
                        <a
                          className={
                            tab === "overall" ? "nav-link active" : "nav-link"
                          }
                          onClick={() => this.changeTab("overall")}
                        >
                          OVERALL
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          className={
                            tab === "sale" ? "nav-link active" : "nav-link"
                          }
                          onClick={() => this.changeTab("sale")}
                        >
                          SALE SUMMARY
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {tab === "overall" && <Overall />}
                {tab === "sale" && <SaleSummary />}
              </div>
            </div>
          </div>
        </div>
        <div className='content-panel compact'>
          <Queue />
        </div>
      </div>
    );
  }
}

export default Pharmacy2;

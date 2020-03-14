/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Tooltip from "antd/lib/tooltip";

import Queue from "../components/Queue";
import ClinicalLabItem from "../components/ClinicalLabItem";
import LabRequest2 from "../components/Patient/LabRequest"
class ClinicalLab extends Component {
  state = {};

  handleEdit = () => {
    alert("I am toSee Details this guy");
  };
  render() {
    return (
      <div className='content-i'>
        <div className='content-box'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='element-wrapper'>
                <h6 className='element-header'>Lab</h6>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='element-content'>
                      <div className='row'>
                        <div className='col-sm-4 col-xxxl-4'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Pending Requests</div>
                            <div className='value'>57</div>
                          </a>
                        </div>
                        <div className='col-sm-4 col-xxxl-4'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Pending Approval</div>
                            <div className='value text-center'>457</div>
                          </a>
                        </div>
                        <div className='col-sm-4 col-xxxl-4'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Completed Requests</div>
                            <div className='value'>125</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <div className='element-wrapper'>
                      <h6 className='element-header'>Incomplete</h6>
                      <div className='element-box'>
                        <div className='table table-responsive'>
                          <table
                            id='table'
                            className='table table-theme v-middle table-hover'
                          >
                            <thead>
                              <tr>
                                <th>
                                  <div className='th-inner '></div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th>
                                  <div className='th-inner sortable both'>
                                    Request Date
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th>
                                  <div className='th-inner sortable both'>
                                    ID
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th>
                                  <div className='th-inner sortable both'>
                                    Patient
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th>
                                  <div className='th-inner sortable both'>
                                    By
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th>
                                  <div className='th-inner '></div>
                                  <div className='fht-cell'></div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <ClinicalLabItem />
                              <ClinicalLabItem />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-12'>
                    <div className='element-wrapper'>
                      <h6 className='element-header'>Previous Requests</h6>
                      <div className='element-box'>
                        <div className='table table-responsive'>
                          <table
                            id='table'
                            className='table table-theme v-middle table-hover'
                          >
                            <thead>
                              <tr>
                                <th data-field='collapse'>
                                  <div className='th-inner '></div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th data-field='request-date'>
                                  <div className='th-inner sortable both'>
                                    Request Date
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th data-field='id'>
                                  <div className='th-inner sortable both'>
                                    ID
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>

                                <th data-field='task'>
                                  <div className='th-inner '>
                                    <span className='d-none d-sm-block'>
                                      Patient
                                    </span>
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th data-field='task'>
                                  <div className='th-inner '>
                                    <span className='d-none d-sm-block'>
                                      By
                                    </span>
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th data-field='5'>
                                  <div className='th-inner '></div>
                                  <div className='fht-cell'></div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <ClinicalLabItem />
                              <ClinicalLabItem />
                              <ClinicalLabItem />
                              <ClinicalLabItem />
                              <ClinicalLabItem />
                              <ClinicalLabItem />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                <div className="col-sm-12">
                  <LabRequest2/>
                </div>
                </div>
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

export default ClinicalLab;

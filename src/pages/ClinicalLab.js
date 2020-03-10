/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Tooltip from "antd/lib/tooltip";

import Queue from "../components/Queue";

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
                <div className='element-actions'>
                  <a className='btn btn-primary btn-sm text-white'>
                    <i className='os-icon os-icon-plus-circle' />
                    <span>New Lab Request</span>
                  </a>
                </div>
                <h6 className='element-header'>Lab</h6>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='element-content'>
                      <div className='row'>
                        <div className='col-sm-4 col-xxxl-3'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Pending Requests</div>
                            <div className='value'>57</div>
                          </a>
                        </div>
                        <div className='col-sm-4 col-xxxl-3'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Pending Approval</div>
                            <div className='value text-center'>457</div>
                          </a>
                        </div>
                        <div className='col-sm-4 col-xxxl-3'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Completed Requests</div>
                            <div className='value'>125</div>
                          </a>
                        </div>
                        <div className='d-none d-xxxl-block col-xxxl-3'>
                          <a className='element-box el-tablo'>
                            <div className='label'>Refunds Processed</div>
                            <div className='value'>294</div>
                            <div className='trending trending-up-basic'>
                              <span>12%</span>
                              <i className='os-icon os-icon-arrow-up2'></i>
                            </div>
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
                                    Lab
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th>
                                  <div className='th-inner'>
                                    <span className='d-none d-sm-block'>
                                      Request Specimen(s)
                                    </span>
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
                              <tr className='' data-index='0' data-id='20'>
                                <td>
                                  <span>Today</span>
                                  <span className='smaller lighter'>
                                    1:52am
                                  </span>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon ios app
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>

                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>
                              <tr className='' data-index='1' data-id='8'>
                                <td>
                                  <span>Jan 19th</span>
                                  <span className='smaller lighter'>
                                    3:22pm
                                  </span>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    DEV DAY 2018
                                  </a>
                                </td>
                                <td className=''>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>
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
                                <th data-field='owner'>
                                  <div className='th-inner sortable both'>
                                    Lab
                                  </div>
                                  <div className='fht-cell'></div>
                                </th>
                                <th data-field='project'>
                                  <div className='th-inner sortable both'>
                                    Request Specimen(s)
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
                              <tr data-index='0' data-id='20'>
                                <td>
                                  <span>Today</span>
                                  <span className='smaller lighter'>
                                    1:52am
                                  </span>
                                </td>
                                <td>
                                  <a>
                                    <span className='w-32 avatar gd-warning'>
                                      IN32456789
                                    </span>
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>blood</a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>

                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>
                              <tr data-index='0' data-id='20'>
                                <td>
                                  <span>Today</span>
                                  <span className='smaller lighter'>
                                    1:52am
                                  </span>
                                </td>
                                <td>
                                  <a>
                                    <span className='w-32 avatar gd-warning'>
                                      IN32456789
                                    </span>
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>blood</a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>

                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>

                              <tr data-index='0' data-id='20'>
                                <td>
                                  <span>Today</span>
                                  <span className='smaller lighter'>
                                    1:52am
                                  </span>
                                </td>
                                <td>
                                  <a>
                                    <span className='w-32 avatar gd-warning'>
                                      IN32456789
                                    </span>
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>blood</a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>

                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>

                              <tr data-index='0' data-id='20'>
                                <td>
                                  <span>Today</span>
                                  <span className='smaller lighter'>
                                    1:52am
                                  </span>
                                </td>
                                <td>
                                  <a>
                                    <span className='w-32 avatar gd-warning'>
                                      IN32456789
                                    </span>
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>blood</a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>

                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>

                              <tr data-index='0' data-id='20'>
                                <td>
                                  <span>Today</span>
                                  <span className='smaller lighter'>
                                    1:52am
                                  </span>
                                </td>
                                <td>
                                  <a>
                                    <span className='w-32 avatar gd-warning'>
                                      IN32456789
                                    </span>
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>blood</a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>
                                <td className='flex'>
                                  <a className='item-title text-color'>
                                    Netflix hackathon
                                  </a>
                                </td>

                                <td className='text-right row-actions'>
                                  <Tooltip title='Receive Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-folder-plus' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Edit Request'>
                                    <a className='secondary'>
                                      <i className='os-icon os-icon-edit-32' />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title='Delete Request'>
                                    <a className='danger'>
                                      <i className='os-icon os-icon-ui-15' />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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

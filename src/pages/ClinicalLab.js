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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-striped table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-striped table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-striped table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-striped table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                              <tr className='expanded-row'>
                                <td colSpan='5'>
                                  <div className='table-responsive'>
                                    <table className='table table-striped table-sm'>
                                      <tbody>
                                        <tr>
                                          <th>Specimen</th>
                                          <td>blood</td>
                                        </tr>
                                        <tr>
                                          <th>Lab</th>
                                          <td>CS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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

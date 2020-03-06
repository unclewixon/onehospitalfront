import React, { Component } from "react";

class ClinicalLab extends Component {
  render() {
    return (
      <>
        <div className='element-wrapper'>
          <h6 className='element-header'>Doctors Dashboard</h6>
          <div className='element-content'>
            <div className='row'>
              <div class='col-md-12'>
                <div class='row'>
                  <div className='col-sm-4 col-xxxl-3'>
                    <a className='element-box el-tablo'>
                      <div className='label'>Pending Requests</div>
                      <div className='value'>57</div>
                      <div className='trending trending-up-basic'>
                        <span>12%</span>
                        <i className='os-icon os-icon-arrow-up2'></i>
                      </div>
                    </a>
                  </div>
                  <div className='col-sm-4 col-xxxl-3'>
                    <a className='element-box el-tablo'>
                      <div className='label'>Completed Requests</div>
                      <div className='value'>457</div>
                      <div className='trending trending-down-basic'>
                        <span>12%</span>
                        <i className='os-icon os-icon-arrow-down'></i>
                      </div>
                    </a>
                  </div>
                  <div className='col-sm-4 col-xxxl-3'>
                    <a className='element-box el-tablo'>
                      <div className='label'>Sent Requests</div>
                      <div className='value'>125</div>
                      <div className='trending trending-down-basic'>
                        <span>9%</span>
                        <i className='os-icon os-icon-arrow-down'></i>
                      </div>
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
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-12'>
            <div className='element-wrapper'>
              <h6 className='element-header'>Previous Requests</h6>
              <div className='element-box'>
                <div className='bootstrap-table'>
                  <div className='fixed-table-toolbar'>
                    <div className='bs-bars float-left'>
                      <div id='toolbar'></div>
                    </div>
                  </div>
                  <div
                    className='fixed-table-container'
                    style={{ paddingBottom: "0px" }}
                  >
                    <div
                      className='fixed-table-header'
                      style={{ display: "none" }}
                    >
                      <table></table>
                    </div>
                    <div className='fixed-table-body'>
                      <table
                        id='table'
                        className='table table-theme v-middle table-hover'
                        data-toolbar='#toolbar'
                        data-search='true'
                        data-search-align='left'
                        data-show-export='true'
                        data-show-columns='true'
                        data-detail-view='false'
                        data-mobile-responsive='true'
                        data-pagination='true'
                        data-page-list='[10, 25, 50, 100, ALL]'
                      >
                        <thead>
                          <tr>
                            <th data-field='id'>
                              <div className='th-inner sortable both'>ID</div>
                              <div className='fht-cell'></div>
                            </th>
                            <th data-field='owner'>
                              <div className='th-inner sortable both'>
                                FOLDER NO.
                              </div>
                              <div className='fht-cell'></div>
                            </th>
                            <th data-field='project'>
                              <div className='th-inner sortable both'>
                                DESCRIPTION
                              </div>
                              <div className='fht-cell'></div>
                            </th>
                            <th data-field='task'>
                              <div className='th-inner '>
                                <span className='d-none d-sm-block'>Tasks</span>
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
                              <span className='smaller lighter'>1:52am</span>
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
                                Netflix hackathon ios app
                              </a>
                            </td>
                            <td>
                              <span className='item-amount d-none d-sm-block text-sm'>
                                120
                              </span>
                            </td>

                            <td>
                              <div className='item-action dropdown'>
                                <a
                                  data-toggle='dropdown'
                                  className='text-muted'
                                  aria-expanded='false'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-more-vertical'
                                  >
                                    <circle cx='12' cy='12' r='1'></circle>
                                    <circle cx='12' cy='5' r='1'></circle>
                                    <circle cx='12' cy='19' r='1'></circle>
                                  </svg>
                                </a>
                                <div
                                  className='dropdown-menu dropdown-menu-right bg-black'
                                  role='menu'
                                  x-placement='bottom-end'
                                  style={{
                                    position: "absolute",
                                    transform: "translate3d(16px, 20px, 0px)",
                                    top: "0px",
                                    left: "0px",
                                    willChange: "transform"
                                  }}
                                >
                                  <a className='dropdown-item'>See detail </a>
                                  <a className='dropdown-item download'>
                                    Download{" "}
                                  </a>
                                  <a className='dropdown-item edit'>Edit</a>
                                  <div className='dropdown-divider'></div>
                                  <a className='dropdown-item trash'>
                                    Delete item
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr data-index='1' data-id='8'>
                            <td>
                              <span>Jan 19th</span>
                              <span className='smaller lighter'>3:22pm</span>
                            </td>
                            <td>
                              <a>
                                <span className='w-32 avatar gd-warning'>
                                  IN32456789
                                </span>
                              </a>
                              <a></a>
                            </td>
                            <td className='flex'>
                              <a className='item-title text-color'>
                                DEV DAY 2018
                              </a>
                            </td>
                            <td>
                              <span className='item-amount d-none d-sm-block text-sm'>
                                220
                              </span>
                            </td>

                            <td>
                              <div className='item-action dropdown'>
                                <a
                                  data-toggle='dropdown'
                                  className='text-muted'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-more-vertical'
                                  >
                                    <circle cx='12' cy='12' r='1'></circle>
                                    <circle cx='12' cy='5' r='1'></circle>
                                    <circle cx='12' cy='19' r='1'></circle>
                                  </svg>
                                </a>
                                <div
                                  className='dropdown-menu dropdown-menu-right bg-black'
                                  role='menu'
                                >
                                  <a className='dropdown-item'>See detail </a>
                                  <a className='dropdown-item download'>
                                    Download{" "}
                                  </a>
                                  <a className='dropdown-item edit'>Edit</a>
                                  <div className='dropdown-divider'></div>
                                  <a className='dropdown-item trash'>
                                    Delete item
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr data-index='2' data-id='4'>
                            <td>
                              <span>Yesterday</span>
                              <span className='smaller lighter'>7:45am</span>
                            </td>
                            <td>
                              <a>
                                <span className='w-32 avatar gd-warning'>
                                  IN32456789
                                </span>
                              </a>
                              <a></a>
                            </td>
                            <td className='flex'>
                              <a className='item-title text-color'>
                                Open source project public release
                              </a>
                            </td>
                            <td>
                              <span className='item-amount d-none d-sm-block text-sm'>
                                20
                              </span>
                            </td>

                            <td>
                              <div className='item-action dropdown'>
                                <a
                                  data-toggle='dropdown'
                                  className='text-muted'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-more-vertical'
                                  >
                                    <circle cx='12' cy='12' r='1'></circle>
                                    <circle cx='12' cy='5' r='1'></circle>
                                    <circle cx='12' cy='19' r='1'></circle>
                                  </svg>
                                </a>
                                <div
                                  className='dropdown-menu dropdown-menu-right bg-black'
                                  role='menu'
                                >
                                  <a className='dropdown-item'>See detail </a>
                                  <a className='dropdown-item download'>
                                    Download{" "}
                                  </a>
                                  <a className='dropdown-item edit'>Edit</a>
                                  <div className='dropdown-divider'></div>
                                  <a className='dropdown-item trash'>
                                    Delete item
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr data-index='3' data-id='17'>
                            <td>
                              <span>Jan 23rd</span>
                              <span className='smaller lighter'>2:12pm</span>
                            </td>
                            <td>
                              <a>
                                <span className='w-32 avatar gd-warning'>
                                  IN32456789
                                </span>
                              </a>
                              <a></a>
                            </td>
                            <td className='flex'>
                              <a className='item-title text-color'>
                                AI Could Uber
                              </a>
                            </td>
                            <td>
                              <span className='item-amount d-none d-sm-block text-sm'>
                                200
                              </span>
                            </td>

                            <td>
                              <div className='item-action dropdown'>
                                <a
                                  data-toggle='dropdown'
                                  className='text-muted'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-more-vertical'
                                  >
                                    <circle cx='12' cy='12' r='1'></circle>
                                    <circle cx='12' cy='5' r='1'></circle>
                                    <circle cx='12' cy='19' r='1'></circle>
                                  </svg>
                                </a>
                                <div
                                  className='dropdown-menu dropdown-menu-right bg-black'
                                  role='menu'
                                >
                                  <a className='dropdown-item'>See detail </a>
                                  <a className='dropdown-item download'>
                                    Download{" "}
                                  </a>
                                  <a className='dropdown-item edit'>Edit</a>
                                  <div className='dropdown-divider'></div>
                                  <a className='dropdown-item trash'>
                                    Delete item
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr data-index='4' data-id='15'>
                            <td>
                              <span>Jan 12th</span>
                              <span className='smaller lighter'>9:51am</span>
                            </td>
                            <td>
                              <a>
                                <span className='w-32 avatar gd-warning'>
                                  IN32456789
                                </span>
                              </a>
                              <a></a>
                            </td>
                            <td className='flex'>
                              <a className='item-title text-color'>
                                Weekend Fun Project
                              </a>
                            </td>
                            <td>
                              <span className='item-amount d-none d-sm-block text-sm'>
                                240
                              </span>
                            </td>

                            <td>
                              <div className='item-action dropdown'>
                                <a
                                  data-toggle='dropdown'
                                  className='text-muted'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-more-vertical'
                                  >
                                    <circle cx='12' cy='12' r='1'></circle>
                                    <circle cx='12' cy='5' r='1'></circle>
                                    <circle cx='12' cy='19' r='1'></circle>
                                  </svg>
                                </a>
                                <div
                                  className='dropdown-menu dropdown-menu-right bg-black'
                                  role='menu'
                                >
                                  <a className='dropdown-item'>See detail </a>
                                  <a className='dropdown-item download'>
                                    Download{" "}
                                  </a>
                                  <a className='dropdown-item edit'>Edit</a>
                                  <div className='dropdown-divider'></div>
                                  <a className='dropdown-item trash'>
                                    Delete item
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr data-index='5' data-id='11'>
                            <td>
                              <span>Jan 9th</span>
                              <span className='smaller lighter'>12:45pm</span>
                            </td>
                            <td>
                              <a>
                                <span className='w-32 avatar gd-warning'>
                                  IN32456789
                                </span>
                              </a>
                              <a></a>
                            </td>
                            <td className='flex'>
                              <a className='item-title text-color'>
                                Fitness application
                              </a>
                            </td>
                            <td>
                              <span className='item-amount d-none d-sm-block text-sm'>
                                240
                              </span>
                            </td>

                            <td>
                              <div className='item-action dropdown'>
                                <a
                                  data-toggle='dropdown'
                                  className='text-muted'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-more-vertical'
                                  >
                                    <circle cx='12' cy='12' r='1'></circle>
                                    <circle cx='12' cy='5' r='1'></circle>
                                    <circle cx='12' cy='19' r='1'></circle>
                                  </svg>
                                </a>
                                <div
                                  className='dropdown-menu dropdown-menu-right bg-black'
                                  role='menu'
                                >
                                  <a className='dropdown-item'>See detail </a>
                                  <a className='dropdown-item download'>
                                    Download{" "}
                                  </a>
                                  <a className='dropdown-item edit'>Edit</a>
                                  <div className='dropdown-divider'></div>
                                  <a className='dropdown-item trash'>
                                    Delete item
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className='fixed-table-footer'
                      style={{ display: "none" }}
                    >
                      <table>
                        <tbody>
                          <tr></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='controls-below-table'>
                <div className='table-records-info'>Showing records 1 - 5</div>
                <div className='table-records-pages'>
                  <ul>
                    <li>
                      <a>Previous</a>
                    </li>
                    <li>
                      <a className='current'>1</a>
                    </li>
                    <li>
                      <a>2</a>
                    </li>
                    <li>
                      <a>3</a>
                    </li>
                    <li>
                      <a>4</a>
                    </li>
                    <li>
                      <a>Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ClinicalLab;

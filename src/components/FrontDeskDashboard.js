import React from "react";
import { connect } from "react-redux";
import { viewAppointmentDetail } from "../actions/general.js";

const FrontDeskDashboard = props => {
  const ViewAppointmentDetail = e => {
    e.preventDefault();
    props.viewAppointmentDetail(true);
  };
  return (
    <div className="tab-content">
      <div className="tab-pane active show" id="tab_overview">
        <div className="row">
          <div className="col-sm-12">
            <div className="element-wrapper">
              <div className="element-actions">
                <form className="form-inline justify-content-sm-end">
                  <select className="form-control form-control-sm rounded">
                    <option value="Pending">Today</option>
                    <option value="Active">Last Week </option>
                    <option value="Cancelled">Last 30 Days</option>
                  </select>
                </form>
              </div>
              <h6 className="element-header">Clinical Lab Dashboard</h6>
              <div className="element-content">
                <div className="row">
                  <div className="col-sm-4 col-xxxl-3">
                    <a className="element-box el-tablo" href="#">
                      <div className="label">Pending Requests</div>
                      <div className="value">57</div>
                      <div className="trending trending-up-basic">
                        <span>12%</span>
                        <i className="os-icon os-icon-arrow-up2"></i>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-4 col-xxxl-3">
                    <a className="element-box el-tablo" href="#">
                      <div className="label">Completed Requests</div>
                      <div className="value">457</div>
                      <div className="trending trending-down-basic">
                        <span>12%</span>
                        <i className="os-icon os-icon-arrow-down"></i>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-4 col-xxxl-3">
                    <a className="element-box el-tablo" href="#">
                      <div className="label">Sent Requests</div>
                      <div className="value">125</div>
                      <div className="trending trending-down-basic">
                        <span>9%</span>
                        <i className="os-icon os-icon-arrow-down"></i>
                      </div>
                    </a>
                  </div>
                  <div className="d-none d-xxxl-block col-xxxl-3">
                    <a className="element-box el-tablo" href="#">
                      <div className="label">Refunds Processed</div>
                      <div className="value">294</div>
                      <div className="trending trending-up-basic">
                        <span>12%</span>
                        <i className="os-icon os-icon-arrow-up2"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="element-wrapper">
                  <h6 className="element-header">Today's Appointments</h6>
                  <div className="element-box-tp">
                    <div className="table-responsive">
                      <div
                        aria-labelledby="myLargeModalLabel"
                        className="modal fade bd-example-modal-lg"
                        role="dialog"
                        tabindex="-1"
                        aria-hidden="true"
                        style={{ display: "none" }}
                      >
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              ></h5>
                              <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                              >
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-sm-4">
                                  <div className="user-profile compact">
                                    <div
                                      className="up-head-w"
                                      style={{
                                        backgroundImage: require("../assets/images/bigicon2.png")
                                      }}
                                    >
                                      <div className="up-social">
                                        <a href="#">
                                          <i className="os-icon os-icon-twitter"></i>
                                        </a>
                                        <a href="#">
                                          <i className="os-icon os-icon-facebook"></i>
                                        </a>
                                      </div>
                                      <div className="up-main-info">
                                        <h2 className="up-header">
                                          John Mayers
                                        </h2>
                                        <h6 className="up-sub-header">
                                          Product Designer at Facebook
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="up-controls">
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="value-pair">
                                            <div className="label">Status:</div>
                                            <div className="value badge badge-pill badge-success">
                                              Online
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                          <a
                                            className="btn btn-primary btn-sm"
                                            href="#"
                                          >
                                            <i className="os-icon os-icon-link-3"></i>
                                            <span>Add to Friends</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="up-contents">
                                      <div className="m-b">
                                        <div className="row m-b">
                                          <div className="col-sm-12 b-b">
                                            <div className="el-tablo centered padded-v">
                                              <div className="value">
                                                ₦31,215.00
                                              </div>
                                              <div className="label">
                                                Outstanding Balance
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="padded">
                                          <div className="os-progress-bar primary">
                                            <div className="bar-labels">
                                              <div className="bar-label-left">
                                                <span>Profile Completion</span>
                                                <span className="positive">
                                                  +10
                                                </span>
                                              </div>
                                              <div className="bar-label-right">
                                                <span className="info">
                                                  72/100
                                                </span>
                                              </div>
                                            </div>
                                            <div
                                              className="bar-level-1"
                                              style={{ width: "100%" }}
                                            >
                                              <div
                                                className="bar-level-2"
                                                style={{ width: "80%" }}
                                              >
                                                <div
                                                  className="bar-level-3"
                                                  style={{ width: "30%" }}
                                                ></div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="os-progress-bar primary">
                                            <div className="bar-labels">
                                              <div className="bar-label-left">
                                                <span>Status Unlocked</span>
                                                <span className="positive">
                                                  +5
                                                </span>
                                              </div>
                                              <div className="bar-label-right">
                                                <span className="info">
                                                  45/100
                                                </span>
                                              </div>
                                            </div>
                                            <div
                                              className="bar-level-1"
                                              style={{ width: "100" }}
                                            >
                                              <div
                                                className="bar-level-2"
                                                style={{ width: "30%" }}
                                              >
                                                <div
                                                  className="bar-level-3"
                                                  style={{ width: "10%" }}
                                                ></div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="os-progress-bar primary">
                                            <div className="bar-labels">
                                              <div className="bar-label-left">
                                                <span>Followers</span>
                                                <span className="negative">
                                                  -12
                                                </span>
                                              </div>
                                              <div className="bar-label-right">
                                                <span className="info">
                                                  74/100
                                                </span>
                                              </div>
                                            </div>
                                            <div
                                              className="bar-level-1"
                                              style={{ width: "100" }}
                                            >
                                              <div
                                                className="bar-level-2"
                                                style={{ width: "80%" }}
                                              >
                                                <div
                                                  className="bar-level-3"
                                                  style={{ width: "60%" }}
                                                ></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-8">
                                  <div className="element-wrapper">
                                    <form
                                      id="formValidate"
                                      novalidate="true"
                                    ></form>
                                    <div className="element-info">
                                      <div className="element-info-with-icon">
                                        <div className="element-info-icon">
                                          <div className="os-icon os-icon-wallet-loaded"></div>
                                        </div>
                                        <div className="element-info-text">
                                          <h5 className="element-inner-header">
                                            Patient Profile
                                          </h5>
                                          <div className="element-inner-desc">
                                            Validation of the form is made
                                            possible using powerful validator
                                            plugin for bootstrap.
                                            <a
                                              href="http://1000hz.github.io/bootstrap-validator/"
                                              target="_blank"
                                            >
                                              Learn more about Bootstrap
                                              Validator
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label for=""> Email address</label>
                                      <input
                                        className="form-control"
                                        data-error="Your email address is invalid"
                                        placeholder="Enter email"
                                        required="required"
                                        type="email"
                                      />
                                      <div className="help-block form-text with-errors form-control-feedback"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                type="button"
                              >
                                Close
                              </button>
                              <button className="btn btn-primary" type="button">
                                {" "}
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table className="table table-padded">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th className="text-left">Satus</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span>Today</span>
                              <span className="smaller lighter">1:52am</span>
                            </td>
                            <td className="cell-with-media">
                              <span>
                                Microbiology &amp; Histopatology Test Request
                                for Patient 1234233
                              </span>
                            </td>
                            <td className="nowrap">
                              <span className="status-pill smaller green"></span>
                              <span>Complete</span>
                            </td>
                            <td className="row-actions">
                              <a href="#">
                                <i className="os-icon os-icon-folder"></i>
                              </a>
                              <a
                                href="#"
                                data-target=".bd-example-modal-lg"
                                data-toggle="modal"
                                onClick={ViewAppointmentDetail}
                              >
                                <i className="os-icon os-icon-user"></i>
                              </a>
                              <a className="danger" href="#">
                                <i className="os-icon os-icon-ui-15"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Jan 19th</span>
                              <span className="smaller lighter">3:22pm</span>
                            </td>
                            <td className="cell-with-media">
                              <span>
                                Clinical Chemistry Test Request for Patient
                                768999
                              </span>
                            </td>
                            <td className="nowrap">
                              <span className="status-pill smaller red"></span>
                              <span>Declined</span>
                            </td>
                            <td className="row-actions">
                              <a href="#">
                                <i className="os-icon os-icon-folder"></i>
                              </a>
                              <a href="#">
                                <i className="os-icon os-icon-user"></i>
                              </a>
                              <a className="danger" href="#">
                                <i className="os-icon os-icon-ui-15"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Yesterday</span>
                              <span className="smaller lighter">7:45am</span>
                            </td>
                            <td className="cell-with-media">
                              <span>
                                Hematology Test Request for Patient 89778
                              </span>
                            </td>
                            <td className="nowrap">
                              <span className="status-pill smaller yellow"></span>
                              <span>Pending</span>
                            </td>
                            <td className="row-actions">
                              <a href="#">
                                <i className="os-icon os-icon-folder"></i>
                              </a>
                              <a href="#">
                                <i className="os-icon os-icon-user"></i>
                              </a>
                              <a className="danger" href="#">
                                <i className="os-icon os-icon-ui-15"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Jan 23rd</span>
                              <span className="smaller lighter">2:12pm</span>
                            </td>
                            <td className="cell-with-media">
                              <span>
                                Immunology/Tumour/Infectious Disease Test
                                Request for 243333
                              </span>
                            </td>
                            <td className="nowrap">
                              <span className="status-pill smaller yellow"></span>
                              <span>Pending</span>
                            </td>
                            <td className="row-actions">
                              <a href="#">
                                <i className="os-icon os-icon-folder"></i>
                              </a>
                              <a href="#">
                                <i className="os-icon os-icon-user"></i>
                              </a>
                              <a className="danger" href="#">
                                <i className="os-icon os-icon-ui-15"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Jan 12th</span>
                              <span className="smaller lighter">9:51am</span>
                            </td>
                            <td className="cell-with-media">
                              <span>
                                Microbiology &amp; Histopatology Test Request
                                for Patient 1234233
                              </span>
                            </td>
                            <td className="nowrap">
                              <span className="status-pill smaller green"></span>
                              <span>Complete</span>
                            </td>
                            <td className="row-actions">
                              <a href="#">
                                <i className="os-icon os-icon-folder"></i>
                              </a>
                              <a href="#">
                                <i className="os-icon os-icon-user"></i>
                              </a>
                              <a className="danger" href="#">
                                <i className="os-icon os-icon-ui-15"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Jan 9th</span>
                              <span className="smaller lighter">12:45pm</span>
                            </td>
                            <td className="cell-with-media">
                              <span>
                                Clinical Chemistry Test Request for Patient
                                768999
                              </span>
                            </td>
                            <td className="nowrap">
                              <span className="status-pill smaller yellow"></span>
                              <span>Pending</span>
                            </td>
                            <td className="row-actions">
                              <a href="#">
                                <i className="os-icon os-icon-folder"></i>
                              </a>
                              <a href="#">
                                <i className="os-icon os-icon-user"></i>
                              </a>
                              <a className="danger" href="#">
                                <i className="os-icon os-icon-ui-15"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="controls-below-table">
                        <div className="table-records-info">
                          Showing records 1 - 5
                        </div>
                        <div className="table-records-pages">
                          <ul>
                            <li>
                              <a href="#">Previous</a>
                            </li>
                            <li>
                              <a className="current" href="#">
                                1
                              </a>
                            </li>
                            <li>
                              <a href="#">2</a>
                            </li>
                            <li>
                              <a href="#">3</a>
                            </li>
                            <li>
                              <a href="#">4</a>
                            </li>
                            <li>
                              <a href="#">Next</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { viewAppointmentDetail })(FrontDeskDashboard);

import React, { Component } from "react";
import { connect } from "react-redux";

import { closeModals } from "../actions/general";

class ModalViewAppointment extends Component {
  componentDidMount() {
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    return (
      <div
        className="onboarding-modal modal fade animated show"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content text-center">
            <div className="modal-header  smaller">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.props.closeModals(false)}
              >
                <span aria-hidden="true"> ×</span>
              </button>
            </div>

            <div className="onboarding-content with-gradient">
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="user-profile compact">
                      <div
                        className="up-head-w"
                        style={{
                          backgroundImage: require("../assets/images/profile_bg1.jpg")
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
                          <h2 className="up-header">John Mayers</h2>
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
                            <a className="btn btn-primary btn-sm" href="#">
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
                                <div className="value">₦31,215.00</div>
                                <div className="label">Outstanding Balance</div>
                              </div>
                            </div>
                          </div>
                          <div className="padded">
                            <div className="os-progress-bar primary">
                              <div className="bar-labels">
                                <div className="bar-label-left">
                                  <span>Profile Completion</span>
                                  <span className="positive">+10</span>
                                </div>
                                <div className="bar-label-right">
                                  <span className="info">72/100</span>
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
                                  <span className="positive">+5</span>
                                </div>
                                <div className="bar-label-right">
                                  <span className="info">45/100</span>
                                </div>
                              </div>
                              <div
                                className="bar-level-1"
                                style={{ width: "100%" }}
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
                                  <span className="negative">-12</span>
                                </div>
                                <div className="bar-label-right">
                                  <span className="info">74/100</span>
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
                      <form id="formValidate" novalidate="true"></form>
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
                              Validation of the form is made possible using
                              powerful validator plugin for bootstrap.
                              <a
                                href="http://1000hz.github.io/bootstrap-validator/"
                                target="_blank"
                              >
                                Learn more about Bootstrap Validator
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
              <div className="modal-footer buttons-on-left">
                <button className="btn btn-teal" type="button">
                  {" "}
                  Save changes
                </button>
                <button
                  className="btn btn-link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.props.closeModals(false)}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { closeModals })(ModalViewAppointment);

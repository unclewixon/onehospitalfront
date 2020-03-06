/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import avatar1 from "../../assets/images/avatar1.jpg";
import avatar3 from "../../assets/images/avatar3.jpg";
import avatar4 from "../../assets/images/avatar4.jpg";
import avatar5 from "../../assets/images/avatar5.jpg";
import EditStaff from "../../components/EditStaff";
import Billing from "../../components/Billing";
import DutyRooster from "../../components/DutyRooster";
import ExcuseDuty from "../../components/ExcuseDuty";
import LeaveRequest from "../../components/LeaveRequest";
import Appraisal from "../../components/Appraisal";

import { toggleProfile } from "../../actions/user";

class StaffProfile extends Component {
  state = {
    showEdit: false,
    showBilling: false,
    showDutyRooster: false,
    showAppraisal: false,
    showLeaveRequest: false,
    showExcuseDuty: false
  };

  toggleComponent = name => {
    this.setState({
      showEdit: false,
      showAppraisal: false,
      showBilling: false,
      showDutyRooster: false,
      showLeaveRequest: false,
      showExcuseDuty: false,
      [name]: true
    });
  };

  componentDidMount() {
    // fetch profile
  }

  render() {
    const {
      showEdit,
      showAppraisal,
      showBilling,
      showDutyRooster,
      showLeaveRequest,
      showExcuseDuty
    } = this.state;
    const { userID } = this.props;
    return (
      <div className='content-i'>
        <div className='content-box'>
          <div className='row'>
            <button
              aria-label='Close'
              className='close'
              type='button'
              onClick={() => this.props.toggleProfile(false)}
            >
              <span className='os-icon os-icon-close'></span>
            </button>
            <div className='col-md-12'>
              <div className='support-index'>
                <div className='support-ticket-content-w force-show-folded-info'>
                  <div className='support-ticket-content'>
                    <div className='support-ticket-content-header'>
                      <h4 className='ticket-header'>Deda Staff Profile</h4>
                      <a className='back-to-index'>
                        <i className='os-icon os-icon-arrow-left5'></i>
                        <span>Back</span>
                      </a>
                    </div>
                    <div className='ticket-thread'>
                      <div className='ticket-reply'>
                        <div className='ticket-reply-info'>
                          <a className='author with-avatar'>
                            <img alt='' src={avatar1} />
                            <span>Stella Marris Etubi</span>
                          </a>
                          <div className='actions' href='#'>
                            <i className='os-icon os-icon-ui-46'></i>
                            <div className='actions-list'>
                              <a
                                onClick={() => this.toggleComponent("showEdit")}
                              >
                                <i className='os-icon os-icon-ui-49'></i>
                                <span>Edit</span>
                              </a>
                              <a
                                onClick={() =>
                                  this.toggleComponent("showBilling")
                                }
                              >
                                <i className='os-icon os-icon-ui-09'></i>
                                <span>Billing</span>
                              </a>
                              <a
                                onClick={() =>
                                  this.toggleComponent("showDutyRooster")
                                }
                              >
                                <i className='os-icon os-icon-ui-03'></i>
                                <span>Duty Rooster</span>
                              </a>
                              <a
                                onClick={() =>
                                  this.toggleComponent("showExcuseDuty")
                                }
                              >
                                <i className='os-icon os-icon-ui-03'></i>
                                <span>Excuse Duty</span>
                              </a>
                              <a
                                onClick={() =>
                                  this.toggleComponent("showAppraisal")
                                }
                              >
                                <i className='os-icon os-icon-ui-03'></i>
                                <span>Appraisal</span>
                              </a>
                              <a
                                onClick={() =>
                                  this.toggleComponent("showLeaveRequest")
                                }
                              >
                                <i className='os-icon os-icon-ui-03'></i>
                                <span>Leave Request</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className='element-wrapper'>
                          <div className='element-box'>
                            {showEdit ? <EditStaff /> : null}
                            {showAppraisal ? <Appraisal /> : null}
                            {showBilling ? <Billing /> : null}
                            {showExcuseDuty ? <ExcuseDuty /> : null}
                            {showDutyRooster ? <DutyRooster /> : null}
                            {showLeaveRequest ? <LeaveRequest /> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='support-ticket-info'>
                    <div className='customer'>
                      <div className='avatar' style={{ boxShadow: "none" }}>
                        <img alt='' src={avatar1} />
                      </div>
                      <h4 className='customer-name'>John Mayers</h4>
                      <div className='customer-tickets'>
                        Clinical Laboratory
                      </div>
                    </div>

                    <h5 className='info-header'>A few Colleagues</h5>
                    <div className='info-section'>
                      <ul className='users-list as-tiles'>
                        <li>
                          <a className='author with-avatar'>
                            <div
                              className='avatar'
                              style={{ backgroundImage: `url(${avatar1}` }}
                            ></div>
                            <span>John Mayers</span>
                          </a>
                        </li>
                        <li>
                          <a className='author with-avatar'>
                            <div
                              className='avatar'
                              style={{ backgroundImage: `url(${avatar3}` }}
                            ></div>
                            <span>Phil Collins</span>
                          </a>
                        </li>
                        <li>
                          <a className='author with-avatar'>
                            <div
                              className='avatar'
                              style={{ backgroundImage: `url(${avatar4}` }}
                            ></div>
                            <span>Carl Lewis</span>
                          </a>
                        </li>
                        <li>
                          <a className='author with-avatar'>
                            <div
                              className='avatar'
                              style={{ backgroundImage: `url(${avatar5}` }}
                            ></div>
                            <span>Joshua Kim</span>
                          </a>
                        </li>
                        <li>
                          <a className='add-agent-btn'>
                            <i className='os-icon os-icon-ui-22'></i>
                            <span>Add Agent</span>
                          </a>
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userID: state.user.userID,
    staff: state.user.staff
  };
};

export default connect(mapStateToProps, { toggleProfile })(StaffProfile);

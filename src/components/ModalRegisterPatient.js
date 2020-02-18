import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";
import { closeModals } from "../actions/general";

class ModalRegisterNewPatient extends Component {
  state = {
    index: 0
  };
  componentDidMount() {
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex });
  };

  render() {
    return (
      <div
        class="onboarding-modal modal fade animated show"
        role="dialog"
        style={{ display: "block" }}
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content text-center">
            <div class="modal-header faded smaller">
              <div class="modal-title">
                <span>Registrar:</span>
                <img
                  alt=""
                  class="avatar"
                  src={require("../assets/images/avatar1.jpg")}
                />
                <span>Date: </span>
                <strong>Sep 12th, 2017</strong>
              </div>
              <button
                aria-label="Close"
                class="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.props.closeModals(false)}
              >
                <span aria-hidden="true"> ×</span>
              </button>
            </div>
            <Carousel
              activeIndex={this.state.index}
              onSelect={this.handleSelect}
              controls={false}
            >
              <Carousel.Item>
                <h5 class="form-header">New patient registration</h5>
                <div class="form-desc"></div>
                <div class="onboarding-content with-gradient">
                  <div class="modal-body">
                    <form>
                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">First Name</label>
                            <input
                              class="form-control"
                              placeholder="Enter first name"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Last Name</label>
                            <input
                              class="form-control"
                              placeholder="Enter last name"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Other Name</label>
                            <input
                              class="form-control"
                              placeholder="Enter other names here"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Date of birth</label>
                            <input
                              class="form-control"
                              placeholder="04/12/1978"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Gender</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Marital Status</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Single</option>
                              <option>Married</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">HMO</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Hmo list</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Occupation</label>
                            <input
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Ethnicity</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Igbo</option>
                              <option>Hausa</option>
                              <option>Kanuri</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-8">
                          <div class="form-group">
                            <label for="">Address</label>
                            <input
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Email</label>
                            <input
                              class="form-control"
                              placeholder="example@email.com"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer buttons-on-right">
                    <button
                      class="btn btn-teal"
                      type="button"
                      onClick={() => this.props.closeModals(false)}
                    >
                      {" "}
                      Cancel
                    </button>
                    <button
                      class="btn btn-link"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => this.setState({ index: 1 })}
                    >
                      {" "}
                      Next
                    </button>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <h6 class="form-header">Partner/Next of Kin</h6>
                <div class="form-desc"></div>
                <div class="onboarding-content with-gradient">
                  <div class="modal-body">
                    <form>
                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">First Name</label>
                            <input
                              class="form-control"
                              placeholder="Enter first name"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Last Name</label>
                            <input
                              class="form-control"
                              placeholder="Enter last name"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Other Name</label>
                            <input
                              class="form-control"
                              placeholder="Enter other names here"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Date of birth</label>
                            <input
                              class="form-control"
                              placeholder="04/12/1978"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Gender</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Marital Status</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Single</option>
                              <option>Married</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">HMO</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Hmo list</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Occupation</label>
                            <input
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Ethnicity</label>
                            <select
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            >
                              <option>Igbo</option>
                              <option>Hausa</option>
                              <option>Kanuri</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-8">
                          <div class="form-group">
                            <label for="">Address</label>
                            <input
                              class="form-control"
                              placeholder="Enter your full name..."
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label for="">Email</label>
                            <input
                              class="form-control"
                              placeholder="example@email.com"
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer ">
                    <button
                      class="btn btn-teal buttons-on-left"
                      type="button"
                      onClick={() => this.setState({ index: 0 })}
                    >
                      {" "}
                      Previous
                    </button>
                    <button
                      class="btn btn-teal buttons-on-right"
                      type="button"
                      onClick={() => this.setState({ index: 0 })}
                    >
                      {" "}
                      Submit
                    </button>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { closeModals })(ModalRegisterNewPatient);

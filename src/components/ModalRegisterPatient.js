import React, { Component } from "react";
import { connect } from "react-redux";

import { closeModals } from "../actions/general";

class ModalRegisterNewPatient extends Component {
  componentDidMount() {
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    return (
      <div
        class="onboarding-modal modal fade animated show"
        role="dialog"
        style={{ display: "block" }}
      >
        <div class="modal-dialog modal-centered" role="document">
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

            <div class="onboarding-content with-gradient">
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for=""> Email address</label>
                    <input
                      class="form-control"
                      placeholder="Enter email"
                      type="email"
                    />
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for=""> Password</label>
                        <input
                          class="form-control"
                          placeholder="Password"
                          type="password"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="">Confirm Password</label>
                        <input
                          class="form-control"
                          placeholder="Password"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for=""> Regular select</label>
                    <select class="form-control">
                      <option>Select State</option>
                      <option>New York</option>
                      <option>California</option>
                      <option>Boston</option>
                      <option>Texas</option>
                      <option>Colorado</option>
                    </select>
                  </div>

                  <fieldset class="form-group">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for=""> First Name</label>
                          <input
                            class="form-control"
                            placeholder="First Name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="">Last Name</label>
                          <input
                            class="form-control"
                            placeholder="Last Name"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for=""> Date Picker</label>
                          <div class="date-input">
                            <input
                              class="single-daterange form-control"
                              placeholder="Date of birth"
                              type="text"
                              value="04/12/1978"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label for="">Phone number</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">+234</div>
                            </div>
                            <input
                              class="form-control"
                              placeholder="Twitter Username"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label> Example textarea</label>
                      <textarea class="form-control" rows="3"></textarea>
                    </div>
                  </fieldset>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" />I agree
                      to terms and conditions
                    </label>
                  </div>
                  <div class="form-buttons-w">
                    <button class="btn btn-primary" type="submit">
                      {" "}
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <div class="modal-footer buttons-on-left">
                <button class="btn btn-teal" type="button">
                  {" "}
                  Save changes
                </button>
                <button
                  class="btn btn-link"
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

export default connect(null, { closeModals })(ModalRegisterNewPatient);

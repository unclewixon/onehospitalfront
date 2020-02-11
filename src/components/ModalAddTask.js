import React, { Component } from "react";
import { connect } from "react-redux";

import { closeModals } from "../actions/general";

class ModalAddTask extends Component {
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
                <span>Assigned to:</span>
                <img
                  alt=""
                  class="avatar"
                  src={require("../assets/images/avatar1.jpg")}
                />
                <span>Due Date: </span>
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
                    <label for="">Name</label>
                    <input
                      class="form-control"
                      placeholder="Enter task name"
                      type="text"
                      value="Visit Home Depot to find out what is needed to rebuild backyard patio"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Description</label>
                    <textarea class="form-control" name="" rows="3">
                      The similar diesel only tell deference and likewise,
                      thought, nonetheless, for ahead school. The were
                      organization.
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label for="">Media Attached</label>
                    <div class="attached-media-w">
                      <img src={require("../assets/images/portfolio9.jpg")} />
                      <img src={require("../assets/images/portfolio2.jpg")} />
                      <img src={require("../assets/images/portfolio12.jpg")} />
                      <a class="attach-media-btn" href="#">
                        <i class="os-icon os-icon-ui-22"></i>
                        <span>Add Photos</span>
                      </a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for=""> Due Date</label>
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
                        <label for="">Priority</label>
                        <select class="form-control">
                          <option>High Priority</option>
                          <option>Normal Priority</option>
                          <option>Low Priority</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer buttons-on-left">
                <button class="btn btn-teal" type="button">
                  {" "}
                  Save changes
                </button>
                <button class="btn btn-link" data-dismiss="modal" type="button">
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

export default connect(null, { closeModals })(ModalAddTask);

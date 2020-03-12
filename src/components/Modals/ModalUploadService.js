import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModals } from "../../actions/general";
import {
  uploadService,
  getAllService,
  updateService,
  deleteService
} from "../../actions/settings";
import { confirmAction } from "../../services/utilities";
import { notifySuccess, notifyError } from "../../services/notify";
import waiting from "../../assets/images/waiting.gif";

class ModalUploadService extends Component {
  state = {
    file: null,
    Loading: false
  };

  handleInputChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  onUpload = e => {
    this.setState({ Loading: true });
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    this.props
      .uploadService(data)
      .then(response => {
        this.setState({ Loading: false });
        this.props.closeModals(false);
        notifySuccess("Service file uploaded");
      })
      .catch(error => {
        this.setState({ Loading: false });
      });
  };

  componentDidMount() {
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    const { Loading } = this.state;
    return (
      <div
        className="onboarding-modal modal fade animated show"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-centered" role="document">
          <div className="modal-content text-center">
            <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={() => this.props.closeModals(false)}
            >
              <span className="os-icon os-icon-close"></span>
            </button>
            <div className="onboarding-content with-gradient">
              <h4 className="onboarding-title">Upload Service</h4>
              <div className="onboarding-text">Upload Services</div>
              <div className="pipeline white lined-warning">
                <form onSubmit={this.onUpload}>
                  <h6 className="form-header">New category</h6>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Category Name"
                      type="file"
                      name="file"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-buttons-w">
                    <button
                      className={
                        Loading ? "btn btn-primary disabled" : "btn btn-primary"
                      }
                    >
                      {Loading ? (
                        <img src={waiting} alt="submitting" />
                      ) : (
                        <span> Upload</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  closeModals,
  uploadService,
  getAllService,
  updateService,
  deleteService
})(ModalUploadService);

import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModals } from "../../actions/general";
import { updateService } from "../../actions/settings";
import { confirmAction } from "../../services/utilities";
import { notifySuccess, notifyError } from "../../services/notify";
import waiting from "../../assets/images/waiting.gif";

class ModalEditService extends Component {
  state = {
    name: "",
    tariff: "",
    service_category_id: "",
    previous_cateogry_id: "",
    id: "",
    Loading: false
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateService = e => {
    e.preventDefault();
    this.setState({ Loading: true });
    let { name, tariff, service_category_id, id } = this.state;
    this.props
      .updateService({ name, tariff, service_category_id, id }).then(response => {
        this.setState({ Loading: false });
        notifySuccess("Service updated");
        this.props.closeModals()
      })
      .catch(error => {
        this.setState({ Loading: false });

        notifyError("Error updating service");
      });
  };
  componentDidMount() {
    let { data } = this.props.edit_service;
    let { name, tariff } = this.props.edit_service.data;
    let { service_category_id } = data.category.id;
    let { id } = data;

    this.setState({
      name: name,
      tariff: tariff,
      service_category_id: service_category_id,
      previous_cateogry_id: service_category_id,
      id: id
    });
    console.log(this.state)
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    const { Loading, name, tariff, service_category_id } = this.state;
    const { ServiceCategories } = this.props;
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
              <h4 className="onboarding-title">Edit service</h4>

              <form onSubmit={this.updateService}>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder=" Tariff"
                    type="text"
                    name="tariff"
                    value={tariff}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="service_category_id"
                    value={service_category_id}
                    onChange={this.handleInputChange}
                  >
                    {ServiceCategories.map((category, index) => {
                      return (
                        <option value={category.id} key={index}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-buttons-w">
                  <button
                    onClick={() => this.props.closeModals(false)}
                    className={
                      Loading ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                  >
                    {Loading ? (
                      <img src={waiting} alt="submitting" />
                    ) : (
                      <span> cancel </span>
                    )}
                  </button>
                  <button
                    className={
                      Loading ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                  >
                    {Loading ? (
                      <img src={waiting} alt="submitting" />
                    ) : (
                      <span> save </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    edit_service: state.general.edit_service,
    ServiceCategories: state.settings.service_categories
  };
};

export default connect(mapStateToProps, {
  closeModals,
  updateService
})(ModalEditService);

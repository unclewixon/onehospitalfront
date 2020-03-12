import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAction } from "../services/utilities";
import waiting from "../assets/images/waiting.gif";
import { notifySuccess, notifyError } from "../services/notify";

import {
  addLabTestParameter,
  getAllLabTestParameters,
  updateLabTestParameter,
  deleteLabTestParameters
} from "../actions/settings";

const LabParameter = props => {
  const initialState = {
    name: "",
    edit: false,
    create: true
  };
  const [{ name }, setState] = useState(initialState);
  const [Loading, setLoading] = useState(false);
  const [{ edit, create }, setSubmitButton] = useState(initialState);
  const [data, getDataToEdit] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLabParameter = e => {
    e.preventDefault();
    setLoading(true);
    props
      .addLabTestParameter({ name })
      .then(response => {
        setState({ ...initialState });
        setLoading(false);
        notifySuccess("Lab Parameter created");
      })
      .catch(error => {
        notifyError("Error creating lab parameter");
      });
  };

  const onEditLabParameter = e => {
    setLoading(true);
    e.preventDefault();
    props
      .updateLabTestParameter({ id: data.id, name }, data)
      .then(response => {
        setState({ ...initialState });
        setSubmitButton({ create: true, edit: false });
        setLoading(false);
        notifySuccess("Lab Parameter updated");
      })
      .catch(error => {
        setState({ ...initialState });
        setSubmitButton({ create: true, edit: false });
        setLoading(false);
        notifyError("Error updating lab paramter");
      });
  };

  const onClickEdit = data => {
    setSubmitButton({ edit: true, create: false });
    setState(prevState => ({
      ...prevState,
      name: data.name
    }));
    getDataToEdit(data);
  };

  const cancelEditButton = () => {
    setSubmitButton({ create: true, edit: false });
    setState({ ...initialState });
  };

  const confirmDelete = data => {
    confirmAction(onDeleteLabParameter, data);
  };

  const onDeleteLabParameter = data => {
    props
      .deleteLabTestParameters(data)
      .then(data => {
        notifySuccess("Lab Parameter deleted");
      })
      .catch(error => {
        notifyError("Error deleting lab parameter");
      });
  };

  useEffect(() => {
    if (!loaded) {
      props.getAllLabTestParameters();
    }
    setLoaded(true);
  }, [props, loaded]);

  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
          <div className="pipelines-w">
            <div className="row">
              {props.LabParameters.map((LabParameter, index) => {
                return (
                  <div className="col-lg-4 col-xxl-3" key={index + 1}>
                    <div className="pt-3">
                      <div className="pipeline-item">
                        <div className="pi-controls">
                          <div className="pi-settings os-dropdown-trigger">
                            <i
                              className="os-icon os-icon-ui-49"
                              onClick={() => onClickEdit(LabParameter)}
                            ></i>
                          </div>
                          <div className="pi-settings os-dropdown-trigger">
                            <i
                              className="os-icon os-icon-ui-15"
                              onClick={() => confirmDelete(LabParameter)}
                            ></i>
                          </div>
                        </div>
                        <div className="pi-body">
                          <div className="pi-info">
                            <div className="h6 pi-name">
                              {LabParameter.name}
                            </div>
                            {/* <div className="pi-sub">{LabParameter.name}</div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-xxl-3  d-xxl-block">
        <div className="pipeline white lined-warning">
          <form onSubmit={edit ? onEditLabParameter : onAddLabParameter}>
            <h6 className="form-header">Create Parameter</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Parameter Name"
                type="text"
                onChange={handleInputChange}
                name="name"
                value={name}
              />
            </div>
            <div className="form-buttons-w">
              {create && (
                <button
                  className={
                    Loading ? "btn btn-primary disabled" : "btn btn-primary"
                  }
                >
                  {Loading ? (
                    <img src={waiting} alt="submitting" />
                  ) : (
                    <span> create</span>
                  )}
                </button>
              )}
              {edit && (
                <>
                  <button
                    className={
                      Loading ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                    onClick={cancelEditButton}
                  >
                    <span>{Loading ? "cancel" : "cancel"}</span>
                  </button>
                  <button
                    className={
                      Loading ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                  >
                    {Loading ? (
                      <img src={waiting} alt="submitting" />
                    ) : (
                      <span> edit</span>
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    LabParameters: state.settings.lab_parameters
  };
};

export default connect(mapStateToProps, {
  addLabTestParameter,
  getAllLabTestParameters,
  updateLabTestParameter,
  deleteLabTestParameters
})(LabParameter);

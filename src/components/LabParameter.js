import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLabParameter = e => {
    e.preventDefault();
    props.addLabTestParameter({ name }).then(response => {
      setState({ ...initialState });
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
      })
      .catch(error => {
        setState({ ...initialState });
        setSubmitButton({ create: true, edit: false });
        setLoading(false);
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

  const onDeleteLabParameter = data => {
    props
      .deleteLabTestParameters(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    props.getAllLabTestParameters();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
          <div className="pipelines-w">
            <div className="row">
              {props.LabParameters.map(LabParameter => {
                return (
                  <div className="col-lg-4 col-xxl-3">
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
                              onClick={() => onDeleteLabParameter(LabParameter)}
                            ></i>
                          </div>
                        </div>
                        <div className="pi-body">
                          <div className="pi-info">
                            <div className="h6 pi-name">
                              {LabParameter.name}
                            </div>
                            <div className="pi-sub">{LabParameter.name}</div>
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
                  <span>{Loading ? "creating" : "create"}</span>
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
                    <span>{Loading ? "Saving" : "edit"}</span>
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

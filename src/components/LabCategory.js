import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {confirmAlert} from "react-confirm-alert"

import {
  addLabTestCategory,
  getAllLabTestCategories,
  updateLabTestCategory,
  deleteLabTestCategory
} from "../actions/settings";

const LabCategory = props => {
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

  const onAddLabCategory = e => {
    setLoading(true)
    e.preventDefault();
    props.addLabTestCategory({ name }).then(response => {
      setLoading(false)
      setState({ ...initialState });
    }).catch(error => {
      setLoading(false)
      setState({ ...initialState });
    })
  };

  const onEditLabCategories = e => {
    setLoading(true);
    e.preventDefault();
    props
      .updateLabTestCategory({ id: data.id, name }, data)
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

  const onDeleteLabCategory = data => {
    props
      .deleteLabTestCategory(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const confirmDelete = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this remove ?</p>
            <div style={{}}>
              <button
                className="btn btn-primary"
                style={{ margin: 10 }}
                onClick={onClose}
              >
                No
              </button>
              <button
                className="btn btn-danger"
                style={{ margin: 10 }}
                onClick={() => {
                  onDeleteLabCategory(data);
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        );
      }
    });
  };


  useEffect(() => {
    props.getAllLabTestCategories();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
          <div className="pipelines-w">
            <div className="row">
              {props.LabCategories.map(LabCategory => {
                return (
                  <div className="col-lg-4 col-xxl-3">
                    <div className="pt-3">
                      <div className="pipeline-item">
                        <div className="pi-controls">
                          <div className="pi-settings os-dropdown-trigger">
                            <i
                              className="os-icon os-icon-ui-49"
                              onClick={() => onClickEdit(LabCategory)}
                            ></i>
                          </div>
                          <div className="pi-settings os-dropdown-trigger">
                            <i
                              className="os-icon os-icon-ui-15"
                              onClick={() => confirmDelete(LabCategory)}
                            ></i>
                          </div>
                        </div>
                        <div className="pi-body">
                          <div className="pi-info">
                            <div className="h6 pi-name">{LabCategory.name}</div>
                            <div className="pi-sub">{LabCategory.name}</div>
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
          <form onSubmit={edit ? onEditLabCategories : onAddLabCategory}>
            <h6 className="form-header">Create category</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Category name"
                type="text"
                name="name"
                onChange={handleInputChange}
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
    LabCategories: state.settings.lab_categories
  };
};

export default connect(mapStateToProps, {
  addLabTestCategory,
  getAllLabTestCategories,
  updateLabTestCategory,
  deleteLabTestCategory
})(LabCategory);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {
  addLeaveCategory,
  getAllLeaveCategory,
  updateLeaveCategory,
  deleteLeaveCategory
} from "../actions/settings";

const LeaveCategory = props => {
  const initialState = {
    name: "",
    duration: "",
    save: true,
    edit: false,
    id: ""
  };
  const [{ name, duration }, setState] = useState(initialState);
  const [Loading, setLoading] = useState(false);
  const [{ edit, save }, setSubmitButton] = useState(initialState);
  const [data, getDataToEdit] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLeaveCategory = e => {
    e.preventDefault();
    setLoading(true);
    props
      .addLeaveCategory({ name, duration })
      .then(response => {
        setLoading(false);
        setState({ ...initialState });
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const onEditLeaveCategory = e => {
    setLoading(true);
    e.preventDefault();
    props
      .updateLeaveCategory({ id: data.id, name, duration }, data)
      .then(response => {
        setState({ ...initialState });
        setSubmitButton({ save: true, edit: false });
        setLoading(false);
      })
      .catch(error => {
        setState({ ...initialState });
        setSubmitButton({ save: true, edit: false });
        setLoading(false);
      });
  };

  const onClickEdit = data => {
    setSubmitButton({ edit: true, save: false });
    setState(prevState => ({
      ...prevState,
      name: data.name,
      duration: data.duration,
      id: data.id
    }));
    getDataToEdit(data);
  };

  const onDeleteLeaveCategory = data => {
    props
      .deleteLeaveCategory(data)
      .then(data => {
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  
  // const confirmDelete = data => {
  //   confirmAlert({onclose,
  //     title: "Confirm to delete",
  //     message: "Are you sure to delete this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => onDeleteLeaveCategory(data)
  //       },
  //       {
  //         label: "No",
  //         onClick: () => onclose
  //       }
  //     ]
  //   });
  // };

  const confirmDelete = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this category?</p>
            <div style={{}}>
            <button className="btn btn-primary" style={{margin: 10}} onClick={onClose}>No</button>
            <button className="btn btn-danger" style={{margin: 10}}
              onClick={() => {
                onDeleteLeaveCategory(data)
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

  const cancelEditButton = () => {
    setSubmitButton({ save: true, edit: false });
    setState({ ...initialState });
  };

  useEffect(() => {
    console.log(save, edit);
    props.getAllLeaveCategory();
  }, []);
  return (
    <div className="content-i">
      <div className="content-box">
        <div className="element-wrapper">
          <div className="os-tabs-w mx-1">
            <div className="os-tabs-controls">
              <ul className="nav nav-tabs upper">
                <li className="nav-item">
                  <a
                    aria-expanded="true"
                    className="nav-link active"
                    data-toggle="tab"
                  >
                    Leave categories
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {props.LeaveCategories.map(LeaveCategory => {
                  return (
                    <div className="col-lg-4 col-xxl-3">
                      <div className="pt-3">
                        <div className="pipeline-item">
                          <div className="pi-controls">
                            <div className="pi-settings os-dropdown-trigger">
                              <i
                                className="os-icon os-icon-ui-49"
                                onClick={() => onClickEdit(LeaveCategory)}
                              ></i>
                            </div>
                            <div className="pi-settings os-dropdown-trigger">
                              <i
                                className="os-icon os-icon-ui-15"
                                onClick={() => confirmDelete(LeaveCategory)}
                              ></i>
                            </div>
                          </div>
                          <div className="pi-body">
                            <div className="pi-info">
                              <div className="h6 pi-name">
                                {LeaveCategory.name}
                              </div>
                              <div className="pi-sub">
                                {LeaveCategory.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3  d-xxl-block">
              <div className="element-wrapper">
                <div className="element-box">
                  <form
                    onSubmit={edit ? onEditLeaveCategory : onAddLeaveCategory}
                  >
                    <h5 className="element-box-header">
                      Add New Leave category
                    </h5>
                    <div className="form-group">
                      <label className="lighter" for="">
                        Type of leave
                      </label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input
                          className="form-control"
                          placeholder="Enter leave type"
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="lighter" for="">
                        Leave duration
                      </label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input
                          className="form-control"
                          placeholder="Enter leave duration"
                          type="text"
                          name="duration"
                          value={duration}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-buttons-w text-right compact">
                      {save && (
                        <button
                          className={
                            Loading
                              ? "btn btn-primary disabled"
                              : "btn btn-primary"
                          }
                        >
                          <span>{Loading ? "Saving" : "save"}</span>
                        </button>
                      )}
                      {edit && (
                        <>
                          <button
                            className={
                              Loading
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                            }
                            onClick={cancelEditButton}
                          >
                            <span>{Loading ? "cancel" : "cancel"}</span>
                          </button>
                          <button
                            className={
                              Loading
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                            }
                          >
                            <span>{Loading ? "saving" : "save"}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    LeaveCategories: state.settings.leave_categories
  };
};
export default connect(mapStateToProps, {
  addLeaveCategory,
  getAllLeaveCategory,
  updateLeaveCategory,
  deleteLeaveCategory
})(LeaveCategory);

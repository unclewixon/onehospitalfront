import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {
  addConsultatingRoom,
  getAllConsultatingRooms,
  updateConsultatingRoom,
  deleteConsultatingRoom
} from "../actions/settings";

const ConsultatingRoom = props => {
  const initialState = {
    name: "",
    save: true,
    edit: false,
    id: ""
  };
  const [{ name }, setState] = useState(initialState);
  const [Loading, setLoading] = useState(false);
  const [{ edit, save }, setSubmitButton] = useState(initialState);
  const [data, getDataToEdit] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddConsultatingRoom = e => {
    e.preventDefault();
    setLoading(true);
    props
      .addConsultatingRoom({ name })
      .then(response => {
        setLoading(false);
        setState({ ...initialState });
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const onEditConsultatingRoom = e => {
    setLoading(true);
    e.preventDefault();
    props
      .updateConsultatingRoom({ id: data.id, name }, data)
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

  const onDeleteConsultatingRoom = data => {
    props
      .deleteConsultatingRoom(data)
      .then(data => {
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const confirmDelete = data => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this category?</p>
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
                  onDeleteConsultatingRoom(data);
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
    props.getAllConsultatingRooms();
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
                    Consultating Room
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {props.ConsultatingRooms.map(ConsultatingRoom => {
                  return (
                    <div className="col-lg-4 col-xxl-3">
                      <div className="pt-3">
                        <div className="pipeline-item">
                          <div className="pi-controls">
                            <div className="pi-settings os-dropdown-trigger">
                              <i
                                className="os-icon os-icon-ui-49"
                                onClick={() => onClickEdit(ConsultatingRoom)}
                              ></i>
                            </div>
                            <div className="pi-settings os-dropdown-trigger">
                              <i
                                className="os-icon os-icon-ui-15"
                                onClick={() => confirmDelete(ConsultatingRoom)}
                              ></i>
                            </div>
                          </div>
                          <div className="pi-body">
                            <div className="pi-info">
                              <div className="h6 pi-name">
                                {ConsultatingRoom.name}
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
                    onSubmit={
                      edit ? onEditConsultatingRoom : onAddConsultatingRoom
                    }
                  >
                    <h5 className="element-box-header">
                      Add New Consultating room
                    </h5>
                    <div className="form-group">
                      <label className="lighter" for="">
                        Name
                      </label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input
                          className="form-control"
                          placeholder="Enter Consultating Room"
                          type="text"
                          name="name"
                          value={name}
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
    ConsultatingRooms: state.settings.consultating_room
  };
};
export default connect(mapStateToProps, {
  addConsultatingRoom,
  getAllConsultatingRooms,
  updateConsultatingRoom,
  deleteConsultatingRoom
})(ConsultatingRoom);

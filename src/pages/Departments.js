import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { notifySuccess, notifyError } from "../services/notify";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment
} from "../actions/settings";

const Departments = props => {
  const initialState = {
    name: "",
    description: "",
    headOfDept: ""
  };

  const [{ name, description, headOfDept }, setState] = useState(initialState);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(previouState => setState({ ...previouState, [name]: value }));
  };

  const onCreateDepartment = e => {
    e.preventDefault();
    props.createDepartment({ name, description });
  };

  
  const onDeleteDepartment = data => {
    props
      .deleteDepartment(data)
      .then(data => {
        notifySuccess("Deleted");
      })
      .catch(error => {
        notifyError("Error deleting");
      });
  };

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
                onDeleteDepartment(data)
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
    props.getAllDepartments();
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
                    Deda Departments
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="element-wrapper">
                <div className="element-box-tp">
                  <div className="table-responsive">
                    <table className="table table-padded">
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Head of Department</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.Departments.map(department => {
                          return (
                            <tr>
                              <td className="nowrap">
                                <span
                                  className={
                                    department.isActive
                                      ? "status-pill smaller green"
                                      : "status-pill smaller red"
                                  }
                                ></span>
                                <span>{department.name}</span>
                              </td>
                              <td>
                                <span>{department.description}</span>
                              </td>
                              <td className="row-actions text-right">
                                <a href="#">
                                  <i className="os-icon os-icon-ui-49"></i>
                                </a>
                                <a href="#">
                                  <i className="os-icon os-icon-grid-10"></i>
                                </a>
                                <a
                                  className="danger"
                                  onClick={() => confirmDelete(department)}
                                >
                                  <i className="os-icon os-icon-ui-15"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3  d-xxl-block">
              <div className="element-wrapper">
                <div className="element-box">
                  <form onSubmit={onCreateDepartment}>
                    <h5 className="element-box-header">Add New Department</h5>
                    <div className="form-group">
                      <label className="lighter" for="">
                        Name of Department
                      </label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input
                          className="form-control"
                          placeholder="Enter Department Name..."
                          type="text"
                          value={description}
                          onChange={handleInputChange}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">Dept</div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="lighter" for="">
                        Description
                      </label>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          type="text"
                          name="description"
                        />
                      </div>
                      <select
                        class="form-control"
                        value={name}
                        onChange={handleInputChange}
                      >
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Clinical Laboratory">
                          Clinical Laboratory
                        </option>
                        <option value="Front-Desk">Front-Desk</option>
                      </select>
                    </div>

                    <div className="form-buttons-w text-right compact">
                      <button className="btn btn-primary" type="submit">
                        <span>Save</span>
                      </button>
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
    Departments: state.settings.department
  };
};

export default connect(mapStateToProps, {
  getAllDepartments,
  createDepartment,
  deleteDepartment
})(Departments);

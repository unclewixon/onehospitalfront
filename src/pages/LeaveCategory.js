import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addLeaveCategory,
  getAllLeaveCategory,
  updateLeaveCategory,
  deleteLeaveCategory
} from "../actions/settings";

const LeaveCategory = props => {
  const initialState = {
    name: "",
    duration: ""
  };
  const [{ name, duration }, setState] = useState(initialState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLeaveCategory = e => {
    e.preventDefault();
    props.addLeaveCategory({ name, duration }).then(response => {
      setState({ ...initialState });
    });
  };

  const onDeleteLeaveCategory = data => {
    props
      .deleteLeaveCategory(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
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
                          <i className="os-icon os-icon-ui-49"></i>
                        </div>
                        <div className="pi-settings os-dropdown-trigger">
                          <i
                            className="os-icon os-icon-ui-15"
                            onClick={() => onDeleteLeaveCategory(LeaveCategory)}
                          ></i>
                        </div>
                      </div>
                      <div className="pi-body">
                        <div className="pi-info">
                          <div className="h6 pi-name">{LeaveCategory.name}</div>
                          <div className="pi-sub">{LeaveCategory.duration}</div>
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
                  <form onSubmit={onAddLeaveCategory}>
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
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <label className="lighter" for="">
                        Head of Department
                      </label>
                      <select className="form-control">
                        <option value="">Pharmacy</option>
                        <option value="">Clinical Laboratory</option>
                        <option value="">Front-Desk</option>
                      </select>
                    </div> */}

                    <div className="form-buttons-w text-right compact">
                      <button className="btn btn-primary" href="#">
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
    LeaveCategories: state.settings.leave_categories
  };
};
export default connect(mapStateToProps, {
  addLeaveCategory,
  getAllLeaveCategory,
  updateLeaveCategory,
  deleteLeaveCategory
})(LeaveCategory);

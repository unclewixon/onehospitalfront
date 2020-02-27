import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { notifySuccess, notifyError } from "../services/notify";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment
} from "../actions/settings";

import { createDepartment } from '../actions/settings';
import DepartmentList from '../components/DepartmentList';

const Departments = props => {
	const initialState = {
		name: '',
		description: '',
		headOfDept: '',
	};

  const confirmDelete = data => {
    console.log(data)
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
                  onDeleteDepartment(data);
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

	const onCreateDepartment = e => {
		e.preventDefault();
		props.createDepartment({ name, description });
	};

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
							<DepartmentList />
						</div>
						<div className="col-lg-4 col-xxl-3  d-xxl-block">
							<div className="element-wrapper">
								<div className="element-box">
									<form onSubmit={onCreateDepartment}>
										<h5 className="element-box-header">Add New Department</h5>
										<div className="form-group">
											<label className="lighter">Name of Department</label>
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
											<label className="lighter">Description</label>
											<div className="form-group">
												<textarea
													className="form-control"
													placeholder="Description"
													type="text"
													name="description"
												/>
											</div>
											<select
												className="form-control"
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

export default connect(null, { createDepartment })(Departments);

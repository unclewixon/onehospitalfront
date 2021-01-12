/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import waiting from '../../assets/images/waiting.gif';
import searchingGIF from '../../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import { loadDepartments, updateDepartment } from '../../actions/department';

const Departments = () => {
	const initialState = {
		name: '',
		description: '',
		headOfDept: '',
		hod: '',
		id: '',
	};

	const [{ name, description, headOfDept, hod }, setState] = useState(
		initialState
	);
	const [payload, setPayload] = useState(null);
	const [loading, setLoading] = useState(true);
	const [staffList, setStaffList] = useState([]);
	const [staffLoaded, setStaffLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const departments = useSelector(state => state.department);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onEditDept = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);

			const data = {
				name: name,
				id: payload.id,
				hod_id: headOfDept,
				description,
			};

			const url = `departments/${data.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			if (rs.success) {
				dispatch(updateDepartment(rs.department));
				setState({ ...initialState });
				setSubmitting(false);
				notifySuccess('department updated');
				setPayload(null);
			} else {
				setSubmitting(false);
				notifyError(rs.message || 'Error updating department');
			}
		} catch (error) {
			setSubmitting(false);
			notifyError(error.message || 'Error updating department');
		}
	};

	const onClickEdit = data => {
		setState(prevState => ({
			...prevState,
			name: data.name,
			id: data.id,
			headOfDept: data.hod_id ? data.hod_id : null,
			hod: data.hod_name ? `${data.hod_name}` : null,
			description: data.description,
		}));
		setPayload(data);
	};

	const cancelEditButton = () => {
		setState({ ...initialState });
		setPayload(null);
	};

	const fetchDepartment = useCallback(async () => {
		try {
			const rs = await request('departments', 'GET', true);
			dispatch(loadDepartments(rs));
			setLoading(false);
			await fetchAllStaff();
		} catch (error) {
			setLoading(false);
			notifyError(error.message || 'could not fetch departments!');
		}
	}, [dispatch]);

	const fetchAllStaff = async () => {
		try {
			const rs = await request('hr/staffs', 'GET', true);
			setStaffList(rs);
			setStaffLoaded(true);
		} catch (error) {
			setStaffLoaded(true);
			notifyError(error.message || 'could not departments!');
		}
	};

	useEffect(() => {
		if (loading) {
			fetchDepartment();
		}
	}, [fetchDepartment, loading]);

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
										data-toggle="tab">
										Deda Departments
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-7">
							<div className="element-wrapper">
								<div className="element-box-tp">
									{loading && !staffLoaded ? (
										<div className="loading-block">
											<img alt="searching" src={searchingGIF} />
										</div>
									) : (
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
													{departments.map((department, i) => {
														return (
															<tr key={i}>
																<td className="nowrap">
																	<span>{department.name}</span>
																</td>
																<td>
																	<span>
																		{department.hod_name && department.hod_name}
																	</span>
																</td>
																<td className="row-actions text-right">
																	<a role="button">
																		<i
																			className="os-icon os-icon-ui-49"
																			onClick={() => onClickEdit(department)}
																		/>
																	</a>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
									)}
								</div>
							</div>
						</div>
						{payload && (
							<div className="col-lg-5 col-xxl-3  d-xxl-block">
								<div className="element-wrapper">
									<div className="element-box">
										<form onSubmit={onEditDept}>
											<h5 className="element-box-header">Edit Department</h5>
											<div className="form-group">
												<label className="lighter">Department Name</label>
												<input
													className="form-control"
													placeholder="Department Name"
													type="text"
													name="name"
													value={name}
													onChange={handleInputChange}
													readOnly
												/>
											</div>
											<div className="form-group">
												<label className="lighter">Head of Department</label>
												<select
													className="form-control"
													name="headOfDept"
													onChange={handleInputChange}
													placeholder="Select staff"
													value={headOfDept || ''}>
													{!hod && <option value="">Select staff</option>}
													{staffList.map((hod, i) => {
														return (
															<option value={hod.id} key={i}>
																{hod.first_name} {hod.last_name}
															</option>
														);
													})}
												</select>
											</div>
											<div className="form-group">
												<label className="lighter">Description</label>
												<div className="form-group">
													<textarea
														className="form-control"
														placeholder="Description"
														type="text"
														name="description"
														value={description || ''}
														onChange={handleInputChange}
													/>
												</div>
											</div>

											<div className="form-buttons-w text-right compact">
												<button
													className="btn btn-secondary ml-3"
													onClick={cancelEditButton}
													type="button">
													<span>cancel</span>
												</button>
												<button
													className="btn btn-primary"
													disabled={submitting}>
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														<span> edit</span>
													)}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Departments;

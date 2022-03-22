/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, staffname } from '../../services/utilities';
import { loadDepartments, updateDepartment } from '../../actions/department';
import TableLoading from '../../components/TableLoading';

const Departments = () => {
	const initialState = {
		name: '',
		description: '',
		id: '',
	};

	const [{ name, description }, setState] = useState(initialState);
	const [payload, setPayload] = useState(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [hasAppointment, setHasAppointment] = useState(false);
	const [staff, setStaff] = useState(null);

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
				hod_id: staff?.id || '',
				description,
				has_appointment: hasAppointment ? 1 : 0,
			};

			const url = `departments/${data.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			if (rs.success) {
				dispatch(updateDepartment(rs.department));
				setState({ ...initialState });
				setHasAppointment(false);
				setSubmitting(false);
				setStaff(null);
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
			description: data.description,
		}));
		setPayload(data);
		setHasAppointment(data.has_appointment === 1);
		setStaff(data.staff);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const cancelEditButton = () => {
		setState({ ...initialState });
		setPayload(null);
		setHasAppointment(false);
		setStaff(null);
	};

	const fetchDepartment = useCallback(async () => {
		try {
			const rs = await request('departments', 'GET', true);
			dispatch(loadDepartments(rs));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			notifyError(error.message || 'could not fetch departments!');
		}
	}, [dispatch]);

	useEffect(() => {
		if (loading) {
			fetchDepartment();
		}
	}, [fetchDepartment, loading]);

	const getOptionsStaff = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Departments</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<div className="element-wrapper">
								<div className="element-box-tp">
									{loading ? (
										<TableLoading />
									) : (
										<div className="table-responsive">
											<table className="table table-striped">
												<thead>
													<tr>
														<th>Department</th>
														<th>Has Appointment</th>
														<th>Head of Department</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													{departments.map((item, i) => {
														return (
															<tr key={i}>
																<td className="nowrap">{item.name}</td>
																<td>
																	<span
																		className={`badge ${
																			item.has_appointment === 0
																				? 'badge-secondary'
																				: 'badge-primary'
																		}`}
																	>
																		{item.has_appointment === 0 ? 'No' : 'Yes'}
																	</span>
																</td>
																<td>
																	{item.staff ? staffname(item.staff) : '--'}
																</td>
																<td className="row-actions">
																	<a role="button">
																		<i
																			className="os-icon os-icon-ui-49"
																			onClick={() => onClickEdit(item)}
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
							<div className="col-lg-5">
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
												<AsyncSelect
													isClearable
													getOptionValue={option => option.id}
													getOptionLabel={option => staffname(option)}
													defaultOptions
													name="staff"
													value={staff}
													loadOptions={getOptionsStaff}
													onChange={e => setStaff(e)}
													placeholder="Search staff"
												/>
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
											<div className="form-group">
												<label className="lighter" htmlFor="has_appt">
													Has Appointment
												</label>
												<input
													className="form-check-input ml-4"
													id="has_appt"
													name="has_appointment"
													type="checkbox"
													onChange={() => setHasAppointment(!hasAppointment)}
													checked={hasAppointment}
													value={1}
												/>
											</div>
											<div className="form-buttons-w text-right compact">
												<button
													className="btn btn-secondary ml-3"
													onClick={cancelEditButton}
													type="button"
												>
													<span>cancel</span>
												</button>
												<button
													className="btn btn-primary"
													disabled={submitting}
												>
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

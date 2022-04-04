/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import { loadDepartments } from '../../actions/department';
import TableLoading from '../../components/TableLoading';

const Appraisal = () => {
	const initialState = {
		id: '',
		dname: '',
		weight: '',
		keyFocus: '',
		kpis: '',
		objective: '',
	};

	// eslint-disable-next-line no-unused-vars
	const [{ id, dname, keyFocus, weight, kpis, objective }, setState] =
		useState(initialState);
	const [payload, setPayload] = useState(null);
	const [payloadView, setPayloadView] = useState(null);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [staffList, setStaffList] = useState([]);
	const [staffLoaded, setStaffLoaded] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [indicators, setIndicators] = useState([]);

	const departments = useSelector(state => state.department);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onDeleteInd = async data => {
		try {
			const url = `hr/appraisal/delete-indicator/${data.id}`;
			await request(url, 'DELETE', true);
			const rs = indicators.filter(ind => ind.id !== data.id);
			setIndicators(rs);
			notifySuccess('Indicator  deleted');
		} catch (error) {
			notifyError(error.message || 'Error deleting Indicator ');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteInd, data);
	};

	const saveIndicator = async e => {
		try {
			e.preventDefault();
			setSubmitting(true);

			const { id, weight, keyFocus, kpis, objective } = initialState;

			const data = {
				departmentId: id,
				keyFocus,
				weight,
				kpis,
				objective,
			};

			const url = `hr/appraisal/save-appraisal-indicator`;
			const rs = await request(url, 'POST', true, data);
			if (rs.success) {
				setState({ ...initialState });
				setSubmitting(false);
				notifySuccess('indicator saved');
				setPayload(null);
			} else {
				setSubmitting(false);
				notifyError(rs.message || 'Error saving indicator');
			}
		} catch (error) {
			setSubmitting(false);
			notifyError(error.message || 'Error saving indicator');
		}
	};

	const onClickAdd = data => {
		setState(prevState => ({
			...prevState,
			id: data.id,
			dname: data.name,
		}));
		setPayload({});
		setPayloadView(null);
	};

	const onClickView = data => {
		fetchIndicators(data.id);
		setState(prevState => ({
			...prevState,
			id: data.id,
			dname: data.name,
		}));
		setPayloadView(data);
		setPayload(null);
	};

	const fetchIndicators = async id => {
		try {
			const rs = await request(
				`hr/appraisal/department-indicators/${id}`,
				'GET',
				true
			);
			setIndicators(rs);
		} catch (error) {
			notifyError(error.message || 'could not department indicators!');
		}
	};

	const cancelEditButton = () => {
		setState({ ...initialState });
		setPayload(null);
	};

	const cancelViewButton = () => {
		setState({ ...initialState });
		setPayloadView(null);
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
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Appraisal Indicators</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4">
							<div className="element-wrapper">
								<div className="element-box-tp">
									{loading && !staffLoaded ? (
										<TableLoading />
									) : (
										<div className="table-responsive">
											<table className="table table-striped">
												<thead>
													<tr>
														<th>Department</th>
													</tr>
												</thead>
												<tbody>
													{departments.map((department, i) => {
														return (
															<tr key={i}>
																<td className="nowrap">{department.name}</td>
																<td>
																	{department.hod_name && department.hod_name}
																</td>
																<td className="row-actions">
																	<Tooltip title="Add indicator">
																		<a
																			onClick={() => onClickAdd(department)}
																			className="cursor"
																		>
																			<i className="os-icon os-icon-plus"></i>
																		</a>
																	</Tooltip>
																	<Tooltip title="View Indicators">
																		<a
																			onClick={() => onClickView(department)}
																			className="cursor"
																		>
																			<i className="os-icon os-icon-eye"></i>
																		</a>
																	</Tooltip>
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
							<div className="col-lg-7 col-xxl-5  d-xxl-block">
								<div className="element-wrapper">
									<div className="element-box">
										<form onSubmit={saveIndicator}>
											<h5 className="element-box-header">
												New Indicator for {dname}
											</h5>
											<div className="form-group">
												<label className="lighter">Key Focus</label>
												<input
													className="form-control"
													placeholder="Enter focus"
													type="text"
													name="keyFocus"
													value={keyFocus}
													onChange={handleInputChange}
												/>
											</div>

											<div className="form-group">
												<label className="lighter">Objective</label>
												<input
													className="form-control"
													name="objective"
													onChange={handleInputChange}
													placeholder="Enter objective"
													value={objective}
												/>
											</div>

											<div className="form-group">
												<label className="lighter">Weight</label>
												<input
													className="form-control"
													name="weight"
													onChange={handleInputChange}
													placeholder="Weight in %"
													value={weight}
												/>
											</div>

											<div className="form-group">
												<label className="lighter">Description</label>
												<div className="form-group">
													<textarea
														className="form-control"
														placeholder="kpis"
														type="text"
														name="kpis"
														value={kpis}
														onChange={handleInputChange}
													/>
												</div>
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
														<span> Save</span>
													)}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						)}

						{payloadView && (
							<div className="col-lg-8 col-xxl-5  d-xxl-block">
								<div className="element-wrapper">
									<div className="element-box">
										<h5 className="element-box-header">
											Indicators for {dname}
										</h5>
										<div className="table-responsive mt-4">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Key Focus</th>
														<th>Objective</th>
														<th>KPIs (Assessment Criteria)</th>
														<th>Weight</th>
													</tr>
												</thead>
												<tbody>
													{indicators?.map((ind, i) => {
														return (
															<tr key={i}>
																<td>{ind.keyFocus}</td>
																<td>{ind.objective}</td>
																<td>{ind.kpis}</td>
																<td>{ind.weight}%</td>
																<td>
																	<Tooltip title="Delete Indicator">
																		<a
																			onClick={() => confirmDelete(ind)}
																			className="cursor"
																		>
																			<i className="os-icon os-icon-trash"></i>
																		</a>
																	</Tooltip>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>

										<div className="form-buttons-w text-right compact">
											<button
												className="btn btn-secondary ml-3"
												onClick={cancelViewButton}
												type="button"
											>
												<span>cancel</span>
											</button>
										</div>
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

export default Appraisal;

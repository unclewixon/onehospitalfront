/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import Popover from 'antd/lib/popover';
import { useDispatch } from 'react-redux';
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { request, formatPatientId, itemRender } from '../../services/utilities';
import AssignBed from './AssignBed';
import Pagination from 'antd/lib/pagination';
import waiting from '../../assets/images/waiting.gif';
import DatePicker from 'antd/lib/date-picker';
import { startBlock, stopBlock } from '../../actions/redux-block';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';
import { toggleProfile } from '../../actions/user';

const { RangePicker } = DatePicker;

const InPatientCare = () => {
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState(null);
	const [patient, setPatient] = useState('');
	const [loaded, setLoaded] = useState(false);

	const limit = 24;

	const doHide = val => {
		//e.preventDefault();
		setVisible(val);
	};

	const dispatch = useDispatch();

	const fetchPatients = async page => {
		try {
			const p = page || 1;
			const url = `patient/admissions?page=${p}&limit=${limit}&patient_id=${patient ||
				''}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setMeta(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			const arr = [...result];
			setAdmittedPatients(arr);
			setFiltering(false);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('error fetching patients');
			dispatch(stopBlock());
			setFiltering(false);
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option => `${option.other_names} ${option.surname}`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const url = `patient/admissions?page=1&limit=${limit}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				const arr = [...result];
				setAdmittedPatients(arr);
				setLoaded(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				setLoaded(false);
				dispatch(stopBlock());
			}
		};

		if (!loaded || patient === '') {
			fetch();
		}
	}, [loaded, patient]);

	useEffect(() => {}, [admittedPatients]);

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [loading]);

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchPatients();
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetchPatients(nextPage);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient', admitted: true };
		dispatch(toggleProfile(true, info));
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	return (
		<>
			<h6 className="element-header">Patients on Admission</h6>
			<div className="element-box m-0 p-3">
				<div className="col-md-12 p-4">
					<form className="row">
						<div className="form-group col-md-3">
							<label htmlFor="patient_id">Patient</label>

							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient_id"
								id="patient_id"
								loadOptions={getOptions}
								onChange={e => {
									console.log(e);
									setPatient(e?.id);
								}}
								placeholder="Search patients"
							/>
						</div>
						<div className="form-group col-md-3">
							<label>Admitted Between - To</label>
							<RangePicker onChange={e => dateChange(e)} />
						</div>

						<div className="form-group col-md-3 mt-4">
							<div
								className="btn btn-sm btn-primary btn-upper text-white"
								onClick={e => doFilter(e)}>
								<i className="os-icon os-icon-ui-37" />
								<span>
									{filtering ? (
										<img src={waiting} alt="submitting" />
									) : (
										'Filter'
									)}
								</span>
							</div>
						</div>
					</form>
				</div>

				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>
									<div className="th-inner sortable both">Patient Name</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Patient ID</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Gender</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">
										Date of Admission
									</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Admitted By</div>
									<div className="fht-cell"></div>
								</th>
								<th>
									<div className="th-inner sortable both">Room/Floor</div>
									<div className="fht-cell"></div>
								</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan="5" className="text-center">
										<img alt="searching" src={searchingGIF} />
									</td>
								</tr>
							) : (
								admittedPatients.map((item, i) => {
									console.log(item);
									return (
										<tr key={i}>
											<td>{`${item?.patient_name}`}</td>
											<td>{formatPatientId(item?.patient_id)}</td>
											<td>{item?.patient_gender}</td>
											<td>
												{moment(item?.admission_date).format(
													'DD-MMM-YYYY h:mm A'
												)}
											</td>
											<td>{item?.admitted_by}</td>
											<td className="row-actions">
												{item?.suite ? (
													<Tooltip title="Room/Floor">
														{item?.suite + '/' + item?.floor}
													</Tooltip>
												) : (
													<Tooltip title="Assign Bed">
														<Popover
															title=""
															overlayClassName="select-bed"
															content={
																<AssignBed
																	item={item}
																	admittedPatients={admittedPatients}
																	setAdmittedPatients={admittedPatients =>
																		setAdmittedPatients(admittedPatients)
																	}
																	doHide={doHide}
																/>
															}
															trigger="click"
															visible={visible}
															onVisibleChange={status => setVisible(status)}>
															<a className="primary">
																<i className="os-icon os-icon-layers" />
															</a>
														</Popover>
													</Tooltip>
												)}

												<Tooltip title="View Request">
													<a onClick={() => showProfile(item.patient)}>
														<i className="os-icon os-icon-documents-03" />
													</a>
												</Tooltip>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>

					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} patients`}
								itemRender={itemRender}
								onChange={current => onNavigatePage(current)}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default InPatientCare;

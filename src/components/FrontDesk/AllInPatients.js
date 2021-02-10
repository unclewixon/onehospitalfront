/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
// import DatePicker from 'antd/lib/date-picker';
// import Select from 'react-select';
// import Tooltip from 'antd/lib/tooltip';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';
import waiting from '../../assets/images/waiting.gif';
import DatePicker from 'antd/lib/date-picker';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, formatPatientId, itemRender } from '../../services/utilities';
// import { loadAllPatients } from '../../actions/patient';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
// import waiting from '../../assets/images/waiting.gif';
import ModalPatientDetails from '../../components/Modals/ModalPatientDetails';
import { toggleProfile } from '../../actions/user';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';
// const { RangePicker } = DatePicker;

// const customStyle = {
// 	control: (provided, state) => ({
// 		...provided,
// 		minHeight: '24px !important',
// 		height: '2rem',
// 		width: '12rem',
// 	}),
// };
const { RangePicker } = DatePicker;

const AllInPatients = () => {
	const [loaded, setLoaded] = useState(false);
	const [admittedPatients, setAdmittedPatients] = useState(null);
	const activeRequest = null;
	// const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	// const [filtering, setFiltering] = useState(false);
	// const [patientName, setPatientName] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState(null);
	const [patient, setPatient] = useState('');

	const limit = 24;

	const dispatch = useDispatch();

	const onModalClick = () => {
		setShowModal(!showModal);
	};

	const showProfile = patient => {
		const info = { patient, type: 'patient', admitted: true };
		dispatch(toggleProfile(true, info));
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

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchPatients();
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		fetchPatients(nextPage);
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
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

	const formRow = (data, i) => {
		return (
			<tr className="" data-index="0" data-id="20" key={i}>
				<td>{i + 1}</td>
				<td>{`${data?.patient_name}`}</td>
				<td>{`${data?.patient_filenumber}`}</td>
				<td>{`${data?.patient_gender} `}</td>
				<td>{`${data?.suite} `}</td>
				<td>{moment(data?.admission_date).format('DD/MM/YYYY')}</td>
				<td>{data?.admitted_by}</td>
				<td className="row-actions text-right">
					<Tooltip title="View Request">
						<a onClick={() => showProfile(data.patient)}>
							<i className="os-icon os-icon-documents-03" />
						</a>
					</Tooltip>
				</td>
			</tr>
		);
	};

	const table = () =>
		admittedPatients
			? admittedPatients.map((patient, i) => {
					return formRow(patient, i);
			  })
			: [];

	return (
		<div>
			{activeRequest ? (
				<ModalPatientDetails
					activeRequest={activeRequest}
					showModal={showModal}
					onModalClick={onModalClick}
				/>
			) : null}
			<div className="element-box">
				<div className="col-md-12 p-4">
					<h6 className="element-header">Filter by:</h6>

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
					{
						<table className="table table-striped">
							<thead>
								<tr>
									<th>
										<div className="th-inner "></div>
										<div className="fht-cell"></div>
									</th>
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
										<div className="th-inner sortable both">Suite</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Admission Date</div>
										<div className="fht-cell"></div>
									</th>
									<th>
										<div className="th-inner sortable both">Admitted By</div>
										<div className="fht-cell"></div>
									</th>
								</tr>
							</thead>
							<tbody>
								{loaded ? (
									<tr>
										<td colSpan="6" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								) : (
									<>{table()}</>
								)}
							</tbody>
						</table>
					}

					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} transactions`}
								itemRender={itemRender}
								onChange={current => onNavigatePage(current)}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// patient: state.user.patient,
		allInPatients: state.patient.allInPatients,
	};
};

export default withRouter(connect(mapStateToProps)(AllInPatients));

import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'antd/lib/date-picker';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import {
	formatDate,
	request,
	itemRender,
	updateImmutable,
} from '../../services/utilities';
import { CK_ENCOUNTER } from '../../services/constants';
import AppointmentTable from '../../components/Doctor/AppointmentTable';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import SSRStorage from '../../services/storage';
import { updateEncounterData } from '../../actions/patient';

const storage = new SSRStorage();

const { RangePicker } = DatePicker;
const limit = 15;

const Appointments = () => {
	const [state, setState] = useState({
		filtering: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		meta: null,
	});
	const [loading, setLoading] = useState(true);
	const [allAppointments, setAllAppointments] = useState([]);
	const [patientId, setPatientId] = useState('');

	const profile = useSelector(state => state.user.profile);

	const dispatch = useDispatch();

	const getAppointments = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const staff = profile.details;
				const p = page || 1;
				const startDate = state.startDate || '';
				const endDate = state.endDate || '';
				const url = `front-desk/appointments?page=${p}&limit=${limit}&canSeeDoctor=1&startDate=${startDate}&endDate=${endDate}&patient_id=${patientId}&staff_id=${staff.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setAllAppointments(result);
				setState({ ...state, filtering: false, meta });
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				setState({ ...state, filtering: false });
				notifyError(error.message || 'could not fetch transactions');
			}
		},
		[dispatch, patientId, profile, state]
	);

	const loadEncounter = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);
		if (data && data.patient_id !== '') {
			dispatch(updateEncounterData(data.encounter, data.patient_id));
		}
	}, [dispatch]);

	useEffect(() => {
		if (loading) {
			getAppointments();
			loadEncounter();
			setLoading(false);
		}
	}, [getAppointments, loadEncounter, loading]);

	const updateAppointment = useCallback(
		e => {
			const updatedAppointments = updateImmutable(allAppointments, e);
			setAllAppointments([...updatedAppointments]);
		},
		[allAppointments]
	);

	const doFilter = e => {
		e.preventDefault();
		setState({ ...state, filtering: true });
		getAppointments();
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		getAppointments(nextPage);
	};

	const dateChange = e => {
		const date = e.map(d => {
			return formatDate(d._d);
		});

		setState({
			...state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	const { filtering, meta } = state;

	return (
		<div className="element-wrapper">
			<div className="element-actions">
				<form style={{ display: 'flex' }}>
					<div className="form-group">
						<input
							style={{ height: '32px' }}
							id="search"
							className="form-control"
							name="search"
							onChange={e => setPatientId(e.target.value)}
							placeholder="search for patient: emr id, name, phone number, email"
						/>
					</div>
					<div className="mr-2">
						<RangePicker onChange={e => dateChange(e)} />
					</div>
					<div>
						<button
							className="btn btn-sm btn-primary btn-upper text-white filter-btn"
							onClick={doFilter}>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</button>
					</div>
				</form>
			</div>
			<h6 className="element-header">Appointment History </h6>
			<div className="element-content">
				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						<AppointmentTable
							appointments={allAppointments}
							loading={loading}
							updateAppointment={updateAppointment}
						/>
					</div>

					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} appointments`}
								itemRender={itemRender}
								onChange={current => onNavigatePage(current)}
								showSizeChanger={false}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default withRouter(Appointments);

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';
import TableLoading from '../TableLoading';
import Pagination from 'antd/lib/pagination';
import { request, itemRender } from '../../services/utilities';
import moment from 'moment';
import waiting from '../../assets/images/waiting.gif';
import DatePicker from 'antd/lib/date-picker';
import PatientAppointmentTable from './PatientAppointmentTable';

const { RangePicker } = DatePicker;

class AppointmentHistoryTable extends Component {
	state = {
		loading: false,
		role: null,
		showModal: false,
		filtering: false,
		startDate: '',
		endDate: '',
		appointments: [],
		meta: null,
	};

	fetchAppointments = async page => {
		const { startDate, endDate } = this.state;
		const patient_id = this.props.patient.id;
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const rs = await request(
				`front-desk/appointments?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.setState({
				loading: false,
				filtering: false,
				meta,
				appointments: arr,
			});
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch appointments');
		}
	};

	componentDidMount() {
		this.fetchAppointments();
	}

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchTransaction(nextPage);
	};

	doFilter = async e => {
		e.preventDefault();
		this.fetchTransaction();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});
		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	openPermissionModal = role => () => {
		document.body.classList.add('modal-open');
		this.setState({ role, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ role: null, showModal: false });
	};

	render() {
		const { loading, filtering, meta, appointments } = this.state;
		return (
			<div className="row">
				<div className="m-0 w-100">
					{loading ? (
						<TableLoading />
					) : (
						<div className="">
							<div className="table-responsive">
								<div
									id="dataTable1_wrapper"
									className="dataTables_wrapper container-fluid dt-bootstrap4">
									<form className="row">
										<div className="form-group col-md-4">
											<label>From - To</label>
											<RangePicker onChange={e => this.dateChange(e)} />
										</div>
										<div className="form-group col-md-2 mt-4">
											<div
												className="btn btn-sm btn-primary btn-upper text-white filter-btn"
												onClick={this.doFilter}>
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

									<div className="element-box-tp">
										<div className="table-responsive">
											<PatientAppointmentTable
												appointments={appointments}
												loading={loading}
												today={false}
											/>
										</div>
									</div>

									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} appointments`}
												itemRender={itemRender}
												onChange={current => this.onNavigatePage(current)}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roles: state.role.roles,
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, { startBlock, stopBlock })(
	AppointmentHistoryTable
);

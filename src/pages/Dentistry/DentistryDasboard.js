import React, { Component } from 'react';
import { connect } from 'react-redux';
import { request } from '../../services/utilities';
import { API_URI } from '../../services/constants';
import Tooltip from 'antd/lib/tooltip';
import { notifyError } from '../../services/notify';
import { loadDentistryRequests } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import uniqBy from 'lodash.uniqby';
import DatePicker from 'antd/lib/date-picker';
import ModalDentistry from '../../components/Modals/ModalDentistry';
import Select from 'react-select';
const { RangePicker } = DatePicker;

class DentistryDashboard extends Component {
	state = {
		loaded: false,
		patientId: '',
		filtering: false,
		activeRequest: null,
		showModal: false,
		startDate: moment(Date.now())
			.subtract(1, 'days')
			.format('YYYY-MM-DD'),
		endDate: moment(Date.now()).format('YYYY-MM-DD'),
	};
	componentDidMount() {
		this.fetchPhysio();
	}

	fetchPhysio = async patientId => {
		const { startDate, endDate } = this.state;
		this.setState({ loaded: true });
		try {
			const rs = await request(
				patientId
					? `patient/${patientId}/request/dentistry?startDate=${startDate}&endDate=${endDate}`
					: `patient/requests/dentistry?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);
			this.props.loadDentistryRequests(rs);
			return this.setState({ loaded: false, filtering: false });
		} catch (error) {
			notifyError('error fetching dentistry requests');
			this.setState({ loaded: false, filtering: false });
		}
	};

	getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	calculateAmount = arr => {
		let sum = 0;
		arr.forEach(val => {
			let amt = val.amount;
			if (amt === undefined) {
				amt = 0;
			}
			try {
				sum += parseInt(amt);
			} catch (e) {
				sum += 0;
			}
		});
		return sum;
	};

	onModalClick = () => {
		this.setState({
			showModal: !this.state.showModal,
		});
	};

	formRow = (data, i) => {
		return (
			<tr className="" data-index="0" data-id="20" key={i}>
				<td>{i + 1}</td>
				<td>
					<span className="text-bold">{data.patient_name}</span>
				</td>
				<td>
					<span className="text-bold">
						{this.getRequests(data.requestBody)}
					</span>
				</td>
				<td>{this.calculateAmount(data.requestBody)}</td>
				<td>{moment(data.createdAt).format('DD-MM-YYYY LT')}</td>

				<td className="text-center">
					<span className="badge badge-secondary">
						{data.status === 0 ? 'pending' : 'completed'}
					</span>
				</td>
				<td className="row-actions text-right">
					<Tooltip title="View Request">
						<a
							onClick={() => {
								this.onModalClick();
								this.setState({ activeRequest: data });
							}}>
							<i className="os-icon os-icon-documents-03" />
						</a>
					</Tooltip>
					<Tooltip title="Print Request">
						<a className="ml-2">
							<i className="icon-feather-printer" />
						</a>
					</Tooltip>
				</td>
			</tr>
		);
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

	table = () =>
		this.props &&
		this.props.dentistryRequests &&
		this.props.dentistryRequests.length
			? this.props.dentistryRequests.map((physio, i) => {
					return this.formRow(physio, i);
			  })
			: [];

	filterEntries = () => {
		this.setState({ filtering: true });
		this.fetchPhysio(this.state.patientId);
	};

	render() {
		const { loaded, filtering } = this.state;

		const filteredNames =
			this.props &&
			this.props.dentistryRequests &&
			this.props.dentistryRequests.length
				? this.props.dentistryRequests.map(patient => {
						return {
							value: patient.patient_id,
							label: patient.patient_name,
						};
				  })
				: [];

		const filteredOptions = uniqBy(filteredNames, 'value');

		const customStyle = {
			control: (provided, state) => ({
				...provided,
				minHeight: '24px !important',
				height: '2rem',
				width: '12rem',
			}),
		};

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="row">
						<div className="col-md-12">
							{this.state.activeRequest ? (
								<ModalDentistry
									activeRequest={this.state.activeRequest}
									showModal={this.state.showModal}
									onModalClick={this.onModalClick}
								/>
							) : null}
							<h6 className="element-header">Recent Requests:</h6>

							<form className="row">
								<div className="form-group col-md-6">
									<label>From - To</label>
									<RangePicker onChange={e => this.dateChange(e)} />
								</div>
								<div className="form-group col-md-3">
									<label className="mr-2 " htmlFor="id">
										Patient
									</label>
									<Select
										styles={customStyle}
										id="patientId"
										isSearchable={true}
										name="patientId"
										options={filteredOptions}
										onChange={e => this.setState({ patientId: e.value })}
									/>
								</div>
								<div className="form-group col-md-3 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={() => {
											this.filterEntries();
										}}>
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
						<div className="col-sm-12">
							<div className="element-box">
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
														<div className="th-inner sortable both">
															Patient Name
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Specialization
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">Amount</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Requested Date
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner sortable both">
															Request Status
														</div>
														<div className="fht-cell"></div>
													</th>
													<th>
														<div className="th-inner "></div>
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
													<>{this.table()}</>
												)}
											</tbody>
										</table>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		dentistryRequests: state.patient.dentistryRequests,
	};
};
export default connect(mapStateToProps, { loadDentistryRequests })(
	DentistryDashboard
);

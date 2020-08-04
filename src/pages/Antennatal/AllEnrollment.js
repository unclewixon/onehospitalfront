import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { patientAPI, transactionsAPI, API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';
import { loadAntennatal } from '../../actions/patient';
import { viewAntenatalDetail } from '../../actions/general';
import _ from 'lodash';

const { RangePicker } = DatePicker;
export class AllEnrollment extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
	};

	componentDidMount() {
		this.fetchAntennatal();
	}

	fetchAntennatal = async () => {
		const { startDate, endDate } = this.state;
		try {
			this.setState({ loading: true });
			// console.log(
			// 	`${API_URI}/patientAPI}/antenatal/list?startDate=${startDate}&endDate=${endDate}`
			// );
			const rs = await request(
				`patientAPI}/antenatal/list?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);

			this.props.loadAntennatal(rs);
			console.log(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching antenatal enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ ...this.state, filtering: true });
		this.fetchAntennatal();
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	loadDetail = id => {
		this.props.viewAntenatalDetail(true, id);
	};

	tableBody = () => {
		return this.props.antennatal.map((el, i) => {
			return (
				<tr>
					<td className="text-center">
						{moment(el.createdAt).format('DD-MM-YYYY')}
					</td>
					<td className="text-center">
						{el.surname || ''} {el.other_names || ''}
					</td>
					<td className="text-center">{el.l_m_p}</td>
					<td className="text-center">{el.e_o_d}</td>
					<td className="text-center">{el.bookingPeriod}</td>
					<td className="text-center">{el.lmpSource}</td>
					<td className="text-center">{el.enrollmentPackage}</td>

					<td className="text-center">
						{Array.isArray(el.requiredCare)
							? el.requiredCare.join(',')
							: el.requiredCare}
					</td>

					<td className="text-right row-actions">
						<Tooltip title="view details">
							<a className="secondary" onClick={() => this.loadDetail(el.id)}>
								<i className="os-icon os-icon-eye" />
							</a>
						</Tooltip>
						<Tooltip title="Edit Request">
							<a className="secondary">
								<i className="os-icon os-icon-edit-32" />
							</a>
						</Tooltip>
						<Tooltip title="Delete Request">
							<a className="danger">
								<i className="os-icon os-icon-ui-15" />
							</a>
						</Tooltip>
					</td>
				</tr>
			);
		});
	};

	render() {
		const { filtering, loading } = this.state;
		const { location } = this.props;
		const path = location.pathname.split('/').pop();
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								path === '' ? 'btn-outline-primary' : ''
							}`}
							to="/antennatal">
							Dashboard
						</Link>
						<Link
							className={`btn btn-primary ${
								path === 'all-enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/antennatal/all-enrol">
							All Enrollment
						</Link>
						<Link
							className={`btn btn-primary ${
								path === 'enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/antennatal/enrol">
							New Enrollment
						</Link>
					</div>
					<h6 className="element-header">Enrollment</h6>
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="col-md-12 px-0">
									<form className="row">
										<div className="form-group col-md-6 pr-0">
											<label>From - To</label>
											<RangePicker
												onChange={e => this.dateChange(e)}
												defaultValue={[
													this.state.startDate,
													this.state.endDate,
												]}
											/>
										</div>

										<div className="form-group col-md-1 pr-0 mt-4">
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
								</div>

								<div className="element-box">
									<div className="table table-responsive">
										<table id="table" className="table">
											<thead>
												<tr className="text-bold">
													<td className="text-center">Date</td>
													<td className="text-center">Patient Name</td>

													<td className="text-center">LMP</td>
													<td className="text-center">EOD</td>
													<td className="text-center">Booking Period</td>
													<td className="text-center">LMP Source</td>
													<td className="text-center">Package</td>
													<td className="text-center">Required Care</td>

													<td className="text-center">Actions</td>
												</tr>
											</thead>
											<tbody>
												{loading ? (
													<tr>
														<td colSpan="8" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : !_.isEmpty(this.props.antennatal) ? (
													this.tableBody()
												) : (
													<tr>
														{' '}
														<td colSpan="9" className="text-center">
															No antenatal enrolment
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
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
		antennatal: state.patient.antennatal,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadAntennatal, viewAntenatalDetail })(
		AllEnrollment
	)
);

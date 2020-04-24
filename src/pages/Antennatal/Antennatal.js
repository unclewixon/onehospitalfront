/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { Switch, Link, withRouter, Route } from 'react-router-dom';
import { patientAPI, transactionsAPI, API_URI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { loadAntennatal } from '../../actions/patient';
import { viewAntenatalDetail } from '../../actions/general';
import _ from 'lodash';
export class Antennatal extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		status: '',
	};

	componentDidMount() {
		this.fetchAntennatal();
	}

	fetchAntennatal = async () => {
		const { status } = this.state;

		let startDate = moment()
			.subtract(1, 'd')
			.format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');

		try {
			this.setState({ loading: true });

			console.log(
				`${API_URI}${patientAPI}/antenatal/list?startDate=${startDate}&endDate=${endDate}`
			);
			const rs = await request(
				`${API_URI}${patientAPI}/antenatal/list?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);

			this.props.loadAntennatal(rs);
			console.log(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching today Antennatal enroll request');
			this.setState({ loading: false });
		}
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
		const page = location.pathname.split('/').pop();
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								page === '' ? 'btn-outline-primary' : ''
							}`}
							to="/antennatal">
							Dashboard
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'all-enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/antennatal/all-enrol">
							All Enrollment
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/antennatal/enrol">
							New Enrollment
						</Link>
					</div>
					<h6 className="element-header">Antennatal Dashboard</h6>
					<div className="row">
						<div className="col-md-12">
							<div className="element-content">
								<div className="row">
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">TOTAL OPEN</div>
											<div className="value text-center">57</div>
										</a>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">TOTAl FILLED</div>
											<div className="value text-center">457</div>
										</a>
									</div>
									<div className="col-sm-4 col-xxxl-4">
										<a className="element-box el-tablo">
											<div className="label">LOW STOCK</div>
											<div className="value text-center">125</div>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-12">
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
													<td colSpan="9" className="text-center">
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
		);
	}
}

const mapStateToProps = state => {
	return {
		antennatal: state.patient.antennatal,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadAntennatal, viewAntenatalDetail })(Antennatal)
);

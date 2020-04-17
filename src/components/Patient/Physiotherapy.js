/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { request } from '../../services/utilities';
import { API_URI, patientAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
class Physiotherapy extends Component {
	state = {
		loaded: false,
	};
	componentDidMount() {
		this.fetchPhysio();
	}

	fetchPhysio = async () => {
		this.setState({ loaded: true });
		const { patient } = this.props;
		try {
			const rs = await request(
				`${API_URI}${patientAPI}/${patient.id}/request/physiotherapy?startDate=&endDate=`,
				'GET',
				true
			);

			console.log(rs);
			this.props.getPhysiotherapies(rs);

			this.setState({ loaded: false });
		} catch (error) {
			this.setState({ loaded: false });
			notifyError('error fetching physiotherapy requests for the patient');
		}
	};

	convertToIndividualRequest = data => {
		let newData = [];
		data.forEach(value => {
			if (Array.isArray(value.requestBody)) {
				value.requestBody.forEach(val => {
					newData.push({
						id: value.id,
						isActive: value.isActive,
						createdAt: value.createdAt,
						updateAt: value.updateAt,
						requestType: value.requestType,
						requestBody: {
							amount: val.amount,
							service_id: val.service_id,
							specialization: val.specialization,
							sessionCount: val.sessionCount,
						},
						status: value.status,
					});
				});
			} else {
				newData.push(value);
			}
		});

		return newData;
	};

	table = () =>
		this.props.physiotherapies &&
		this.convertToIndividualRequest(this.props.physiotherapies).map(
			(physio, i) => {
				return (
					<tr className="" data-index="0" key={i}>
						<td className="text-center">
							<span className="text-bold">{i + 1}</span>
						</td>
						<td className="text-center">
							{moment(physio.createdAt).format('DD-MM-YYYY')}
						</td>
						<td className="text-center">{physio.requestBody.specialization}</td>
						<td className="text-center">{physio.requestBody.sessionCount}</td>

						<td className="text-center">
							{physio.status === 0 ? (
								<>
									<span className="status-pill smaller yellow"></span>
									<span>Pending</span>
								</>
							) : (
								<>
									<span className="status-pill smaller green"></span>
									<span>Approved</span>
								</>
							)}
						</td>
						<td className="row-actions text-right">
							<Tooltip title="View Request">
								<a href="#">
									<i className="os-icon os-icon-documents-03" />
								</a>
							</Tooltip>
							<Tooltip title="Print Request">
								<a className="ml-2" href="#">
									<i className="icon-feather-printer" />
								</a>
							</Tooltip>
						</td>
					</tr>
				);
			}
		);

	render() {
		const { location, physiotherapies } = this.props;
		const { loaded } = this.state;
		console.log(physiotherapies);
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary"
							to={`${location.pathname}#physiotherapy-request`}>
							<i className="os-icon os-icon-plus"></i>
							New Physiotherapy Request
						</Link>
					</div>
					<h6 className="element-header">Physiotherapy Requests</h6>
					<div className="element-box">
						<div className="bootstrap-table">
							<div className="fixed-table-toolbar">
								<div className="bs-bars float-left">
									<div id="toolbar"></div>
								</div>
							</div>
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}>
								<div className="fixed-table-body">
									<table
										id="table"
										className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th className="text-center">S/N</th>
												<th className="text-center">Request Date</th>
												<th className="text-center">Specialization</th>
												<th className="text-center">Session Count</th>
												<th className="text-center">Request Status</th>
												<th className="text-right" />
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		physiotherapies: state.patient.physiotherapies,
	};
};

export default withRouter(connect(mapStateToProps, {})(Physiotherapy));

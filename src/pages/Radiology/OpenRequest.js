/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URI, socket, patientAPI } from '../../services/constants';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { request, formatNumber, confirmAction } from '../../services/utilities';
import ClinicalLabItem from '../../components/ClinicalLabItem';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';
import _ from 'lodash';
const { RangePicker } = DatePicker;
class OpenRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchRadiology();
	}
	fetchRadiology = async () => {
		const { startDate, endDate, status } = this.state;

		try {
			this.setState({ loading: true });
			console.log(
				`${API_URI}${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}&status=${status}`
			);
			const rs = await request(
				`${API_URI}${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);

			this.props.loadRadiology(rs);
			console.log(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all radiology request');
			this.setState({ loading: false, filtering: false });
		}
	};

	convertToIndividualRequest = data => {
		console.log(data);
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
						},
						status: value.status,
						patientName:
							(value.patient.surname ? value.patient.surname : '') +
							' ' +
							(value.patient.other_names ? value.patient.other_names : ''),
						fileNumber: value.patient.fileNumber,
					});
				});
			} else {
				newData.push(value);
			}
		});

		return newData.reverse();
	};
	render() {
		const { filtering, loading } = this.state;
		const { location, radiology } = this.props;
		return (
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
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Open Request</h6>
						<div className="element-box">
							<div className="table table-responsive">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th className="text-center">Request Date</th>
											<th className="text-center">Patiend ID</th>
											<th className="text-center">Patient Name</th>
											<th className="text-center">Request</th>
											<th>
												<div className="th-inner "></div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											radiology &&
											this.convertToIndividualRequest(radiology).map(
												request => {
													return (
														<tr data-index="0" data-id="20">
															<td className="text-center">
																{moment(request.createdAt).format('DD-MM-YYYY')}
															</td>
															<td className="text-center">
																{request.fileNumber}
															</td>
															<td className="text-center">
																{request.patientName}
															</td>
															<td className="text-center">
																{request.requestBody.specialization}
															</td>

															<td className="text-right row-actions">
																<Tooltip title="Receive Request">
																	<a className="secondary">
																		<i className="os-icon os-icon-folder-plus" />
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
												}
											)
										)}
									</tbody>
								</table>
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
		radiology: state.patient.radiology,
	};
};

export default connect(mapStateToProps, { loadRadiology })(OpenRequest);

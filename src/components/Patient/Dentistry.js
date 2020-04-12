/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { loadDentistryRequests } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import { API_URI, patientAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';

const Dentistry = props => {
	const [loading, setLoading] = useState(false);

	// const [dataLoaded, setDataLoaded] = useState(false);
	const fetchDentistry = async () => {
		setLoading(true);
		const { patient } = props;
		try {
			const rs = await request(
				`${API_URI}/patient/${patient.id}/request/dentistry?startDate=&endDate=`,
				'GET',
				true
			);

			console.log(rs);
			props.loadDentistryRequests(rs);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			notifyError('error fetching dentistry requests for the patient');
		}
	};

	const convertToIndividualRequest = data => {
		console.log(data);
		if (data) {
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
						});
					});
				} else {
					newData.push(value);
				}
			});

			return newData;
		}
		return [];
	};

	const getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	const calculateAmount = arr => {
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

	const tableBody = () => {
		let requests = convertToIndividualRequest(props.dentistryRequests);
		return props.dentistryRequests?.length > 0 ? (
			props.dentistryRequests.map((data, i) => {
				return (
					<tr className="" data-index="0" data-id="20" key={i}>
						<td>{i + 1}</td>
						<td>
							<span className="text-bold">{getRequests(data.requestBody)}</span>
						</td>
						<td>{calculateAmount(data.requestBody)}</td>
						<td>{moment(data.createdAt).format('DD-MM-YYYY LT')}</td>

						<td className="text-center">
							<span className="badge badge-secondary">
								{data.status === 0 ? 'pending' : 'completed'}
							</span>
						</td>
						<td className="row-actions text-right">
							<Tooltip title="View Request">
								<a>
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
			})
		) : (
			<tr>
				<td colSpan="6" className="text-center">
					No dentistry request
				</td>
			</tr>
		);
	};
	useEffect(() => {
		fetchDentistry();
	}, []);
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary"
						to={`${props.location.pathname}#dentistry-request`}>
						<i className="os-icon os-icon-plus"></i>
						New Dentistry Request
					</Link>
				</div>
				<h6 className="element-header">Dentistry Requests</h6>
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
											<th>S/N</th>
											<th>Specialization</th>
											<th>Amount (&#x20A6;)</th>
											<th>Requested Date</th>
											<th className="text-center">Request Status</th>
											<th className="text-right" />
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td colSpan="6" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											<>{tableBody()}</>
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
};

const mapStateToProps = state => {
	console.log(state.patient.dentistryRequests);
	return {
		patient: state.user.patient,
		dentistryRequests: state.patient.dentistryRequests,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadDentistryRequests })(Dentistry)
);

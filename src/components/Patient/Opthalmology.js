/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { loadOpthalmologyRequests } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';

import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';

const Opthalmology = props => {
	const [loading, setLoading] = useState(true);

	const convertToIndividualRequest = data => {
		console.log(data);
		let newData = [];
		// data.forEach(value => {
		// 	if (Array.isArray(value.requestBody)) {
		// 		value.requestBody.forEach(val => {
		// 			newData.push({
		// 				id: value.id,
		// 				isActive: value.isActive,
		// 				createdAt: value.createdAt,
		// 				updateAt: value.updateAt,
		// 				requestType: value.requestType,
		// 				requestBody: {
		// 					amount: val.amount,
		// 					service_id: val.service_id,
		// 					specialization: val.specialization,
		// 				},
		// 				status: value.status,
		// 			});
		// 		});
		// 	} else {
		// 		newData.push(value);
		// 	}
		// });

		return newData;
	};

	const tableBody = () => {
		let requests = convertToIndividualRequest(props.opthalmologyRequests);
		console.log(requests);
		return requests.length > 0 ? (
			requests.map((data, i) => {
				return (
					<tr className="" data-index="0" data-id="20" key={i}>
						<td>{i + 1}</td>
						<td>
							<span className="text-bold">
								{data.requestBody.specialization}
							</span>
						</td>
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
					No Opthalmology request
				</td>
			</tr>
		);
	};

	useEffect(() => {
		const fetchImaging = async () => {
			try {
				const { patient } = props;
				const rs = await request(
					`patient/${patient.id}/request/opthalmology?startDate=&endDate=`,
					'GET',
					true
				);

				props.loadOpthalmologyRequests(rs);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				notifyError('error fetching imaging requests for the patient');
			}
		};

		if (loading) {
			fetchImaging();
		}
	}, [loading, props]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						className="btn btn-primary"
						to={`${props.location.pathname}#opthalmology-request`}>
						<i className="os-icon os-icon-plus"></i>
						New Opthalmology Request
					</Link>
				</div>
				<h6 className="element-header">Opthalmology Requests</h6>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						<div className="fixed-table-container pb-0">
							<div className="fixed-table-body">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>S/N</th>
											<th>Specialization</th>
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
	return {
		patient: state.user.patient,
		opthalmologyRequests: state.patient.opthalmologyRequests,
	};
};
export default withRouter(
	connect(mapStateToProps, { loadOpthalmologyRequests })(Opthalmology)
);

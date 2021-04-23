/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import TableLoading from './TableLoading';
import { toggleProfile } from '../actions/user';
import { startBlock, stopBlock } from '../actions/redux-block';
import ProfilePopup from './Patient/ProfilePopup';

class ProcedureBlock extends Component {
	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	showProcedure = patient => {
		const info = { patient, type: 'procedure' };
		this.props.toggleProfile(true, info);
	};

	render() {
		const { loading, procedures, patient } = this.props;

		return loading ? (
			<TableLoading />
		) : (
			<table id="table" className="table table-theme v-middle table-hover">
				<thead>
					<tr>
						<th>
							<div className="th-inner sortable both">Request Date</div>
							<div className="fht-cell"></div>
						</th>
						<th>
							<div className="th-inner sortable both">Procedure</div>
							<div className="fht-cell"></div>
						</th>
						{!patient && (
							<th>
								<div className="th-inner sortable both">Patient</div>
								<div className="fht-cell"></div>
							</th>
						)}
						<th>
							<div className="th-inner sortable both">By</div>
							<div className="fht-cell"></div>
						</th>
						<th>
							<div className="th-inner sortable both">Status</div>
							<div className="fht-cell"></div>
						</th>
						<th>
							<div className="th-inner sortable both">Resources</div>
							<div className="fht-cell"></div>
						</th>
						<th>
							<div className="th-inner sortable both">Scheduled</div>
							<div className="fht-cell"></div>
						</th>
						<th>
							<div className="th-inner"></div>
							<div className="fht-cell"></div>
						</th>
					</tr>
				</thead>
				<tbody>
					{procedures.map((procedure, i) => {
						return procedure.items.map((item, j) => {
							return (
								<tr key={j} className={procedure.urgent ? 'urgent' : ''}>
									<td>
										<span>
											{moment(procedure.createdAt).format('DD-MM-YYYY h:mmA')}
										</span>
									</td>
									<td>
										<p className="item-title text-color m-0">
											<a
												className="cursor"
												onClick={() => this.showProcedure(procedure.patient)}>
												{item.service.name}
											</a>
										</p>
									</td>
									{!patient && (
										<td>
											<p className="item-title text-color m-0">
												<Tooltip
													title={<ProfilePopup patient={procedure.patient} />}>
													<a
														className="cursor"
														onClick={() => this.showProfile(procedure.patient)}>
														{procedure.patient_name}
													</a>
												</Tooltip>
											</p>
										</td>
									)}
									<td>
										<a className="item-title text-color">
											{procedure.created_by}
										</a>
									</td>
									<td>
										{item.cancelled === 0 && item.transaction.status === 0 && (
											<span className="badge badge-warning">
												Awaiting Payment
											</span>
										)}
										{item.cancelled === 1 && (
											<span className="badge badge-danger">cancelled</span>
										)}
									</td>
									<td></td>
									<td></td>
									<td className="row-actions"></td>
								</tr>
							);
						});
					})}
				</tbody>
			</table>
		);
	}
}

export default connect(null, { startBlock, stopBlock, toggleProfile })(
	ProcedureBlock
);

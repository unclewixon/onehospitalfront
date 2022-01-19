/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';

import TableLoading from './TableLoading';
import { toggleProfile } from '../actions/user';
import {
	request,
	confirmAction,
	updateImmutable,
	formatDate,
} from '../services/utilities';
import { startBlock, stopBlock } from '../actions/redux-block';
import ProfilePopup from './Patient/ProfilePopup';
import { notifySuccess, notifyError } from '../services/notify';
import ModalScheduleDate from './Modals/ModalScheduleDate';

class IVFBlock extends Component {
	state = {
		procedue: null,
		showRSModal: false,
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	showProcedure = (patient, procedure) => {
		const info = { patient, type: 'procedure', item: procedure };
		this.props.toggleProfile(true, info);
	};

	canceProcedureTest = async data => {
		try {
			const { procedures } = this.props;
			this.props.startBlock();
			const url = `requests/${data.item_id}/delete-request?type=procedure&request_id=${data.id}`;
			const rs = await request(url, 'DELETE', true);
			const procedure_request = procedures.find(l => l.id === data.id);
			const newItem = {
				...procedure_request,
				...rs.data,
				items: rs.data.items,
			};
			const newItems = updateImmutable(procedures, newItem);
			this.props.updateProcedure(newItems);
			notifySuccess('procedure request cancelled!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error cancelling procedure');
			this.props.stopBlock();
		}
	};

	cancelProcedure = procedure => {
		confirmAction(
			this.canceProcedureTest,
			procedure,
			'Do you want to cancel this procedure?',
			'Are you sure?'
		);
	};

	scheduleDate = procedure => {
		document.body.classList.add('modal-open');
		this.setState({ showRSModal: true, procedure });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ showRSModal: false, procedure: null });
	};

	startProcedureTest = async procedure => {
		try {
			const { procedures } = this.props;
			this.props.startBlock();
			const url = `requests/${procedure.item_id}/start`;
			const data = {
				date: moment().format('DD-MM-YYYY HH:mm:ss'),
			};
			const rs = await request(url, 'PUT', true, data);
			const procedure_request = procedures.find(l => l.id === procedure.id);
			const newItem = { ...procedure_request, items: [rs.data] };
			const newItems = updateImmutable(procedures, newItem);
			this.props.updateProcedure(newItems);
			this.props.stopBlock();
			notifySuccess('procedure started!');
		} catch (error) {
			console.log(error);
			notifyError('Error starting procedure');
			this.props.stopBlock();
		}
	};

	startProcedure = procedure => {
		confirmAction(
			this.startProcedureTest,
			procedure,
			'Do you want to start this procedure?',
			'Are you sure?'
		);
	};

	concludeProcedure = async procedure => {
		try {
			const { procedures } = this.props;
			this.props.startBlock();
			const url = `requests/${procedure.item_id}/end`;
			const data = {
				date: moment().format('DD-MM-YYYY HH:mm:ss'),
			};
			const rs = await request(url, 'PUT', true, data);
			const procedure_request = procedures.find(l => l.id === procedure.id);
			const newItem = { ...procedure_request, items: [rs.data] };
			const newItems = updateImmutable(procedures, newItem);
			this.props.updateProcedure(newItems);
			this.props.stopBlock();
			notifySuccess('procedure concluded!');
		} catch (error) {
			console.log(error);
			notifyError('Error concluding procedure');
			this.props.stopBlock();
		}
	};

	finishProcedure = procedure => {
		confirmAction(
			this.concludeProcedure,
			procedure,
			'Do you want to end this procedure? You wont be able to make entries after closing this procedure.',
			'Are you sure?'
		);
	};

	render() {
		const { loading, procedures, patient, updateProcedure } = this.props;
		const { procedure, showRSModal } = this.state;

		return loading ? (
			<TableLoading />
		) : (
			<>
				<table id="table" className="table table-theme v-middle table-hover">
					<thead>
						<tr>
							<th>Request Date</th>
							<th>Procedure</th>
							{!patient && <th>Patient</th>}
							<th>By</th>
							<th>Status</th>
							<th>Resources</th>
							<th>Scheduled</th>
							<th>
								<div className="th-inner"></div>
							</th>
						</tr>
					</thead>
					<tbody>
						{procedures.map((data, i) => {
							return data.items.map((item, j) => {
								return (
									<tr key={j} className={data.urgent ? 'urgent' : ''}>
										<td>{formatDate(data.createdAt, 'DD-MMM-YYYY h:mmA')}</td>
										<td>
											<p className="item-title text-color m-0">
												<a
													className="cursor"
													onClick={() => this.showProcedure(data.patient, item)}
												>
													{item.service.name}
												</a>
											</p>
										</td>
										{!patient && (
											<td>
												<p className="item-title text-color m-0">
													<Tooltip
														title={<ProfilePopup patient={data.patient} />}
													>
														<a
															className="cursor"
															onClick={() => this.showProfile(data.patient)}
														>
															{data.patient_name}
														</a>
													</Tooltip>
													{data.patient.admission_id && (
														<Tooltip title="Admitted">
															<i className="fa fa-hospital-o text-danger ml-1" />
														</Tooltip>
													)}
												</p>
											</td>
										)}
										<td>
											<a className="item-title text-color">{data.created_by}</a>
										</td>
										<td>
											{item.cancelled === 0 && (
												<>
													{item.transaction?.status === 0 ? (
														<span className="badge badge-warning">
															Awaiting Payment
														</span>
													) : (
														<>
															{!item.scheduledDate && (
																<span className="badge badge-secondary">
																	Open
																</span>
															)}
															{item.scheduledDate && !item.startedDate && (
																<span className="badge badge-primary">
																	Scheduled
																</span>
															)}
															{item.startedDate && !item.finishedDate && (
																<span className="badge badge-info text-white">
																	Started
																</span>
															)}
															{item.finishedDate && (
																<span className="badge badge-success">
																	Concluded
																</span>
															)}
														</>
													)}
												</>
											)}
											{item.cancelled === 1 && (
												<span className="badge badge-danger">cancelled</span>
											)}
										</td>
										<td>
											{item.resources
												? JSON.parse(item.resources).join(', ')
												: '--'}
										</td>
										<td>
											{item.transaction.status === 1 ||
											item.transaction.status === -1 ? (
												<>
													{!item.scheduledDate ? (
														<a
															onClick={() =>
																this.scheduleDate({
																	id: data.id,
																	item_id: item.id,
																})
															}
															className="btn btn-sm btn-primary px-2 py-1"
														>
															schedule date
														</a>
													) : (
														`${item.scheduledStartDate} => ${item.scheduledEndDate}`
													)}
												</>
											) : (
												'--'
											)}
										</td>
										<td className="row-actions">
											{item.scheduledDate && !item.startedDate && (
												<a
													onClick={() =>
														this.startProcedure({
															id: data.id,
															item_id: item.id,
														})
													}
													className="btn btn-sm btn-primary py-1 text-white"
												>
													Start
												</a>
											)}
											{item.startedDate && !item.finishedDate && (
												<a
													onClick={() =>
														this.finishProcedure({
															id: data.id,
															item_id: item.id,
														})
													}
													className="btn btn-sm btn-primary py-1 text-white"
												>
													Conclude
												</a>
											)}
											{item.cancelled === 0 && !item.scheduledDate && (
												<Tooltip title="Cancel Lab Test">
													<a
														className="danger"
														onClick={() =>
															this.cancelProcedure({
																id: data.id,
																item_id: item.id,
															})
														}
													>
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											)}
										</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
				{procedure && showRSModal && (
					<ModalScheduleDate
						closeModal={this.closeModal}
						procedure={procedure}
						procedures={procedures}
						updateProcedure={updateProcedure}
					/>
				)}
			</>
		);
	}
}

export default connect(null, { startBlock, stopBlock, toggleProfile })(
	IVFBlock
);

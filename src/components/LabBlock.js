/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import ModalFillLabResult from './Modals/ModalFillLabResult';
import ModalViewLabResult from './Modals/ModalViewLabResult';
import ModalViewLabNote from './Modals/ModalViewLabNote';
import { request, confirmAction, updateImmutable } from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import TableLoading from './TableLoading';
import ProfilePopup from './Patient/ProfilePopup';
import { toggleProfile } from '../actions/user';

class LabBlock extends Component {
	state = {
		labTest: null,
		lab: null,
		showFLModal: false,
		showVLModal: false,
		showVNModal: false,
	};

	cancelLabTest = async data => {
		try {
			const { labs } = this.props;
			this.props.startBlock();
			const url = `requests/${data.item_id}/delete-request?type=lab&request_id=${data.id}`;
			const rs = await request(url, 'DELETE', true);
			const lab_request = labs.find(l => l.id === data.id);
			const newItem = { ...lab_request, ...rs.data, items: rs.data.items };
			const newLabs = updateImmutable(labs, newItem);
			this.props.updateLab(newLabs);
			notifySuccess('lab request cancelled!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error cancelling lab request');
			this.props.stopBlock();
		}
	};

	cancelLab = labId => {
		confirmAction(
			this.cancelLabTest,
			labId,
			'Do you want to cancel this lab test?',
			'Are you sure?'
		);
	};

	fillResult = lab => {
		document.body.classList.add('modal-open');
		this.setState({ showFLModal: true, lab });
	};

	viewResult = lab => {
		document.body.classList.add('modal-open');
		this.setState({ showVLModal: true, lab });
	};

	viewNote = lab => {
		document.body.classList.add('modal-open');
		this.setState({ showVNModal: true, lab });
	};

	doPrint = async (lab, printGroup) => {
		try {
			this.props.startBlock();
			const url = `requests/${lab.id}/print?type=lab&print_group=${
				printGroup ? 1 : 0
			}`;
			const rs = await request(url, 'GET', true);
			window.open(rs.file, '_blank');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error printing lab request');
			this.props.stopBlock();
		}
	};

	printResult = (lab, isGrouped) => {
		if (isGrouped) {
			confirmAlert({
				customUI: ({ onClose }) => {
					const printSingle = async () => {
						onClose();
						await this.doPrint(lab, false);
					};

					const printGroup = async () => {
						onClose();
						await this.doPrint(lab, true);
					};

					return (
						<div className="custom-ui text-center">
							<h1 className="">Print Lab Result</h1>
							<div>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={printSingle}>
									Print Single
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={printGroup}>
									Print Group
								</button>
							</div>
						</div>
					);
				},
			});
		} else {
			this.doPrint(lab, false);
		}
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			labTest: null,
			showFLModal: false,
			showVLModal: false,
			showVNModal: false,
		});
	};

	receive = async data => {
		try {
			this.props.startBlock();
			const { labs } = this.props;
			const url = `requests/${data.item_id}/receive-specimen`;
			const rs = await request(url, 'PATCH', true);
			const lab_request = labs.find(l => l.id === data.lab_id);
			const newItem = { ...lab_request, items: [rs.data] };
			const newLabs = updateImmutable(labs, newItem);
			this.props.updateLab(newLabs);
			notifySuccess('lab specimen received!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error receiving lab specimen');
			this.props.stopBlock();
		}
	};

	receiveSpecimen = data => {
		confirmAction(
			this.receive,
			data,
			'Do you want to receive specimen?',
			'Are you sure?'
		);
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	render() {
		const { loading, labs, patient, updateLab } = this.props;
		const { showFLModal, showVLModal, showVNModal, lab } = this.state;
		return loading ? (
			<TableLoading />
		) : (
			<>
				<table id="table" className="table table-theme v-middle table-hover">
					<thead>
						<tr>
							<th>
								<div className="th-inner sortable both">Request Date</div>
								<div className="fht-cell"></div>
							</th>
							<th>
								<div className="th-inner sortable both">ID</div>
								<div className="fht-cell"></div>
							</th>
							<th>
								<div className="th-inner sortable both">Lab</div>
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
								<div className="th-inner sortable both">Note</div>
								<div className="fht-cell"></div>
							</th>
							<th>
								<div className="th-inner sortable both">Result</div>
								<div className="fht-cell"></div>
							</th>
							<th>
								<div className="th-inner"></div>
								<div className="fht-cell"></div>
							</th>
						</tr>
					</thead>
					<tbody>
						{labs.map((lab, i) => {
							const grouped = labs.filter(l => l.code === lab.code);
							return lab.items.map((item, j) => {
								return (
									<tr key={j} className={lab.urgent ? 'urgent' : ''}>
										<td>
											<span>
												{moment(lab.createdAt).format('DD-MM-YYYY h:mmA')}
											</span>
										</td>
										<td>
											<p className="item-title text-color m-0">{lab.code}</p>
										</td>
										<td>
											<p className="item-title text-color m-0">
												{item.labTest.name}
											</p>
										</td>
										{!patient && (
											<td>
												<p className="item-title text-color m-0">
													<Tooltip
														title={<ProfilePopup patient={lab.patient} />}>
														<a
															className="cursor"
															onClick={() => this.showProfile(lab.patient)}>
															{lab.patient_name}
														</a>
													</Tooltip>
												</p>
											</td>
										)}
										<td>
											<a className="item-title text-color">{lab.created_by}</a>
										</td>
										<td>
											{lab.requestNote ? (
												<a
													className="item-title text-primary"
													onClick={() => this.viewNote(lab)}>
													Note
												</a>
											) : (
												'-'
											)}
										</td>
										<td>
											{item.cancelled === 0 &&
												item.transaction &&
												item.transaction.status === 0 && (
													<span className="badge badge-warning">
														Awaiting Payment
													</span>
												)}
											{item.cancelled === 0 &&
												item.transaction &&
												(item.transaction.status === 1 ||
													item.transaction.status === -1) &&
												item.filled === 0 && (
													<span className="badge badge-info text-white">
														Pending
													</span>
												)}
											{item.cancelled === 0 &&
												item.transaction &&
												(item.transaction.status === 1 ||
													item.transaction.status === -1) &&
												item.filled === 1 &&
												item.approved === 0 && (
													<span className="badge badge-secondary">
														Awaiting Approval
													</span>
												)}
											{item.cancelled === 0 &&
												lab.status === 1 &&
												item.approved === 1 && (
													<span className="badge badge-success">Approved</span>
												)}
											{item.cancelled === 1 && (
												<span className="badge badge-danger">cancelled</span>
											)}
										</td>
										<td className="text-right row-actions">
											{item.cancelled === 0 &&
												(item.transaction.status === 1 ||
													item.transaction.status === -1) && (
													<>
														{item.received === 0 && (
															<Tooltip title="Receive Specimen">
																<a
																	className="secondary"
																	onClick={() =>
																		this.receiveSpecimen({
																			lab_id: lab.id,
																			item_id: item.id,
																		})
																	}>
																	<i className="os-icon os-icon-check-circle" />
																</a>
															</Tooltip>
														)}
														{item.filled === 0 && item.received === 1 && (
															<Tooltip title="Fill Result">
																<a
																	className="primary"
																	onClick={() => this.fillResult(lab)}>
																	<i className="os-icon os-icon-edit" />
																</a>
															</Tooltip>
														)}
														{item.filled === 1 && item.approved === 0 && (
															<Tooltip title="Approve Lab Result">
																<a
																	className="info"
																	onClick={() => this.viewResult(lab)}>
																	<i className="os-icon os-icon-thumbs-up" />
																</a>
															</Tooltip>
														)}
														{item.approved === 1 && (
															<Tooltip title="Print Lab Test">
																<a
																	className="info"
																	onClick={() =>
																		this.printResult(lab, grouped.length > 1)
																	}>
																	<i className="os-icon os-icon-printer" />
																</a>
															</Tooltip>
														)}
													</>
												)}
											{item.cancelled === 0 && item.filled === 0 && (
												<Tooltip title="Cancel Lab Test">
													<a
														className="danger"
														onClick={() =>
															this.cancelLab({
																id: lab.id,
																item_id: item.id,
															})
														}>
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
				{lab && showFLModal && (
					<ModalFillLabResult
						closeModal={this.closeModal}
						labs={labs}
						lab={lab}
						updateLab={updateLab}
					/>
				)}
				{lab && showVLModal && (
					<ModalViewLabResult
						closeModal={this.closeModal}
						labs={labs}
						lab={lab}
						updateLab={updateLab}
					/>
				)}
				{lab && showVNModal && (
					<ModalViewLabNote lab={lab} closeModal={this.closeModal} />
				)}
			</>
		);
	}
}

export default connect(null, { startBlock, stopBlock, toggleProfile })(
	LabBlock
);

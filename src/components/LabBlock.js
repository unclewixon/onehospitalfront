/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Popover from 'antd/lib/popover';

import ModalFillLabResult from './Modals/ModalFillLabResult';
import ModalViewLabResult from './Modals/ModalViewLabResult';
import ViewRequestNote from './Modals/ViewRequestNote';
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
		visible: null,
	};

	cancelLabTest = async data => {
		try {
			const { labs } = this.props;
			this.props.startBlock();
			const url = `requests/${data.id}/delete-request?type=lab`;
			const rs = await request(url, 'DELETE', true);
			const lab_request = labs.find(l => l.id === data.id);
			const item = { ...data.item, ...rs.data };
			const newItem = { ...lab_request, item };
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
		});
	};

	receive = async data => {
		try {
			this.props.startBlock();
			const { labs } = this.props;
			const url = `requests/${data.id}/receive-specimen`;
			const rs = await request(url, 'PATCH', true);
			const lab_request = labs.find(l => l.id === data.id);
			const item = { ...data.item, ...rs.data };
			const newItem = { ...lab_request, item };
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
		const { loading, labs, patient, updateLab, user } = this.props;
		const { showFLModal, showVLModal, lab, visible } = this.state;
		return loading ? (
			<TableLoading />
		) : (
			<>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Request Date</th>
							<th>ID</th>
							<th>Lab</th>
							{!patient && <th>Patient</th>}
							<th>By</th>
							<th>Note</th>
							<th>Result</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{labs.map((lab, i) => {
							const grouped = labs.filter(l => l.code === lab.code);
							return (
								<tr key={i} className={lab.urgent ? 'urgent' : ''}>
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
											{lab.item?.labTest?.name || '--'}
										</p>
									</td>
									{!patient && (
										<td>
											<p className="item-title text-color m-0">
												<Tooltip title={<ProfilePopup patient={lab.patient} />}>
													<a
														className="cursor"
														onClick={() => this.showProfile(lab.patient)}>
														{lab.patient_name}
													</a>
												</Tooltip>
												{lab.patient.is_admitted && (
													<Tooltip title="Admitted">
														<i className="fa fa-hospital-o text-danger ml-1" />
													</Tooltip>
												)}
											</p>
										</td>
									)}
									<td>
										<a className="item-title text-color">{lab.created_by}</a>
									</td>
									<td>
										{lab.requestNote ? (
											<Popover
												content={
													<ViewRequestNote
														title="Lab Note"
														note={lab.requestNote}
														closeModal={() => this.setState({ visible: null })}
													/>
												}
												overlayClassName="show-note"
												trigger="click"
												visible={visible && visible === lab.id}
												onVisibleChange={() =>
													this.setState({ visible: lab.id })
												}>
												<a className="item-title text-primary">Note</a>
											</Popover>
										) : (
											'--'
										)}
									</td>
									<td>
										{lab.item.cancelled === 0 &&
											lab.item.transaction &&
											lab.item.transaction.status === 0 && (
												<span className="badge badge-warning">
													Awaiting Payment
												</span>
											)}
										{lab.item.cancelled === 0 &&
											lab.item.transaction &&
											(lab.item.transaction.status === 1 ||
												lab.item.transaction.status === -1) &&
											lab.item.filled === 0 && (
												<span className="badge badge-info text-white">
													Pending
												</span>
											)}
										{lab.item.cancelled === 0 &&
											lab.item.transaction &&
											(lab.item.transaction.status === 1 ||
												lab.item.transaction.status === -1) &&
											lab.item.filled === 1 &&
											lab.item.approved === 0 && (
												<span className="badge badge-secondary">
													Awaiting Approval
												</span>
											)}
										{lab.item.cancelled === 0 &&
											lab.status === 1 &&
											lab.item.approved === 1 && (
												<span className="badge badge-success">Approved</span>
											)}
										{lab.item.cancelled === 1 && (
											<span className="badge badge-danger">Cancelled</span>
										)}
									</td>
									<td className="row-actions">
										{lab.item.cancelled === 0 &&
											lab.item.transaction &&
											(lab.item.transaction.status === 1 ||
												lab.item.transaction.status === -1) && (
												<>
													{lab.item.received === 0 && (
														<Tooltip title="Receive Specimen">
															<a
																className="secondary"
																onClick={() => this.receiveSpecimen(lab)}>
																<i className="os-icon os-icon-check-circle" />
															</a>
														</Tooltip>
													)}
													{lab.item.filled === 0 && lab.item.received === 1 && (
														<Tooltip title="Fill Result">
															<a
																className="primary"
																onClick={() => this.fillResult(lab)}>
																<i className="os-icon os-icon-edit" />
															</a>
														</Tooltip>
													)}
													{lab.item.filled === 1 &&
														lab.item.approved === 0 &&
														user.role.slug === 'lab-manager' && (
															<Tooltip title="Approve Lab Result">
																<a
																	className="info"
																	onClick={() => this.viewResult(lab)}>
																	<i className="os-icon os-icon-thumbs-up" />
																</a>
															</Tooltip>
														)}
													{lab.status === 1 && (
														<>
															<Tooltip title="Approve Lab Result">
																<a
																	className="info"
																	onClick={() => this.viewResult(lab)}>
																	<i className="os-icon os-icon-eye" />
																</a>
															</Tooltip>
															<Tooltip title="Print Lab Test">
																<a
																	className="info"
																	onClick={() =>
																		this.printResult(lab, grouped.length > 1)
																	}>
																	<i className="os-icon os-icon-printer" />
																</a>
															</Tooltip>
														</>
													)}
												</>
											)}
										{lab.item.cancelled === 0 && lab.item.filled === 0 && (
											<Tooltip title="Cancel Lab Test">
												<a
													className="danger"
													onClick={() => this.cancelLab(lab)}>
													<i className="os-icon os-icon-ui-15" />
												</a>
											</Tooltip>
										)}
									</td>
								</tr>
							);
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
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user.profile,
	};
};

export default connect(mapStateToProps, {
	startBlock,
	stopBlock,
	toggleProfile,
})(LabBlock);

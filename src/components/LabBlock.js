/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import ModalFillLabResult from './Modals/ModalFillLabResult';
import ModalViewLabResult from './Modals/ModalViewLabResult';
import ModalViewLabNote from './Modals/ModalViewLabNote';
import searchingGIF from '../assets/images/searching.gif';
import { patientAPI } from '../services/constants';
import { request, confirmAction, updateImmutable } from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';

class LabBlock extends Component {
	state = {
		labTest: null,
		lab: null,
		showFLModal: false,
		showVLModal: false,
		showVNModal: false,
	};

	cancelLabTest = async id => {
		try {
			const { labs } = this.props;
			this.props.startBlock();
			const url = `${patientAPI}/${id}/delete-request?type=lab`;
			const rs = await request(url, 'DELETE', true);
			const newLabs = updateImmutable(labs, rs.data);
			this.props.updateLab(newLabs);
			notifySuccess('lab request cancelled!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error cancelling lab request');
			this.props.stopBlock();
		}
	};

	cancelLab = data => {
		confirmAction(
			this.cancelLabTest,
			data,
			'Do you want to cancel this lab test?',
			'Are you sure?'
		);
	};

	fillResult = lab => {
		document.body.classList.add('modal-open');
		this.setState({ showFLModal: true, labTest: lab });
	};

	viewResult = lab => {
		document.body.classList.add('modal-open');
		this.setState({ showVLModal: true, labTest: lab });
	};

	viewNote = lab => {
		document.body.classList.add('modal-open');
		this.setState({ showVNModal: true, labTest: lab });
	};

	doPrint = async (lab, printGroup) => {
		try {
			this.props.startBlock();
			const url = `${patientAPI}/${lab.id}/print?print_group=${
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

	receive = async id => {
		try {
			this.props.startBlock();
			const { labs } = this.props;
			const url = `${patientAPI}/${id}/receive-specimen`;
			const rs = await request(url, 'PATCH', true);
			const newLabs = updateImmutable(labs, rs.data);
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

	render() {
		const { loading, labs, patient, updateLab } = this.props;
		const { labTest, showFLModal, showVLModal, showVNModal } = this.state;
		return (
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
					{loading ? (
						<tbody>
							<tr>
								<td colSpan={patient ? '6' : '7'} className="text-center">
									<img alt="searching" src={searchingGIF} />
								</td>
							</tr>
						</tbody>
					) : (
						<tbody>
							{labs.map((lab, i) => {
								const grouped = labs.filter(l => l.code === lab.code);
								return (
									<tr key={i} className={lab.urgent ? 'urgent' : ''}>
										<td className="flex">
											<span
												className="w-32 avatar gd-warning"
												style={{
													boxShadow: 'none',
													justifyContent: 'start',
												}}>
												{moment(lab.createdAt).format('DD-MM-YYYY h:mmA')}
											</span>
										</td>
										<td className="flex">
											<p className="item-title text-color m-0">{lab.code}</p>
										</td>
										<td className="flex">
											<p className="item-title text-color m-0">
												{lab.requestBody.name}
											</p>
										</td>
										{!patient && (
											<td className="flex">
												<p className="item-title text-color m-0">
													{lab.patient_name}
												</p>
											</td>
										)}
										<td className="flex">
											<a className="item-title text-color">{lab.created_by}</a>
										</td>
										<td className="flex">
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
										<td className="flex">
											{lab.requestBody.filled &&
											lab.requestBody.filled === 1 ? (
												lab.status === 1 ? (
													<a
														className="item-title text-primary"
														onClick={() => this.viewResult(lab)}>
														Result
													</a>
												) : (
													'Pending Approval'
												)
											) : (
												'-'
											)}
										</td>
										<td className="text-right row-actions">
											{!lab.requestBody.cancelled &&
												lab.transaction_status === 1 && (
													<>
														{(!lab.requestBody.received ||
															(lab.requestBody.received &&
																lab.requestBody.received === 0)) && (
															<Tooltip title="Receive Specimen">
																<a
																	className="secondary"
																	onClick={() => this.receiveSpecimen(lab.id)}>
																	<i className="os-icon os-icon-check-circle" />
																</a>
															</Tooltip>
														)}
														{(!lab.requestBody.filled ||
															(lab.requestBody.filled &&
																lab.requestBody.filled === 0)) &&
															lab.requestBody.received &&
															lab.requestBody.received === 1 && (
																<Tooltip title="Fill Result">
																	<a
																		className="primary"
																		onClick={() => this.fillResult(lab)}>
																		<i className="os-icon os-icon-edit" />
																	</a>
																</Tooltip>
															)}
														{lab.requestBody.filled === 1 && lab.status === 0 && (
															<Tooltip title="Approve Lab Result">
																<a
																	className="info"
																	onClick={() => this.viewResult(lab)}>
																	<i className="os-icon os-icon-thumbs-up" />
																</a>
															</Tooltip>
														)}
														{(!lab.requestBody.filled ||
															(lab.requestBody.filled &&
																lab.requestBody.filled === 0)) && (
															<Tooltip title="Cancel Lab Test">
																<a
																	className="danger"
																	onClick={() => this.cancelLab(lab.id)}>
																	<i className="os-icon os-icon-ui-15" />
																</a>
															</Tooltip>
														)}
														{lab.status === 1 && (
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
										</td>
									</tr>
								);
							})}
						</tbody>
					)}
				</table>
				{labTest && showFLModal && (
					<ModalFillLabResult
						labTest={labTest}
						closeModal={this.closeModal}
						labs={labs}
						updateLab={updateLab}
					/>
				)}
				{labTest && showVLModal && (
					<ModalViewLabResult
						labTest={labTest}
						closeModal={this.closeModal}
						labs={labs}
						updateLab={updateLab}
					/>
				)}
				{labTest && showVNModal && (
					<ModalViewLabNote labTest={labTest} closeModal={this.closeModal} />
				)}
			</>
		);
	}
}

export default connect(null, { startBlock, stopBlock })(LabBlock);

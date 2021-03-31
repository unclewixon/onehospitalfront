/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import ViewScanImage from './Modals/ViewScanImage';
import UploadScanImage from './Modals/UploadScanImage';
import { patientAPI, API_URI } from '../services/constants';
import {
	request,
	confirmAction,
	updateImmutable,
	upload,
} from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import TableLoading from './TableLoading';
import { toggleProfile } from '../actions/user';

class RadiologyBlock extends Component {
	state = {
		scan: null,
		showModal: false,
		uploading: false,
		uploadModal: false,
	};

	viewScan = item => {
		document.body.classList.add('modal-open');
		this.setState({ showModal: true, scan: item });
	};

	capturedScan = data => {
		confirmAction(
			this.capture,
			data,
			'Have you captured scan?',
			'Are you sure?'
		);
	};

	capture = async id => {
		try {
			this.props.startBlock();
			const { scans } = this.props;
			const url = `${patientAPI}/${id}/receive-specimen`;
			const rs = await request(url, 'PATCH', true);
			const scan_request = scans.find(l => l.request_item.id === rs.data.id);
			const request_item = { ...scan_request.request_item, ...rs.data };
			const newItem = { ...scan_request, request_item };
			const newScans = updateImmutable(scans, newItem);
			this.props.updateScan(newScans);
			notifySuccess('scan captured!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error found please try again');
			this.props.stopBlock();
		}
	};

	uploadScan = scan => {
		document.body.classList.add('modal-open');
		this.setState({ uploadModal: true, scan });
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	upload = async (e, files) => {
		try {
			e.preventDefault();

			const { scans } = this.props;
			const { scan } = this.state;

			if (files && files.length === 0) {
				notifyError('You did not select any image file');
				return;
			}

			this.setState({ uploading: true });

			const file = files[0];

			let formData = new FormData();
			formData.append('file', file);
			formData.append('document_type', 'radiology');
			formData.append('id', scan.request_item.id);

			const url = `${API_URI}/${patientAPI}/${scan.patient_id}/upload-document`;
			const rs = await upload(url, 'POST', formData);

			const scan_request = scans.find(
				l => l.request_item.id === rs.request_item.id
			);
			const request_item = { ...scan_request.request_item, ...rs.request_item };
			const newItem = { ...scan_request, request_item };
			const newScans = updateImmutable(scans, newItem);
			this.props.updateScan(newScans);

			this.closeModal();

			notifySuccess(`Patient Scan Uploaded!`);
		} catch (error) {
			console.log(error);
			this.setState({ uploading: false, upload_visible: false });
			notifyError(error.message || 'could not upload data');
		}
	};

	approveScan = async (id, request_id) => {
		try {
			this.props.startBlock();
			const { scans } = this.props;
			const url = `${patientAPI}/request/${id}/approve-result?type=radiology&request_id=${request_id}`;
			const rs = await request(url, 'PATCH', true);
			const scan_request = scans.find(l => l.request_item.id === rs.data.id);
			const request_item = { ...scan_request.request_item, ...rs.data };
			const newItem = { ...scan_request, request_item };
			const newScans = updateImmutable(scans, newItem);
			this.props.updateScan(newScans);
			notifySuccess('scan image approved!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error while trying to approve scan');
			this.props.stopBlock();
		}
	};

	printResult = (item, isGrouped) => {
		if (isGrouped) {
			confirmAlert({
				customUI: ({ onClose }) => {
					const printSingle = async () => {
						onClose();
						await this.doPrint(item, false);
					};

					const printGroup = async () => {
						onClose();
						await this.doPrint(item, true);
					};

					return (
						<div className="custom-ui text-center">
							<h1 className="">Print Scan</h1>
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
			this.doPrint(item, false);
		}
	};

	doPrint = async (item, printGroup) => {
		try {
			this.props.startBlock();
			const url = `${patientAPI}/${item.id}/print?type=radiology&print_group=${
				printGroup ? 1 : 0
			}`;
			const rs = await request(url, 'GET', true);
			window.open(rs.file, '_blank');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error printing scan');
			this.props.stopBlock();
		}
	};

	cancelScan = data => {
		confirmAction(
			this.cancel,
			data,
			'Do you want to cancel this radiology test?',
			'Are you sure?'
		);
	};

	cancel = async id => {
		try {
			const { scans } = this.props;
			this.props.startBlock();
			const url = `${patientAPI}/${id}/delete-request?type=radiology`;
			const rs = await request(url, 'DELETE', true);
			const scan_request = scans.find(l => l.request_item.id === rs.data.id);
			const request_item = { ...scan_request.request_item, ...rs.data };
			const newItem = { ...scan_request, request_item };
			const newScans = updateImmutable(scans, newItem);
			this.props.updateScan(newScans);
			notifySuccess('radiology request cancelled!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error cancelling radiology request');
			this.props.stopBlock();
		}
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			scan: null,
			showModal: false,
			uploadModal: false,
		});
	};

	render() {
		const { loading, scans, patient } = this.props;
		const { scan, showModal, uploading, uploadModal } = this.state;

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
								<div className="th-inner sortable both">Type</div>
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
								<div className="th-inner sortable both">Attachment</div>
								<div className="fht-cell"></div>
							</th>
							<th>
								<div className="th-inner sortable both">Status</div>
								<div className="fht-cell"></div>
							</th>
							<th>
								<div className="th-inner"></div>
								<div className="fht-cell"></div>
							</th>
						</tr>
					</thead>
					<tbody>
						{scans.map((item, i) => {
							const grouped = scans.filter(l => l.code === item.code);
							return (
								<tr key={i} className={item.urgent ? 'urgent' : ''}>
									<td>
										<span
											className="w-32 avatar gd-warning"
											style={{
												boxShadow: 'none',
												justifyContent: 'start',
											}}>
											{moment(item.createdAt).format('DD-MM-YYYY h:mmA')}
										</span>
									</td>
									<td>
										<p className="item-title text-color m-0">{item.code}</p>
									</td>
									<td>
										<p className="item-title text-color m-0">
											{item.request_item.service.name}
										</p>
									</td>
									{!patient && (
										<td>
											<p className="item-title text-color m-0">
												<Tooltip title="">
													<a
														className="cursor"
														onClick={() => this.showProfile(item.patient)}>
														{item.patient_name}
													</a>
												</Tooltip>
											</p>
										</td>
									)}
									<td>
										<a className="item-title text-color">{item.created_by}</a>
									</td>
									<td>
										{item.request_item.filled === 1 ? (
											<Tooltip title="View Scan Image">
												<a
													className="success"
													onClick={() => this.viewScan(item)}>
													<i className="os-icon os-icon-link" /> view
												</a>
											</Tooltip>
										) : (
											'-'
										)}
									</td>
									<td>
										{item.request_item.cancelled === 0 &&
											item.transaction.status === 0 && (
												<span className="badge badge-warning">
													Awaiting Payment
												</span>
											)}
										{item.request_item.cancelled === 0 &&
											item.transaction.status === 1 &&
											item.request_item.filled === 0 && (
												<span className="badge badge-info text-white">
													Pending
												</span>
											)}
										{item.request_item.cancelled === 0 &&
											item.transaction.status === 1 &&
											item.request_item.filled === 1 &&
											item.request_item.approved === 0 && (
												<span className="badge badge-secondary">
													Awaiting Approval
												</span>
											)}
										{item.request_item.cancelled === 0 &&
											item.status === 1 &&
											item.request_item.approved === 1 && (
												<span className="badge badge-success">Approved</span>
											)}
										{item.request_item.cancelled === 1 && (
											<span className="badge badge-danger">cancelled</span>
										)}
									</td>
									<td className="row-actions">
										{item.request_item.cancelled === 0 &&
											item.transaction.status === 1 && (
												<>
													{/* after payment, capture scan */}
													{item.request_item.received === 0 && (
														<Tooltip title="Captured Scan?">
															<a
																className="secondary"
																onClick={() =>
																	this.capturedScan(item.request_item.id)
																}>
																<i className="os-icon os-icon-check-circle" />
															</a>
														</Tooltip>
													)}
													{/* after capture, upload scan */}
													{item.request_item.received === 1 &&
														item.request_item.filled === 0 &&
														item.request_item.approved === 0 && (
															<Tooltip title="Upload Scan Image">
																<a
																	className="primary"
																	onClick={() => this.uploadScan(item)}>
																	<i className="os-icon os-icon-camera" />
																</a>
															</Tooltip>
														)}
													{/* after upload, approve scan */}
													{item.request_item.received === 1 &&
														item.request_item.filled === 1 &&
														item.request_item.approved === 0 && (
															<Tooltip title="Approve Scan Image">
																<a
																	className="info"
																	onClick={() =>
																		this.approveScan(
																			item.id,
																			item.request_item.id
																		)
																	}>
																	<i className="os-icon os-icon-thumbs-up" />
																</a>
															</Tooltip>
														)}
													{/* after approval, print scan */}
													{item.request_item.approved === 1 && (
														<Tooltip title="Print Scan">
															<a
																className="info"
																onClick={() =>
																	this.printResult(item, grouped.length > 1)
																}>
																<i className="os-icon os-icon-printer" />
															</a>
														</Tooltip>
													)}
													{/* before approval, cancel scan */}
													{item.request_item.approved === 0 && (
														<Tooltip title="Cancel Scan">
															<a
																className="danger"
																onClick={() =>
																	this.cancelScan(item.request_item.id)
																}>
																<i className="os-icon os-icon-ui-15" />
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
				</table>
				{uploadModal && (
					<UploadScanImage
						uploading={uploading}
						upload={this.upload}
						closeModal={this.closeModal}
					/>
				)}
				{scan && showModal && (
					<ViewScanImage scan={scan} closeModal={this.closeModal} />
				)}
			</>
		);
	}
}

export default connect(null, { startBlock, stopBlock, toggleProfile })(
	RadiologyBlock
);

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
	patientname,
} from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import TableLoading from './TableLoading';
import { toggleProfile } from '../actions/user';
import ProfilePopup from './Patient/ProfilePopup';

class RadiologyBlock extends Component {
	state = {
		scanItem: null,
		showModal: false,
		uploading: false,
		uploadModal: false,
	};

	viewScan = item => {
		document.body.classList.add('modal-open');
		this.setState({ showModal: true, scanItem: item });
	};

	capture = async data => {
		try {
			this.props.startBlock();
			const { scans } = this.props;
			const url = `requests/${data}/receive-specimen`;
			const rs = await request(url, 'PATCH', true);
			const scan_request = scans.find(l => l.id === data);
			const newItem = { ...scan_request, item: rs.data };
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

	capturedScan = data => {
		confirmAction(
			this.capture,
			data,
			'Have you captured scan?',
			'Are you sure?'
		);
	};

	uploadScan = scan => {
		document.body.classList.add('modal-open');
		this.setState({ uploadModal: true, scanItem: scan });
	};

	showProfile = patient => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	upload = async (e, files) => {
		try {
			e.preventDefault();

			const { scans } = this.props;
			const { scanItem } = this.state;

			if (files && files.length === 0) {
				notifyError('You did not select any image file');
				return;
			}

			this.setState({ uploading: true });

			const file = files[0];

			let formData = new FormData();
			formData.append('file', file);
			formData.append('document_type', 'scans');
			formData.append('id', scanItem.item.id);

			const url = `${API_URI}/${patientAPI}/${scanItem.patient.id}/upload-document`;
			const rs = await upload(url, 'POST', formData);

			const scan_request = scans.find(l => l.id === scanItem.id);
			const newItem = { ...scan_request, item: rs.data };
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

	approveScan = async id => {
		try {
			this.props.startBlock();
			const { scans } = this.props;
			const url = `requests/${id}/approve-result?type=scans`;
			const rs = await request(url, 'PATCH', true);
			const scan_request = scans.find(l => l.id === id);
			const newItem = { ...scan_request, status: 1, item: rs.data };
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

	doPrint = async (item, printGroup) => {
		try {
			this.props.startBlock();
			const url = `requests/${item.id}/print?type=scans&print_group=${
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

	cancel = async data => {
		try {
			const { scans } = this.props;
			this.props.startBlock();
			const url = `requests/${data}/delete-request?type=scans`;
			const rs = await request(url, 'DELETE', true);
			const scan_request = scans.find(l => l.id === data);
			const newItem = { ...scan_request, item: rs.data };
			const newScans = updateImmutable(scans, newItem);
			console.log(newScans);
			this.props.updateScan(newScans);
			notifySuccess('radiology request cancelled!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error cancelling radiology request');
			this.props.stopBlock();
		}
	};

	cancelScan = data => {
		confirmAction(
			this.cancel,
			data,
			'Do you want to cancel this radiology scan?',
			'Are you sure?'
		);
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			scanItem: null,
			showModal: false,
			uploadModal: false,
		});
	};

	render() {
		const { loading, scans, patient } = this.props;
		const { scanItem, showModal, uploading, uploadModal } = this.state;

		return loading ? (
			<TableLoading />
		) : (
			<>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Request Date</th>
							<th>ID</th>
							<th>Type</th>
							{!patient && <th>Patient</th>}
							<th>By</th>
							<th>Attachment</th>
							<th>Status</th>
							<th>
								<div className="th-inner"></div>
							</th>
						</tr>
					</thead>
					<tbody>
						{scans.map((scan, i) => {
							const grouped = scans.filter(l => l.code === scan.code);
							return (
								<tr key={i} className={scan.urgent ? 'urgent' : ''}>
									<td>
										<span>
											{moment(scan.createdAt).format('DD-MM-YYYY h:mmA')}
										</span>
									</td>
									<td>
										<p className="item-title text-color m-0">{scan.code}</p>
									</td>
									<td>
										<p className="item-title text-color m-0">
											{scan.item.service.item.name}
										</p>
									</td>
									{!patient && (
										<td>
											<p className="item-title text-color m-0">
												<Tooltip
													title={<ProfilePopup patient={scan.patient} />}>
													<a
														className="cursor"
														onClick={() => this.showProfile(scan.patient)}>
														{patientname(scan.patient, true)}
													</a>
												</Tooltip>
												{scan.patient.isAdmitted && (
													<Tooltip title="Admitted">
														<i className="fa fa-hospital-o text-danger ml-1" />
													</Tooltip>
												)}
											</p>
										</td>
									)}
									<td>
										<a className="item-title text-color">{scan.created_by}</a>
									</td>
									<td>
										{scan.item.filled === 1 ? (
											<Tooltip title="View Scan Image">
												<a
													className="success"
													onClick={() => this.viewScan(scan.item)}>
													<i className="os-icon os-icon-link" /> view
												</a>
											</Tooltip>
										) : (
											'--'
										)}
									</td>
									<td>
										{scan.item.cancelled === 0 &&
											scan.transaction &&
											scan.transaction.status === 0 && (
												<span className="badge badge-warning">
													Awaiting Payment
												</span>
											)}
										{scan.item.cancelled === 0 &&
											scan.transaction &&
											scan.transaction.status === 1 &&
											scan.item.filled === 0 && (
												<span className="badge badge-info text-white">
													Pending
												</span>
											)}
										{scan.item.cancelled === 0 &&
											scan.transaction &&
											scan.transaction.status === 1 &&
											scan.item.filled === 1 &&
											scan.item.approved === 0 && (
												<span className="badge badge-secondary">
													Awaiting Approval
												</span>
											)}
										{scan.item.cancelled === 0 &&
											scan.status === 1 &&
											scan.item.approved === 1 && (
												<span className="badge badge-success">Approved</span>
											)}
										{scan.item.cancelled === 1 && (
											<span className="badge badge-danger">cancelled</span>
										)}
									</td>
									<td className="row-actions">
										{scan.item.cancelled === 0 &&
											scan.transaction &&
											scan.transaction.status === 1 && (
												<>
													{/* after payment, capture scan */}
													{scan.item.received === 0 && (
														<Tooltip title="Captured Scan?">
															<a
																className="secondary"
																onClick={() => this.capturedScan(scan.item.id)}>
																<i className="os-icon os-icon-check-circle" />
															</a>
														</Tooltip>
													)}
													{/* after capture, upload scan */}
													{scan.item.received === 1 &&
														scan.item.filled === 0 &&
														scan.item.approved === 0 && (
															<Tooltip title="Upload Scan Image">
																<a
																	className="primary"
																	onClick={() => this.uploadScan(scan)}>
																	<i className="os-icon os-icon-camera" />
																</a>
															</Tooltip>
														)}
													{/* after upload, approve scan */}
													{scan.item.received === 1 &&
														scan.item.filled === 1 &&
														scan.item.approved === 0 && (
															<Tooltip title="Approve Scan Image">
																<a
																	className="info"
																	onClick={() =>
																		this.approveScan(scan.item.id)
																	}>
																	<i className="os-icon os-icon-thumbs-up" />
																</a>
															</Tooltip>
														)}
													{/* after approval, print scan */}
													{scan.item.approved === 1 && (
														<Tooltip title="Print Scan">
															<a
																className="info"
																onClick={() =>
																	this.printResult(scan, grouped.length > 1)
																}>
																<i className="os-icon os-icon-printer" />
															</a>
														</Tooltip>
													)}
												</>
											)}
										{/* before approval, cancel scan */}
										{scan.item.cancelled === 0 && scan.item.approved === 0 && (
											<Tooltip title="Cancel Scan">
												<a
													className="danger"
													onClick={() => this.cancelScan(scan.item.id)}>
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
				{uploadModal && (
					<UploadScanImage
						uploading={uploading}
						upload={this.upload}
						closeModal={this.closeModal}
					/>
				)}
				{scanItem && showModal && (
					<ViewScanImage scan={scanItem} closeModal={this.closeModal} />
				)}
			</>
		);
	}
}

export default connect(null, { startBlock, stopBlock, toggleProfile })(
	RadiologyBlock
);

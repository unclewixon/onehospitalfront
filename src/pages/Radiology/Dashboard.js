/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

import { API_URI, patientAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, uploadFileImage, upload } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';
import { uploadRadiology } from '../../actions/general';
import { toggleProfile } from '../../actions/user';
import UploadImagingData from './UploadImageData';

export class Dashboard extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		upload_visible: false,
		uploading: false,
		request: null,
		approved: false,
		captured: false,
		uploaded: false,
		payment_made: true,
	};

	componentDidMount() {
		this.fetchRadiology();
	}

	fetchRadiology = async () => {
		try {
			const { startDate, endDate } = this.state;
			this.setState({ loading: true });
			const url = `${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);

			this.props.loadRadiology(rs.result);

			// debug purposes
			// console.log('server response', rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			// DEBUG PURPOSES
			// console.log('this error', error);
			// console.log('this state', this.state);
			// console.log('start ' + this.state.startDate, 'end' + this.state.endDate);
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
					console.log(val, 'Stupid val');
					newData.push({
						id: value.id,
						isActive: value.isActive,
						createdAt: value.createdAt,
						updateAt: value.updateAt,
						requestType: value.requestType,
						requestBody: {
							amount: val.amount,
							service_id: val.service_id,
							specialization: val.specialization
								? val.specialization
								: val.service_name,
						},
						status: value.status,
						patientName:
							(value.patient?.surname ? value.patient?.surname : '') +
							' ' +
							(value.patient?.other_names ? value.patient?.other_names : ''),
						fileNumber: value.patient?.fileNumber,
						patient: value.patient,
					});
				});
			} else {
				newData.push(value);
			}
		});

		return newData.reverse();
	};

	// isVisible = req => {
	// 	if (this.state.patient === null && this.state.patient.id !== req.id) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// };

	showProfile = patient => () => {
		const info = { patient, type: 'patient' };
		this.props.toggleProfile(true, info);
	};

	upload = req => {
		const info = { patient: req.patient, type: 'patient' };
		this.props.toggleProfile(true, info);
		this.props.uploadRadiology(true);
	};

	handleUploadVisibleChange = visible => {
		this.setState({ upload_visible: visible });
	};

	hide = () => {
		this.setState({ upload_visible: false });
	};

	onUpload = async (e, files) => {
		e.preventDefault();
		console.log(files, 'files');
		const { request } = this.state;
		console.log(request);
		if (!files) {
			notifyError('You did not select any image file');
			return;
		}
		this.setState({ uploading: true });

		// let fileData = [];
		// fileData.files = [...files];

		// console.log(fileData.files[0], "file");
		//files: [file1, file2, file3]
		const file = files[0];
		console.log(file, 'file');
		if (file) {
			try {
				let formData = new FormData();
				formData.append('files', file);
				formData.append('document_type', 'imaging');
				const rs = await upload(
					`${API_URI}/${patientAPI}/${request.id}/upload-request-document`,
					'POST',
					formData
				);
				notifySuccess(`Patient Imaging Data Uploaded`);
				this.setState({
					uploading: false,
					upload_visible: false,
					uploaded: true,
				});
				console.log(rs);
			} catch (error) {
				console.log(error);
				this.setState({ uploading: false, upload_visible: false });
				// throw new SubmissionError({
				// 	_error: e.message || 'could not upload data',
				// });
				notifyError(error.message || 'could not upload data');
			}
		}
	};

	getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name ? val.service_name : val.specialization];
		});
		return rer.join(', ');
	};

	togglePopover = req => {
		this.setState({ request: req });
		this.setState({ upload_visible: true });
	};
	onCaptured = () => {
		this.setState({ ...this.state, captured: true });
	};
	onApproved = () => {
		this.setState({ ...this.state, approved: true });
	};
	render() {
		const {
			// filtering,
			loading,
			uploading,
			upload_visible,
			request,
			payment_made,
			approved,
			captured,
			uploaded,
			// patient,
		} = this.state;
		const { radiology } = this.props;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						{/* <Popover
							content={
								<UploadImagingData
									uploading={uploading}
									doUpload={this.onUpload}
									hide={this.hide}
								/>
							}
							placement="leftTop"
							overlayClassName="upload-roster"
							trigger="click"
							visible={upload_visible} */}
						{/* onVisibleChange={this.handleUploadVisibleChange}></Popover> */}
						<div
							hidden={!upload_visible}
							className="element-actions"
							style={{ position: 'absolute', right: '40px' }}>
							<UploadImagingData
								uploading={uploading}
								doUpload={this.onUpload}
								hide={this.hide}
								onBackClick={this.onBackClick}
							/>
						</div>

						<div className="element-box">
							<div className="table table-responsive">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th className="text-center">Request Date</th>
											<th className="text-center">Patient Name</th>
											<th className="text-center">Type</th>
											<th className="text-center">Status</th>
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
											radiology.map((request, key) => {
												return (
													<tr data-index="0" data-id="20" key={key}>
														<td className="text-center">
															{moment(request.createdAt).format('DD-MM-YYYY')}
														</td>
														<td className="text-center">
															{request.patient_name}
														</td>
														<td className="text-center">
															{/* {this.getRequests(request.requestType)} */}
															{request.requestType}
														</td>
														<td className="text-center">
															{/* {request.status} */}
															{!payment_made && (
																<span className="badge badge-warning">
																	Awaiting Payment
																</span>
															)}
															{payment_made && !captured && (
																<span className="badge badge-info text-white">
																	Pending
																</span>
															)}
															{payment_made &&
																(uploaded || !uploaded) &&
																captured &&
																!approved && (
																	<span className="badge badge-secondary">
																		Awaiting Approval
																	</span>
																)}
															{approved && (
																<span className="badge badge-success">
																	Approved
																</span>
															)}
														</td>
														<td className="text-right row-actions">
															{/* after payment, capture scan */}
															{payment_made && !captured && (
																<Tooltip title="Captured Scan?">
																	<a
																		className="secondary"
																		onClick={() => {
																			this.onCaptured();
																		}}>
																		<i className="os-icon os-icon-folder-plus" />
																	</a>
																</Tooltip>
															)}
															{/* after approval, view scan */}
															{approved && (
																<Tooltip title="View Scan">
																	<a className="secondary">
																		<i className="os-icon os-icon-eye" />
																	</a>
																</Tooltip>
															)}
															{/* after approval print scan */}
															{approved && (
																<Tooltip title="Print Scan">
																	<a className="secondary">
																		<i className="os-icon os-icon-printer" />
																	</a>
																</Tooltip>
															)}
															{/* after capture & after upload, upload scan */}
															{payment_made &&
																(uploaded || !uploaded) &&
																captured &&
																!approved && (
																	<Tooltip title="Upload scan Image">
																		<a
																			onClick={() => {
																				this.togglePopover(request);
																			}}>
																			<i className="os-icon os-icon-upload-cloud" />
																		</a>
																	</Tooltip>
																)}
															{/* after upload, approve scan */}
															{payment_made && uploaded && !approved && (
																<Tooltip title="Approve Scan Image">
																	<a
																		className="secondary"
																		onClick={() => this.onApproved()}>
																		<i className="font-bolder icon-feather-check" />
																	</a>
																</Tooltip>
															)}

															{/* until approval, delete request */}
															{!approved && (
																<Tooltip title="Delete Request">
																	<a className="danger">
																		<i className="os-icon os-icon-ui-15" />
																	</a>
																</Tooltip>
															)}
														</td>
													</tr>
												);
											})
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

export default connect(mapStateToProps, {
	loadRadiology,
	uploadRadiology,
	toggleProfile,
})(Dashboard);

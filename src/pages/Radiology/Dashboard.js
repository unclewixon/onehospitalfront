/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';

import { patientAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request, upload } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';
import { uploadRadiology } from '../../actions/general';
import { toggleProfile } from '../../actions/user';

const UploadImagingData = ({ uploading, doUpload, hide }) => {
	const [files, setFiles] = useState(null);
	const [label, setLabel] = useState('');
	// let uploadAttachment;

	const handleChange = e => {
		setFiles(e.target.files);

		let label = Array.from(e.target.files)
			.map(file => {
				return file.name;
			})
			.join(',');
		setLabel(label);
	};
	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '400px' }}>
			<div className="modal-centered">
				<div className="modal-content text-center">
					<button onClick={hide} className="close" type="button">
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Upload Imaging</h4>

						<form
							className="form-block w-100"
							onSubmit={e => doUpload(e, files)}>
							<div className="row my-3">
								<div className="custom-file col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<input
										type="file"
										className="custom-file-input"
										name="file"
										accept="image/*"
										onChange={handleChange}
										multiple
									/>
									<label className="custom-file-label">
										{label.substring(0, 40) || 'Choose File(s)'}
									</label>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12 text-right pr-0">
									<button
										className="btn btn-primary"
										disabled={uploading}
										type="submit">
										{uploading ? (
											<img src={waiting} alt="submitting" />
										) : (
											'upload'
										)}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

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
		patient: null,
	};

	componentDidMount() {
		this.fetchRadiology();
	}
	fetchRadiology = async () => {
		const { startDate, endDate } = this.state;

		try {
			this.setState({ loading: true });
			// console.log(
			// 	`${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}&status=${status}`
			// );
			const rs = await request(
				`${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}`,
				'GET',
				true
			);

			this.props.loadRadiology(rs);
			console.log(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
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
		const { patient } = this.state;
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
		if (file) {
			try {
				let formData = new FormData();
				formData.append('files', file);
				formData.append('document_type', 'Imaging');
				console.log(formData.getAll());
				const rs = await upload(
					`${patientAPI}/${patient.patient_id}/upload-request-document`,
					'POST',
					formData
				);
				notifySuccess(`Patient Imaging Data Uploaded`);
				this.setState({ uploading: false, upload_visible: false });
				console.log(rs);
			} catch (error) {
				console.log(error);
				this.setState({ uploading: false, upload_visible: false });
				// throw new SubmissionError({
				// 	_error: e.message || 'could not upload data',
				// });
				notifyError(e.message || 'could not upload data');
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
		this.setState({ patient: req });
		this.setState({ upload_visible: true });
	};
	render() {
		const {
			// filtering,
			loading,
			uploading,
			upload_visible,
			// patient,
		} = this.state;
		const { radiology } = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="element-content">
						<div className="row">
							<div className="col-sm-4 col-xxxl-4">
								<a className="element-box el-tablo">
									<div className="label">TOTAL OPEN</div>
									<div className="value text-center">57</div>
								</a>
							</div>
							<div className="col-sm-4 col-xxxl-4">
								<a className="element-box el-tablo">
									<div className="label">TOTAl FILLED</div>
									<div className="value text-center">457</div>
								</a>
							</div>
							<div className="col-sm-4 col-xxxl-4">
								<a className="element-box el-tablo">
									<div className="label">LOW STOCK</div>
									<div className="value text-center">125</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Dashboard</h6>

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
											<th className="text-center">Request</th>
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
															{this.getRequests(request.requestBody)}
														</td>

														<td className="text-right row-actions">
															<Tooltip title="Receive Request">
																<a className="secondary">
																	<i className="os-icon os-icon-folder-plus" />
																</a>
															</Tooltip>
															<Tooltip title="Upload image">
																<a
																	onClick={() => {
																		this.togglePopover(request);
																	}}>
																	<i className="os-icon os-icon-upload-cloud" />
																</a>
															</Tooltip>

															<Tooltip title="Delete Request">
																<a className="danger">
																	<i className="os-icon os-icon-ui-15" />
																</a>
															</Tooltip>
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

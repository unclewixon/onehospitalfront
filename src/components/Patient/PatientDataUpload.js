/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Tooltip from 'antd/lib/tooltip';
import Popover from 'antd/lib/popover';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import waiting from '../../assets/images/waiting.gif';
import { request, upload } from '../../services/utilities';
import { API_URI, documentType, patientAPI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import {
	addPatientUploadData,
	loadPatientUploadData,
} from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';

const UploadPatientData = ({ onHide, uploading, doUpload, documentType }) => {
	const [theDocumentType, setDocumentType] = useState('');
	const [files, setFile] = useState(null);
	let uploadAttachment;

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<form onSubmit={e => doUpload(e, files, theDocumentType)}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="category">Category</label>
											<select
												id="category"
												className="form-control"
												onChange={e => setDocumentType(e.target.value)}>
												<option>Select Document Type</option>
												{documentType.map((doc, i) => {
													return (
														<option key={i} value={doc.id}>
															{doc.name}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-group">
											<input
												className="d-none"
												onClick={e => {
													e.target.value = null;
												}}
												type="file"
												ref={el => {
													uploadAttachment = el;
												}}
												onChange={e => setFile(e.target.files)}
											/>
											<label htmlFor="department">File</label>
											<a
												className="btn btn-outline-secondary ml-4"
												onClick={() => {
													uploadAttachment.click();
												}}>
												<i className="os-icon os-icon-ui-51" />
												<span>Select File</span>
											</a>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12 text-right">
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
		</div>
	);
};

const PatientDataUpload = props => {
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [upload_visible, setUploadVisible] = useState(false);
	const hide = () => {
		setUploadVisible(false);
	};

	const handleUploadVisibleChange = visible => {
		setUploadVisible(visible);
	};

	const handleDownload = async (evt, data) => {
		try {
			setLoading(true);
			// const rs = await request(
			// 	`${patientAPI}/download/${data.document_name}`,
			// 	'GET',
			// 	true
			// );
			//
			const url = `${API_URI}/${patientAPI}/download/${data.document_name}`;
			setTimeout(() => {
				window.open(url, '_blank').focus();
				setLoading(false);
			}, 2000);
		} catch (e) {
			console.log(e);
			setLoading(false);
			notifyError(e.message || 'could not download data');
		}
		console.log(data);
	};

	useEffect(() => {
		const listDocuments = async () => {
			try {
				let patient = props.patient;
				const rs = await request(
					`${patientAPI}/${patient.id}/documents`,
					'GET',
					true
				);
				props.loadPatientUploadData(rs);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
				notifyError(e.message);
				// throw new SubmissionError({
				// 	_error: e.message || 'could not load data',
				// });
			}
		};

		if (loading) {
			listDocuments();
		}
	}, [loading, props]);

	// const reload = () => {
	// 	const current = props.location.pathname;
	// 	this.props.history.replace(`/reload`);
	// 	setTimeout(() => {
	// 		this.props.history.replace(current);
	// 	});
	// };

	const onUpload = async (e, files, documentID) => {
		let patient = props.patient;
		e.preventDefault();
		const file = files[0];
		if (file) {
			setUploading(true);
			try {
				let formData = new FormData();
				formData.append('file', file);
				formData.append('document_type', documentID);
				for (var key of formData.entries()) {
					console.log(key[0] + ', ' + key[1]);
				}
				await upload(
					`${API_URI}/${patientAPI}/${patient.id}/upload-document`,
					'POST',
					formData
				);
				//props.addPatientUploadData(rs);
				const doc = documentType.find(d => d.id === documentID);
				notifySuccess(
					`Patient Data Uploaded for ${doc ? doc.name : ''} Document`
				);
				setUploading(false);
				setUploadVisible(false);
				//props.history.pushState(null, '/');
				//props.history.pushState(null, '/settings/roles#upload-document');
				props.history.push('/settings/roles#upload-document');
			} catch (error) {
				console.log(error);
				setUploading(false);
				throw new SubmissionError({
					_error: e.message || 'could not upload data',
				});
			}
		}
	};
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Popover
						content={
							<UploadPatientData
								onHide={hide}
								uploading={uploading}
								doUpload={onUpload}
								documentType={documentType}
							/>
						}
						overlayClassName="upload-roster"
						onVisibleChange={handleUploadVisibleChange}
						visible={upload_visible}
						trigger="click">
						<a className="btn btn-sm btn-link btn-upper mr-4 d-lg-inline-block">
							<i className="os-icon os-icon-upload" />
							<span>Upload Document</span>
						</a>
					</Popover>
				</div>
				<h6 className="element-header">Patient Data Upload</h6>
				<div className="element-box">
					<div className="form-block w-100">
						<div className="pipelines-w">
							<div className="row">
								<div className="col-lg-12 col-xxl-12">
									<div className="element-wrapper">
										<div className="element-box-tp">
											<div className="table-responsive">
												<table className="table table-padded">
													<thead>
														<tr>
															<th>ID</th>
															<th>Document Name</th>
															<th>Document Type</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														{loading ? (
															<tr>
																<td colSpan="4" className="text-center">
																	<img alt="searching" src={searchingGIF} />
																</td>
															</tr>
														) : (
															<>
																{props.patient_upload.map((doc, i) => {
																	return (
																		<tr key={i}>
																			<td>{i + 1}</td>
																			<td>{doc.document_name}</td>
																			<td>{doc.document_type}</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																				<Tooltip title="Download File">
																					<a
																						onClick={evt =>
																							handleDownload(evt, doc)
																						}>
																						<i className="os-icon os-icon-download-cloud" />
																					</a>
																				</Tooltip>
																			</td>
																		</tr>
																	);
																})}
															</>
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		patient_upload: state.patient.patient_upload,
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {
		addPatientUploadData,
		loadPatientUploadData,
	})
)(PatientDataUpload);

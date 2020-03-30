/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';
import Popover from 'antd/lib/popover';
import waiting from '../../assets/images/waiting.gif';
import { upload } from '../../services/utilities';
import { API_URI, inventoryUploadAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';

const UploadPatientData = ({ onHide, uploading, doUpload }) => {
	const [category, setCategory] = useState('');
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
							<form onSubmit={e => doUpload(e, files)}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="category">Document Name</label>

											<input
												className="form-control"
												placeholder="Document Name"
												type="text"
												name="name"
												required
											/>
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

const PatientDataUpload = () => {
	const [uploading, setUploading] = useState(false);
	const [upload_visible, setUploadVisible] = useState(false);
	const hide = () => {
		setUploadVisible(false);
	};

	const handleUploadVisibleChange = visible => {
		setUploadVisible(visible);
	};

	const onUpload = async (e, files, category_id) => {
		e.preventDefault();
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
														<tr>
															<td>
																<div className="user-with-avatar">1</div>
															</td>
															<td>
																<div className="smaller lighter">Vitals</div>
															</td>
															<td>
																<span>PDF</span>
															</td>

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
															</td>
														</tr>
														<tr>
															<td>
																<div className="user-with-avatar">2</div>
															</td>
															<td>
																<div className="smaller lighter">
																	Consultation History
																</div>
															</td>
															<td>
																<span>Excel</span>
															</td>

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
															</td>
														</tr>
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

export default PatientDataUpload;

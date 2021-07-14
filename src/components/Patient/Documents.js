/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import Popover from 'antd/lib/popover';

import TableLoading from '../TableLoading';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, upload } from '../../services/utilities';
import { API_URI, patientAPI, documentType } from '../../services/constants';
import UploadDocument from './UploadDocument';

const Documents = () => {
	const [loading, setLoading] = useState(true);
	const [documentList, setDocumentList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [upload_visible, setUploadVisible] = useState(false);

	const patient = useSelector(state => state.user.patient);

	const fetchDocuments = useCallback(async () => {
		try {
			const url = `${patientAPI}/${patient.id}/documents`;
			const rs = await request(url, 'GET', true);
			setDocumentList(rs);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
			notifyError(e.message || 'could not fetch documents');
		}
	}, [patient]);

	useEffect(() => {
		if (loading) {
			fetchDocuments();
		}
	}, [fetchDocuments, loading]);

	const hide = () => {
		setUploadVisible(false);
	};

	const handleUploadVisibleChange = visible => {
		setUploadVisible(visible);
	};

	const handleDownload = async (evt, data) => {
		try {
			setLoading(true);
			const url = `${API_URI}/${patientAPI}/download/${data.document_name}`;
			setTimeout(() => {
				window.open(url, '_blank').focus();
				setLoading(false);
			}, 1000);
		} catch (e) {
			console.log(e);
			setLoading(false);
			notifyError(e.message || 'could not download data');
		}
		console.log(data);
	};

	const onUpload = async (e, files, documentID) => {
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
				const url = `${API_URI}/${patientAPI}/${patient.id}/upload-document`;
				await upload(url, 'POST', formData);
				//props.addPatientUploadData(rs);
				const doc = documentType.find(d => d.id === documentID);
				notifySuccess(
					`Patient Data Uploaded for ${doc ? doc.name : ''} Document`
				);
				setUploading(false);
				setUploadVisible(false);
			} catch (error) {
				console.log(error);
				setUploading(false);
				notifyError(e.message || 'could not upload data');
			}
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Popover
						content={
							<UploadDocument
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
				<h6 className="element-header">Documents</h6>
				<div className="element-box m-0 p-3">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>ID</th>
											<th>Document Name</th>
											<th>Document Type</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{documentList.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.id}</td>
													<td>{item.document_name}</td>
													<td>{item.document_type}</td>
													<td className="row-actions text-right">
														<Tooltip title="View File">
															<a onClick={e => handleDownload(e, item)}>
																<i className="os-icon os-icon-eye" />
															</a>
														</Tooltip>
														<Tooltip title="Download File">
															<a onClick={e => handleDownload(e, item)}>
																<i className="os-icon os-icon-download-cloud" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Documents;

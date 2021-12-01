/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import Popover from 'antd/lib/popover';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { notifySuccess, notifyError } from '../../services/notify';
import { itemRender, request, upload } from '../../services/utilities';
import { API_URI, patientAPI, documentType } from '../../services/constants';
import UploadDocument from './UploadDocument';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Documents = () => {
	const [loading, setLoading] = useState(true);
	const [documentList, setDocumentList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadVisible, setUploadVisible] = useState(false);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const patient = useSelector(state => state.user.patient);

	const fetchDocuments = useCallback(
		async page => {
			try {
				const p = page || 1;
				const url = `${patientAPI}/${patient.id}/documents?page=${p}`;
				const rs = await request(url, 'GET', true);
				const { result, ...paginate } = rs;
				setMeta(paginate);
				setDocumentList(result);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
				notifyError(e.message || 'could not fetch documents');
			}
		},
		[patient]
	);

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

	const handleDownload = data => {
		try {
			dispatch(startBlock());
			const url = `${API_URI}/uploads/docs/${data.document_name}`;
			setTimeout(() => {
				dispatch(stopBlock());
				window.open(url, '_blank').focus();
			}, 1000);
		} catch (e) {
			dispatch(stopBlock());
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
				const rs = await upload(url, 'POST', formData);
				setDocumentList([...documentList, rs.document]);
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

	const onNavigatePage = async nextPage => {
		dispatch(startBlock());
		await fetchDocuments(nextPage);
		dispatch(stopBlock());
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
						visible={uploadVisible}
						trigger="click">
						<a className="btn btn-sm btn-secondary text-white">
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
											console.log(item);
											return (
												<tr key={i}>
													<td>{item.id}</td>
													<td>{item.document_name}</td>
													<td>{item.document_type}</td>
													<td className="row-actions">
														<Tooltip title="Download File">
															<a onClick={() => handleDownload(item)}>
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
					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} lab results`}
								itemRender={itemRender}
								onChange={current => onNavigatePage(current)}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Documents;

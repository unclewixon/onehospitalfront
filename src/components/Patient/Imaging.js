/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { loadImagingRequests } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import { API_URI, documentType, patientAPI } from '../../services/constants';
import { request, upload } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import Popover from 'antd/lib/popover';
import waiting from '../../assets/images/waiting.gif';
import { SubmissionError } from 'redux-form';

import { uploadRadiology } from '../../actions/general';

const Imaging = props => {
	const [loading, setLoading] = useState(false);
	const [upload_visible, setUploadVisible] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [selectedRequest, setRequest] = useState(false);

	const UploadImagingData = ({ uploading, doUpload, hide }) => {
		const [files, setFiles] = useState(null);
		const [label, setLabel] = useState('');
		let uploadAttachment;
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

	const fetchImaging = async () => {
		setLoading(true);
		const { patient } = props;
		try {
			const rs = await request(
				`${API_URI}/patient/${patient.id}/request/imaging?startDate=&endDate=`,
				'GET',
				true
			);
			console.log(rs);
			props.loadImagingRequests(rs);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			notifyError('error fetching imaging requests for the patient');
		}
	};

	const handleUpload = (evt, data) => {
		setRequest(data);
		setHidden(true);
	};
	const onBackClick = () => {
		setHidden(false);
	};

	const handleUploadVisibleChange = visible => {
		setUploadVisible(visible);
	};

	const hide = () => {
		setUploadVisible(false);
	};

	const onUpload = async (e, files) => {
		e.preventDefault();
		console.log(files);
		if (!files) {
			notifyError('You did not select any image file');
			return;
		}
		setUploading(true);
		const { patient } = props;

		let fileData = [];
		fileData.files = [...files];

		console.log(fileData);
		//files: [file1, file2, file3]
		const file = files[0];
		if (file) {
			try {
				let formData = new FormData();
				formData.append('file', fileData);
				formData.append('document_type', 'Imaging');
				const rs = await upload(
					`${API_URI}${patientAPI}` +
						'/' +
						patient.id +
						'/upload-request-document',
					'POST',
					formData
				);
				notifySuccess(`Patient Imaging Data Uploaded`);
				setHidden(false);
				setUploading(false);
				console.log(rs);
			} catch (error) {
				console.log(error);
				setUploading(false);
				throw new SubmissionError({
					_error: e.message || 'could not upload data',
				});
			}
		}
	};

	const convertToIndividualRequest = data => {
		let newData = [];
		data.forEach(value => {
			if (Array.isArray(value.requestBody)) {
				value.requestBody.forEach(val => {
					newData.push({
						id: value.id,
						isActive: value.isActive,
						createdAt: value.createdAt,
						updateAt: value.updateAt,
						requestType: value.requestType,
						requestBody: {
							amount: val.amount,
							service_id: val.service_id,
							specialization: val.specialization,
						},
						status: value.status,
					});
				});
			} else {
				newData.push(value);
			}
		});

		return newData;
	};

	const togglePopover = () => {
		setUploadVisible(true);
	};

	const getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	const calculateAmount = arr => {
		let sum = 0;
		arr.forEach(val => {
			let amt = val.amount;
			if (amt === undefined) {
				amt = 0;
			}
			try {
				sum += parseInt(amt);
			} catch (e) {
				sum += 0;
			}
		});
		return sum;
	};

	const tableBody = () => {
		//let requests = convertToIndividualRequest(props.imagingRequests);
		return props.imagingRequests.length > 0 ? (
			props.imagingRequests.map((data, i) => {
				return (
					<tr className="" data-index="0" data-id="20" key={i}>
						<td>{i + 1}</td>
						<td>
							<span className="text-bold">{getRequests(data.requestBody)}</span>
						</td>
						<td>{calculateAmount(data.requestBody)}</td>
						<td>{moment(data.createdAt).format('DD-MM-YYYY LT')}</td>

						<td className="text-center">
							<span className="badge badge-secondary">
								{data.status === 0 ? 'pending' : 'completed'}
							</span>
						</td>
						<td className="row-actions text-right">
							<Tooltip title="View Request">
								<a>
									<i className="os-icon os-icon-documents-03" />
								</a>
							</Tooltip>
							<Tooltip title="Print Request">
								<a className="ml-2">
									<i className="icon-feather-printer" />
								</a>
							</Tooltip>
						</td>
					</tr>
				);
			})
		) : (
			<tr>
				<td colSpan="6" className="text-center">
					No Imaging request
				</td>
			</tr>
		);
	};

	useEffect(() => {
		fetchImaging();
	}, []);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper" hidden={hidden}>
				<div className="element-actions">
					<Link
						className="btn btn-primary"
						to={`${props.location.pathname}#imaging-request`}>
						<i className="os-icon os-icon-plus"></i>
						New Imaging Request
					</Link>
				</div>
				<h6 className="element-header">Imaging Requests</h6>
				<div
					hidden={!upload_visible}
					className="element-actions"
					style={{ position: 'absolute', right: '40px' }}>
					<UploadImagingData
						uploading={uploading}
						doUpload={onUpload}
						hide={hide}
					/>
				</div>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar"></div>
							</div>
						</div>
						<div
							className="fixed-table-container"
							style={{ paddingBottom: '0px' }}>
							<div className="fixed-table-body">
								<table
									id="table"
									className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>S/N</th>
											<th>Specialization</th>
											<th>Amount (&#x20A6;)</th>
											<th>Requested Date</th>
											<th className="text-center">Request Status</th>
											<th className="text-right" />
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td colSpan="6" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											<>{tableBody()}</>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div hidden={!hidden}>
				<UploadImagingData
					uploading={uploading}
					doUpload={onUpload}
					onBackClick={onBackClick}
				/>
			</div> */}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		imagingRequests: state.patient.imagingRequests,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadImagingRequests, uploadRadiology })(Imaging)
);

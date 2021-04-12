/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import { notifyError, notifySuccess } from '../../services/notify';
import { API_URI, searchAPI, patientAPI } from '../../services/constants';
import { upload } from '../../services/utilities';
import { request } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';

const ModalUploadRadiology = props => {
	const [submitting, setSubmitting] = useState(false);
	const [file, setFile] = useState(false);
	const [label, setLabel] = useState('');
	// const [uploading, setUploading] = useState(false);
	const [query, setQuery] = useState('');
	const [searching, setSearching] = useState(false);
	const [patients, setPatients] = useState([]);
	const [patientId, setPatientId] = useState(null);

	let history = useHistory();

	const handleChange = e => {
		setFile(e.target.files);

		let label = Array.from(e.target.files)
			.map(file => {
				return file.name;
			})
			.join(',');
		setLabel(label);
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (file && patientId) {
			setSubmitting(true);
			try {
				let formData = new FormData();
				formData.append('document_type', patientId);
				formData.append('files', file);

				await upload(
					`${API_URI}/${patientAPI}/${patientId}/upload-request-document`,
					'POST',
					formData
				);

				history.push('/radiology#imaging');
				props.closeModals(true);

				notifySuccess('Radiology file uploaded successfully');
				setSubmitting(false);
			} catch (error) {
				notifyError('File upload failed');
				setSubmitting(false);
			}
		} else if (!patientId) {
			notifyError('Make sure you select patient');
		} else {
			notifyError('Make sure you select file(s)');
		}
	};

	const handlePatientChange = e => {
		setQuery(e.target.value);
		searchPatient();
	};

	const searchPatient = async () => {
		if (query.length > 2) {
			try {
				setSearching(true);
				const rs = await request(`${searchAPI}?q=${query}`, 'GET', true);

				setPatients(rs);
				setSearching(false);
			} catch (e) {
				notifyError('Error Occurred');
				setSearching(false);
			}
		}
	};

	const patientSet = pat => {
		// setValue('patient_id', pat.id);
		setPatientId(pat.id);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		setPatients([]);
	};

	useEffect(() => {
		if (!patientId) {
			setPatientId(props.patient.id);
		}
	}, [patientId, props.patient.id]);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-lg modal-centered" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => props.closeModals(false)}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Upload Imaging</h4>

						<div className="form-block">
							<form onSubmit={onSubmit}>
								{!props.patient.id ? (
									<div className="row my-4">
										<div className="form-group col-12 px-0">
											<label>Patient</label>

											<input
												className="form-control"
												placeholder="Search for patient"
												type="text"
												name="patient"
												defaultValue=""
												id="patient"
												onChange={handlePatientChange}
												autoComplete="off"
												required
											/>
											{searching && (
												<div className="searching text-center">
													<img alt="searching" src={searchingGIF} />
												</div>
											)}

											{patients &&
												patients.map(pat => {
													return (
														<div
															style={{ display: 'flex' }}
															key={pat.id}
															className="element-box">
															<a
																onClick={() => patientSet(pat)}
																className="ssg-item cursor">
																{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.folderNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
																<div
																	className="item-name"
																	dangerouslySetInnerHTML={{
																		__html: `${pat.surname} ${pat.other_names}`,
																	}}
																/>
															</a>
														</div>
													);
												})}
										</div>
									</div>
								) : null}
								<div className="row my-4">
									<div className="custom-file col-12">
										<input
											type="file"
											className="custom-file-input"
											name="file"
											accept="image/*"
											onChange={handleChange}
											multiple
										/>
										<label className="custom-file-label">
											{label || 'Choose File'}
										</label>
									</div>
								</div>
								<div className="row mt-2">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit">
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
											)}
										</button>

										<button
											className="btn btn-secondary ml-2"
											onClick={() => props.closeModals(false)}
											type="button">
											Cancel
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

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		imagingRequests: state.patient.imagingRequests,
	};
};

export default connect(mapStateToProps, { closeModals })(ModalUploadRadiology);

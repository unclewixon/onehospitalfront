/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';

const UploadRoster = ({ onHide, uploading, doUpload, departments }) => {
	const [department, setDepartment] = useState('');
	const [period, setPeriod] = useState(null);
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
							<form onSubmit={e => doUpload(e, files, period, department)}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label>Period</label>
											<div className="custom-date-input">
												<DatePicker
													selected={period}
													onChange={date => setPeriod(date)}
													peekNextMonth
													dateFormat="MMM-yyyy"
													className="single-daterange form-control"
													placeholderText="Select period"
												/>
											</div>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="department">Department</label>
											<select
												id="department"
												className="form-control"
												onChange={e => setDepartment(e.target.value)}>
												<option>Select Department</option>
												{departments.map((dept, i) => {
													return (
														<option key={i} value={dept.id}>
															{dept.name}
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

export default UploadRoster;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';

const DownloadRoster = ({ onHide, downloading, doDownload, departments }) => {
	const [department, setDepartment] = useState('');
	const [period, setPeriod] = useState(null);

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}
		>
			<div className="modal-centered" role="document">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<form onSubmit={e => doDownload(e, period, department)}>
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
												onChange={e => setDepartment(e.target.value)}
											>
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
								</div>
								<div className="row">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={downloading}
											type="submit"
										>
											{downloading ? (
												<img src={waiting} alt="submitting" />
											) : (
												'download'
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

export default DownloadRoster;

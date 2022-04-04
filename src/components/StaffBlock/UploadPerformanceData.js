import React, { useState } from 'react';

import waiting from '../../assets/images/waiting.gif';

const UploadPerformanceData = ({ uploading, doUpload, hide }) => {
	const [files, setFiles] = useState(null);
	const [label, setLabel] = useState('');

	const handleChange = e => {
		setFiles(e.target.files[0]);
		setLabel(e.target.files[0].name);
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '400px' }}
		>
			<div className="modal-centered">
				<div className="modal-content text-center">
					<button onClick={hide} className="close" type="button">
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Upload Performance Indicators</h4>

						<form
							className="form-block w-100"
							onSubmit={e => doUpload(e, files)}
						>
							<div className="row my-3">
								<div className="custom-file col-12">
									{/* {label ? <textarea>{label}</textarea> : null} */}
									<input
										type="file"
										className="custom-file-input"
										name="file"
										accept=".csv"
										onChange={handleChange}
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
										type="submit"
									>
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

export default UploadPerformanceData;

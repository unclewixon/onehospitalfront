import React, { useState } from 'react';

import waiting from '../../assets/images/waiting.gif';

const UploadImagingData = ({ uploading, upload, closeModal }) => {
	const [files, setFiles] = useState(null);
	const [label, setLabel] = useState('');

	const handleChange = e => {
		setFiles(e.target.files);

		const label = Array.from(e.target.files)
			.map(file => {
				return file.name;
			})
			.join(',');

		setLabel(label);
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Upload Scan</h4>
						<div className="element-box m-0 p-2">
							<form className="form-block" onSubmit={e => upload(e, files)}>
								<div className="row m-0">
									<div className="col-md-9">
										<input
											type="file"
											className="custom-file-input"
											name="file"
											accept="image/*"
											onChange={handleChange}
										/>
										<label className="custom-file-label">
											{label.substring(0, 40) || 'Choose File(s)'}
										</label>
									</div>
									<div className="col-md-3" style={{ lineHeight: '38px' }}>
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
		</div>
	);
};

export default UploadImagingData;

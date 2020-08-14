import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import { notifyError, notifySuccess } from '../../services/notify';

import { upload } from '../../services/utilities';

const AddCafeteriaFile = props => {
	const [submitting, setSubmitting] = useState(false);
	const [file, setFile] = useState(false);
	const [label, setLabel] = useState('');
	// const [uploading, setUploading] = useState(false);

	let history = useHistory();

	const handleChange = e => {
		console.log(e.target.files[0]);
		setFile(e.target.files[0]);

		setLabel(e.target.files[0].name);
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (file) {
			setSubmitting(true);
			try {
				let formData = new FormData();
				formData.append('file', file);

				await upload(`cafeteria/items/bulk-upload`, 'POST', formData);

				console.log(props.location);
				history.push('/cafeteria/items');
				props.closeModals(true);

				notifySuccess('Cafeteria file uploaded successfully');
				setSubmitting(false);
			} catch (error) {
				console.log(error);
				notifyError('File upload failed');
				setSubmitting(false);
			}
		}
	};
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
						<h4 className="onboarding-title">Cafeteria File Upload</h4>

						<div className="form-block">
							<form onSubmit={onSubmit}>
								<div className="row my-4">
									<div className="custom-file col-12">
										<input
											type="file"
											className="custom-file-input"
											name="file"
											pattern="^.+\.(xlsx|xls|csv)$"
											accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
											onChange={handleChange}
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
											className="btn btn-primary ml-2"
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

export default connect(null, { closeModals })(AddCafeteriaFile);

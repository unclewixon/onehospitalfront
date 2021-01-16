import React, { Component } from 'react';

import { diagnosisAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { uploadFile } from '../../services/utilities';

class ModalUploadDiagnosis extends Component {
	state = {
		file: null,
		submitting: false,
		diagnosisType: '',
	};

	handleInputChange = e => this.setState({ file: e.target.files[0] });

	handleSelect = e => this.setState({ diagnosisType: e.target.value });

	onUpload = async e => {
		e.preventDefault();
		try {
			this.setState({ submitting: true });
			const fd = new FormData();
			fd.append('file', this.state.file);
			fd.append('diagnosisType', this.state.diagnosisType);
			const rs = await uploadFile(`${diagnosisAPI}/upload`, fd);
			const { data } = rs;
			if (data.success) {
				this.setState({ submitting: false, file: null, diagnosisType: '' });
				this.props.closeModal(true);
				notifySuccess('Service file uploaded');
			} else {
				this.setState({ submitting: false });
				notifyError(data.message || 'Service file uploaded');
			}
		} catch (e) {
			this.setState({ submitting: false });
		}
	};

	render() {
		const { closeModal } = this.props;
		const { submitting } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => closeModal(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Upload Diagnosis</h4>

							<form onSubmit={this.onUpload}>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Select File"
										type="file"
										name="file"
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<select
										className="form-control"
										placeholder="Type of Diagnosis"
										name="diagnosisType"
										onChange={this.handleSelect}
										required>
										<option>Choose Diagnosis Type</option>
										<option value="10">ICD-10</option>
										<option value="2">ICPC-2</option>
									</select>
								</div>
								<div className="form-buttons-w">
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> Upload</span>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModalUploadDiagnosis;

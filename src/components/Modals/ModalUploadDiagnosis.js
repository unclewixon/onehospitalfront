import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import {
	uploadDiagnosis,
	getAllDiagnosises,
	updateDiagnosis,
	deleteDiagnosis,
} from '../../actions/settings';

import { notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';

class ModalUploadDiagnosis extends Component {
	state = {
		file: null,
		Loading: false,
		diagnosisType: '',
	};

	handleInputChange = e => {
		this.setState({
			file: e.target.files[0],
		});
	};

	handleSelect = e => {
		this.setState({
			diagnosisType: e.target.value,
		});
	};

	onUpload = e => {
		this.setState({ Loading: true });
		e.preventDefault();
		const data = new FormData();
		data.append('file', this.state.file);
		data.append('diagnosisType', this.state.diagnosisType);
		this.props
			.uploadDiagnosis(data)
			.then(response => {
				this.setState({ Loading: false });
				this.props.closeModals(false);
				notifySuccess('Service file uploaded');
			})
			.catch(error => {
				this.setState({ Loading: false });
			});
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { Loading } = this.state;
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
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Upload Diagnosis</h4>

							<form onSubmit={this.onUpload}>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Category Name"
										type="file"
										name="file"
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<select
										className="form-control"
										placeholder="Category Name"
										name="diagnosisType"
										onChange={this.handleSelect}
										required>
										<option>Choose Diagnosis Type</option>
										<option value="10">ICD-10</option>
										<option value="2">ICPC-2</option>
									</select>
								</div>
								<div className="form-buttons-w">
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{Loading ? (
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

export default connect(null, {
	closeModals,
	uploadDiagnosis,
	getAllDiagnosises,
	updateDiagnosis,
	deleteDiagnosis,
})(ModalUploadDiagnosis);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { notifySuccess, notifyError } from '../../services/notify';
import { API_URI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';

class ModalUploadService extends Component {
	state = {
		file: null,
		loading: false,
		hmo: '',
	};

	handleInputChange = e => this.setState({ file: e.target.files[0] });

	onUpload = async e => {
		try {
			e.preventDefault();
			const { staff } = this.props;
			const { hmo, file } = this.state;

			this.setState({ loading: true });

			const form = new FormData();
			form.append('file', file);
			form.append('username', staff.username);
			form.append('hmo_id', hmo);

			const url = `${API_URI}/services/upload-services`;
			const { data } = await axios.post(url, form);
			if (data.success) {
				this.setState({ loading: false });
				this.props.closeModal();
				notifySuccess('service file uploaded!');
			} else {
				this.setState({ loading: false });
				notifyError(data.message);
			}
		} catch (e) {
			this.setState({ loading: false });
			notifyError(e.message || 'error uploading services');
		}
	};

	render() {
		const { loading, hmo } = this.state;
		const { hmos, closeModal } = this.props;
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
							onClick={closeModal}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Upload Service</h4>
							<div className="pipeline white lined-warning">
								<form onSubmit={this.onUpload}>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group mb-0">
												<input
													className="form-control"
													placeholder="Category Name"
													type="file"
													name="file"
													onChange={this.handleInputChange}
												/>
											</div>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-12">
											<div className="form-group">
												<label>Select HMO</label>
												<select
													className="form-control bright"
													name="hmo"
													value={hmo}
													onChange={e => {
														this.setState({ hmo: e.target.value });
													}}>
													<option value="">Select HMO</option>
													{hmos.map((hmo, i) => {
														return (
															<option key={i} value={hmo.id}>
																{hmo.name}
															</option>
														);
													})}
												</select>
											</div>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-12">
											<div className="ml-2">
												<button
													className={`btn btn-primary ${
														loading ? 'disabled' : ''
													}`}
													style={{ marginTop: '6px' }}>
													{loading ? (
														<img src={waiting} alt="submitting" />
													) : (
														<span> Upload</span>
													)}
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.user.profile,
		hmos: [],
	};
};

export default connect(mapStateToProps)(ModalUploadService);

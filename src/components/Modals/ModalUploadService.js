import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { closeModals } from '../../actions/general';
import {
	getAllService,
	updateService,
	deleteService,
} from '../../actions/settings';
import { notifySuccess } from '../../services/notify';
import { API_URI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';

class ModalUploadService extends Component {
	state = {
		file: null,
		loading: false,
	};

	handleInputChange = e => {
		this.setState({
			file: e.target.files[0],
		});
	};

	onUpload = async e => {
		e.preventDefault();
		try {
			const { staff } = this.props;
			this.setState({ loading: true });

			const data = new FormData();
			data.append('file', this.state.file);
			data.append('username', staff.username);

			const url = `${API_URI}/services/upload-services`;
			const rs = await axios.post(url, data);
			console.log(rs);
			this.setState({ loading: false });
			this.props.closeModals(false);
			notifySuccess('Service file uploaded');
		} catch (e) {
			this.setState({ loading: false });
		}
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { loading } = this.state;
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
							<h4 className="onboarding-title">Upload Service</h4>
							<div className="onboarding-text">Upload Services</div>
							<div className="pipeline white lined-warning">
								<form onSubmit={this.onUpload}>
									<h6 className="form-header">New category</h6>
									<div className="form-group">
										<input
											className="form-control"
											placeholder="Category Name"
											type="file"
											name="file"
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-buttons-w">
										<button
											className={
												loading ? 'btn btn-primary disabled' : 'btn btn-primary'
											}>
											{loading ? (
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
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.user.profile,
	};
};

export default connect(mapStateToProps, {
	closeModals,
	getAllService,
	updateService,
	deleteService,
})(ModalUploadService);

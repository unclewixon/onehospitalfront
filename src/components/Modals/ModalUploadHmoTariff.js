import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import { getAllHmos, fetchHmoTariff, uploadHmoTariff } from '../../actions/hmo';
import { confirmAction } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { ProgressBar } from 'react-bootstrap';

class ModalUploadHmoTariff extends Component {
	state = {
		submitting: null,
		Loading: false,
		selectedHmo: '',
		uploadType: 'services',
		defaultValue: null,
		data_fetched: false,
	};

	handleFileChange = e => {
		this.setState({
			file: e.target.files[0],
		});
	};

	handleInputChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	onUpload = e => {
		this.setState({ Loading: true });
		e.preventDefault();
		const { selectedHmo, file, uploadType } = this.state;
		const data = new FormData();
		data.append('file', file);
		data.append('hmo_id', selectedHmo);
		data.append('uploadType', uploadType);
		this.props
			.uploadHmoTariff(data)
			.then(response => {
				this.setState({ Loading: false });
				this.props.closeModals(false);
				notifySuccess('Hmo services  uploaded');
			})
			.catch(error => {
				this.setState({ Loading: false });
				notifyError(e.message || 'could not upload file');
			});
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
		this.props.getAllHmos().then(response => {
			let defaultValue = { ...this.props.hmoList[0] };
			let defaultOption = { label: defaultValue.name, value: defaultValue.id };
			this.setState({ selectedHmo: defaultOption.value });
		});
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { Loading, selectedHmo, defaultValue, uploadType } = this.state;
		const { progress, hmoList } = this.props;
		const hmos = hmoList.map(hmo => {
			return { label: hmo.name, value: hmo.id };
		});
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
							<h4 className="onboarding-title">Upload hmo services</h4>

							<form onSubmit={this.onUpload}>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Category Name"
										type="file"
										name="file"
										onChange={this.handleFileChange}
									/>
								</div>
								<div className="form-group">
									<label>Upload type</label>
									<select
										className="form-control"
										name="uploadType"
										value={uploadType}
										defaultValue={defaultValue}
										onChange={this.handleInputChange}>
										<option value="services">Services</option>
										<option value="stocks">Stocks</option>
									</select>
								</div>
								<div className="form-group">
									<label>Select Hmo</label>
									<select
										className="form-control bright"
										name="selectedHmo"
										value={selectedHmo}
										defaultValue={defaultValue}
										onChange={this.handleInputChange}>
										{hmos.map(hmo => {
											return <option value={hmo.value}>{hmo.label}</option>;
										})}
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
						{Loading && (
							<div className="onboarding-content with-gradient">
								<ProgressBar now={progress} />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		progress: state.hmo.hmo_upload_progress,
		hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	closeModals,
	getAllHmos,
	fetchHmoTariff,
	uploadHmoTariff,
})(ModalUploadHmoTariff);

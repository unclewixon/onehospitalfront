/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import InventoryItem from '../../components/InventoryItem';
import { createInventory } from '../../actions/general';

import { request, upload } from '../../services/utilities';
import {
	API_URI,
	inventoryAPI,
	inventoryDownloadAPI,
	inventoryUploadAPI,
} from '../../services/constants';
import { loadInventories } from '../../actions/inventory';
import Popover from 'antd/lib/popover';
import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { notifyError, notifySuccess } from '../../services/notify';
import moment from 'moment';

const DownloadInventory = ({ onHide, downloading, doDownload }) => {
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
							<form onSubmit={e => doDownload(e)}>
								<div className="row">
									<div className="col-sm-6">
										<button
											className="btn btn-primary"
											disabled={downloading}
											type="submit">
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

const UploadInventory = ({ onHide, uploading, doUpload, categories }) => {
	const [category, setCategory] = useState('');
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
							<form onSubmit={e => doUpload(e, files, category)}>
								<div className="row">
									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="category">Category</label>
											<select
												id="category"
												className="form-control"
												onChange={e => setCategory(e.target.value)}>
												<option>Select Category</option>
												{categories.map((cat, i) => {
													return (
														<option key={i} value={cat.id}>
															{cat.name}
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

class InventoryList extends Component {
	state = {
		upload_visible: false,
		download_visible: false,
		downloading: false,
		uploading: false,
		category_id: '',
		period: null,
		filtering: false,
	};

	componentDidMount() {
		this.fetchInventories();
	}

	hide = () => {
		this.setState({ upload_visible: false, download_visible: false });
	};

	onUpload = async (e, files, category_id) => {
		e.preventDefault();
		const { categories } = this.props;
		const file = files[0];
		if (file) {
			this.setState({ uploading: true });
			try {
				let formData = new FormData();
				formData.append('file', file);
				formData.append('category_id', category_id);

				const rs = await upload(
					`${API_URI}${inventoryUploadAPI}`,
					'POST',
					formData
				);

				const cat = categories.find(d => d.id === category_id);
				this.fetchInventories();
				notifySuccess(`Inventory uploaded for ${cat ? cat.name : ''} Category`);
				this.setState({ uploading: false, category_id });
				this.setState({ upload_visible: false });
			} catch (error) {
				console.log(error);
				this.setState({ uploading: false });
			}
		}
	};

	downloadTemplate = async e => {
		e.preventDefault();
		this.setState({ downloading: true });
		try {
			const url = `${API_URI}${inventoryDownloadAPI}`;
			setTimeout(() => {
				window.open(url, '_blank').focus();
				this.setState({ downloading: false, download_visible: false });
			}, 2000);
		} catch (error) {
			notifyError(error.message || 'could not download template');
			this.setState({ downloading: false });
		}
		return false;
	};

	onDownloadVisibleChange = visible => {
		this.setState({ download_visible: visible });
	};

	handleUploadVisibleChange = visible => {
		this.setState({ upload_visible: visible });
	};
	fetchInventories = async () => {
		try {
			const rs = await request(`${API_URI}${inventoryAPI}`, 'GET', true);
			this.props.loadInventories(rs);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { categories, inventories } = this.props;
		const {
			upload_visible,
			download_visible,
			downloading,
			uploading,
			filtering,
			department_id,
		} = this.state;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a
										className="btn btn-primary btn-sm text-white"
										onClick={() => this.props.createInventory(true)}>
										<i className="os-icon os-icon-plus-circle" />
										<span>Create New Inventory</span>
									</a>
									<Popover
										content={
											<DownloadInventory
												onHide={this.hide}
												downloading={downloading}
											/>
										}
										overlayClassName="download-roster"
										trigger="click"
										visible={download_visible}
										onVisibleChange={this.onDownloadVisibleChange}>
										<a
											className="btn btn-success btn-sm text-white"
											onClick={e => this.downloadTemplate(e)}>
											<i className="os-icon os-icon-download" />
											<span>Download Template</span>
										</a>
									</Popover>
									<Popover
										content={
											<UploadInventory
												onHide={this.hide}
												uploading={uploading}
												doUpload={this.onUpload}
												categories={categories}
											/>
										}
										overlayClassName="upload-roster"
										trigger="click"
										visible={upload_visible}
										onVisibleChange={this.handleUploadVisibleChange}>
										<a className="btn btn-sm btn-link btn-upper mr-4 d-lg-inline-block">
											<i className="os-icon os-icon-upload" />
											<span>Upload Inventory</span>
										</a>
									</Popover>
								</div>
								<h6 className="form-header">Inventory List</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Category</th>
													<th>Name</th>
													<th>Sub Category</th>
													<th>Cost Price</th>
													<th>Selling Price</th>
													<th>Quantity</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												{inventories.map((inv, i) => {
													return (
														<InventoryItem key={i} index={i + 1} item={inv} />
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
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
		inventories: state.inventory.inventories,
		categories: state.inventory.categories,
	};
};

export default connect(mapStateToProps, { createInventory, loadInventories })(
	InventoryList
);

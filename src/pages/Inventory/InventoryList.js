/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Pagination from 'antd/lib/pagination';
import Popover from 'antd/lib/popover';

import { createInventory } from '../../actions/general';
import { request, itemRender } from '../../services/utilities';
import {
	API_URI,
	inventoryAPI,
	inventoryDownloadAPI,
	inventoryUploadAPI,
	vendorAPI,
	paginate,
} from '../../services/constants';
import { loadInventories } from '../../actions/inventory';
import { notifyError, notifySuccess } from '../../services/notify';
import InventoryTable from '../../components/Inventory/InventoryTable';
import { getAllHmos } from '../../actions/hmo';
import DownloadInventory from './DownloadInventory';
import UploadInventory from './UploadInventory';
import { startBlock, stopBlock } from '../../actions/redux-block';

class InventoryList extends Component {
	state = {
		currentSort: 'default',
		upload_visible: false,
		download_visible: false,
		downloading: false,
		uploading: false,
		category_id: '',
		period: null,
		filtering: false,
		vendors: [],
		meta: paginate,
	};

	componentDidMount() {
		this.props.getAllHmos();
		this.fetchInventories();
		this.fetchVendors();
	}

	fetchVendors = async () => {
		try {
			const rs = await request(`${vendorAPI}`, 'GET', true);
			this.setState({ vendors: rs });
		} catch (error) {
			console.log(error);
		}
	};

	hide = () => {
		this.setState({ upload_visible: false, download_visible: false });
	};

	onUpload = async (e, files, category_id, vendor, hmo) => {
		e.preventDefault();
		if (files.length > 0) {
			try {
				const file = files[0];
				const { categories } = this.props;
				this.setState({ uploading: true });
				this.props.startBlock();
				let formData = new FormData();
				formData.append('file', file);
				formData.append('category_id', category_id);
				formData.append('vendor_id', vendor);
				formData.append('hmo_id', hmo);
				const url = `${API_URI}/${inventoryUploadAPI}`;
				const rs = await axios.post(url, formData);
				if (rs.data.success) {
					setTimeout(async () => {
						await this.fetchInventories();
					}, 200);
					const cat = categories.find(d => d.id === category_id);
					notifySuccess(
						`Inventory uploaded for ${cat ? cat.name : ''} Category`
					);
					this.setState({
						uploading: false,
						category_id,
						upload_visible: false,
					});
				} else {
					this.setState({ uploading: false });
					notifyError('upload failed!');
				}
				this.props.stopBlock();
			} catch (error) {
				console.log(error);
				this.setState({ uploading: false });
				this.props.stopBlock();
			}
		}
	};

	downloadTemplate = async e => {
		e.preventDefault();
		this.setState({ downloading: true });
		try {
			const url = `${API_URI}/${inventoryDownloadAPI}`;
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

	fetchInventories = async (page, category_id) => {
		try {
			const { profile, categories } = this.props;
			let roleQy = '';
			if (profile.role.slug === 'pharmacy') {
				const category = categories.find(d => d.slug === 'pharmacy');
				roleQy = category ? `&q=${category.id}` : `&q=${category_id}`;
			} else {
				if (category_id) {
					roleQy = `&q=${category_id}`;
				}
			}
			const p = page || 1;
			const url = `${inventoryAPI}?page=${p}&limit=20${roleQy}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.props.loadInventories(result);
			this.setState({ meta });
		} catch (error) {
			console.log(error);
		}
	};

	changeQuery = async e => {
		console.log('changeQuery = async e ');
		const category_id = e.target.value;
		console.log('category_id: ', category_id);
		this.fetchInventories(null, category_id);
	};

	onNavigatePage = pageNumber => {
		this.fetchInventories(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	render() {
		const { categories, inventories, hmos } = this.props;
		const {
			upload_visible,
			download_visible,
			downloading,
			uploading,
			vendors,
			meta,
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
												vendors={vendors}
												hmos={hmos}
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
								<h6 className="element-header">Inventory List</h6>
								<div className="element-box m-0 p-3">
									<div className="element-wrapper">
										<div className="element-actions">
											<form className="form-inline justify-content-sm-end">
												<select
													className="form-control form-control-sm"
													onChange={e => this.changeQuery(e)}>
													<option value="">Filter by Category</option>
													{categories?.map((category, i) => (
														<option key={i} value={category.id}>
															{category.name}
														</option>
													))}
												</select>
											</form>
										</div>
									</div>
									<br />
									<div className="table-responsive">
										<InventoryTable data={inventories} />
									</div>
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} stocks`}
											itemRender={itemRender}
											onChange={this.onNavigatePage}
										/>
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
		profile: state.user.profile,
		hmos: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	createInventory,
	loadInventories,
	getAllHmos,
	startBlock,
	stopBlock,
})(InventoryList);

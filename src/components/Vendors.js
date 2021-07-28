/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notifySuccess, notifyError } from '../services/notify';
import { request } from '../services/utilities';
import { vendorAPI } from '../services/constants';
import CreateVendor from '../components/CreateVendor';
import EditVendor from '../components/EditVendor';
import { updateImmutable } from '../services/utilities';

class Vendors extends Component {
	state = {
		edit: false,
		vendorID: null,
		vendors: [],
	};

	componentDidMount() {
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

	editVendor = (vendor, action) => () => {
		this.setState({ vendorID: null, edit: false }, () => {
			this.setState({
				vendorID: vendor ? vendor.id : vendor,
				edit: action,
			});
		});
	};

	restEdit = () => this.setState({ edit: false });

	addVendor = item => {
		const { vendors } = this.state;
		this.setState({ vendors: [...vendors, item] });
	};

	updateVendor = item => {
		const { vendors } = this.state;
		const updatedVendors = updateImmutable(vendors, item);
		this.setState({ vendors: [...updatedVendors] });
	};

	deleteVendor = async vendor => {
		try {
			await request(`${vendorAPI}/${vendor.id}`, 'DELETE', true);
			const { vendors } = this.state;
			const filtered = vendors.filter(v => v.id !== vendor.id);
			this.setState({ vendors: filtered });
			notifySuccess('Vendor  deleted');
		} catch (error) {
			notifyError(error.message || 'Error deleting vendor ');
		}
	};

	render() {
		const { edit, vendorID, vendors } = this.state;
		const { role } = this.props;
		return (
			<div className="row">
				<div className="col-lg-7">
					<div className="element-wrapper">
						<div className="element-box m-0 p-3">
							<h5 className="form-header">Vendors</h5>
							<div className="form-desc" />
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>S/N</th>
											<th>Name</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{vendors.map((vendor, i) => {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>{vendor.name}</td>
													<td className="row-actions">
														{role === 'it-admin' ? (
															<>
																<a
																	onClick={this.editVendor(vendor, true)}
																	className="secondary"
																	title="Edit Vendor">
																	<i className="os-icon os-icon-edit-32" />
																</a>
																<a
																	className="danger"
																	onClick={() => this.deleteVendor(vendor)}>
																	<i className="os-icon os-icon-ui-15"></i>
																</a>
															</>
														) : (
															''
														)}
													</td>
												</tr>
											);
										})}
										{vendors.length === 0 && (
											<tr>
												<td colSpan="3">No vendors found!</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-5">
					{edit ? (
						<EditVendor
							vendorID={vendorID}
							vendors={vendors}
							editVendor={this.editVendor}
							restEdit={this.restEdit}
							updateVendor={item => this.updateVendor(item)}
						/>
					) : (
						<CreateVendor addVendor={item => this.addVendor(item)} />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		role: state.user.profile.role.slug,
	};
};

export default connect(mapStateToProps)(Vendors);

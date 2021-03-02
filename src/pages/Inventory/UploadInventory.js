/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import waiting from '../../assets/images/waiting.gif';

const UploadInventory = ({
	onHide,
	uploading,
	doUpload,
	categories,
	vendors,
	hmos,
}) => {
	const [category, setCategory] = useState('');
	const [vendor, setVendor] = useState('');
	const [hmo, setHmo] = useState('');
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
							<form onSubmit={e => doUpload(e, files, category, vendor, hmo)}>
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
											<label htmlFor="vendor">Vendor</label>
											<select
												id="vendor"
												className="form-control"
												onChange={e => setVendor(e.target.value)}>
												<option>Select vendor</option>
												{vendors.map((vendor, i) => {
													return (
														<option key={i} value={vendor.id}>
															{vendor.name}
														</option>
													);
												})}
											</select>
										</div>
									</div>

									<div className="col-sm-12">
										<div className="form-group">
											<label htmlFor="hmo">HMO</label>
											<select
												id="hmo"
												className="form-control"
												onChange={e => setHmo(e.target.value)}>
												<option>Select HMO</option>
												{hmos?.map((hmo, i) => {
													return (
														<option key={i} value={hmo.id}>
															{hmo.name}
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
												accept=".csv"
												ref={el => {
													uploadAttachment = el;
												}}
												onChange={e => setFile(e.target.files)}
											/>
											<label htmlFor="department">Inventory File</label>
											<a
												className="btn btn-outline-secondary overflow-hidden"
												onClick={() => {
													uploadAttachment.click();
												}}>
												<i className="os-icon os-icon-ui-51" />
												<span>{files ? files[0].name : 'Select File'}</span>
											</a>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6 text-left">
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
									<div className="col-sm-6 text-right">
										<p>only .csv files</p>
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

export default UploadInventory;

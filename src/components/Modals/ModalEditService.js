import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';

const ModalEditService = ({ closeModal, service }) => {
	const [loading] = useState(false);

	// const categories = useSelector(state => state.settings.service_categories);

	// const dispatch = useDispatch();

	const handleInputChange = e => {
		// const { name, value } = e.target;
		// this.setState({
		// 	[name]: value,
		// });
	};

	const updateService = e => {};

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
						<h4 className="onboarding-title">Edit service</h4>

						<form onSubmit={updateService}>
							<div className="form-group">
								{/* <select
									className="form-control"
									name="category_id"
									value={category_id ? category_id : category?.id}
									onChange={handleCategoryChange}>
									{categories.map((category, index) => {
										return (
											<option value={category.id} key={index}>
												{category.name}
											</option>
										);
									})}
								</select> */}
							</div>
							<div className="form-group">
								{/* <select
									className="form-control"
									name="sub_category_id"
									value={
										sub_category_id
											? sub_category_id
											: subCategory
											? subCategory.id
											: ''
									}
									onChange={this.handleInputChange}>
									{subCategories &&
										subCategories.map((category, index) => {
											return (
												<option value={category.id} key={index}>
													{category.name}
												</option>
											);
										})}
								</select> */}
							</div>
							<div className="form-group">
								<input
									className="form-control"
									placeholder="Name"
									type="text"
									name="name"
									// defaultValue={name}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<input
									className="form-control"
									placeholder=" Tariff"
									type="text"
									name="tariff"
									// defaultValue={tariff}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<input
									className="form-control"
									placeholder="Grace Period (1 week)"
									type="text"
									name="gracePeriod"
									// defaultValue={gracePeriod}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<input
									className="form-control"
									placeholder=" No of Visits (2)"
									type="text"
									name="noOfVisits"
									// defaultValue={noOfVisits}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<input
									className="form-control"
									placeholder="Note"
									type="text"
									name="note"
									// defaultValue={note}
									onChange={handleInputChange}
								/>
							</div>

							<div className="form-buttons-w">
								<button
									onClick={closeModal}
									className="btn btn-secondary ml-3"
									type="button">
									<span>cancel</span>
								</button>
								<button className="btn btn-primary" disabled={loading}>
									{loading ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span>save</span>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEditService;

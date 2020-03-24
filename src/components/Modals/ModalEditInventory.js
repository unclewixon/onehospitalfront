import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import {
	formatCurrency,
	renderSelect,
	renderTextInput,
	renderTextInputGroup,
	request,
} from '../../services/utilities';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { API_URI, inventoryAPI, rolesAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { updateInventory } from '../../actions/inventory';
import inventory from '../../reducers/inventory';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter Inventory Name';
	}
	if (values.category_id === null || values.category_id === '') {
		errors.category_id = 'select category';
	}
	return errors;
};

class ModalEditInventory extends Component {
	state = {
		submitting: false,
	};

	componentDidMount() {
		const { item } = this.props;
		this.setState({ item: item });
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	doEditInventory = async data => {
		this.setState({ submitting: true });
		const { items } = this.props;
		let invID = items.id;

		let dataWithQuantity = {
			...data,
			quantity: items.quantity,
		};

		try {
			const rs = await request(
				`${API_URI}${inventoryAPI}/${invID}/update`,
				'PATCH',
				true,
				dataWithQuantity
			);
			this.props.updateInventory(rs);
			this.setState({ submitting: false });
			this.props.reset('update_inventory');
			notifySuccess('Inventory Updated!');
			this.props.closeModals(true);
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not update inventory',
			});
		}
	};

	render() {
		const {
			item,
			error,
			handleSubmit,
			categories,
			sub_categories,
		} = this.props;
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
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Edit Inventory Item</h4>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.doEditInventory)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="name"
													name="name"
													component={renderTextInput}
													label="Name"
													type="text"
													placeholder="Enter name"
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="category_id"
													name="category_id"
													component={renderSelect}
													label="Category"
													placeholder="Select Category"
													data={categories}
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="sub_category_id"
													name="sub_category_id"
													component={renderSelect}
													label="Sub Category"
													placeholder="Sub Category"
													data={sub_categories}
												/>
											</div>
										</div>

										<div className="col-sm-6">
											<div className="form-group">
												<Field
													id="description"
													name="description"
													component={renderTextInput}
													label="Description"
													type="text"
													placeholder="Enter description"
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-6">
											<Field
												id="cost_price"
												name="cost_price"
												component={renderTextInputGroup}
												label="Cost Price"
												type="number"
												placeholder="Enter cost price"
												icon="₦"
												append={false}
											/>
										</div>
										<div className="col-sm-6">
											<Field
												id="sales_price"
												name="sales_price"
												component={renderTextInputGroup}
												label="Selling Price"
												type="number"
												placeholder="Enter selling price"
												icon="₦"
												append={false}
											/>
										</div>
									</div>

									<div className="form-buttons-w">
										<button className="btn btn-secondary ml-3" type="button">
											Cancel
										</button>
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit">
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'save'
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

ModalEditInventory = reduxForm({
	form: 'edit_inventory',
	validate,
})(ModalEditInventory);

const mapStateToProps = (state, ownProps) => {
	const items = state.general.edit_inventory;
	return {
		initialValues: {
			name: items.name,
			description: items.description,
			sales_price: items.sales_price,
			cost_price: items.cost_price,
			sub_category_id: items.subCategory.id,
			category_id: items.category.id,
		},
		categories: state.inventory.categories,
		sub_categories: state.inventory.sub_categories,
		items: state.general.edit_inventory,
	};
};

export default connect(mapStateToProps, { closeModals, updateInventory })(
	ModalEditInventory
);

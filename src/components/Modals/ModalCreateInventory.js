import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import { closeModals } from '../../actions/general';
import {
	renderTextInput,
	request,
	renderTextInputGroup,
	renderSelect,
} from '../../services/utilities';
import { inventoryAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { addInventory } from '../../actions/inventory';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}
	if (values.category_id === null || values.category_id === '') {
		errors.category_id = 'select category';
	}
	return errors;
};

class ModalCreateInventory extends Component {
	state = {
		submitting: false,
		sub_categories: [],
	};

	componentDidMount() {
		const { sub_categories } = this.props;
		this.setState({ sub_categories: sub_categories });
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	createInventory = async data => {
		this.setState({ submitting: true });
		try {
			const rs = await request(`${inventoryAPI}`, 'POST', true, data);
			this.props.addInventory(rs);
			this.props.reset('create_inventory');
			notifySuccess('inventory item created!');
			this.setState({ submitting: false });
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create inventory item',
			});
		}
	};

	handleChange = event => {
		const { sub_categories } = this.props;
		let newValue = event.target.value;
		let newSubCat = sub_categories.filter(service => {
			return service.category.id === newValue;
		});
		this.setState({ sub_categories: newSubCat });
	};

	render() {
		const { submitting, sub_categories } = this.state;
		const { error, handleSubmit, categories } = this.props;
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
							<h4 className="onboarding-title">Create Inventory Item</h4>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.createInventory)}>
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
											<Field
												id="name"
												name="name"
												component={renderTextInput}
												label="Name"
												type="text"
												placeholder="Enter name"
											/>
										</div>
										<div className="col-sm-6">
											<Field
												id="stock_code"
												name="stock_code"
												component={renderTextInput}
												label="Stock Code"
												type="text"
												placeholder="Enter stock code"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<Field
												id="category_id"
												name="category_id"
												component={renderSelect}
												onChange={this.handleChange}
												label="Category"
												placeholder="Select Category"
												data={categories}
											/>
										</div>
										<div className="col-sm-6">
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
									<div className="row">
										<div className="col-sm-6">
											<Field
												id="quantity"
												name="quantity"
												component={renderTextInput}
												label="Quantity"
												type="number"
												placeholder="Enter quantity"
											/>
										</div>
										<div className="col-sm-6">
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
									<div className="row">
										<div className="col-sm-12 text-right">
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

ModalCreateInventory = reduxForm({
	form: 'create_inventory',
	validate,
})(ModalCreateInventory);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			category_id: '',
			sub_category_id: '',
			quantity: 0,
			sales_price: 0,
			cost_price: 0,
		},
		categories: state.inventory.categories,
		sub_categories: state.inventory.sub_categories,
	};
};

export default connect(mapStateToProps, { closeModals, reset, addInventory })(
	ModalCreateInventory
);

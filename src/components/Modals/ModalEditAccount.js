import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import { renderSelect, renderTextInput } from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import waiting from '../../assets/images/waiting.gif';
import { updateInventory } from '../../actions/inventory';

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

const type = [
	{
		id: '',
		name: 'select type',
	},
	{
		id: 'debit',
		name: 'Debit',
	},
	{
		id: 'credit',
		name: 'Credit',
	},
];

const status = [
	{
		id: '',
		name: 'select status',
	},
	{
		id: 'processing',
		name: 'processing',
	},
	{
		id: 'approved',
		name: 'approved',
	},
];

class ModalEditAccount extends Component {
	state = {
		submitting: false,
		sub_categories: [],
	};

	componentDidMount() {
		const { item, sub_categories } = this.props;
		this.setState({ item: item });
		this.setState({ sub_categories: sub_categories });
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	doEditInventory = async data => {
		// this.setState({ submitting: true });
		// const { items } = this.props;
		// let invID = items.id;
		// let dataWithQuantity = {
		// 	...data,
		// 	quantity: items.quantity,
		// };
		// try {
		// 	const rs = await request(
		// 		`${inventoryAPI}/${invID}/update`,
		// 		'PATCH',
		// 		true,
		// 		dataWithQuantity
		// 	);
		// 	this.props.updateInventory(rs);
		// 	this.setState({ submitting: false });
		// 	this.props.reset('update_inventory');
		// 	notifySuccess('Inventory Updated!');
		// 	this.props.closeModals(true);
		// } catch (e) {
		// 	this.setState({ submitting: false });
		// 	throw new SubmissionError({
		// 		_error: e.message || 'could not update inventory',
		// 	});
		// }
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
		const { error, handleSubmit, categories } = this.props;
		const { submitting, sub_categories } = this.state;
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
							<h4 className="onboarding-title">Edit Chart of Account</h4>
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
												id="code"
												name="code"
												component={renderTextInput}
												label="GL Code"
												type="text"
												placeholder="Enter gl code"
											/>
										</div>
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
									</div>

									<div className="row">
										<div className="col-sm-6">
											<Field
												id="type"
												name="type"
												component={renderSelect}
												onChange={this.handleChange}
												label="Type"
												placeholder="Select Type"
												data={type}
											/>
										</div>
										<div className="col-sm-6">
											<Field
												id="status"
												name="status"
												component={renderSelect}
												label="Status"
												placeholder="Status"
												data={status}
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

ModalEditAccount = reduxForm({
	form: 'edit_account',
	validate,
})(ModalEditAccount);

const mapStateToProps = (state, ownProps) => {
	const items = state.general.accountChart;
	return {
		initialValues: {
			name: items.name,
			code: items.code,
			type: items.type,
			status: items.status,
			sub_category_id: '',
			category_id: '',
		},
		categories: state.inventory.categories,
		sub_categories: state.inventory.sub_categories,
		items: state.general.accountChart,
	};
};

export default connect(mapStateToProps, { closeModals, updateInventory })(
	ModalEditAccount
);

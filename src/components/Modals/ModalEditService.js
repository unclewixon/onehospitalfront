import React, { Component } from 'react';
import { connect } from 'react-redux';

import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';

class ModalEditService extends Component {
	state = {
		name: '',
		tariff: '',
		gracePeriod: '',
		noOfVisits: '',
		note: '',
		category_id: '',
		sub_category_id: '',
		category: '',
		id: '',
		subCategory: '',
		subCategories: [],
		Loading: false,
	};

	handleInputChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleCategoryChange = e => {
		const category = e.target.value;
		const { ServiceCategories } = this.props;
		const categories = ServiceCategories.find(item => {
			return item.id === category;
		});
		this.setState({ category_id: category });
		this.setState({ subCategories: categories.subCateogries });

		if (categories.subCateogries.length) {
			this.setState({ sub_category_id: categories.subCateogries[0].id });
		}
	};

	updateService = e => {
		// e.preventDefault();
		// this.setState({ Loading: true });
		// let {
		// 	name,
		// 	tariff,
		// 	category_id,
		// 	sub_category_id,
		// 	id,
		// 	noOfVisits,
		// 	gracePeriod,
		// 	note,
		// } = this.state;
		// this.props
		// 	.updateService({
		// 		name,
		// 		tariff,
		// 		category_id,
		// 		sub_category_id,
		// 		id,
		// 		noOfVisits,
		// 		gracePeriod,
		// 		note,
		// 	})
		// 	.then(response => {
		// 		this.setState({ Loading: false });
		// 		notifySuccess('Service updated');
		// 		this.props.closeModals();
		// 	})
		// 	.catch(error => {
		// 		this.setState({ Loading: false });
		// 		notifyError('Error updating service');
		// 	});
	};

	componentDidMount() {
		// let { data } = this.props.edit_service;
		// let category_id = data.category.id;
		// const { ServiceCategories } = this.props;
		// const selectedCat = ServiceCategories.find(item => {
		// 	return item.id === category_id;
		// });
		// this.setState({
		// 	name: data?.name,
		// 	tariff: data?.tariff,
		// 	category_id: data?.category.id,
		// 	sub_category_id: data?.sub_category_id,
		// 	id: data?.id,
		// 	gracePeriod: data?.gracePeriod,
		// 	noOfVisits: data?.noOfVisits,
		// 	note: data?.note,
		// 	category: data?.category,
		// 	subCategory: data?.subCategory,
		// 	subCategories: selectedCat ? selectedCat.subCateogries : [],
		// });
		// document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const {
			Loading,
			name,
			tariff,
			category_id,
			category,
			sub_category_id,
			subCategory,
			subCategories,
			noOfVisits,
			gracePeriod,
			note,
		} = this.state;
		const { ServiceCategories } = this.props;

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
							<h4 className="onboarding-title">Edit service</h4>

							<form onSubmit={this.updateService}>
								<div className="form-group">
									<select
										className="form-control"
										name="category_id"
										value={category_id ? category_id : category?.id}
										onChange={this.handleCategoryChange}>
										{ServiceCategories.map((category, index) => {
											return (
												<option value={category.id} key={index}>
													{category.name}
												</option>
											);
										})}
									</select>
								</div>
								<div className="form-group">
									<select
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
									</select>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Name"
										type="text"
										name="name"
										defaultValue={name}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder=" Tariff"
										type="text"
										name="tariff"
										defaultValue={tariff}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Grace Period (1 week)"
										type="text"
										name="gracePeriod"
										defaultValue={gracePeriod}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder=" No of Visits (2)"
										type="text"
										name="noOfVisits"
										defaultValue={noOfVisits}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Note"
										type="text"
										name="note"
										defaultValue={note}
										onChange={this.handleInputChange}
									/>
								</div>

								<div className="form-buttons-w">
									<button
										onClick={() => this.props.closeModals(false)}
										className={
											Loading
												? 'btn btn-secondary ml-3 disabled'
												: 'btn btn-secondary ml-3'
										}>
										<span> cancel </span>
									</button>
									<button
										className={
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{Loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> save </span>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ServiceCategories: state.settings.service_categories,
	};
};

export default connect(mapStateToProps)(ModalEditService);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { validate } from '../../services/validationSchemas';
import {
	renderSelect,
	renderMultiselect,
	renderTextArea,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';

const selector = formValueSelector('antenatalAssessment');
class RadiologicalInvestigation extends Component {
	state = {
		services: [],
		serviceCenter: [],
		allServices: [],
		value: undefined,
	};
	componentDidMount() {
		this.fetchServiceCenter();
	}

	fetchServiceCenter = () => {
		let data = [];
		console.log(this.props.ServiceCategories);
		if (this.props.ServiceCategories.length === 0) {
			Promise.all([this.props.getAllServiceCategory()])
				.then(response => {
					data = this.filterServiceCategory();
					this.setState({
						serviceCenter: data,
						allServices: this.props.service,
					});
				})
				.catch(e => {
					notifyError(
						e.message || 'could not fetch service categories and services'
					);
				});
		} else {
			data = this.filterServiceCategory();
			this.setState({ serviceCenter: data, allServices: this.props.service });
		}
	};

	filterServiceCategory = () => {
		let data = [];
		this.props.ServiceCategories.forEach((item, index) => {
			const res = { name: item.name, id: item.id };
			data = [...data, res];
		});
		return data;
	};

	filterServices = id => {
		const data = this.state.allServices
			.filter(el => id === el.category.id)
			.map(el => {
				console.log({
					name: el.name,
					id: el.id,
				});
				return el.name;
			});

		console.log(data);
		return data;
	};
	render() {
		const { handleSubmit, previousPage, error, page, value } = this.props;
		const { serviceCenter } = this.state;
		// if (value !== this.state.value) {
		// 	this.props.dispatch(change('antenatalAssessment', 'scansToRequest', []));
		// }

		return (
			<>
				<h6 className="element-header">
					Step {page}.Radiological Investigation
				</h6>
				<div className="form-block">
					<form onSubmit={handleSubmit}>
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
									id="serviceCenter"
									name="serviceCenter"
									component={renderSelect}
									label="Select Service Center"
									placeholder="Select Service Center"
									data={serviceCenter}
								/>
							</div>
							<div className="col-sm-6">
								<label>Scan to request</label>
								<Field
									name="scansToRequest"
									component={renderMultiselect}
									defaultValue={[]}
									data={value ? this.filterServices(value) : []}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<Field
									id="request_note"
									name="request_note"
									component={renderTextArea}
									label="Reason"
									type="text"
									placeholder="Enter reason"
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									type="button"
									onClick={previousPage}>
									Previous
								</button>
								<button className="btn btn-primary" type="submit">
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}
RadiologicalInvestigation = reduxForm({
	form: 'antenatalAssessment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(RadiologicalInvestigation);

const mapStateToProps = state => {
	return {
		service: state.settings.services,
		ServiceCategories: state.settings.service_categories,
		value: selector(state, 'serviceCenter'),
	};
};

export default connect(mapStateToProps)(RadiologicalInvestigation);

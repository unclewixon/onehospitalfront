import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
	renderTextArea,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';

const fetal = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
const fetal2 = ['daily', 'weekend', 'monthly'];
class RadiologicalInvestigation extends Component {
	render() {
		const { handleSubmit, previousPage, error, page } = this.props;
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
									id="service_center"
									name="service_center"
									component={renderSelect}
									label="Select Service Center"
									placeholder="Select Service Center"
									data={fetal}
								/>
							</div>
							<div className="col-sm-6">
								<label>Scans to request</label>
								<Field
									name="scans_to_request"
									component={renderMultiselect}
									defaultValue={[]}
									data={['Guitar', 'Cycling', 'Hiking']}
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
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(RadiologicalInvestigation);

export default RadiologicalInvestigation;

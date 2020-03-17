/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import {
	renderSelect,
	renderMultiselect,
	renderTextArea,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
const serviceCenter = [
	{
		value: 'daily',
		label: 'daily',
	},
	{ value: 'weekend', label: 'weekend' },
	{ value: 'monthly', label: 'monthly' },
];
export class NewRadiology extends Component {
	state = {
		submitting: false,
	};
	render() {
		const { submitting } = this.state;
		const { error } = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="element-content">
						<div className="element-box">
							<h6 className="element-header">Create Radiology </h6>
							<div className="form-block">
								<form>
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
												label="Service Center"
												placeholder="Select service center"
												data={serviceCenter}
											/>
										</div>
										<div className="col-sm-6">
											<label>Scan to request</label>
											<Field
												id="scan_to_request"
												name="scan_to_request"
												component={renderMultiselect}
												label="Scan to request"
												placeholder="Select scan to request"
												data={['Guitar', 'Cycling', 'Hiking']}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<Field
												id="reason"
												name="reason"
												component={renderTextArea}
												label="Leave Reason"
												type="text"
												placeholder="Enter your leave reason"
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
													'Create Radiology'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>{' '}
					</div>
				</div>
			</div>
		);
	}
}

NewRadiology = reduxForm({
	form: 'radiology', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(NewRadiology);

export default NewRadiology;

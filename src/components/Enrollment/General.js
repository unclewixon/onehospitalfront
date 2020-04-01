import React, { Component } from 'react';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';

const fetal = [
	{
		id: 'daily',
		name: 'daily',
	},
	{ id: 'weekend', name: 'weekend' },
	{ id: 'monthly', name: 'monthly' },
];

const lmp = [
	{
		id: 'Obsterics',
		name: 'Obsterics',
	},
	{ id: 'Gynaecologist', name: 'Gynaecologist' },
];
export class General extends Component {
	render() {
		const { handleSubmit, error, page } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. General</h6>
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
									id="indication_for_booking"
									name="indication_for_booking"
									component={renderSelect}
									label="Indication for booking"
									placeholder="Select indication"
									data={fetal}
								/>
							</div>

							<div className="col-sm-6">
								<label>Care</label>
								<Field
									name="care"
									component={renderMultiselect}
									defaultValue={[]}
									data={['Obsterics', 'Gynaecologist']}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Field
									id="lmp"
									name="lmp"
									component={renderTextInput}
									label="LMP"
									type="text"
									placeholder="Enter Lmp"
								/>
							</div>

							<div className="col-sm-6">
								<Field
									id="lmp_source"
									name="lmp_source"
									component={renderSelect}
									label="Select Lmp Source"
									placeholder="Select lmp source"
									data={lmp}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12">
								<Field
									id="eod"
									name="eod"
									component={renderTextInput}
									label="E.O.D"
									type="text"
									placeholder="Enter E.O.D"
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
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

General = reduxForm({
	form: 'enrollment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(General);

export default General;

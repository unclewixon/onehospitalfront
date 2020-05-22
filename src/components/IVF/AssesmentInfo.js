import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
	renderTextArea,
} from '../../services/utilities';
import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { withRouter } from 'react-router-dom';
import searchingGIF from '../../assets/images/searching.gif';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	API_URI,
	searchAPI,
	staffAPI,
	lmpSource,
	bookingPeriod,
	genotype,
	bloodGroup,
} from '../../services/constants';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';

const validate = validateAntennatal;
export const prognosis = [
	{
		id: 'IVR Self',
		name: 'IVR Self',
	},
	{
		id: 'IVR ER',
		name: 'IVR ER',
	},
];

export const indication = [
	{
		id: 'Infertility',
		name: 'Infertility',
	},

	{
		id: 'Sub Fertility',
		name: 'Sub Fertility',
	},
	{
		id: 'Second Infertility',
		name: 'Second Infertility',
	},
	{
		id: 'Others',
		name: 'Others',
	},
];

export const treatmentPlan = [
	{
		id: 'Long Protocol',
		name: 'Long Protocol',
	},
	{
		id: 'Short Protocol',
		name: 'Short Protocol',
	},
];
export class AssesmentInfo extends Component {
	state = {
		searching: false,
		patients: [],
		query: '',
		staffs: [],
	};

	componentDidMount() {}
	patient = React.createRef();
	render() {
		const { handleSubmit, error, page, name, previousPage } = this.props;
		const { searching, patients } = this.state;

		console.log(name);
		return (
			<>
				<h6 className="element-header">Step {page}. Assessment/Plan</h6>
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
									id="prognosis"
									name="prognosis"
									component={renderSelect}
									label="Prognosis"
									placeholder="Prognosis"
									data={prognosis}
								/>
							</div>

							<div className="col-sm-6">
								<Field
									id="treatment_plan"
									name="treatment_plan"
									component={renderSelect}
									label="Treatment Plan"
									placeholder="Treatment Plan"
									data={treatmentPlan}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Field
									id="indication"
									name="indication"
									component={renderSelect}
									label="Indication"
									placeholder="Indication"
									data={indication}
								/>
							</div>

							<div className="col-sm-6">
								<Field
									id="comments"
									name="comments"
									component={renderTextArea}
									label="Comments"
									placeholder="Comments"
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

AssesmentInfo = reduxForm({
	form: 'AssesmentInfo', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(AssesmentInfo);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		staffs: state.hr.staffs,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadStaff })(AssesmentInfo)
);

import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { renderSelect, renderTextArea } from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';
import { loadPatientIVFForm } from '../../actions/patient';

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

let AssesmentInfo = props => {
	const dispatch = useDispatch();
	const { page, error, ivf, previousPage } = props;

	useEffect(() => {}, []);

	const onSubmitForm = async data => {
		let res = { ...ivf, ...data };
		props.loadPatientIVFForm(res);
		dispatch(props.onSubmit);
	};

	// const patient = React.createRef();

	return (
		<>
			<h6 className="element-header">Step {page}. Assessment/Plan</h6>
			<div className="form-block">
				<form onSubmit={props.handleSubmit(onSubmitForm)}>
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
								name="treatmentPlan"
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
								name="assessmentComments"
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
};

AssesmentInfo = reduxForm({
	form: 'AssesmentInfo', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(AssesmentInfo);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		ivf: state.patient.ivf,
		staffs: state.hr.staffs,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadStaff, loadPatientIVFForm })(AssesmentInfo)
);

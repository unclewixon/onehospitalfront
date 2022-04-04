import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renderSelect, renderTextArea } from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { loadPatientIVFForm } from '../../actions/patient';

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

const validate = values => {
	const errors = {};
	// if (!values.name) {
	// 	errors.name = 'enter vendor';
	// }

	return errors;
};

const AssesmentInfo = ({
	page,
	onSubmit,
	handleSubmit,
	error,
	previousPage,
}) => {
	const dispatch = useDispatch();

	const ivf = useSelector(state => state.patient.ivf);

	useEffect(() => {}, []);

	const onSubmitForm = data => {
		const ivfData = {
			...ivf,
			...data,
		};

		dispatch(loadPatientIVFForm(ivfData));
		onSubmit();
	};

	return (
		<>
			<h6 className="element-header">Step {page}. Assessment/Plan</h6>
			<div className="form-block">
				<form onSubmit={handleSubmit(onSubmitForm)}>
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
								onClick={previousPage}
							>
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

export default withRouter(
	reduxForm({
		form: 'AssesmentInfo',
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true,
		validate,
	})(AssesmentInfo)
);

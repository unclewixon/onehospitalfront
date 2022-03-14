import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderTextInput, renderSelect } from '../../../services/utilities';
import { brims, fetalPositions, fetalLies } from '../../../services/constants';

const validate = values => {
	const errors = {};
	return errors;
};

const GeneralAssessment = ({ handleSubmit, next, previous }) => {
	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(next)}>
				<div className="row">
					<div className="col-sm-6">
						<Field
							id="heightOfFundus"
							name="heightOfFundus"
							component={renderTextInput}
							label="Height of Fundus (cm)"
							type="text"
							placeholder="Enter height of fundus"
						/>
					</div>
					<div className="col-sm-6">
						<Field
							id="fetalHeartRate"
							name="fetalHeartRate"
							component={renderTextInput}
							label="Fetal Heart Rate"
							type="text"
							placeholder="Enter fetal heart rate"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<Field
							id="positionOfFoetus"
							name="positionOfFoetus"
							component={renderSelect}
							label="Presentation and Position of Foetus"
							placeholder="Select Presentation and Position of Foetus"
							data={fetalPositions}
						/>
					</div>
					<div className="col-sm-6">
						<Field
							id="fetalLie"
							name="fetalLie"
							component={renderSelect}
							label="Fetal Lie"
							placeholder="Select fetal lie"
							data={fetalLies}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<Field
							id="relationshipToBrim"
							name="relationshipToBrim"
							component={renderSelect}
							label="Relationship to Brim"
							placeholder="Select Relationship to Brim"
							data={brims}
						/>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.assessment },
	};
};

export default connect(mapStateToProps)(
	reduxForm({
		form: 'antenatalAssessment', //Form name is same
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
		validate,
	})(GeneralAssessment)
);

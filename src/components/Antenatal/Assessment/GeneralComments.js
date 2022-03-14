import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderTextArea } from '../../../services/utilities';

const validate = values => {
	const errors = {};
	return errors;
};

const GeneralComments = ({ handleSubmit, previous, next }) => {
	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(next)}>
				<div className="row">
					<div className="col-sm-12">
						<Field
							id="comment"
							name="comment"
							component={renderTextArea}
							label="Note"
							type="text"
							placeholder="Enter note"
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
	})(GeneralComments)
);

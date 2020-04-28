import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import { renderTextArea } from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
class GeneralComments extends Component {
	render() {
		const { handleSubmit, previousPage, error, page } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. General Comments</h6>
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
							<div className="col-sm-12">
								<Field
									id="comments"
									name="comments"
									component={renderTextArea}
									label="Comment"
									type="text"
									placeholder="Enter height of fundus"
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
GeneralComments = reduxForm({
	form: 'antennatalAssessment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(GeneralComments);

export default GeneralComments;

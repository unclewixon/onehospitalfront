import React, { Component } from 'react';
import { renderSelect } from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';

export class ObstericsHistory extends Component {
	render() {
		const { handleSubmit, previousPage, error, page } = this.props;
		return (
			<>
				<h6 className="element-header">Step {page}. Obsterics History</h6>
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
									id="previous_obsterics_history"
									name="previous_obsterics_history"
									component={renderSelect}
									label="Select Previous Obsteric History"
									placeholder="Select Previous Obsteric History"
									data={['Obsterics', 'Gynaecologist']}
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

ObstericsHistory = reduxForm({
	form: 'enrollment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ObstericsHistory);

export default ObstericsHistory;

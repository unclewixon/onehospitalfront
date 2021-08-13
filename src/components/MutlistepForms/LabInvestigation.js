import React, { Component } from 'react';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';

const fetal = [{ id: 'Lab', name: 'Lab' }];

class LabInvestigation extends Component {
	state = {
		groups: [],
		tests: [],
	};

	componentDidMount() {}

	render() {
		const { handleSubmit, previousPage, error, page } = this.props;
		const { groups, tests } = this.state;
		return (
			<>
				<h6 className="element-header">Step {page}. Lab Investigation</h6>
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
									id="laboratory"
									name="laboratory"
									component={renderSelect}
									label="Laboratory"
									placeholder="Select Laboratory"
									data={fetal}
								/>
							</div>
							<div className="col-sm-6">
								<label>Lab combination</label>
								<Field
									name="groups"
									component={renderMultiselect}
									defaultValue={[]}
									data={groups}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<label>Lab tests to request</label>
								<Field
									name="tests"
									component={renderMultiselect}
									defaultValue={[]}
									data={tests}
								/>
							</div>
							<div className="col-sm-6">
								<Field
									id="preferredSpecimen"
									name="preferredSpecimen"
									component={renderTextInput}
									label="Preferred Specimen(s)"
									placeholder="Preferred Specimen(s)"
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
LabInvestigation = reduxForm({
	form: 'antenatalAssessment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(LabInvestigation);

export default LabInvestigation;

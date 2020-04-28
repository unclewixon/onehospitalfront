import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from '../../services/validationSchemas';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import { notifySuccess, notifyError } from '../../services/notify';
import { getAllLabTests, getAllLabGroups } from '../../actions/settings';

const fetal = [{ id: 'Lab', name: 'Lab' }];

class LabInvestigation extends Component {
	state = {
		groups: [],
		tests: [],
	};
	componentDidMount() {
		console.log(this.props.LabGroups, this.props.LabTests);
		if (this.props.LabGroups.length === 0) {
			Promise.all([this.props.getAllLabGroups(), this.props.getAllLabTests()])
				.then(response => {
					this.filterGroupsTests(this.props.LabGroups, this.props.LabTests);
				})
				.catch(e => {
					notifyError(
						e.message || 'could not fetch service categories and services'
					);
				});
		} else {
			this.filterGroupsTests(this.props.LabGroups, this.props.LabTests);
		}
	}

	filterGroupsTests = (grps, tsts) => {
		const groups = grps.map(el => el.name);
		const tests = tsts.map(el => el.name);
		this.setState({ groups, tests });
	};
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
	form: 'antennatalAssessment', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(LabInvestigation);

const mapStateToProps = state => {
	return {
		LabTests: state.settings.lab_tests,
		LabGroups: state.settings.lab_groups,
	};
};
export default connect(mapStateToProps, {
	getAllLabGroups,
	getAllLabTests,
})(LabInvestigation);

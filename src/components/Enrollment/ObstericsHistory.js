import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { renderSelect } from '../../services/utilities';
import { obstericHistory } from '../../services/constants';
import { ObstericHistory } from './ObstericHistory';

const validate = values => {
	const errors = {};
	return errors;
};

const selector = formValueSelector('antenatal');

export class ObstericsHistory extends Component {
	obstHistory = value => {
		switch (value) {
			case 'Obsteric History':
				return (
					<ObstericHistory setDate={this.props.setInput} dob={this.props.dob} />
				);
			default:
				break;
		}
	};
	render() {
		const { handleSubmit, previousPage, error, page, value } = this.props;
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
									id="obstericsHistory"
									name="obstericsHistory"
									component={renderSelect}
									label="Select Previous Obsteric History"
									placeholder="Select Previous Obsteric History"
									data={obstericHistory.filter(
										o => o.id === 'Obsteric History'
									)}
								/>
							</div>
						</div>

						<div className="row">{this.obstHistory(value)}</div>

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
	form: 'antenatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(ObstericsHistory);

const mapStateToProps = state => {
	return {
		value: selector(state, 'obstericsHistory'),
	};
};

export default connect(mapStateToProps)(ObstericsHistory);

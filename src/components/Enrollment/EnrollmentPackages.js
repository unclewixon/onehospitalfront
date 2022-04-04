import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderSelect, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const validate = values => {
	const errors = {};
	return errors;
};

class EnrollmentPackages extends Component {
	state = {
		submitting: false,
		packages: [],
	};

	componentDidMount() {
		this.fetchPackages();
	}

	fetchPackages = async () => {
		try {
			this.props.startBlock();
			const rs = await request('antenatal-packages', 'GET', true);
			const { result } = rs;
			this.setState({ packages: [...result] });
			this.props.stopBlock();
		} catch (error) {
			this.props.stopBlock();
			notifyError(error.message || 'could not fetch antenatal packages!');
		}
	};

	render() {
		const { handleSubmit, doSubmit, previousPage, error, page, submitting } =
			this.props;
		const { packages } = this.state;
		return (
			<>
				<h6 className="element-header">Step {page}. Enrollment Packages</h6>
				<div className="form-block">
					<form onSubmit={handleSubmit(doSubmit)}>
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
									id="package_id"
									name="package_id"
									component={renderSelect}
									label="Antenatal Package"
									placeholder="Select Package"
									data={packages}
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
								<button
									className="btn btn-primary"
									type="submit"
									disabled={submitting}
								>
									{submitting ? <img src={waiting} alt="submitting" /> : 'Save'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}

EnrollmentPackages = reduxForm({
	form: 'antenatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(EnrollmentPackages);

export default connect(null, { startBlock, stopBlock })(EnrollmentPackages);

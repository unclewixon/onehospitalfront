import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {
	Field,
	reduxForm,
	SubmissionError,
	reset,
	change,
	formValueSelector,
} from 'redux-form';

import {
	getPeriod,
	errorMessage,
	request,
	renderTextArea,
	confirmAction,
	renderTextInput,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import CreateAppraisal from '../StaffBlock/CreateAppraisal';
// const validate = values => {
// 	const errors = {};
// 	if (!values.comment) {
// 		errors.comment = 'error';
// 	}

// 	return errors;
// };

export class ModalStaffAppraisal extends Component {
	state = {
		submitting: false,
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
	render() {
		const { location, staff, error, handleSubmit, period, values } = this.props;
		const { submitting } = this.state;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span aria-hidden="true"> ×</span>
						</button>

						<div className="onboarding-content with-gradient">
							<div className="element-info mb-3">
								<div className="element-info-with-icon">
									<div className="element-info-text">
										<h5 className="element-inner-header">
											STAFF APPRAISAL {period.performancePeriod}
										</h5>
									</div>
								</div>
							</div>

							<div className="row">
								<CreateAppraisal isStaffAppraisal={true} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// ModalStaffAppraisal = reduxForm({
// 	form: 'staff_appraisal',
// 	validate,
// })(ModalStaffAppraisal);
const mapStateToProps = state => {
	return {
		staff: state.general.staff,

		period: state.hr.performancePeriod,
	};
};

export default withRouter(
	connect(mapStateToProps, { closeModals })(ModalStaffAppraisal)
);

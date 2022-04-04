import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { closeModals } from '../../actions/general';
import LineManagerAssessment from '../StaffBlock/LineManagerAssessment';

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
		const { period } = this.props;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}
			>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}
						>
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
								<LineManagerAssessment isStaffAppraisal={true} />
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
		period: state.hr.performancePeriod,
	};
};

export default withRouter(
	connect(mapStateToProps, { closeModals })(ModalStaffAppraisal)
);

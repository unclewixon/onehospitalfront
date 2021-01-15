import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';
import moment from 'moment';

class PatientFormModal extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	handleSelect = (selectedIndex, e) => {
		this.setState({ index: selectedIndex });
	};

	render() {
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content text-center">
						{this.props.currentStep === 1 ? (
							<PatientForm closeModals={this.props.closeModals} />
						) : (
							<PatientNOKForm closeModals={this.props.closeModals} />
						)}
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		currentStep: state.patient.formStep,
	};
};

export default connect(mapStateToProps, { closeModals })(PatientFormModal);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';

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
				style={{ display: 'block' }}
			>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content text-center">
						<div className="modal-header faded smaller">
							<div className="modal-title">
								<span>Registrar:</span>
								<img
									alt=""
									className="avatar"
									src={require('../../assets/images/avatar1.jpg')}
								/>
								<span>Date: </span>
								<strong>Sep 12th, 2017</strong>
							</div>
							<button
								aria-label="Close"
								className="close"
								data-dismiss="modal"
								type="button"
								onClick={() => this.props.closeModals(false)}
							>
								<span aria-hidden="true"> ×</span>
							</button>
						</div>
						{this.props.currentStep === 1 ? (
							<PatientForm />
						):(
							<PatientNOKForm />
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
	}
};

export default connect(mapStateToProps, { closeModals })(PatientFormModal);

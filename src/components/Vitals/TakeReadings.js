import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import {
	renderTextInput,
	renderTextInputGroup,
	request,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { API_URI, inventoryAPI, vitalsAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { addVital, updateVitals } from '../../actions/vitals';

class TakeReadings extends Component {
	state = {
		submitting: false,
	};

	takeReading = async data => {
		const { patient, info } = this.props;
		const { title } = info;
		this.setState({ submitting: true });
		try {
			let toSave = {
				readingType: title,
				reading: data,
				patient_id: patient.id,
			};
			const rs = await request(`${API_URI}${vitalsAPI}`, 'POST', true, toSave);
			this.props.updateVitals(rs.readings);
			notifySuccess(title + ' updated!');
			this.setState({ submitting: false });
			this.props.doHide(true);
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create ' + title,
			});
		}
	};

	render() {
		const { doHide, error, handleSubmit, info } = this.props;
		const { submitting } = this.state;
		const { title, inputs } = info;

		return (
			<div className="onboarding-modal fade animated show">
				<div className="modal-centered">
					<div className="modal-content text-center">
						<button className="close" type="button" onClick={doHide}>
							<span className="os-icon os-icon-close" />
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">{`Take ${title} Reading`}</h4>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.takeReading)}>
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
											{inputs.map((item, i) => {
												return (
													<Field
														key={i}
														id={item.name}
														name={item.name}
														component={
															item.weight !== ''
																? renderTextInputGroup
																: renderTextInput
														}
														label={item.title}
														type="number"
														placeholder={`Enter ${item.title}`}
														icon={item.weight}
														append={item.weight !== ''}
													/>
												);
											})}
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit">
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'save'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TakeReadings = reduxForm({
	form: 'take-reading',
})(TakeReadings);

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
		newVital: state.vitals ? state.vitals.vitals : [],
	};
};

export default connect(mapStateToProps, { reset, updateVitals })(TakeReadings);

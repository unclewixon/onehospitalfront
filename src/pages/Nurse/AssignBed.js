import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import Modal from 'react-bootstrap/Modal';

import {
	renderTextInput,
	renderTextInputGroup,
	request,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { vitalsAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';

class AssignBed extends Component {
	state = {
		submitting: false,
	};

	takeExtraReadings = async (data, title) => {
		const { patient } = this.props;

		try {
			let toSave = {
				readingType: title,
				reading: data,
				patient_id: patient.id,
			};
			const rs = await request(`${vitalsAPI}`, 'POST', true, toSave);
			this.props.updateVitals(rs.readings);
		} catch (e) {}
	};

	takeReading = async data => {
		const { patient, info } = this.props;
		const { title } = 'Blood Pressure';
		this.setState({ submitting: true });
		let _data = data;
		// if (info.type === 'blood-pressure') {
		// 	_data = { blood_pressure: `${data.systolic}/${data.diastolic}` };
		// } else if (info.type === 'bmi') {
		// 	_data = { bmi: (data.weight / (data.height * data.height)).toFixed(2) };
		// } else if (info.type === 'bsa') {
		// 	_data = {
		// 		bsa: (Math.sqrt(data.height) * (data.weight / 3600)).toFixed(2),
		// 	};
		// }

		try {
			let toSave = {
				readingType: title,
				reading: _data,
				patient_id: patient.id,
			};
			const rs = await request(`${vitalsAPI}`, 'POST', true, toSave);
			this.props.updateVitals(rs.readings);

			if (info.type === 'bmi' || info.type === 'bsa') {
				// store individual readings for weight and height as well
				await this.takeExtraReadings({ weight: data.weight }, 'Weight');
				await this.takeExtraReadings({ height: data.height }, 'Height');
			}

			notifySuccess(`${title} updated!`);
			this.props.reset('take-reading');
			this.setState({ submitting: false });
			this.props.doHide(true);
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || `could not take reading for ${title}`,
			});
		}
	};

	render() {
		const { doHide, error, handleSubmit, info } = this.props;
		const { submitting } = this.state;
		const inputs = [
			{ name: 'systolic', title: 'Name', weight: '' },
			{ name: 'diastolic', title: 'Ward', weight: '' },
		];

		return (
			<div className="onboarding-modal fade animated show">
				<div className="modal-centered">
					<div className="modal-content text-center">
						<button className="close" type="button">
							<Modal.Header
								closeButton
								onClick={this.props.onModalClick}></Modal.Header>

							{/* <span className="os-icon os-icon-close" /> */}
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">{`Assign Bed`}</h4>
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
														type="text"
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

AssignBed = reduxForm({
	form: 'take-reading',
})(AssignBed);

export default AssignBed;

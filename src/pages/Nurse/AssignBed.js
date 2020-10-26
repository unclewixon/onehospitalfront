import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import { request } from '../../services/utilities';
import Select from 'react-select';
import waiting from '../../assets/images/waiting.gif';
import { vitalsAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';

class AssignBed extends Component {
	state = {
		submitting: false,
		selected: '',
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

	// set selected value
	handleSelect(val) {
		this.setState({ selected: val });
	}

	render() {
		const { error, handleSubmit } = this.props;
		const { submitting } = this.state;
		const selectFloor = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' },
		];
		const selectSuite = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' },
		];

		return (
			<div className="onboarding-modal fade animated show">
				<div className="modal-centered">
					<div className="modal-content text-center">
						<div className="onboarding-content with-gradient">
							<Modal.Header
								className="center-header"
								closeButton
								onClick={this.props.onModalClick}>
								<h4 className="onboarding-title">{`Assign Bed`}</h4>
							</Modal.Header>
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
									<div className="row form-group">
										<div className="col-sm-12">
											<span>Floor</span>
											<Select options={selectFloor} />
										</div>
										<div className="col-sm-12">
											<span>Sult</span>
											<Select options={selectSuite} />
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

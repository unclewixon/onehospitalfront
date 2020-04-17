import React, { Component } from 'react';
import { renderSelect, renderTextInput } from '../../services/utilities';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { validateAntennatal } from '../../services/validationSchemas';
import { FamilyHistory } from './FamilyHistory';
import { obstericHistory } from '../../services/constants';
import { SocialHistory } from './SocialHistory';
import { ObstericHistory } from './ObstericHistory';
import { SexualHistory } from './SexualHistory';
import GynaeHistory from './GynaeHistory';
import { GynaePap } from './GynaePap';
import { FGM } from './FGM';
import { PastOcular } from './PastOcular';
import { PhysicalExam } from './PhysicalExam';
import { InitialAssessment } from './InitialAssessment';
import { LabObservation } from './LabObservation';
import { RoutineAssessment } from './RoutineAssessment';
import { connect } from 'react-redux';

const validate = validateAntennatal;

const selector = formValueSelector('antennatal');

export class ObstericsHistory extends Component {
	obstHistory = value => {
		switch (value) {
			case 'Family History':
				return <FamilyHistory />;
			case 'Social History':
				return <SocialHistory />;
			case 'Gynae History':
				return (
					<GynaeHistory
						setLmpHx={this.props.setDate}
						lmpHx={this.props.lmpHx}
					/>
				);
			case 'Obsteric History':
				return (
					<ObstericHistory setDate={this.props.setDate} dob={this.props.dob} />
				);
			case 'Sexual History':
				return <SexualHistory />;
			case 'Gynae Pap-Mear History':
				return <GynaePap />;
			case 'FGM':
				return <FGM />;
			case 'Past Ocular History':
				return <PastOcular />;
			case 'Antenatal General/Physical Examination':
				return <PhysicalExam />;
			case 'Antenatal Initial Assessment':
				return (
					<InitialAssessment dom={this.props.dom} setDom={this.props.setDate} />
				);
			case 'Antenatal Lab Observations':
				return <LabObservation />;
			case 'Antenatal Routine Assessments':
				return (
					<RoutineAssessment
						gest_date={this.props.gest_date}
						setGest={this.props.setDate}
					/>
				);
			default:
				break;
		}
	};
	render() {
		const {
			handleSubmit,
			previousPage,
			error,
			page,
			value,
			setLmpHx,
			lmpHx,
		} = this.props;
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
									data={obstericHistory}
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
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(ObstericsHistory);

const mapStateToProps = state => {
	return {
		value: selector(state, 'obstericsHistory'),
	};
};

export default connect(mapStateToProps, null)(ObstericsHistory);

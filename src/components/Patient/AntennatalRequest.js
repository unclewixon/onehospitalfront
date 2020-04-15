import React, { Component } from 'react';

import GeneralAssessment from '../MutlistepForms/GeneralAssessment';
import GeneralComments from '../MutlistepForms/GeneralComments';
import LabInvestigation from '../MutlistepForms/LabInvestigation';
import RadiologicalInvestigation from '../MutlistepForms/RadiologicalInvestigation';
import Prescription from '../MutlistepForms/Prescription';
import NextAppointment from '../MutlistepForms/NextAppointment';
class AntennatalRequest extends Component {
	state = {
		page: 1,
		submitting: false,
	};

	nextPage = () => {
		if (this.state.page === 6) {
			this.setState(prevState => {
				return {
					...prevState,
					submitting: !prevState.submitting,
				};
			});

			return;
		}
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page + 1,
			};
		});
	};
	previousPage = () => {
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page - 1,
			};
		});
	};
	render() {
		const { page, submitting } = this.state;

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Antennal Assessment</h6>
					<div className="element-box">
						{page === 1 && <GeneralAssessment onSubmit={this.nextPage} />}
						{page === 2 && (
							<GeneralComments
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
							/>
						)}
						{page === 3 && (
							<LabInvestigation
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
							/>
						)}
						{page === 4 && (
							<RadiologicalInvestigation
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
							/>
						)}
						{page === 5 && (
							<Prescription
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
							/>
						)}
						{page === 6 && (
							<NextAppointment
								submitting={submitting}
								previousPage={this.previousPage}
								onSubmit={this.nextPage}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

// AntennatalRequest.propTypes = {
// 	onSubmit: PropTypes.func.isRequired,
// };

export default AntennatalRequest;

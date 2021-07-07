import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import {
	renderSelect,
	renderTextInput,
	request,
} from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import IVFRegulationTable from './IVFRegulationTable';

const agents = [
	{
		id: 'Buserelin',
		name: 'Buserelin',
	},
	{
		id: 'Zoladex',
		name: 'Zoladex',
	},
	{
		id: 'Luprodex',
		name: 'Luprodex',
	},
];

class RegulationChart extends Component {
	state = {
		page: 1,
		patientList: [],
		submitting: false,
		loading: false,
		chosenPatient: null,
	};

	onSubmitForm = async data => {
		const { regulationTable } = this.props;

		const hcgDown = regulationTable.map(value => {
			return {
				date: value.date,
				day: value.day,
				dose: value.dose,
				otherTreatment: value.other_treatment,
				comment: value.comment,
			};
		});

		const dataToSave = {
			ivf_enrollment_id: data.name,
			agent: data.agents,
			cycle: data.cycle,
			charts: hcgDown,
		};

		try {
			const url = 'ivf/save/down-regulation';
			await request(url, 'POST', true, dataToSave);
			notifySuccess('Down Regulation Chart created successfully');
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Down Regulation Chart creation failed');
			this.setState({ loading: false });
		}
	};

	render() {
		const { error, handleSubmit } = this.props;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Down Regulation Chart</h6>
					<div className="form-box">
						<form onSubmit={handleSubmit(this.onSubmitForm)}>
							{error && (
								<div
									className="alert alert-danger"
									dangerouslySetInnerHTML={{
										__html: `<strong>Error!</strong> ${error}`,
									}}
								/>
							)}

							<div className="row">
								<div className="col-sm-6">
									<Field
										id="agents"
										name="agents"
										component={renderSelect}
										label="Agents"
										placeholder="Agents"
										data={agents}
									/>
								</div>

								<div className="col-sm-6">
									<Field
										id="cycle"
										name="cycle"
										component={renderTextInput}
										label="Cycle"
										placeholder="Cycle"
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12">
									<div className="element-wrapper">
										<div className="element-box">
											<div className="table table-responsive">
												<IVFRegulationTable />
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" type="submit">
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

RegulationChart = reduxForm({
	form: 'regulation-chart', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(RegulationChart);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		regulationTable: state.patient.regulationTable,
	};
};

export default withRouter(connect(mapStateToProps)(RegulationChart));

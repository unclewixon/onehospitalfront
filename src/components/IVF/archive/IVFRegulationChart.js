import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { IVFHCGDown, patientAPI } from '../../services/constants';
import {
	renderSelect,
	renderTextInput,
	request,
} from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import IVFRegulationTable from './IVFRegulationTable';
import { loadPatientRegulationTable } from '../../actions/patient';

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

class IVFRegulationChart extends Component {
	state = {
		page: 1,
		patientList: [],
		submitting: false,
		loading: false,
		chosenPatient: null,
	};

	onSubmitForm = async data => {
		const { regulationTable, history } = this.props;
		console.log(data);
		console.log(regulationTable);
		let hcgDown = [];
		// eslint-disable-next-line array-callback-return
		regulationTable.map((value, index, array) => {
			let rec = {
				date: value.date,
				day: value.day,
				dose: value.dose,
				otherTreatment: value.other_treatment,
				comment: value.comment,
			};
			hcgDown = [...hcgDown, rec];
		});

		let dataToSave = {
			ivf_enrollment_id: data.name,
			agent: data.agents,
			cycle: data.cycle,
			charts: hcgDown,
		};

		try {
			await request(`${IVFHCGDown}`, 'POST', true, dataToSave);
			//props.closeModals(true);
			notifySuccess('Down Regulation Chart created successfully');
			history.push('/ivf/reg-chart');
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			notifyError('Down Regulation Chart creation failed');
			this.setState({ loading: false });
		}
	};

	componentDidMount() {
		this.loadPatients();
	}

	loadPatients = async () => {
		try {
			this.setState({ loading: true });
			// console.log(`${patientAPI}/list`);
			const rs = await request(`${patientAPI}/list`, 'GET', true);

			let patientList = [];
			// eslint-disable-next-line array-callback-return
			rs.map((value, i) => {
				patientList = [
					...patientList,
					{
						//value: value.id,
						id: value.id,
						name: value.other_names + ' ' + value.surname,
					},
				];
			});
			this.setState({ patientList });
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	setChosenPatient = data => {
		this.setState({ chosenPatient: data });
	};

	render() {
		const {
			// page,
			// submitting,
			// loading,
			// chosenPatient,
			patientList,
		} = this.state;
		const { error, handleSubmit } = this.props;
		return (
			<div className="element-box">
				<>
					<h6 className="element-header">Down Regulation Chart</h6>
					<div className="form-block">
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
										id="name"
										name="name"
										component={renderSelect}
										label="Name"
										placeholder="Name"
										data={patientList}
									/>
								</div>

								<div className="col-sm-6">
									<Field
										id="hosp_num"
										name="hosp_num"
										component={renderTextInput}
										label="Hospital Number"
										placeholder="Hospital Number"
									/>
								</div>

								<div className="col-sm-6">
									<Field
										id="phone_wife"
										name="phone_wife"
										component={renderTextInput}
										label="Phone Number of Wife"
										placeholder="Phone Number of Wife"
									/>
								</div>

								<div className="col-sm-6">
									<Field
										id="phone_husband"
										name="phone_husband"
										component={renderTextInput}
										label="Phone Number of Husband"
										placeholder="Phone Number of Husband"
									/>
								</div>
							</div>

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
									<button className="btn btn-secondary" type="button">
										Cancel
									</button>

									<button className="btn btn-primary" type="submit">
										Proceed
									</button>
								</div>
							</div>
						</form>
					</div>
				</>
			</div>
		);
	}
}

IVFRegulationChart = reduxForm({
	form: 'IVFRegulationChart', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(IVFRegulationChart);
const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		regulationTable: state.patient.regulationTable,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadPatientRegulationTable })(IVFRegulationChart)
);

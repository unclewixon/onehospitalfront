import React, { Component, lazy, Suspense } from 'react';
import Splash from '../../components/Splash';
import { API_URI, patientAPI } from '../../services/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
	renderSelect,
	renderTextArea,
	renderTextInput,
	request,
} from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';

import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import IVFRegulationTable from './IVFRegulationTable';

export const agents = [
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
		submitting: false,
		loading: false,
		patient_id: '',
		patient_name: '',
		lmpHx: '',
		dom: '',
		gest_date: '',
		dob: '',
		lmp: '',
	};

	handleSubmit = async data => {};

	render() {
		const { page, submitting, loading } = this.state;
		const { error } = this.props;
		return (
			<div className="element-box">
				<>
					<h6 className="element-header">Down Regulation Chart</h6>
					<div className="form-block">
						<form onSubmit={this.handleSubmit}>
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
										component={renderTextInput}
										label="Name"
										placeholder="Name"
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
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(IVFRegulationChart);
const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, null)(IVFRegulationChart));

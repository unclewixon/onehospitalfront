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
import HcgAdminTable from './HcgAdminTable';

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
class IVFHcgAdmin extends Component {
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
					<h6 className="element-header">HCG ADMINISTRATION CHART</h6>
					<div className="form-block">
						<form onSubmit={this.handleSubmit}>
							<div className="row">
								<div className="col-sm-12">
									<div className="element-wrapper">
										<div className="element-box">
											<div className="table table-responsive">
												<HcgAdminTable />
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

IVFHcgAdmin = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(IVFHcgAdmin);
const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(connect(mapStateToProps, null)(IVFHcgAdmin));

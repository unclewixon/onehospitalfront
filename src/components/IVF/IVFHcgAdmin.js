import React, { Component, lazy, Suspense, useState } from 'react';
import Splash from '../../components/Splash';
import { API_URI, patientAPI } from '../../services/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import HcgAdminTable from './HcgAdminTable';
import searchingGIF from '../../assets/images/searching.gif';
import { useHistory } from 'react-router-dom';

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

let IVFHcgAdmin = props => {
	let [loading, setLoading] = useState(false);
	let history = useHistory();
	const onSubmitForm = async data => {
		console.log(data);
	};

	return (
		<div className="element-box">
			<>
				<h6 className="element-header">HCG ADMINISTRATION CHART</h6>
				<div className="form-block">
					{loading ? (
						<div className="form-block encounter">
							<img alt="searching" src={searchingGIF} />
						</div>
					) : (
						<>
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
						</>
					)}
				</div>
			</>
		</div>
	);
};

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

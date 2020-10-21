import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { reduxForm } from 'redux-form';
import HcgAdminTable from './HcgAdminTable';
import searchingGIF from '../../assets/images/searching.gif';

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
	// eslint-disable-next-line no-unused-vars
	let [loading, setLoading] = useState(false);

	return (
		<div className="element-box p-0 m-0">
			<>
				<h6 className="element-header p-2">HCG ADMINISTRATION CHART</h6>
				<div className="form-block">
					{loading ? (
						<div className="form-block encounter">
							<img alt="searching" src={searchingGIF} />
						</div>
					) : (
						<>
							{/* <div className="row">
								<div className="col-sm-12">
									<div className="element-wrapper">
										<div className="element-box"> */}
							<div className="table table-responsive">
								<HcgAdminTable />
							</div>
							{/*</div>
									</div>
								</div>
							</div> */}
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	API_URI,
	socket,
	staffAPI,
	searchAPI,
	patientAPI,
} from '../../services/constants';
import { request } from '../../services/utilities';
import Dashboard from './Dashboard';
import { notifySuccess, notifyError } from '../../services/notify';
// import CafeteriaCustomerDetail from '../../components/CafeteriaCustomerDetail';
// import CafeteriaTransactionTable from '../../components/CafeteriaTransactionTable';
import { loadStaff } from '../../actions/hr';
import { loadPatients } from '../../actions/patient';
import { getAllCafeteriaItem } from '../../actions/inventory';
import _ from 'lodash';
import size from 'lodash.size';

import searchingGIF from '../../assets/images/searching.gif';
import CafeteriaDashboard from './Dashboard';
import AllTransactions from './AllTransaction';
const Cafeteria = props => {
	const [activePage, togglePage] = useState('Dashboard');

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						<button
							className="btn btn-primary btn-sm"
							onClick={() => togglePage('Dashboard')}>
							<i className="os-icon os-icon-ui-22"></i>
							<span>Dashboard</span>
						</button>
						<button
							className="btn btn-success btn-sm"
							onClick={() => togglePage('All Transaction')}>
							<i className="os-icon os-icon-grid-10"></i>
							<span>All Transaction</span>
						</button>
					</div>
					<h6 className="element-header">{activePage}</h6>
					{activePage === 'Dashboard' && <CafeteriaDashboard />}
					{activePage === 'All Transaction' && <AllTransactions />}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		staffs: state.hr.staffs,
		patients: state.patient.patients,
		cafeteriaItems: state.inventory.cafeteriaItems,
	};
};
export default connect(mapStateToProps, {
	loadStaff,
	loadPatients,
	getAllCafeteriaItem,
})(Cafeteria);

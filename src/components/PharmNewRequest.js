import React, { useEffect, useState } from 'react';
import PharmNewRequestComponent from './PharmNewRequestComponent';
import {
	getAllDiagnosises, 
	getAllServiceCategory, 
	get_all_services 
} from '../actions/settings';
import { connect } from 'react-redux';
import { API_URI, serviceAPI } from '../services/constants';
import { request } from '../services/utilities';
import { notifyError } from './../services/notify';

const PharmNewRequest = props => {
	const { diagnosis } = props;
	const [allPatients, setAllPatients] = useState([]);
	const [patientsLoading, setPatientsLoading] = useState(false);
	const [diagnosisLoading, setDiagnosisLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [services, setServices] = useState('');

	useEffect(() => {
		const { getAllDiagnosises, getAllServiceCategory } = props;
		setDiagnosisLoading(true);
		if(!loaded) {
			getAllServiceCategory()
			getAllDiagnosises(() => {
			setDiagnosisLoading(false);
		});
		}
		let data = [];
		let services = [];
		props.ServiceCategories.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			data = [...data, res];
		});
		props.service.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			services = [...services, res];
		});
		setServicesCategory(data);
		setServices(services);
		setLoaded(true);
	}, [props, loaded]);

	useEffect(() => {
		const getPatients = async () => {
			setPatientsLoading(true);
			const rs = await request(`${API_URI}/patient/list`, 'GET', true);
			const res = rs.map(patient => ({
				value: patient.id,
				label: patient.surname + ', ' + patient.other_names,
			}));
			setAllPatients(res);
			setPatientsLoading(false);
		};
		getPatients();
	}, []);

	

	const diagnosisList = diagnosis
		? diagnosis.map(diag => {
				return {
					label: diag.description,
					value: diag.icd10Code,
				};
		  })
		: [];

	return (
		<PharmNewRequestComponent
			diagnosisList={diagnosisList}
			allPatients={allPatients}
			patientsLoading={patientsLoading}
			diagnosisLoading={diagnosisLoading}
			ServiceCategories={servicesCategory}
		/>
	);
};

const mapStateToProps = ({ user, settings }) => ({
	patient: user.patient,
	diagnosis: settings.diagnosis,
	service: settings.services,
	ServiceCategories: settings.service_categories,
});

export default connect(mapStateToProps, { 
	getAllDiagnosises,
	get_all_services,
	getAllServiceCategory
 })(PharmNewRequest);

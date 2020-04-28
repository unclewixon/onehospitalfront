import React, { useEffect, useState } from 'react';
import PharmNewRequestComponent from './PharmNewRequestComponent';
import { getAllServiceCategory, get_all_services } from '../actions/settings';
import { connect } from 'react-redux';
import { API_URI, serviceAPI } from '../services/constants';
import { request } from '../services/utilities';
import { notifyError } from './../services/notify';

const PharmNewRequest = props => {
	const [allPatients, setAllPatients] = useState([]);
	const [patientsLoading, setPatientsLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [servicesCategory, setServicesCategory] = useState([]);
	const [services, setServices] = useState('');

	useEffect(() => {
		const { getAllServiceCategory } = props;
		if (!loaded) {
			getAllServiceCategory();
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

	return (
		<PharmNewRequestComponent
			allPatients={allPatients}
			patientsLoading={patientsLoading}
			ServiceCategories={servicesCategory}
		/>
	);
};

const mapStateToProps = ({ user, settings }) => ({
	patient: user.patient,
	service: settings.services,
	ServiceCategories: settings.service_categories,
});

export default connect(mapStateToProps, {
	get_all_services,
	getAllServiceCategory,
})(PharmNewRequest);

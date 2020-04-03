import React from 'react';
import { connect } from 'react-redux'
import PharmNewRequestComponent from './PharmNewRequestComponent';
import { addPharmacyRequest } from '../actions/patient';

const PharmNewRequest = props => {
	const addRequest = (data, id, diagnosis, prescription, cb) => {
		props.addPharmacyRequest(data, id, diagnosis, prescription, cb);
	}

	return <PharmNewRequestComponent saveRequest={addRequest} patient={props.patient} />;
};

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
	}
};

export default connect(mapStateToProps, {
	addPharmacyRequest
})(PharmNewRequest);

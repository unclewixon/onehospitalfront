import * as yup from 'yup';

export const AppointmentSchema = yup.object().shape({
	consultation_id: yup.string().required('Please select a consultation'),
	department_id: yup.string().required('Please select a department'),
	specialty: yup.string().required('Please select a specialty'),
	patient_id: yup.string().required('Please select a patient'),
	appointment_date: yup.date().required('Please select a date'),
	referredBy: yup.string(),
	referralCompany: yup.string(),
});

export const patientSchema = yup.object().shape({
	surname: yup.string().required("Please enter the patient's last name"),
	other_names: yup
		.string()
		.required("Please enter the patient's first name and other names"),
	date_of_birth: yup
		.string()
		.required("Please enter the patient's date of birth"),
	email: yup.string().required("Please enter the patient's email address"),
	maritalStatus: yup
		.string()
		.required("Please enter the patient's marital status"),
	gender: yup.string().required("Please enter the patient's gender"),
	address: yup.string().required("Please enter the patient's address"),
	phone_number: yup
		.string()
		.required("Please enter the patient's phone number"),
	hmoId: yup.string().required('Please select HMO'),
	ethnicity: yup.string().required("Please select patient's ethnicity"),
});

export const patientNOKSchema = yup.object().shape({
	nok_surname: yup
		.string()
		.required("Please enter the next of kin's last name"),
	nok_other_names: yup
		.string()
		.required("Please enter the nex of kin's first name and other names"),
	nok_email: yup
		.string()
		.required("Please enter the next of kin's email address"),
	nok_phoneNumber: yup
		.string()
		.required("Please enter the next of kin's phone number"),
	nok_relationship: yup
		.string()
		.required("Please enter the next of kin's relationship"),
	nok_address: yup.string().required("Please enter the next of kin's address"),
});

export const validate = values => {
	const errors = {};
	if (!values.heightOfFunds) {
		errors.heightOfFunds = 'Heart of Fundus is Required';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.heightOfFunds)) {
		errors.heightOfFunds = 'Please enter a valid number';
	}
	if (!values.fetalHeartRate) {
		errors.fetalHeartRate = 'Fetal heart rate is Required';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.fetalHeartRate)) {
		errors.fetalHeartRate = 'Please enter a valid number';
	}
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.relationshipToBrim) {
		errors.relationshipToBrim = 'Field is required';
	}
	if (!values.laboratory) {
		errors.laboratory = 'Field is required';
	}
	return errors;
};

export const validateAntenatal = values => {
	const errors = {};
	if (!values.bookingPeriod || values.bookingPeriod === '') {
		errors.bookingPeriod = 'select booking period';
	}
	if (!values.doctors || values.doctors.length === 0) {
		errors.doctors = 'select doctors';
	}

	if (!values.lmpSource || values.lmpSource === '') {
		errors.lmpSource = 'enter lmp Source';
	}

	if (!values.phone) {
		errors.phone = 'enter phone number';
	}
	if (!values.name || values.name === '') {
		errors.name = 'enter father name';
	}
	if (!values.blood_group || values.blood_group === '') {
		errors.blood_group = 'select blood group';
	}
	if (!values.obstericsHistory || values.obstericsHistory === '') {
		errors.obstericsHistory = 'select obsterics History';
	}

	if (!values.gravida || values.gravida === '') {
		errors.gravida = 'select gravida';
	}
	if (!values.para || values.para === '') {
		errors.para = 'select para';
	}
	if (!values.alive || values.alive === '') {
		errors.alive = 'select alibe';
	}
	if (!values.miscarriage || values.miscarriage === '') {
		errors.miscarriage = 'select miscarriage';
	}
	if (!values.abortion || values.abortion === '') {
		errors.abortion = 'select abortion';
	}
	return errors;
};

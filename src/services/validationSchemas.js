import * as yup from 'yup';

export const patientSchema = yup.object().shape({
	surname: yup.string().required("Please enter the patient's last name"),
	other_names: yup
		.string()
		.required("Please enter the patient's first name and other names"),
	date_of_birth: yup
		.string()
		.required("Please enter the patient's date of birth"),
});

export const patientNOKSchema = yup.object().shape({
	nok_surname: yup
		.string()
		.required("Please enter the next of kin's last name"),
	nok_other_names: yup
		.string()
		.required("Please enter the nex of kin's first name and other names"),
});

export const validate = values => {
	const errors = {};
	if (!values.heart_of_fundus) {
		errors.heart_of_fundus = 'Heart of Fundus is Required';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.heart_of_fundus)) {
		errors.heart_of_fundus = 'Please enter a valid number';
	}
	if (!values.fetal_heart_rate) {
		errors.fetal_heart_rate = 'Fetal heart rate is Required';
	} else if (!/^\d+(\.\d{1,2})?$/i.test(values.fetal_heart_rate)) {
		errors.fetal_heart_rate = 'Please enter a valid number';
	}
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.sex) {
		errors.sex = 'Required';
	}
	if (!values.favoriteColor) {
		errors.favoriteColor = 'Required';
	}
	return errors;
};

export const validateAntennatal = values => {
	const errors = {};
	if (!values.bookingPeriod || values.bookingPeriod === '') {
		errors.bookingPeriod = 'select booking period';
	}
	if (!values.requiredCare || values.requiredCare.length === 0) {
		errors.requiredCare = 'select required care(s)';
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
	if (!values.package || values.package === '') {
		errors.package = 'select antennatal package';
	}
	return errors;
};

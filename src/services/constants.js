import socketIOClient from 'socket.io-client';

export const DEBUG = process.env.REACT_APP_DEBUG;
export const APP_NAME = process.env.REACT_APP_NAME;
export const BASE_API = process.env.REACT_APP_API;

export const API_URI = `${BASE_API}`;
export const TOKEN_COOKIE = 'EMR:TOKEN_COOKIE';
export const MODE_COOKIE = 'EMR:MODE_COOKIE';
export const FULLSCREEN_COOKIE = 'EMR:FULLSCREEN_COOKIE';
export const USER_RECORD = 'EMR:USER_RECORD';
export const socket = socketIOClient(API_URI, { transports: ['websocket'] });

export const hmoAPI = '/hmos';
export const inventoryAPI = '/inventory/stocks';
export const inventoryUpdateQuantityAPI = '/inventory/stocks/update-quantity';
export const stocksAPI = '/stocks';
export const inventoryCatAPI = '/inventory/categories';
export const inventoryDownloadAPI = '/inventory/download';
export const inventoryUploadAPI = '/inventory/stocks/bulk-upload';
export const inventorySubCatAPI = '/inventory/sub-categories';
export const rolesAPI = '/settings/roles';
export const staffAPI = '/hr/staffs';
export const appraisalAPI = '/hr/appraisal';
export const leaveMgtAPI = '/hr/leave-management';
export const rosterAPI = '/hr/housekeeping';
export const searchAPI = '/patient/find';
export const vitalsAPI = '/patient/save-vitals';
export const departmentAPI = '/departments';
export const utilityAPI = '/utility';
export const payrollAPI = '/hr/payroll';
export const patientAPI = '/patient';
export const transactionsAPI = '/transactions';
export const vouchersAPI = '/vouchers';
export const serviceAPI = '/services';
export const settingsAPI = '/settings/';
export const diagnosisAPI = '/settings/diagnosis';

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const relationships = [
	{ value: 'Father', label: 'Father' },
	{ value: 'Mother', label: 'Mother' },
	{ value: 'Sister', label: 'Sister' },
	{ value: 'Brother', label: 'Brother' },
	{ value: 'Aunt', label: 'Aunt' },
	{ value: 'Others', label: 'Others' },
];

export const ethnicities = [
	{ value: 'Igbo', label: 'Igbo' },
	{ value: 'Hausa', label: 'Hausa' },
	{ value: 'Hausa-Fulani', label: 'Hausa-Fulani' },
	{ value: 'Yoruba', label: 'Yoruba' },
	{ value: 'Fula', label: 'Fula' },
	{ value: 'Ijaw', label: 'Ijaw' },
	{ value: 'Tiv', label: 'Tiv' },
	{ value: 'Ibibio', label: 'Ibibio' },
	{ value: 'Ogoni', label: 'Ogoni' },
	{ value: 'Kunari', label: 'Kunari' },
	{ value: 'Urhobo', label: 'Urhobo' },
	{ value: 'Efik', label: 'Efik' },
	{ value: 'Edo', label: 'Edo' },
	{ value: 'Idoma', label: 'Idoma' },
	{ value: 'Itsekiri', label: 'Itsekiri' },
	{ value: 'Nupe', label: 'Nupe' },
	{ value: 'Igala', label: 'Igala' },
	{ value: 'Gbagyi', label: 'Gbagyi' },
	{ value: 'Ebira', label: 'Ebira' },
	{ value: 'Egba', label: 'Egba' },
	{ value: 'Anaang', label: 'Anaang' },
	{ value: 'Berom', label: 'Berom' },
	{ value: 'Ekoi', label: 'Ekoi' },
	{ value: 'Chamba', label: 'Chamba' },
	{ value: 'Afusari', label: 'Afusari' },
	{ value: 'Esan', label: 'Esan' },
	{ value: 'Saro', label: 'Saro' },
	{ value: 'Anioma', label: 'Anioma' },
	{ value: 'Zarma', label: 'Zarma' },
	{ value: 'Mambila', label: 'Mambila' },
	{ value: 'Atyap', label: 'Atyap' },
	{ value: 'Longuda', label: 'Longuda' },
	{ value: 'Kuteb', label: 'Kuteb' },
	{ value: 'Bajju', label: 'Bajju' },
	{ value: 'Mumuye', label: 'Mumuye' },
	{ value: 'Tarok', label: 'Tarok' },
	{ value: 'Isoko', label: 'Isoko' },
	{ value: 'Kirdi', label: 'Kirdi' },
	{ value: 'Fon', label: 'Fon' },
	{ value: 'Ikwere', label: 'Ikwere' },
	{ value: 'Anlo', label: 'Anlo' },
	{ value: 'Iwellemmedan', label: 'Iwellemmedan' },
	{ value: 'Bariba', label: 'Bariba' },
	{ value: 'Ibani', label: 'Ibani' },
	{ value: 'Kotoko', label: 'Kotoko' },
	{ value: 'Eloyi', label: 'Eloyi' },
	{ value: 'Kamuku', label: 'Kamuku' },
	{ value: 'Mandara', label: 'Mandara' },
];

export const gender = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
];

export const maritalStatus = [
	{ value: 'Single', label: 'Single' },
	{ value: 'Married', label: 'Married' },
];

export const yesNO = [
	{ value: 'Yes', label: 'Yes' },
	{ value: 'No', label: 'No' },
];

export const documentType = [
	{ id: 'Case notes', name: 'Case notes' },
	{ id: 'Admissions', name: 'Admissions' },
	{ id: 'Financial', name: 'Financial' },
	{ id: 'Labs', name: 'Labs' },
	{ id: 'Imaging', name: 'Imaging' },
	{ id: 'Procedures', name: 'Procedures' },
	{ id: 'Antenatal', name: 'Antenatal' },
	{ id: 'Prescription', name: 'Prescription' },
];

export const paymentTypeExtra = [
	{ value: 'POS', label: 'POS' },
	{ value: 'Cash', label: 'Cash' },
	{ value: 'Cheque', label: 'Cheque' },
	{ value: 'Transfer', label: 'Transfer' },
	{ value: 'Hmo', label: 'Hmo' },
];

export const paymentType = [
	{ value: 'POS', label: 'POS' },
	{ value: 'Cash', label: 'Cash' },
	{ value: 'Cheque', label: 'Cheque' },
	{ value: 'Transfer', label: 'Transfer' },
];

export const transactionPaymentType = [
	{ id: 'POS', name: 'POS' },
	{ id: 'Cash', name: 'Cash' },
	{ id: 'Cheque', name: 'Cheque' },
	{ id: 'Transfer', name: 'Transfer' },
	{ id: 'Voucher', name: 'Voucher' },
	{ id: 'Hmo', name: 'Hmo' },
];

export const insuranceStatus = [
	{ value: 'HMO', label: 'HMO' },
	{ value: 'Cooperate', label: 'Cooperate' },
	{ value: 'Private', label: 'Private' },
];

export const vitalItems = [
	'Blood Pressure',
	'BMI',
	'BSA',
	'Dilation',
	'Fetal Heart Rate',
	'Fundus Height',
	'Glucose',
	'Head Circumference',
	'Height',
	'Length of Arm',
	'MUAC',
	'Mid-Arm Circumference',
	'Pain Scale',
	'PCV',
	'Protein',
	'Pulse',
	'Respiration',
	'SpO2',
	'Surface Area',
	'Temperature',
	'Urine',
	'Weight',
	'Others',
];

export const requestTypes = [
	{
		value: 'Physiotherapy',
		label: 'Physiotherapy',
	},
	{
		value: 'Dentistry',
		label: 'Dentistry',
	},
	{
		value: 'Opthalmology',
		label: 'Opthalmology',
	},
	{
		value: 'Imaging',
		label: 'Imaging',
	},
	{
		value: 'Pharmacy',
		label: 'Pharmacy',
	},
	{
		value: 'Clinical lab',
		label: 'Clinical lab',
	},
];

export const encounters = [
	'Presenting Complaints',
	'Review of Systems',
	'Hx',
	'Past Medical History',
	'Allergies',
	'Physical Examination',
	'Physical Examination Summary',
	'Diagnosis',
	'Investigations',
	'Plan',
	'Consumable',
];

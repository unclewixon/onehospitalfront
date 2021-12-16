import {
	LOAD_VITALS,
	UPDATE_VITALS,
	GET_LAB_REQUESTS,
	GET_PHARMACY_REQUESTS,
	GET_ALL_REQUESTS,
	LOAD_LABOUR,
	LOAD_LABOUR_DETAIL,
	CLEAR_LABOUR_DETAIL,
	LOAD_PARTOGRAPH,
	LOAD_RISK,
	PATIENT_REGULATION_TABLE,
	LOAD_DELIVERY_RECORD,
	LOAD_LABOUR_MEASUREMENT,
	PATIENT_IVF,
	READING_DONE,
	SET_IVF,
	CAN_CLOSE_LABOUR,
	UPDATE_ENCOUNTER_DATA,
	RESET_ENCOUNTER_DATA,
	UPDATE_SOAP_DATA,
} from '../actions/types';

const soapData = {
	complaints: '',
	reviewOfSystem: [],
	physicalExaminationSummary: '',
	diagnosis: [],
	treatmentPlan: '',
};

const INITIAL_STATE = {
	vitals: [],
	ivfDetails: {},
	labRequests: [],
	pharmacyRequests: [],
	allRequests: [],
	ivf: {},
	encounterData: {
		complaints:
			'<p><u>Presenting Complaints:</u>​&nbsp;</p><p><br></p><p><br></p><p><br></p><p><u>History of complains</u>:&nbsp;</p><p><br></p>',
		reviewOfSystem: [],
		patientHistory: null,
		patientHistorySelected: [],
		medicalHistory:
			'<p><u>Past Medical History:</u>​&nbsp;</p><p><br></p><p><br></p><p><br></p><p><u><br></p>',
		allergies: [],
		pastAllergies: [],
		physicalExamination: [],
		diagnosis: [],
		pastDiagnosis: [],
		investigations: {
			labRequest: null,
			radiologyRequest: null,
			pharmacyRequest: null,
			procedureRequest: null,
		},
		treatmentPlan: '<p><u>Treatment Plan:</u>​&nbsp;</p><p><br></p>',
		nextAppointment: null,
		instruction: '',
		consumables: null,
	},
	soapData: {
		complaints: '',
		reviewOfSystem: [],
		physicalExaminationSummary: '',
		diagnosis: [],
		pastDiagnosis: [],
		treatmentPlan: '',
	},
	enrolments: [],
	labourDetail: null,
	partographies: [],
	riskAssessment: [],
	deliveryRecord: [],
	labourMeasurement: [],
	reading_done: null,
	canCloseLabour: false,
};

const patient = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_IVF:
			console.log(SET_IVF);
			return { ...state, ivfDetails: action.payload };
		case CAN_CLOSE_LABOUR:
			return { ...state, canCloseLabour: true };
		case PATIENT_IVF:
			return { ...state, ivf: action.payload };
		case PATIENT_REGULATION_TABLE:
			return { ...state, regulationTable: action.payload };
		case UPDATE_ENCOUNTER_DATA:
			return {
				...state,
				encounterData: { ...action.payload },
			};
		case UPDATE_SOAP_DATA:
			return {
				...state,
				soapData: { ...action.payload },
			};
		case RESET_ENCOUNTER_DATA:
			return {
				...state,
				encounterData: action.payload,
				soapData,
			};
		case LOAD_VITALS:
			return { ...state, vitals: [...action.payload] };
		case UPDATE_VITALS:
			return { ...state, vitals: [action.payload, ...state.vitals] };
		case GET_LAB_REQUESTS:
			return { ...state, labRequests: action.payload };
		case GET_PHARMACY_REQUESTS:
			return { ...state, pharmacyRequests: action.payload };
		case GET_ALL_REQUESTS:
			return { ...state, allRequests: action.payload };
		case LOAD_LABOUR:
			return {
				...state,
				enrolments: action.payload,
			};
		case LOAD_LABOUR_DETAIL:
			return {
				...state,
				labourDetail: action.payload,
			};
		case CLEAR_LABOUR_DETAIL:
			return {
				...state,
				labourDetail: {},
			};
		case LOAD_PARTOGRAPH:
			return {
				...state,
				partographies: action.payload,
			};
		case LOAD_RISK:
			return {
				...state,
				riskAssessment: action.payload,
			};
		case LOAD_DELIVERY_RECORD:
			return {
				...state,
				deliveryRecord: action.payload,
			};
		case LOAD_LABOUR_MEASUREMENT:
			return {
				...state,
				labourMeasurement: action.payload,
			};
		case READING_DONE:
			return { ...state, reading_done: action.payload };
		default:
			return state;
	}
};

export default patient;

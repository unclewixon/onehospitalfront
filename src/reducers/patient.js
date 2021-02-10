import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	LOAD_ENCOUNTERS,
	ALLERGY,
	UPDATE_ALLERGY,
	DELETE_ALLERGY,
	GET_PHYSIOTHERAPIES,
	GET_IMAGING_REQUESTS,
	LOAD_VITALS,
	UPDATE_VITALS,
	LOAD_PATIENT_UPLOAD_DATA,
	ADD_PATIENT_UPLOAD_DATA,
	LOAD_PATIENTS,
	GET_LAB_REQUESTS,
	GET_PHARMACY_REQUESTS,
	GET_ALL_REQUESTS,
	LOAD_CLINICAL_LAB,
	LOAD_RADIOLOGY,
	UPDATE_COMPLAINT_DATA,
	LOAD_ANTENNATAL,
	LOAD_ANTENATAL_ASSESSMENT,
	LOAD_LABOUR,
	LOAD_LABOUR_DETAIL,
	CLEAR_LABOUR_DETAIL,
	ENCOUNTER_FORM,
	LOAD_PARTOGRAPH,
	LOAD_RISK,
	PATIENT_REGULATION_TABLE,
	LOAD_DELIVERY_RECORD,
	LOAD_LABOUR_MEASUREMENT,
	PATIENT_IVF,
	ADD_NEW_PATIENT,
	GET_ALL_OPD_LAB_APPOINTMENTS,
	GET_ALL_OPD_IMMUNIZATION_APPOINTMENTS,
	UPDATE_PATIENT,
	READING_DONE,
} from '../actions/types';
import actions from 'redux-form/lib/actions';
import { updateImmutable } from '../services/utilities';

const INITIAL_STATE = {
	formStep: 1,
	formData: {},
	allergy: {},
	allergies: [],
	encounters: [],
	physiotherapies: [],
	imagingRequests: [],
	patient_upload: [],
	vitals: [],
	patients: [],
	clinicalLab: [],
	opdLabAppointments: [],
	opdImmunizationAppointments: [],
	radiology: [],
	labRequests: [],
	pharmacyRequests: [],
	allRequests: [],
	antennatal: [],
	encounterForm: {},
	ivf: {},
	encounterData: {
		complaints: 'Presenting Complaints:',
		reviewOfSystem: [],
		patientHistory: [],
		medicalHistory: [],
		allergies: [],
		physicalExamination: [],
		//physicalExaminationSummary: [],
		diagnosis: [],
		investigations: {
			labRequest: {},
			imagingRequest: {},
		},
		plan: {
			treatmentPlan: 'Treatment Plan:',
			pharmacyRequests: {},
			nextAppointment: {},
			procedureRequest: {},
		},
	},
	antenatalAssessment: [],
	enrolments: [],
	labourDetail: {},
	partographies: [],
	riskAssessment: [],
	deliveryRecord: [],
	labourMeasurement: [],
	reading_done: null,
};

const patient = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEXT_STEP:
			return { ...state, formData: action.payload, formStep: 2 };
		case PREV_STEP:
			return { ...state, formStep: action.payload };
		case LOAD_PATIENT_UPLOAD_DATA:
			return { ...state, patient_upload: action.payload };
		case ADD_PATIENT_UPLOAD_DATA:
			return {
				...state,
				patient_upload: [...state.patient_upload, action.payload],
			};
		case GET_ALLERGIES:
			return { ...state, allergies: action.payload };
		case SAVE_ALLERGIES:
			return { ...state, allergies: [...state.allergies, action.payload] };
		case ALLERGY:
			return { ...state, allergy: action.payload };
		case LOAD_ENCOUNTERS:
			return { ...state, encounters: [action.payload] };
		case ENCOUNTER_FORM:
			return { ...state, encounterForm: action.payload };
		case PATIENT_IVF:
			return { ...state, ivf: action.payload };
		case PATIENT_REGULATION_TABLE:
			return { ...state, regulationTable: action.payload };
		case UPDATE_COMPLAINT_DATA:
			return {
				...state,
				encounterData: {
					...state.encounterData,
					complaints: action.payload,
				},
			};
		case GET_PHYSIOTHERAPIES:
			return { ...state, physiotherapies: action.payload };
		case GET_IMAGING_REQUESTS:
			return { ...state, imagingRequests: action.payload };
		case UPDATE_ALLERGY:
			return {
				...state,
				allergies: [
					...state.allergies.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_ALLERGY:
			console.log(actions.payload);
			return {
				...state,
				allergies: state.allergies.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		case LOAD_VITALS:
			return { ...state, vitals: [...action.payload] };
		case UPDATE_VITALS:
			return { ...state, vitals: [action.payload, ...state.vitals] };
		case LOAD_CLINICAL_LAB:
			return { ...state, clinicalLab: [...action.payload] };
		case LOAD_RADIOLOGY:
			return { ...state, radiology: [...action.payload] };
		case GET_LAB_REQUESTS:
			return { ...state, labRequests: action.payload };
		case GET_PHARMACY_REQUESTS:
			return { ...state, pharmacyRequests: action.payload };
		case GET_ALL_REQUESTS:
			return { ...state, allRequests: action.payload };

		case LOAD_ANTENNATAL:
			return { ...state, antennatal: [...action.payload] };
		case LOAD_ANTENATAL_ASSESSMENT:
			return {
				...state,
				antenatalAssessment: action.payload,
			};
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
		case GET_ALL_OPD_LAB_APPOINTMENTS:
			return {
				...state,
				opdLabAppointments: action.payload,
			};
		case GET_ALL_OPD_IMMUNIZATION_APPOINTMENTS:
			return {
				...state,
				opdImmunizationAppointments: action.payload,
			};
		case LOAD_PATIENTS:
			return { ...state, patients: action.payload };
		case ADD_NEW_PATIENT:
			return {
				...state,
				patients: [action.payload, ...state.patients],
			};
		case UPDATE_PATIENT:
			const patients = updateImmutable(state.patients, action.payload);
			return { ...state, patients };
		case READING_DONE:
			return { ...state, reading_done: action.payload };
		default:
			return state;
	}
};

export default patient;

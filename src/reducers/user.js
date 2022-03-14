import {
	SET_PROFILE,
	TOGGLE_MODE,
	TOGGLE_MENU,
	TOGGLE_FULLSCREEN,
	INIT_MODE,
	INIT_FULLSCREEN,
	SET_PATIENT_RECORD,
	TOGGLE_PROFILE,
	SIGN_OUT,
	UPDATE_STAFF,
} from '../actions/types';
import SSRStorage from '../services/storage';
import {
	FULLSCREEN_COOKIE,
	MENU_COOKE,
	MODE_COOKIE,
	USER_RECORD,
} from '../services/constants';

const storage = new SSRStorage();

const INITIAL_STATE = {
	profile: null,
	loggedIn: false,
	theme_mode: false,
	fullscreen: true,
	userID: null,
	patient: null,
	staff: null,
	isStaffOpen: false,
	isPatientOpen: false,
	isProcedureOpen: false,
	isAntenatalOpen: false,
	isAdmissionOpen: false,
	isIVFOpen: false,
	isNicuOpen: false,
	isLabourOpen: false,
	menu_mode: 'menu-layout-compact',
	menu_mini: false,
	item: null,
	type: null,
	appointmentId: null,
};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_STAFF:
			return { ...state, profile: { ...state.profile, ...action.payload } };
		case SET_PROFILE:
			return { ...state, profile: action.payload, loggedIn: action.status };
		case SIGN_OUT:
			return {
				...state,
				profile: null,
				loggedIn: false,
				userID: null,
				patient: null,
				staff: null,
				item: null,
				isPatientOpen: false,
				isProcedureOpen: false,
				isAntenatalOpen: false,
				isAdmissionOpen: false,
				isStaffOpen: false,
				isIVFOpen: false,
				isNicuOpen: false,
				isLabourOpen: false,
				appointmentId: null,
			};
		case TOGGLE_MODE:
			storage.setItem(MODE_COOKIE, !state.theme_mode);
			const theme_mode = !state.theme_mode;
			window.document.body.className = `menu-position-side menu-side-left${
				state.fullscreen ? ' full-screen' : ''
			} with-content-panel${theme_mode ? ' color-scheme-dark' : ''}`;
			return { ...state, theme_mode };
		case TOGGLE_FULLSCREEN:
			storage.setItem(FULLSCREEN_COOKIE, !state.fullscreen);
			const fullscreen = !state.fullscreen;
			window.document.body.className = `menu-position-side menu-side-left${
				fullscreen ? ' full-screen' : ''
			} with-content-panel${state.theme_mode ? ' color-scheme-dark' : ''}`;
			return { ...state, fullscreen };
		case TOGGLE_MENU:
			let menu_mode;
			let menu_mini;
			const contentW = document.getElementById('main-content');
			if (state.menu_mode === 'menu-layout-compact') {
				menu_mode = 'menu-layout-mini';
				contentW.classList.remove('content-w-l-18');
				contentW.classList.add('content-w-l-8');
				menu_mini = true;
			} else {
				menu_mode = 'menu-layout-compact';
				contentW.classList.remove('content-w-l-8');
				contentW.classList.add('content-w-l-18');
				menu_mini = false;
			}
			storage.setItem(MENU_COOKE, menu_mode);
			return { ...state, menu_mode, menu_mini };
		case INIT_MODE:
			storage.setItem(MODE_COOKIE, action.payload);
			return { ...state, theme_mode: action.payload };
		case INIT_FULLSCREEN:
			storage.setItem(FULLSCREEN_COOKIE, action.payload);
			return { ...state, fullscreen: action.payload };
		case SET_PATIENT_RECORD:
			const patient = { ...state.patient, ...action.payload };
			storage.setItem(USER_RECORD, {
				patient,
				type: state.type,
				item: state.item,
			});
			return { ...state, patient };
		case TOGGLE_PROFILE:
			if (action.payload) {
				const item = action.info.item;
				const type = action.info.type;
				const { patient, staff } = action.info;
				const data =
					type === 'patient' ||
					type === 'procedure' ||
					type === 'antenatal' ||
					type === 'admission' ||
					type === 'ivf' ||
					type === 'nicu' ||
					type === 'labour'
						? { patient }
						: { staff };
				storage.setItem(USER_RECORD, { ...data, type, item });

				return {
					...state,
					isStaffOpen: type === 'staff',
					isPatientOpen: type === 'patient',
					isProcedureOpen: type === 'procedure',
					isAntenatalOpen: type === 'antenatal',
					isAdmissionOpen: type === 'admission',
					isIVFOpen: type === 'ivf',
					isNicuOpen: type === 'nicu',
					isLabourOpen: type === 'labour',
					item,
					type,
					appointmentId: action.appointmentId,
					...data,
				};
			}

			return {
				...state,
				isStaffOpen: false,
				isPatientOpen: false,
				isProcedureOpen: false,
				isAntenatalOpen: false,
				isAdmissionOpen: false,
				isIVFOpen: false,
				isNicuOpen: false,
				isLabourOpen: false,
				userID: null,
				patient: null,
				staff: null,
				item: null,
				type: null,
				appointmentId: null,
			};
		default:
			return state;
	}
};

export default user;

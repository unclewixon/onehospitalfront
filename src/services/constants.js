import socketIOClient from "socket.io-client";

export const DEBUG = process.env.REACT_APP_DEBUG;
export const APP_NAME = process.env.REACT_APP_NAME;
export const BASE_API = process.env.REACT_APP_API;

export const API_URI = `${BASE_API}`;
export const TOKEN_COOKIE = 'EMR:TOKEN_COOKIE';
export const MODE_COOKIE = 'EMR:MODE_COOKIE';
export const FULLSCREEN_COOKIE = 'EMR:FULLSCREEN_COOKIE';
export const socket = socketIOClient(API_URI, {transports: ['websocket']});

export const inventoryAPI = '/inventory/stocks';
export const inventoryCatAPI = '/inventory/categories';
export const inventorySubCatAPI = '/inventory/sub-categories';
export const rolesAPI = '/settings/roles';
export const staffAPI = '/hr/staffs';
export const leaveMgtAPI = '/hr/leave-management';
export const rosterAPI = '/hr/housekeeping';
export const searchAPI = '/patient/find';
export const departmentAPI = '/departments';
export const utilityAPI = '/utility';
export const payrollAPI = '/hr/payroll';

export const ethnicities = [
    {value: 'Igbo', label: 'Igbo'},
    {value: 'Hausa', label: 'Hausa'},
    {value: 'Hausa-Fulani', label: 'Hausa-Fulani'},
    {value: 'Yoruba', label: 'Yoruba'},
    {value: 'Fula', label: 'Fula'},
    {value: 'Ijaw', label: 'Ijaw'},
    {value: 'Tiv', label: 'Tiv'},
    {value: 'Ibibio', label: 'Ibibio'},
    {value: 'Ogoni', label: 'Ogoni'},
    {value: 'Kunari', label: 'Kunari'},
    {value: 'Urhobo', label: 'Urhobo'},
    {value: 'Efik', label: 'Efik'},
    {value: 'Edo', label: 'Edo'},
    {value: 'Idoma', label: 'Idoma'},
    {value: 'Itsekiri', label: 'Itsekiri'},
    {value: 'Nupe', label: 'Nupe'},
    {value: 'Igala', label: 'Igala'},
    {value: 'Gbagyi', label: 'Gbagyi'},
    {value: 'Ebira', label: 'Ebira'},
    {value: 'Egba', label: 'Egba'},
    {value: 'Anaang', label: 'Anaang'},
    {value: 'Berom', label: 'Berom'},
    {value: 'Ekoi', label: 'Ekoi'},
    {value: 'Chamba', label: 'Chamba'},
    {value: 'Afusari', label: 'Afusari'},
    {value: 'Esan', label: 'Esan'},
    {value: 'Saro', label: 'Saro'},
    {value: 'Anioma', label: 'Anioma'},
    {value: 'Zarma', label: 'Zarma'},
    {value: 'Mambila', label: 'Mambila'},
    {value: 'Atyap', label: 'Atyap'},
    {value: 'Longuda', label: 'Longuda'},
    {value: 'Kuteb', label: 'Kuteb'},
    {value: 'Bajju', label: 'Bajju'},
    {value: 'Mumuye', label: 'Mumuye'},
    {value: 'Tarok', label: 'Tarok'},
    {value: 'Isoko', label: 'Isoko'},
    {value: 'Kirdi', label: 'Kirdi'},
    {value: 'Fon', label: 'Fon'},
    {value: 'Ikwere', label: 'Ikwere'},
    {value: 'Anlo', label: 'Anlo'},
    {value: 'Iwellemmedan', label: 'Iwellemmedan'},
    {value: 'Bariba', label: 'Bariba'},
    {value: 'Ibani', label: 'Ibani'},
    {value: 'Kotoko', label: 'Kotoko'},
    {value: 'Eloyi', label: 'Eloyi'},
    {value: 'Kamuku', label: 'Kamuku'},
    {value: 'Mandara', label: 'Mandara'},
];

export const gender = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
];

export const maritalStatus = [
    {value: 'Single', label: 'Single'},
    {value: 'Married', label: 'Married'},    
];

export const insuranceStatus = [
    {value: 'HMO', label: 'HMO'},
    {value: 'Cooperate', label: 'Cooperate'},    
    {value: 'Private', label: 'Private'},    
];


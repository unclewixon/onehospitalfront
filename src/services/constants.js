export const DEBUG = process.env.REACT_APP_DEBUG;
export const APP_NAME = process.env.REACT_APP_NAME;
export const BASE_API = process.env.REACT_APP_API;

export const API_URI = `${BASE_API}`;
export const TOKEN_COOKIE = 'EMR:TOKEN_COOKIE';
export const MODE_COOKIE = 'EMR:MODE_COOKIE';
export const FULLSCREEN_COOKIE = 'EMR:FULLSCREEN_COOKIE';

export const inventoryAPI = '/inventory/stocks';
export const inventoryCatAPI = '/inventory/categories';
export const inventorySubCatAPI = '/inventory/sub-categories';
export const rolesAPI = '/settings/roles';
export const staffAPI = '/hr/staffs';
export const leaveMgtAPI = '/hr/leave-management';
export const rosterAPI = '/hr/housekeeping';
export const searchAPI = '/';
export const departmentAPI = '/departments';
export const utilityAPI = '/utility';
export const payrollAPI = '/hr/payroll';

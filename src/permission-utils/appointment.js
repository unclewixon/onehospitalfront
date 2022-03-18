export function hasCreateAppointmentPermission(permissions) {
	return permissions.find(p => p === 'create-appointment');
}

export function hasViewAppointmentPermission(permissions) {
	return permissions.find(p => p === 'view-appointment');
}

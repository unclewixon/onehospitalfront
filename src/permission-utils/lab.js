export function hasCreateLabPermission(permissions) {
	return permissions.find(p => p === 'create-lab');
}

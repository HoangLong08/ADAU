export function getInfoCelcAdminAction() {
	return {
		type: 'GET_INFO_CELC_ADMIN_REQUEST',
		payload: ""
	}
}

export function updateInfoCelcAdminAction(params) {
	return {
		type: 'UPDATE_INFO_CELC_ADMIN_REQUEST',
		payload: params
	}
}
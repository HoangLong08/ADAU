export function getListPartnerAdminAction(params) {
	return {
		type: 'GET_LIST_PARTNER_ADMIN_REQUEST',
		payload: params
	}
}

export function updatePartnerAdminAction(params) {
	return {
		type: 'UPDATE_PARTNER_ADMIN_REQUEST',
		payload: params
	}
}

export function deletePartnerAdminAction(params) {
	return {
		type: 'DELETE_PARTNER_ADMIN_REQUEST',
		payload: params
	}
}

export function addPartnerAdminAction(params) {
	return {
		type: 'ADD_PARTNER_ADMIN_REQUEST',
		payload: params
	}
}
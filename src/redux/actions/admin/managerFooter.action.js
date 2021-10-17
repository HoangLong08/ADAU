export function getListManagerFooterAdminAction() {
	return {
		type: 'GET_LIST_MANAGER_FOOTER_ADMIN_REQUEST',
		payload: ""
	}
}

export function updateListManagerFooterAdminAction(params) {
	return {
		type: 'UPDATE_LIST_MANAGER_FOOTER_ADMIN_REQUEST',
		payload: params
	}
}

export function updateLogoFooterManagerAdminAction(params) {
	return {
		type: 'UPDATE_LOGO_FOOTER_MANAGER_ADMIN_REQUEST',
		payload: params
	}
}
export function getListAccountAdminAction() {
	return {
		type: 'GET_LIST_ACCOUNT_ADMIN_REQUEST',
		payload: ""
	}
}

export function getListRoleAdminAction() {
	return {
		type: 'GET_LIST_ROLE_ADMIN_REQUEST',
		payload: ""
	}
}

export function getListManagerAdminAction() {
	return {
		type: 'GET_LIST_MANAGER_ADMIN_REQUEST',
		payload: ""
	}
}

export function updateRoleAccountAdminAction(params) {
	return {
		type: 'UPDATE_ROLE_ACCOUNT_ADMIN_REQUEST',
		payload: params
	}
}

export function deleteAccountAdminAction(params) {
	return {
		type: 'DELETE_ACCOUNT_ADMIN_REQUEST',
		payload: params
	}
}

export function updateBlockAndUnBlockAccountAction(params) {
	return {
		type: 'UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_REQUEST',
		payload: params
	}
}
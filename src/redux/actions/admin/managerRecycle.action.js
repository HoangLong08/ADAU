export function getListManagerRecycleAdminAction() {
	return {
		type: 'GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST',
		payload: ""
	}
}

export function deleteListManagerRecycleAdminAction(params) {
	return {
		type: 'DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST',
		payload: params
	}
}

export function restoreListManagerRecycleAdminAction(params) {
	return {
		type: 'RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST',
		payload: params
	}
}

export function getSizeDatabaseManagerRecycleAdminAction() {
	return {
		type: 'GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_REQUEST',
		payload: ""
	}
}

export function deleteAllManagerRecycleAdminAction() {
	return {
		type: 'DELETE_ALL_MANAGER_RECYCLE_ADMIN_REQUEST',
		payload: ""
	}
}
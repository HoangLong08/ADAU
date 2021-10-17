export function getListManagerVideoAdminAction() {
	return {
		type: 'GET_LIST_MANAGER_VIDEO_ADMIN_REQUEST',
		payload: ""
	}
}

export function deleteManagerVideoAdminAction(params) {
	return {
		type: 'DELETE_MANAGER_VIDEO_ADMIN_REQUEST',
		payload: params
	}
}

export function addDetailManagerVideoAdminAction(params) {
	return {
		type: 'ADD_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST',
		payload: params
	}
}

export function updateBrowseManagerVideoAdminAction(params) {
	return {
		type: 'UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_REQUEST',
		payload: params
	}
}
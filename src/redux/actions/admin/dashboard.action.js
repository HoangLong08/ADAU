export function getContentDashboardAdminAction() {
	return {
		type: 'GET_CONTENT_DASHBOARD_ADMIN_REQUEST',
		payload: ""
	}
}

export function getContentDashboardByDatedAdminAction(params) {
	return {
		type: 'GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_REQUEST',
		payload: params
	}
}
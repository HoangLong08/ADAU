export function getListMessageAdminAction() {
	return {
		type: 'GET_LIST_MESSAGE_ADMIN_REQUEST',
		payload: ""
	}
}

export function postSendMessageAdminAction(params) {
	return {
		type: 'POST_SEND_MESSAGE_ADMIN_REQUEST',
		payload: params
	}
}

export function getListNotifyAdminAction() {
	return {
		type: 'GET_LIST_NOTIFY_ADMIN_REQUEST',
		payload: ""
	}
}
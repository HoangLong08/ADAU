export function postLoginAdminAction(params) {
	return {
		type: 'POST_LOGIN_ADMIN_REQUEST',
		payload: params
	}
}

export function postOtpAdminAction(params) {
	return {
		type: 'POST_OPT_ADMIN_REQUEST',
		payload: params
	}
}

export function postRegisterAdminAction(params) {
	return {
		type: 'POST_REGISTER_ADMIN_REQUEST',
		payload: params
	}
}


export function postChangeInfoAdminAction(params) {
	return {
		type: 'POST_CHANGE_INFO_ADMIN_REQUEST',
		payload: params
	}
}

export function postChangeImageAdminAction(params) {
	return {
		type: 'POST_CHANGE_IMAGE_ADMIN_REQUEST',
		payload: params
	}
}

export function getListHistoryLoginAdminAction() {
	return {
		type: 'GET_LIST_HISTORY_LOGIN_ADMIN_REQUEST',
		payload: ""
	}
}

export function postLogoutAdminAction() {
	return {
		type: 'POST_LOGOUT_ADMIN_REQUEST',
		payload: ""
	}
}

export function postChangePasswordAdminAction(params) {
	return {
		type: 'POST_CHANGE_PASSWORD_ADMIN_REQUEST',
		payload: params
	}
}

export function postEmailForgotPasswordAdminAction(params) {
	return {
		type: 'POST_EMAIL_FORGOT_PASSWORD_ADMIN_REQUEST',
		payload: params
	}
}

export function postOtpForgotPasswordAdminAction(params) {
	return {
		type: 'POST_OTP_FORGOT_PASSWORD_ADMIN_REQUEST',
		payload: params
	}
}

export function postResetPasswordForgotAdminAction(params) {
	return {
		type: 'POST_RESET_PASSWORD_FORGOT_ADMIN_REQUEST',
		payload: params
	}
}

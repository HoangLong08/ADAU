
import { notification } from 'antd';
var infoAdmin = JSON.parse(localStorage.getItem("infoAdmin"));
const initialState = {
	infoAdmin: {
		data: infoAdmin ? infoAdmin : {},
		load: false,
		error: ''
	},

	optAdmin: {
		data: {},
		load: false,
		error: '',
	},

	listHistoryLogin: {
		data: [],
		load: false,
		error: '',
	},

	changePassword: {
		data: "",
		load: false,
		error: '',
	},

	emailForgotPassword: {
		data: {},
		load: false,
		error: ""
	},

	otpForgotPassword: {
		data: {},
		load: false,
		error: ""
	},

	resetPassword: {
		data: {},
		load: false,
		error: ""
	},

	registerAdmin: {
		data: {
			check: false,
		},
		load: false,
		error: ""
	}

}

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};

export default function authAdminReducer(state = initialState, action) {
	switch (action.type) {
		case 'POST_LOGIN_ADMIN_REQUEST': {
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: true
				}
			}
		}

		case 'POST_LOGIN_ADMIN_SUCCESS': {
			const { data } = action.payload;
			localStorage.setItem('infoAdmin', JSON.stringify(data));
			openNotificationWithIcon('success', data.message)
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'POST_LOGIN_ADMIN_FAIL': {
			const { data, error } = action.payload
			openNotificationWithIcon('error', error)
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data === undefined ? {} : data,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------

		case 'POST_OPT_ADMIN_REQUEST': {
			return {
				...state,
				optAdmin: {
					...state.optAdmin,
					load: true
				}
			};
		}

		case 'POST_OPT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			localStorage.setItem('infoAdmin', JSON.stringify(data));
			openNotificationWithIcon('success', data.message)
			window.location.href = "/manage-bashboard";
			return {
				...state,
				optAdmin: {
					...state.optAdmin,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_OPT_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error)
			return {
				...state,
				optAdmin: {
					...state.optAdmin,
					load: false,
					error: error,
				},
			};
		}

		// ------------------------------

		case 'POST_CHANGE_IMAGE_ADMIN_REQUEST': {
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: true
				}
			}
		}

		case 'POST_CHANGE_IMAGE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			localStorage.setItem('infoAdmin', JSON.stringify(data));
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_CHANGE_IMAGE_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon("error", error)
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------

		case 'POST_CHANGE_INFO_ADMIN_REQUEST': {
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: true
				}
			}
		}

		case 'POST_CHANGE_INFO_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Cập nhật thành công")
			localStorage.setItem('infoAdmin', JSON.stringify(data));
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_CHANGE_INFO_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon("error", "Cập nhật thất bại")
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------

		case 'GET_LIST_HISTORY_LOGIN_ADMIN_REQUEST': {
			return {
				...state,
				listHistoryLogin: {
					...state.listHistoryLogin,
					load: true
				}
			}
		}

		case 'GET_LIST_HISTORY_LOGIN_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listHistoryLogin: {
					...state.listHistoryLogin,
					data: data.reverse(),
					load: false,
				},
			}
		}

		case 'GET_LIST_HISTORY_LOGIN_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listHistoryLogin: {
					...state.listHistoryLogin,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------------

		case 'POST_LOGOUT_ADMIN_REQUEST': {
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: true
				}
			}
		}

		case 'POST_LOGOUT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			localStorage.removeItem('infoAdmin', JSON.stringify(data));
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'POST_LOGOUT_ADMIN_FAIL': {
			const { data, error } = action.payload
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
					error: error,
				},
			};
		}

		// -----------------------------------

		case 'POST_CHANGE_PASSWORD_ADMIN_REQUEST': {
			return {
				...state,
				changePassword: {
					...state.changePassword,
					load: true
				}
			}
		}

		case 'POST_CHANGE_PASSWORD_ADMIN_SUCCESS': {
			const { data } = action.payload;

			openNotificationWithIcon('success', data)
			return {
				...state,
				changePassword: {
					...state.changePassword,
					data: data,
					load: false,
				},
			};
		}

		case 'POST_CHANGE_PASSWORD_ADMIN_FAIL': {
			const { error } = action.payload
			// openNotificationWithIcon('error', "Cập nhật thất bại")
			openNotificationWithIcon('error', error)
			return {
				...state,
				changePassword: {
					...state.changePassword,
					load: false,
					error: action.payload,
				},
			};
		}

		// -----------------------------------

		case 'POST_EMAIL_FORGOT_PASSWORD_ADMIN_REQUEST': {
			return {
				...state,
				emailForgotPassword: {
					...state.emailForgotPassword,
					load: true
				}
			};
		}

		case 'POST_EMAIL_FORGOT_PASSWORD_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				emailForgotPassword: {
					...state.emailForgotPassword,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_EMAIL_FORGOT_PASSWORD_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				emailForgotPassword: {
					...state.emailForgotPassword,
					load: false,
					error: error,
				},
			};
		}


		// -----------------------------------------

		case 'POST_OTP_FORGOT_PASSWORD_ADMIN_REQUEST': {
			return {
				...state,
				otpForgotPassword: {
					...state.otpForgotPassword,
					load: true
				}
			};
		}

		case 'POST_OTP_FORGOT_PASSWORD_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				otpForgotPassword: {
					...state.otpForgotPassword,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_OTP_FORGOT_PASSWORD_ADMIN_FAIL': {
			// const { error } = action.payload
			return {
				...state,
				otpForgotPassword: {
					...state.otpForgotPassword,
					load: false,
					error: "lỗi",
				},
			};
		}

		// -----------------------------------

		case 'POST_RESET_PASSWORD_FORGOT_ADMIN_REQUEST': {
			return {
				...state,
				resetPassword: {
					...state.resetPassword,
					load: true
				}
			};
		}

		case 'POST_RESET_PASSWORD_FORGOT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Thay đổi mật khẩu thành công")
			return {
				...state,
				resetPassword: {
					...state.resetPassword,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_RESET_PASSWORD_FORGOT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				resetPassword: {
					...state.resetPassword,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------

		case 'POST_REGISTER_ADMIN_REQUEST': {
			return {
				...state,
				registerAdmin: {
					...state.registerAdmin,
					load: true
				}
			}
		}

		case 'POST_REGISTER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', data.message)
			return {
				...state,
				registerAdmin: {
					...state.registerAdmin,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_REGISTER_ADMIN_REQUEST_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error)
			return {
				...state,
				registerAdmin: {
					...state.registerAdmin,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}

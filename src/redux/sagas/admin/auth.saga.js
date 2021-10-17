import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";
import history from "../../../utils/history.js";
function* postLoginAdminSaga(action) {
	const { emailLogin, passwordLogin } = action.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'admin-login',
			data: {
				email: emailLogin,
				password: passwordLogin
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		if (result.status === 200) {
			yield put({
				type: "POST_LOGIN_ADMIN_SUCCESS",
				payload: {
					data: {
						...result.data,
					}
				},
			});
			history.push("/manage-bashboard")
		} else {
			yield put({
				type: "POST_LOGIN_ADMIN_FAIL",
				payload: {
					data: {
						...result.data,
					},
					error: result.data.message
				},
			});
		}

	} catch (error) {
		const { data } = error?.response;
		yield put({
			type: "POST_LOGIN_ADMIN_FAIL",
			payload: {
				error: data.message
			},
		});

	}
}

function* postOtpAdminSaga(actions) {
	const { optInput } = actions.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'admin-verify-device',
			data: {
				otp: optInput,
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		if (result.status === 200) {
			yield put({
				type: "POST_OPT_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			// history.push("/manage-bashboard")
		} else {
			yield put({
				type: "POST_OPT_ADMIN_FAIL",
				payload: {
					data: {
						optInput: optInput,
						check: false,
					}
				},
			});
		}
	} catch (error) {
		const { data } = error.response;
		if (error.response.status !== 200) {
			yield put({
				type: "POST_OPT_ADMIN_FAIL",
				payload: {
					error: data.message
				}
			});
		}
	}
}

function* postChangeImageAdminSaga(actions) {
	const user = JSON.parse(localStorage.getItem("infoAdmin"));
	const { type } = actions.payload;

	let formData = new FormData();
	formData.append('file', type);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'admin/upload-image',
			data: formData,
			headers: authHeaderAdmin()
		});
		const { data } = result.data
		if (result.status === 200) {
			yield put({
				type: "POST_CHANGE_IMAGE_ADMIN_SUCCESS",
				payload: {
					data: {
						account: {
							...user.account,
							image: result.data.url_image,
						},
						token: user.token
					}
				},
			});
		} else {
			yield put({
				type: "POST_CHANGE_IMAGE_ADMIN_FAIL",
				payload: {
					error: data.message
				},
			});
		}
	} catch (error) {
		if (error) {
			const { data } = error?.response;
			if (error?.response?.status !== 200) {
				yield put({
					type: "POST_CHANGE_IMAGE_ADMIN_FAIL",
					payload: {
						error: data.msg
					},
				});
			}
		}
	}
}

function* postChangeInfoAdminSaga(actions) {
	const user = JSON.parse(localStorage.getItem("infoAdmin"));

	const { fullName, gender, birthday, phone, city, district, street, address } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'update-profile',
			data: {
				fullName: fullName,
				gender: gender,
				birthday: birthday,
				phone: phone,
				idCity: city,
				idDistrict: district,
				idStreet: street,
				address: address
			},
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			// yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield put({
				type: "POST_CHANGE_INFO_ADMIN_SUCCESS",
				payload: {
					data: {
						account: {
							...user.account,
							fullName: fullName,
							gender: gender,
							birthday: birthday,
							phone: phone,
							city: city,
							district: district,
							street: street,
							address: address
						},
						token: user.token
					}
				},
			});
		} else {
			yield put({
				type: "POST_CHANGE_INFO_ADMIN_FAIL",
				payload: {
					error: "Cập nhật thất bại"
				},
			});
		}
	} catch (error) {
		if (error.response.status !== 200) {
		}
	}
}

function* getListHistoryLoginAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'history-login',

			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_HISTORY_LOGIN_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_HISTORY_LOGIN_ADMIN_FAIL",
				payload: {
					error: "lỗi"
				},
			});
		}
	} catch (error) {

	}
}

function* postLogoutAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'admin-logout',
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			yield put({
				type: "POST_LOGOUT_ADMIN_SUCCESS",
				payload: {
					data: {}
				},
			});
			history.push("/")
		} else {
			yield put({
				type: "POST_LOGOUT_ADMIN_FAIL",
				payload: {
					error: "lỗi"
				},
			});
		}
	} catch (error) {

	}
}

function* postChangePasswordAdminSaga(actions) {
	const { passwordOld, passwordNew } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'update-profile',
			headers: authHeaderAdmin(),
			data: {
				oldPassword: passwordOld,
				newPassword: passwordNew
			}
		});
		if (result.status === 200) {
			yield put({
				type: "POST_CHANGE_PASSWORD_ADMIN_SUCCESS",
				payload: {
					data: "Thay đổi mật khẩu thành công"
				},
			});
		} else {
			yield put({
				type: "POST_CHANGE_PASSWORD_ADMIN_FAIL",
				payload: {
					error: "Thay đổi mật khẩu thất bại"
				},
			});
		}
	} catch (error) {
		const { data } = error?.response
		yield put({
			type: "POST_CHANGE_PASSWORD_ADMIN_FAIL",
			payload: {
				error: data.message
			},
		});
	}
}

function* postEmailForgotPasswordAdminAction(actions) {
	const { emailForgotPassword } = actions.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'forgot-password',
			data: {
				email: emailForgotPassword,
			}
		});
		const { data } = result.data
		if (result.status === 200) {
			yield put({
				type: "POST_EMAIL_FORGOT_PASSWORD_ADMIN_SUCCESS",
				payload: {
					data: {
						email: emailForgotPassword,
						check: true,
					}
				},
			});
		} else {
			yield put({
				type: "POST_EMAIL_FORGOT_PASSWORD_ADMIN_FAIL",
				payload: {
					error: data.message,
					check: false,
				},
			});
		}
	} catch (error) {
		const { data } = error.response;
		yield put({
			type: "POST_EMAIL_FORGOT_PASSWORD_ADMIN_FAIL",
			payload: {
				error: data.message,
				check: false,
			},
		});
	}
}

function* postOtpForgotPasswordAdminAction(actions) {
	const { optInputForgot } = actions.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'check-otp-forgot-password',
			data: {
				otp: optInputForgot,
			}
		});
		// const { data } = result.data
		if (result.status === 200) {
			yield put({
				type: "POST_OTP_FORGOT_PASSWORD_ADMIN_SUCCESS",
				payload: {
					data: {
						optInput: optInputForgot,
						check: true,
					}
				},
			});
		} else {
			yield put({
				type: "POST_OTP_FORGOT_PASSWORD_ADMIN_FAIL",
				payload: {
					data: {
						optInput: optInputForgot,
						check: false,
					}
				},
			});
		}
	} catch (error) {
		// const { data } = error.response;
		yield put({
			type: "POST_OTP_FORGOT_PASSWORD_ADMIN_FAIL",
			payload: {
				data: {
					optInput: optInputForgot,
					check: false,
				}
			},
		});
	}
}


function* postResetPasswordForgotAdminSaga(actions) {

	const { passwordForgot, code } = actions.payload

	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'reset-password',
			data: {
				newPassword: passwordForgot,
				otp: code
			}
		});
		if (result.status === 200) {
			history.push("/manage-bashboard")
			yield put({
				type: "POST_RESET_PASSWORD_FORGOT_ADMIN_SUCCESS",
				payload: {
					data: {
						check: true,
					}
				},
			});
		} else {
			yield put({
				type: "POST_RESET_PASSWORD_FORGOT_ADMIN_SUCCESS",
				payload: {
					error: "lỗi"
				},
			});
		}
	} catch (error) {
		yield put({
			type: "POST_RESET_PASSWORD_FORGOT_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* postRegisterAdminSaga(actions) {

	const { addressRegister, cityRegister, districtRegister, emailRegister, fullNameRegister, genderRegister, passwordRegister, phoneRegister,
		villageRegister } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'admin-register',
			data: {
				fullName: fullNameRegister,
				email: emailRegister,
				password: passwordRegister,
				birthday: "17-07-2021",
				gender: genderRegister,
				phone: phoneRegister,
				idCity: cityRegister,
				idDistrict: districtRegister,
				idStreet: villageRegister,
				address: addressRegister
			},
		});
		const { data } = result.data
		if (result.status === 200) {
			yield put({
				type: "POST_REGISTER_ADMIN_SUCCESS",
				payload: {
					data: {
						message: "Đăng ký thành công",
						check: true
					}
				},
			});
		} else {
			yield put({
				type: "POST_REGISTER_ADMIN_REQUEST_FAIL",
				payload: {
					error: data.message,
					check: false,
				},
			});
		}
	} catch (error) {
		const { data } = error?.response
		yield put({
			type: "POST_REGISTER_ADMIN_REQUEST_FAIL",
			payload: {
				error: data?.message,
				check: false,
			},
		});


	}

}

export default function* authAdminSaga() {
	yield takeEvery('POST_LOGIN_ADMIN_REQUEST', postLoginAdminSaga);
	yield takeEvery('POST_OPT_ADMIN_REQUEST', postOtpAdminSaga);
	yield takeEvery('POST_CHANGE_IMAGE_ADMIN_REQUEST', postChangeImageAdminSaga);
	yield takeEvery('POST_CHANGE_INFO_ADMIN_REQUEST', postChangeInfoAdminSaga);
	yield takeEvery('GET_LIST_HISTORY_LOGIN_ADMIN_REQUEST', getListHistoryLoginAdminSaga);
	yield takeEvery('POST_LOGOUT_ADMIN_REQUEST', postLogoutAdminSaga);
	yield takeEvery('POST_CHANGE_PASSWORD_ADMIN_REQUEST', postChangePasswordAdminSaga);

	yield takeEvery('POST_EMAIL_FORGOT_PASSWORD_ADMIN_REQUEST', postEmailForgotPasswordAdminAction);
	yield takeEvery('POST_OTP_FORGOT_PASSWORD_ADMIN_REQUEST', postOtpForgotPasswordAdminAction);
	yield takeEvery('POST_RESET_PASSWORD_FORGOT_ADMIN_REQUEST', postResetPasswordForgotAdminSaga);
	yield takeEvery('POST_REGISTER_ADMIN_REQUEST', postRegisterAdminSaga)
}

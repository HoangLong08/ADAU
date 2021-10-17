import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* postSendMessageAdminSaga(actions) {
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'send-message',
			headers: authHeaderAdmin(),
			data: {
				content: actions.payload
			}
		});
		if (result.status === 200) {
			yield put({
				type: "POST_SEND_MESSAGE_ADMIN_SUCCESS",
				payload: {
					data: {
						message: true
					}
				},
			});
		} else {
			yield put({
				type: "POST_SEND_MESSAGE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "POST_SEND_MESSAGE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getListNotifyAdminSaga(actions) {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'get-notify',
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_NOTIFY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_NOTIFY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_NOTIFY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* socketIoSaga() {
	yield takeEvery('POST_SEND_MESSAGE_ADMIN_REQUEST', postSendMessageAdminSaga);
	yield takeEvery('GET_LIST_NOTIFY_ADMIN_REQUEST', getListNotifyAdminSaga);
}

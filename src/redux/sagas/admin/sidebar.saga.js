import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* getContentSidebarAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'get-sidebar',
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			yield put({
				type: "GET_CONTENT_SIDEBAR_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_CONTENT_SIDEBAR_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_CONTENT_SIDEBAR_ADMIN_FAIL",
			payload: {
				error: "401"
			},
		});
	}
}

export default function* sidebarAdminSaga() {
	yield takeEvery('GET_CONTENT_SIDEBAR_ADMIN_REQUEST', getContentSidebarAdminSaga);
}

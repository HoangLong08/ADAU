import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";
function* getContentSidebarAdminSaga() {
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'dashboard',
			headers: authHeaderAdmin(),
			data: {}
		});
		if (result.status === 200) {
			yield put({
				type: "GET_CONTENT_DASHBOARD_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_CONTENT_DASHBOARD_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {

	}
}

function* getContentSidebarByDateAdminSaga(actions) {
	const { dateFrom, dateTo } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'dashboard',
			data: {
				date1: dateFrom,
				date2: dateTo
			},
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			yield put({
				type: "GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {

	}
}

export default function* dashboardAdminSaga() {
	yield takeEvery('GET_CONTENT_DASHBOARD_ADMIN_REQUEST', getContentSidebarAdminSaga);
	yield takeEvery('GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_REQUEST', getContentSidebarByDateAdminSaga);
}

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* getInfoCelcAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'get-information-celc',
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_INFO_CELC_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_INFO_CELC_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_INFO_CELC_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateInfoCelcAdminSaga(actions) {
	const { valueImage, name } = actions.payload;
	let formData = new FormData();
	formData.append('file', valueImage);
	formData.append('nameCELC', name);
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-CELC',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_INFO_CELC_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_INFO_CELC_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_INFO_CELC_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* managerCelcSaga() {
	yield takeEvery('GET_INFO_CELC_ADMIN_REQUEST', getInfoCelcAdminSaga);
	yield takeEvery('UPDATE_INFO_CELC_ADMIN_REQUEST', updateInfoCelcAdminSaga);
}

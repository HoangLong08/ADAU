import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* getListManagerFooterAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-footer',
			headers: authHeaderAdmin(),
		});

		if (result.status === 200) {
			yield put({
				type: "GET_LIST_MANAGER_FOOTER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_MANAGER_FOOTER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_MANAGER_FOOTER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateListManagerFooterAdminSaga(actions) {
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-footer',
			headers: authHeaderAdmin(),
			data: {
				footer: actions.payload
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_LIST_MANAGER_FOOTER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_LIST_MANAGER_FOOTER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_LIST_MANAGER_FOOTER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateLogoFooterManagerAdminSaga(actions) {
	const { value, image } = actions.payload
	let formData = new FormData();
	formData.append('file', image);
	formData.append('title1', value[0].detail[1].title);
	formData.append('title2', value[0].detail[2].title);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'footer-update',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_LOGO_FOOTER_MANAGER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_LOGO_FOOTER_MANAGER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_LOGO_FOOTER_MANAGER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* managerFooterSaga() {
	yield takeEvery('GET_LIST_MANAGER_FOOTER_ADMIN_REQUEST', getListManagerFooterAdminSaga);
	yield takeEvery('UPDATE_LIST_MANAGER_FOOTER_ADMIN_REQUEST', updateListManagerFooterAdminSaga);
	yield takeEvery('UPDATE_LOGO_FOOTER_MANAGER_ADMIN_REQUEST', updateLogoFooterManagerAdminSaga);
}

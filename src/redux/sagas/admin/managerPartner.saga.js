import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* getListPartnerAdminSaga(actions) {
	const { idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-partnar/' + idFaculty,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_PARTNER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_PARTNER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_PARTNER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updatePartnerAdminSaga(actions) {
	const { idFaculty, valuePartner } = actions.payload;
	let formData = new FormData();
	formData.append('idFaculty', idFaculty);
	formData.append('name', valuePartner.name);
	formData.append('link', valuePartner.link);
	formData.append('file', valuePartner.image);
	formData.append('id', valuePartner.id);
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-partner',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_PARTNER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_PARTNER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_PARTNER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deletePartnerAdminSaga(actions) {
	const { idFaculty, delPartnerFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-partner',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				id: delPartnerFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_PARTNER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_PARTNER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_PARTNER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* addPartnerAdminSaga(actions) {
	const { idFaculty, valuePartnerFaculty } = actions.payload;
	let formData = new FormData();
	formData.append('idFaculty', idFaculty);
	formData.append('name', valuePartnerFaculty.name);
	formData.append('link', valuePartnerFaculty.link);
	formData.append('file', valuePartnerFaculty.image);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-partner',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_PARTNER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_PARTNER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_PARTNER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* managerPartnerSaga() {
	yield takeEvery('GET_LIST_PARTNER_ADMIN_REQUEST', getListPartnerAdminSaga);
	yield takeEvery('UPDATE_PARTNER_ADMIN_REQUEST', updatePartnerAdminSaga);
	yield takeEvery('DELETE_PARTNER_ADMIN_REQUEST', deletePartnerAdminSaga);
	yield takeEvery('ADD_PARTNER_ADMIN_REQUEST', addPartnerAdminSaga);
}

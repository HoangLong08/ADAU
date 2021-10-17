import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* getListAccountAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-user',
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_ACCOUNT_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_ACCOUNT_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_ACCOUNT_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getListRoleAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-role',
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_ROLE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_ROLE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_ROLE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getListManagerAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-list-manage',
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_MANAGER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_MANAGER_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_MANAGER_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}


function* updateRoleAccountAdminSaga(actions) {
	const { idRole, id, faculties } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-role',
			headers: authHeaderAdmin(),
			data: {
				idRole: idRole,
				id: id,
				faculties: faculties,
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_ROLE_ACCOUNT_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_ROLE_ACCOUNT_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_ROLE_ACCOUNT_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteAccountAdminSaga(actions) {
	const { id } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-user/' + id,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_ACCOUNT_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_ACCOUNT_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_ACCOUNT_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateBlockAndUnBlockAccountSaga(actions) {
	const { id } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-block-unblock-user',
			headers: authHeaderAdmin(),
			data: {
				id: id
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* managerAccountSaga() {
	yield takeEvery('GET_LIST_ACCOUNT_ADMIN_REQUEST', getListAccountAdminSaga);
	yield takeEvery('GET_LIST_ROLE_ADMIN_REQUEST', getListRoleAdminSaga);
	yield takeEvery('GET_LIST_MANAGER_ADMIN_REQUEST', getListManagerAdminSaga);
	yield takeEvery('UPDATE_ROLE_ACCOUNT_ADMIN_REQUEST', updateRoleAccountAdminSaga);
	yield takeEvery('DELETE_ACCOUNT_ADMIN_REQUEST', deleteAccountAdminSaga);
	yield takeEvery('UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_REQUEST', updateBlockAndUnBlockAccountSaga);
}

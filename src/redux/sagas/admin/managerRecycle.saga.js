import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";

function* getListManagerRecycleAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'get-recycle-bin',
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteListManagerRecycleAdminSaga(actions) {
	const { id, table } = actions.payload;
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'delete-data',
			headers: authHeaderAdmin(),
			data: {
				id: id,
				table: table
			}
		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* restoreListManagerRecycleAdminSaga(actions) {
	const { id, table } = actions.payload;
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'restore-data',
			headers: authHeaderAdmin(),
			data: {
				id: id,
				table: table
			}
		});
		if (result.status === 200) {
			yield put({
				type: "RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getSizeDatabaseManagerRecycleAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'get-size-database',
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteAllManagerRecycleAdminSaga() {
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'clear-all-data',
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_ALL_MANAGER_RECYCLE_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_ALL_MANAGER_RECYCLE_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_ALL_MANAGER_RECYCLE_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* managerRecycleSaga() {
	yield takeEvery('GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST', getListManagerRecycleAdminSaga);
	yield takeEvery('DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST', deleteListManagerRecycleAdminSaga);
	yield takeEvery('RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST', restoreListManagerRecycleAdminSaga);
	yield takeEvery('GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_REQUEST', getSizeDatabaseManagerRecycleAdminSaga);
	yield takeEvery('DELETE_ALL_MANAGER_RECYCLE_ADMIN_REQUEST', deleteAllManagerRecycleAdminSaga);
}

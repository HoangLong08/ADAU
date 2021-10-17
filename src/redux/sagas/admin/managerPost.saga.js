import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";
import history from '../../../utils/history';
function* getListManagerPostAdminSaga(actions) {
	const { idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-newfeed-event/' + idFaculty,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteManagerPostAdminSaga(actions) {
	const { idFaculty, delManagerPost } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-newfeed-event',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				id: delManagerPost
			}
		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getDetailManagerPostAdminSaga(actions) {
	const { idPostManager } = actions.payload;
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-detail-newfeed-event/' + idPostManager,
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			yield put({
				type: "GET_DETAIL_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_DETAIL_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_DETAIL_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateDetailManagerPostAdminSaga(actions) {
	/**
	 * numberTypeOld: numberTypeState, // old
				numberTypeNew: numberType,
				numberActive: numberActive,
				idFaculty: idFaculty
	 */
	const { editorState, valueManagerPost, idPostManager, numberTypeOld, numberTypeNew, numberActive, idFaculty } = actions.payload;
	console.log("editorState: ", editorState)
	console.log("numberTypeOld: ", numberTypeOld)
	console.log("numberTypeNew: ", numberTypeNew)
	console.log("numberActive: ", numberActive)
	console.log("idFaculty: ", idFaculty)
	console.log('id', idPostManager);
	console.log('title', valueManagerPost.title);
	console.log('des', valueManagerPost.des);
	console.log('file', valueManagerPost.image);
	console.log('detail', editorState);
	let formData = new FormData();
	formData.append('id', idPostManager);
	formData.append('title', valueManagerPost.title);
	formData.append('des', valueManagerPost.des);
	formData.append('file', valueManagerPost.image);
	formData.append('detail', editorState);
	formData.append('numberTypeOld', numberTypeOld);
	formData.append('numberTypeNew', numberTypeNew);
	formData.append('numberActive', numberActive);
	formData.append('idFaculty', idFaculty);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-update-newfeed-event',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_DETAIL_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			history.goBack()
		} else {
			yield put({
				type: "UPDATE_DETAIL_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_DETAIL_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateTypeManagerPostAdminSaga(actions) {
	const { numberTypeNew, id, numberActive, idFaculty } = actions.payload;

	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-update-type',
			headers: authHeaderAdmin(),
			data: {
				id: id,
				numberTypeNew: numberTypeNew,
				// numberActive: numberActive,
				idFaculty: idFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_TYPE_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			// history.goBack()
		} else {
			yield put({
				type: "UPDATE_TYPE_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_TYPE_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* addDetailManagerPostAdminSaga(actions) {
	const { editorState, valueManagerPost, idFaculty } = actions.payload;
	let formData = new FormData();
	formData.append('idFaculty', idFaculty);
	formData.append('title', valueManagerPost.title);
	formData.append('des', valueManagerPost.des);
	formData.append('type', valueManagerPost.type);
	formData.append('file', valueManagerPost.image);
	formData.append('detail', editorState);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-newfeed-event',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "ADD_DETAIL_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: {
						check: true
					}
				},
			});
			history.goBack()
		} else {
			yield put({
				type: "ADD_DETAIL_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "ADD_DETAIL_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: error.response?.data
			},
		});
	}
}


function* updateBrowseManagerPostAdminSaga(actions) {
	const { id, idFaculty } = actions.payload;

	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-verification-newfeed',
			headers: authHeaderAdmin(),
			data: {
				id: id,
				idFaculty: idFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_BROWSE_MANAGER_POST_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_BROWSE_MANAGER_POST_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_BROWSE_MANAGER_POST_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}


export default function* managerPostSaga() {
	yield takeEvery('GET_LIST_MANAGER_POST_ADMIN_REQUEST', getListManagerPostAdminSaga);
	yield takeEvery('DELETE_MANAGER_POST_ADMIN_REQUEST', deleteManagerPostAdminSaga);
	yield takeEvery('GET_DETAIL_MANAGER_POST_ADMIN_REQUEST', getDetailManagerPostAdminSaga);
	yield takeEvery('UPDATE_DETAIL_MANAGER_POST_ADMIN_REQUEST', updateDetailManagerPostAdminSaga);
	yield takeEvery('UPDATE_TYPE_MANAGER_POST_ADMIN_REQUEST', updateTypeManagerPostAdminSaga);
	yield takeEvery('ADD_DETAIL_MANAGER_POST_ADMIN_REQUEST', addDetailManagerPostAdminSaga);
	yield takeEvery('UPDATE_BROWSE_MANAGER_POST_ADMIN_REQUEST', updateBrowseManagerPostAdminSaga);
}

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";
import history from "../../../utils/history.js"
function* getListManagerVideoAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-video',
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_MANAGER_VIDEO_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_MANAGER_VIDEO_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_MANAGER_VIDEO_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteManagerVideoAdminSaga(actions) {
	const { delManagerVideo } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-video/' + delManagerVideo,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_MANAGER_VIDEO_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_MANAGER_VIDEO_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_MANAGER_VIDEO_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getDetailManagerVideoAdminSaga(actions) {
	const { idVideoManager } = actions.payload;
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-detail-video/' + idVideoManager,
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			yield put({
				type: "GET_DETAIL_MANAGER_VIDEO_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_DETAIL_MANAGER_VIDEO_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_DETAIL_MANAGER_VIDEO_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateDetailManagerVideoAdminSaga(actions) {
	const { editorState, valueManagerVideo, idVideoManager } = actions.payload;
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-video',
			headers: authHeaderAdmin(),
			data: {
				id: idVideoManager,
				iframe: valueManagerVideo.iframe,
				des: valueManagerVideo.des,
				detail: editorState,
				title: valueManagerVideo.title
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			history.goBack()
		} else {
			yield put({
				type: "UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* addDetailManagerVideoAdminSaga(actions) {
	const { editorState, valueManagerVideo } = actions.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-video',
			headers: authHeaderAdmin(),
			data: {
				iframe: valueManagerVideo.iframe,
				title: valueManagerVideo.title,
				des: valueManagerVideo.des,
				detail: editorState
			}
		});
		if (result.status === 200) {
			yield put({
				type: "ADD_DETAIL_MANAGER_VIDEO_ADMIN_SUCCESS",
				payload: {
					data: {
						check: true
					}
				},
			});
			history.goBack()
		} else {
			yield put({
				type: "ADD_DETAIL_MANAGER_VIDEO_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "ADD_DETAIL_MANAGER_VIDEO_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateBrowseManagerVideoAdminSaga(actions) {
	const { id } = actions.payload;

	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-verification-video/' + id,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});

		} else {
			yield put({
				type: "UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

export default function* managerVideoSaga() {
	yield takeEvery('GET_LIST_MANAGER_VIDEO_ADMIN_REQUEST', getListManagerVideoAdminSaga);
	yield takeEvery('DELETE_MANAGER_VIDEO_ADMIN_REQUEST', deleteManagerVideoAdminSaga);
	yield takeEvery('GET_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST', getDetailManagerVideoAdminSaga);
	yield takeEvery('UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST', updateDetailManagerVideoAdminSaga);
	yield takeEvery('ADD_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST', addDetailManagerVideoAdminSaga);
	yield takeEvery('UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_REQUEST', updateBrowseManagerVideoAdminSaga);
}

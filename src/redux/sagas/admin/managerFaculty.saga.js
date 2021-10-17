import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app';
import authHeaderAdmin from "../../../services/auth-headers-admin.js";
import history from '../../../utils/history';
function* getListSlideFacultyAdminSaga(actions) {
	const { id } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-slide/' + id,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_SLIDE_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_SLIDE_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_SLIDE_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* postImageSlideFacultyAdminSaga(actions) {
	const { type, idFaculty } = actions.payload;

	let formData = new FormData();
	formData.append('file', type);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'upload-image-slide',
			headers: authHeaderAdmin(),
			data: formData

		});
		if (result.status === 200) {
			yield put({
				type: "POST_IMAGE_SLIDE_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: {
						...result.data,
						idFaculty: idFaculty
					}
				},
			});
		} else {
			yield put({
				type: "POST_IMAGE_SLIDE_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "POST_IMAGE_SLIDE_FACULTY_ADMIN_FAIL",
			payload: {
				error: error.response?.data
			},
		});
	}
}

function* updateListSlideFacultyAdminSaga(actions) {
	const { listImgSlide, idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-slide',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				slides: listImgSlide
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_LIST_SLIDE_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: listImgSlide
				},
			});
		} else {
			yield put({
				type: "UPDATE_LIST_SLIDE_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_LIST_SLIDE_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}


function* getIntroFacultyAdminSaga(actions) {
	const { idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-introduce-faculty/' + idFaculty,
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			yield put({
				type: "GET_INTRO_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_INTRO_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_INTRO_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateIntroFacultyAdminSaga(actions) {
	const { id, des, editorEdit, iframe, title } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-introduce-faculty',
			headers: authHeaderAdmin(),
			data: {
				id: id,
				title: title,
				iframe: iframe,
				des: des,
				detail: editorEdit
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_INTRO_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: {
						id: id,
						title: title,
						iframe: iframe,
						des: des,
						detail: editorEdit
					}
				},
			});

		} else {
			yield put({
				type: "UPDATE_INTRO_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_INTRO_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}


function* getMenuFacultyAdminSaga(actions) {
	const { id } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-menu/' + id,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_MENU_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_MENU_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_MENU_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateMenuFacultyAdminSaga(actions) {
	const { idFaculty, inputFieldsMain } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-menu',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				menu: inputFieldsMain
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_MENU_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_MENU_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_MENU_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteMenuFacultyAdminSaga(actions) {
	const { id, table } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-menu',
			headers: authHeaderAdmin(),
			data: {
				id: id, table: table
			}
		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_MENU_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: {
						check: true
					}
				},
			});
		} else {
			yield put({
				type: "DELETE_MENU_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_MENU_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getListPostMenuFacultyAdminSaga(actions) {
	const { id, idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-get-data-menu',
			headers: authHeaderAdmin(),
			data: {
				id: id,
				idFaculty: idFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_POST_MENU_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_POST_MENU_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_POST_MENU_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getListInfoFacultyAdminSaga(actions) {
	const { id } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-information-faculty/' + id,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_INFO_FACULTY_ADMIN_REQUEST_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_INFO_FACULTY_ADMIN_REQUEST_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_INFO_FACULTY_ADMIN_REQUEST_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateInfoFacultyAdminAction(actions) {
	const { idFaculty, valueInfoFaculty, indexNumber } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-detail-information',
			headers: authHeaderAdmin(),
			data: {
				id: valueInfoFaculty.id,
				title: valueInfoFaculty.title,
				des: valueInfoFaculty.des,
				idFaculty: idFaculty,
				indexNumber: indexNumber
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_INFO_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_INFO_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_INFO_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteInfoFacultyAdminSaga(actions) {
	const { idFaculty, delInfoFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-detail-information',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				id: delInfoFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_INFO_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_INFO_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_INFO_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* postInfoFacultyAdminSaga(actions) {

	const { idFaculty, title, des, indexNumber } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-detail-information',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				title: title,
				des: des,
				indexNumber: indexNumber
			}
		});
		if (result.status === 200) {
			yield put({
				type: "POST_INFO_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "POST_INFO_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "POST_INFO_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getListSpecialFacultyAdminSaga(actions) {
	const { idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-specialized/' + idFaculty,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_SPECIAL_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_SPECIAL_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_SPECIAL_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateAcceptPostMenuFacultyAdminSaga(actions) {
	const { idMenu, id, idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-data-menu',
			headers: authHeaderAdmin(),
			data: {
				idMenu: idMenu, id: id, idFaculty: idFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* updateNoAcceptPostMenuFacultyAdminSaga(actions) {
	const { idMenu, id, idFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-remove-data-menu',
			headers: authHeaderAdmin(),
			data: {
				idMenu: idMenu, id: id, idFaculty: idFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* addSpecialFacultyAdminSaga(actions) {
	const { idFaculty, valuePostFaculty, editorState } = actions.payload
	let formData = new FormData();
	formData.append('file', valuePostFaculty.image);
	formData.append('idFaculty', idFaculty);
	formData.append('name', valuePostFaculty.title);
	formData.append('des', valuePostFaculty.des);
	formData.append('detail', editorState);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'manage-insert-specialized',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "ADD_SPECIAL_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			history.goBack()
		} else {
			yield put({
				type: "ADD_SPECIAL_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "ADD_SPECIAL_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* deleteSpecialFacultyAdminSaga(actions) {
	const { idFaculty, idDelPostFaculty } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'manage-delete-specialized',
			headers: authHeaderAdmin(),
			data: {
				idFaculty: idFaculty,
				idSpecialized: idDelPostFaculty
			}
		});
		if (result.status === 200) {
			yield put({
				type: "DELETE_SPECIAL_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "DELETE_SPECIAL_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "DELETE_SPECIAL_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* getSpecialByIdFacultyAdminSaga(actions) {
	const { id } = actions.payload

	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'manage-get-detail-specialized/' + id,
			headers: authHeaderAdmin(),

		});
		if (result.status === 200) {
			yield put({
				type: "GET_SPECIAL_BY_ID_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_SPECIAL_BY_ID_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_SPECIAL_BY_ID_FACULTY_ADMIN_FAIL",
			payload: {
				error: "lỗi"
			},
		});
	}
}

function* uploadImageSpecialFacultySaga(actions) {
	const { type } = actions.payload;
	let formData = new FormData();
	formData.append('file', type);

	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'upload-image',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_FAIL",
			payload: {
				error: error.response?.data
			},
		});
	}
}

function* updateSpecialFacultyAction(actions) {
	const { editorState, valueSpecialFaculty, idSpecial } = actions.payload;
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-specialized',
			headers: authHeaderAdmin(),
			data: {
				idSpec: idSpecial,
				detail: editorState,
				des: valueSpecialFaculty.des,
				name: valueSpecialFaculty.title,
				image: valueSpecialFaculty.image
			}
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_SPECIAL_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			history.goBack()
		} else {
			yield put({
				type: "UPDATE_SPECIAL_FACULTY_ADMIN_FAIL",
				payload: {
					error: "Lỗi"
				},
			});
		}

	} catch (error) {
		yield put({
			type: "UPDATE_SPECIAL_FACULTY_ADMIN_FAIL",
			payload: {
				error: error.response.data
			},
		});
	}
}

function* updateNameFacultyAdminSaga(actions) {
	const { idFaculty, valueNameFaculty } = actions.payload
	let formData = new FormData();
	formData.append('idFaculty', idFaculty);
	formData.append('nameFaculty', valueNameFaculty);
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'manage-update-information',
			headers: authHeaderAdmin(),
			data: formData
		});
		if (result.status === 200) {
			yield put({
				type: "UPDATE_NAME_FACULTY_ADMIN_SUCCESS",
				payload: {
					data: {
						id: idFaculty,
						nameFaculty: valueNameFaculty
					}
				},
			});
		}

	} catch (error) {

	}
}

export default function* managerFacultySaga() {
	yield takeEvery('GET_LIST_SLIDE_FACULTY_ADMIN_REQUEST', getListSlideFacultyAdminSaga);
	yield takeEvery('POST_IMAGE_SLIDE_FACULTY_ADMIN_REQUEST', postImageSlideFacultyAdminSaga);
	yield takeEvery('UPDATE_LIST_SLIDE_FACULTY_ADMIN_REQUEST', updateListSlideFacultyAdminSaga);

	yield takeEvery('GET_INTRO_FACULTY_ADMIN_REQUEST', getIntroFacultyAdminSaga);
	yield takeEvery('UPDATE_INTRO_FACULTY_ADMIN_REQUEST', updateIntroFacultyAdminSaga);
	yield takeEvery('GET_MENU_FACULTY_ADMIN_REQUEST', getMenuFacultyAdminSaga);
	yield takeEvery('UPDATE_MENU_FACULTY_ADMIN_REQUEST', updateMenuFacultyAdminSaga);
	yield takeEvery('DELETE_MENU_FACULTY_ADMIN_REQUEST', deleteMenuFacultyAdminSaga);

	yield takeEvery('GET_LIST_POST_MENU_FACULTY_ADMIN_REQUEST', getListPostMenuFacultyAdminSaga);
	yield takeEvery('GET_LIST_INFO_FACULTY_ADMIN_REQUEST', getListInfoFacultyAdminSaga);
	yield takeEvery('UPDATE_INFO_FACULTY_ADMIN_REQUEST', updateInfoFacultyAdminAction);
	yield takeEvery('DELETE_INFO_FACULTY_ADMIN_REQUEST', deleteInfoFacultyAdminSaga);
	yield takeEvery('POST_INFO_FACULTY_ADMIN_REQUEST', postInfoFacultyAdminSaga);

	yield takeEvery('GET_LIST_SPECIAL_FACULTY_ADMIN_REQUEST', getListSpecialFacultyAdminSaga);
	yield takeEvery('UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_REQUEST', updateAcceptPostMenuFacultyAdminSaga);
	yield takeEvery('UPDATE_NO_ACCEPT_POST_MENU_FACULTY_ADMIN_REQUEST', updateNoAcceptPostMenuFacultyAdminSaga);

	yield takeEvery('ADD_SPECIAL_FACULTY_ADMIN_REQUEST', addSpecialFacultyAdminSaga);
	yield takeEvery('DELETE_SPECIAL_FACULTY_ADMIN_REQUEST', deleteSpecialFacultyAdminSaga);
	yield takeEvery('GET_SPECIAL_BY_ID_FACULTY_ADMIN_REQUEST', getSpecialByIdFacultyAdminSaga);
	yield takeEvery('UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_REQUEST', uploadImageSpecialFacultySaga);
	yield takeEvery('UPDATE_SPECIAL_FACULTY_ADMIN_REQUEST', updateSpecialFacultyAction);

	yield takeEvery('UPDATE_NAME_FACULTY_ADMIN_REQUEST', updateNameFacultyAdminSaga);
}

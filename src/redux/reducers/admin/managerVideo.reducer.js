import { notification } from 'antd';
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};


const initialState = {

	listManagerVideo: {
		data: [],
		load: false,
		error: '',
	},

	detailManagerVideo: {
		data: {},
		load: false,
		error: ''
	},

	addManagerVideo: {
		data: {},
		load: false,
		error: ''
	}

}

export default function managerVideoReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_MANAGER_VIDEO_ADMIN_REQUEST': {
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					load: true
				}
			};
		}

		case 'GET_LIST_MANAGER_VIDEO_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_MANAGER_VIDEO_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					load: false,
					error: error,
				},
			};
		}

		//  -------------------------------

		case 'DELETE_MANAGER_VIDEO_ADMIN_REQUEST': {
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					load: true
				}
			};
		}

		case 'DELETE_MANAGER_VIDEO_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Xóa video thành công")
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_MANAGER_VIDEO_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					load: false,
					error: error,
				},
			};
		}

		// -----------------------------------

		case 'GET_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST': {
			return {
				...state,
				detailManagerVideo: {
					...state.detailManagerVideo,
					load: true
				}
			};
		}

		case 'GET_DETAIL_MANAGER_VIDEO_ADMIN_SUCCESS': {
			const { data } = action.payload;

			return {
				...state,
				detailManagerVideo: {
					...state.detailManagerVideo,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_DETAIL_MANAGER_VIDEO_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				detailManagerVideo: {
					...state.detailManagerVideo,
					load: false,
					error: error,
				},
			};
		}

		// -----------------------------------

		case 'UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST': {
			return {
				...state,
				detailManagerVideo: {
					...state.detailManagerVideo,
					load: true
				}
			};
		}

		case 'UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				detailManagerVideo: {
					...state.detailManagerVideo,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_DETAIL_MANAGER_VIDEO_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				detailManagerVideo: {
					...state.detailManagerVideo,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------

		case 'ADD_DETAIL_MANAGER_VIDEO_ADMIN_REQUEST': {
			return {
				...state,
				addManagerVideo: {
					...state.addManagerVideo,
					load: true
				}
			};
		}

		case 'ADD_DETAIL_MANAGER_VIDEO_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Thêm video thành công')
			return {
				...state,
				addManagerVideo: {
					...state.addManagerVideo,
					data: data,
					load: false,
				},
			}
		}

		case 'ADD_DETAIL_MANAGER_VIDEO_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				addManagerVideo: {
					...state.addManagerVideo,
					load: false,
					error: error,
				},
			};
		}

		// ---------------------------------------

		case 'UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_REQUEST': {
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					load: true
				}
			};
		}

		case 'UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_BROWSE_MANAGER_VIDEO_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManagerVideo: {
					...state.listManagerVideo,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
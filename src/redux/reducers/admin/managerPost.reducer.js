import { notification } from 'antd';
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 30
	});
};

const initialState = {

	listMangerPost: {
		data: [],
		load: false,
		error: '',
	},

	detailManagerPost: {
		data: {},
		load: false,
		error: ''
	},

	addManagerPost: {
		data: {},
		load: false,
		error: ''
	}

}

export default function managerPostReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: true
				}
			};
		}

		case 'GET_LIST_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;

			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: false,
					error: error,
				},
			};
		}

		//  -------------------------------

		case 'DELETE_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: true
				}
			};
		}

		case 'DELETE_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Xóa thành công')
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------------

		case 'GET_DETAIL_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				detailManagerPost: {
					...state.detailManagerPost,
					load: true
				}
			};
		}

		case 'GET_DETAIL_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;

			return {
				...state,
				detailManagerPost: {
					...state.detailManagerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_DETAIL_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				detailManagerPost: {
					...state.detailManagerPost,
					load: false,
					error: error,
				},
			};
		}

		//  ------------------------------------

		case 'UPDATE_DETAIL_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				detailManagerPost: {
					...state.detailManagerPost,
					load: true
				}
			};
		}

		case 'UPDATE_DETAIL_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				detailManagerPost: {
					...state.detailManagerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_DETAIL_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				detailManagerPost: {
					...state.detailManagerPost,
					load: false,
					error: error,
				},
			};
		}

		//---------------------------------------

		case 'UPDATE_TYPE_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: true
				}
			};
		}

		case 'UPDATE_TYPE_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_TYPE_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', 'Cập nhật thất bại')
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------------

		case 'ADD_DETAIL_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				addManagerPost: {
					...state.addManagerPost,
					load: true
				}
			};
		}

		case 'ADD_DETAIL_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Thêm bài viết thành công')
			return {
				...state,
				addManagerPost: {
					...state.addManagerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'ADD_DETAIL_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error?.msg)
			return {
				...state,
				addManagerPost: {
					...state.addManagerPost,
					load: false,
					error: error,
				},
			};
		}

		//  ---------------------------------

		case 'UPDATE_BROWSE_MANAGER_POST_ADMIN_REQUEST': {
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: true
				}
			};
		}

		case 'UPDATE_BROWSE_MANAGER_POST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_BROWSE_MANAGER_POST_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listMangerPost: {
					...state.listMangerPost,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
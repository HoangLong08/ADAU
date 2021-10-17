import { notification } from 'antd';
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};


const initialState = {
	sizeDatabase: {
		data: {},
		load: false,
		error: '',
	},
	listRecycle: {
		data: [],
		load: false,
		error: '',
	},
}

export default function managerRecycleReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST': {
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: true
				}
			};
		}

		case 'GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: false,
					error: error,
				},
			};
		}

		// -------------------------------------

		case 'DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST': {
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: true
				}
			};
		}

		case 'DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'xóa thành công')
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: false,
					error: error,
				},
			};
		}

		// ---------------------------------------------

		case 'RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_REQUEST': {
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: true
				}
			};
		}

		case 'RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'khôi phục thành công')
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					data: data,
					load: false,
				},
			}
		}

		case 'RESTORE_LIST_MANAGER_MANAGER_RECYCLE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: false,
					error: error,
				},
			};
		}

		//  --------------------------------------

		case 'GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_REQUEST': {
			return {
				...state,
				sizeDatabase: {
					...state.sizeDatabase,
					load: true
				}
			};
		}

		case 'GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				sizeDatabase: {
					...state.sizeDatabase,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_SIZE_DATABASE_MANAGER_RECYCLE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				sizeDatabase: {
					...state.sizeDatabase,
					load: false,
					error: error,
				},
			};
		}

		// / -----------------------------------------

		case 'DELETE_ALL_MANAGER_RECYCLE_ADMIN_REQUEST': {
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: true
				}
			};
		}

		case 'DELETE_ALL_MANAGER_RECYCLE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_ALL_MANAGER_RECYCLE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listRecycle: {
					...state.listRecycle,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
import { notification } from 'antd';
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};


const initialState = {
	listAccount: {
		data: [],
		load: false,
		error: '',
	},

	listRole: {
		data: [],
		load: false,
		error: '',
	},

	listManager: {
		data: [],
		load: false,
		error: '',
	}

}

export default function managerAccountReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_ACCOUNT_ADMIN_REQUEST': {
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: true
				}
			};
		}

		case 'GET_LIST_ACCOUNT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listAccount: {
					...state.listAccount,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_ACCOUNT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: false,
					error: error,
				},
			};
		}

		//  ----------------------------

		case 'GET_LIST_ROLE_ADMIN_REQUEST': {
			return {
				...state,
				listRole: {
					...state.listRole,
					load: true
				}
			};
		}

		case 'GET_LIST_ROLE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listRole: {
					...state.listRole,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_ROLE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listRole: {
					...state.listRole,
					load: false,
					error: error,
				},
			};
		}

		//  -----------------------------------

		case 'GET_LIST_MANAGER_ADMIN_REQUEST': {
			return {
				...state,
				listManager: {
					...state.listManager,
					load: true
				}
			};
		}

		case 'GET_LIST_MANAGER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listManager: {
					...state.listManager,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_MANAGER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManager: {
					...state.listManager,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------

		case 'UPDATE_ROLE_ACCOUNT_ADMIN_REQUEST': {
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: true
				}
			};
		}

		case 'UPDATE_ROLE_ACCOUNT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Cập nhật thành công")
			return {
				...state,
				listAccount: {
					...state.listAccount,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_ROLE_ACCOUNT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: false,
					error: error,
				},
			};
		}

		//  ------------------------------

		case 'DELETE_ACCOUNT_ADMIN_REQUEST': {
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: true
				}
			};
		}

		case 'DELETE_ACCOUNT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Xóa thành công")
			return {
				...state,
				listAccount: {
					...state.listAccount,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_ACCOUNT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------------

		case 'UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_REQUEST': {
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: true
				}
			};
		}

		case 'UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Cập nhật thành công")
			return {
				...state,
				listAccount: {
					...state.listAccount,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_BLOCK_AND_UNBLOCK_ACCOUNT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listAccount: {
					...state.listAccount,
					load: false,
					error: error,
				},
			};
		}


		default:
			return state
	}
}

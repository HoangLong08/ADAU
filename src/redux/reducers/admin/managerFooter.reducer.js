import { notification } from 'antd';
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};

const initialState = {
	listManagerFooter: {
		data: [],
		load: false,
		error: '',
	},
}

export default function managerFooterReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_MANAGER_FOOTER_ADMIN_REQUEST': {
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					load: true
				}
			};
		}

		case 'GET_LIST_MANAGER_FOOTER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_MANAGER_FOOTER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------

		case 'UPDATE_LIST_MANAGER_FOOTER_ADMIN_REQUEST': {
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					load: true
				}
			};
		}

		case 'UPDATE_LIST_MANAGER_FOOTER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_LIST_MANAGER_FOOTER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					load: false,
					error: error,
				},
			};
		}

		// -----------------------------------

		case 'UPDATE_LOGO_FOOTER_MANAGER_ADMIN_REQUEST': {
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					load: true
				}
			};
		}

		case 'UPDATE_LOGO_FOOTER_MANAGER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', 'Cập nhật thành công')
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_LOGO_FOOTER_MANAGER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listManagerFooter: {
					...state.listManagerFooter,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
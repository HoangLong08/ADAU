import { notification } from 'antd';
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};


const initialState = {


	listPartner: {
		data: [],
		load: false,
		error: '',
	},
}

export default function managerPartnerReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_PARTNER_ADMIN_REQUEST': {
			return {
				...state,
				listPartner: {
					...state.listPartner,
					load: true
				}
			};
		}

		case 'GET_LIST_PARTNER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listPartner: {
					...state.listPartner,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_PARTNER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listPartner: {
					...state.listPartner,
					load: false,
					error: error,
				},
			};
		}

		//  ------------------------------

		case 'UPDATE_PARTNER_ADMIN_REQUEST': {
			return {
				...state,
				listPartner: {
					...state.listPartner,
					load: true
				}
			};
		}

		case 'UPDATE_PARTNER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Cập nhật thành công")
			return {
				...state,
				listPartner: {
					...state.listPartner,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_PARTNER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listPartner: {
					...state.listPartner,
					load: false,
					error: error,
				},
			};
		}

		//  ---------------------------

		case 'DELETE_PARTNER_ADMIN_REQUEST': {
			return {
				...state,
				listPartner: {
					...state.listPartner,
					load: true
				}
			};
		}

		case 'DELETE_PARTNER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Xóa thành công")
			return {
				...state,
				listPartner: {
					...state.listPartner,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_PARTNER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listPartner: {
					...state.listPartner,
					load: false,
					error: error,
				},
			};
		}

		

		default:
			return state
	}
}
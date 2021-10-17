import { notification } from 'antd';
const openNotificationWithIcon = (type, notify, numberDuration) => {
	notification[type]({
		message: '',
		description: notify,
		duration: numberDuration
	});
};


const initialState = {
	infoCelc: {
		data: {},
		load: false,
		error: '',
	},

}

export default function managerCelcReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_INFO_CELC_ADMIN_REQUEST': {
			return {
				...state,
				infoCelc: {
					...state.infoCelc,
					load: true
				}
			};
		}

		case 'GET_INFO_CELC_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				infoCelc: {
					...state.infoCelc,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_INFO_CELC_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				infoCelc: {
					...state.infoCelc,
					load: false,
					error: error,
				},
			};
		}

		//  ------------------------------

		case 'UPDATE_INFO_CELC_ADMIN_REQUEST': {
			return {
				...state,
				infoCelc: {
					...state.infoCelc,
					load: true
				}
			};
		}

		case 'UPDATE_INFO_CELC_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Cập nhật thành công", 2)
			return {
				...state,
				infoCelc: {
					...state.infoCelc,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_INFO_CELC_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				infoCelc: {
					...state.infoCelc,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}

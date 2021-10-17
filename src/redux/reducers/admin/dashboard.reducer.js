

const initialState = {
	contentDashboard: {
		data: [],
		load: false,
		error: '',
	}
}

export default function dashboardReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_CONTENT_DASHBOARD_ADMIN_REQUEST': {
			return {
				...state,
				contentDashboard: {
					...state.contentDashboard,
					load: true
				}
			};
		}

		case 'GET_CONTENT_DASHBOARD_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				contentDashboard: {
					...state.contentDashboard,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_CONTENT_DASHBOARD_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				contentDashboard: {
					...state.contentDashboard,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------------

		case 'GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_REQUEST': {
			return {
				...state,
				contentDashboard: {
					...state.contentDashboard,
					load: true
				}
			};
		}

		case 'GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				contentDashboard: {
					...state.contentDashboard,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_CONTENT_DASHBOARD_BY_DATE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				contentDashboard: {
					...state.contentDashboard,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}

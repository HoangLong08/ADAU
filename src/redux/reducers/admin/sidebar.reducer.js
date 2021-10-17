

const initialState = {
	contentSidebar: {
		data: [],
		load: false,
		error: '',
	}
}

export default function sidebarReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_CONTENT_SIDEBAR_ADMIN_REQUEST': {
			return {
				...state,
				contentSidebar: {
					...state.contentSidebar,
					load: true
				}
			};
		}

		case 'GET_CONTENT_SIDEBAR_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				contentSidebar: {
					...state.contentSidebar,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_CONTENT_SIDEBAR_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				contentSidebar: {
					...state.contentSidebar,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}

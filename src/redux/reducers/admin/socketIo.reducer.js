

const initialState = {
	listMessage: {
		data: [],
		load: false,
		error: '',
	},

	sendMessage: {
		data: {},
		load: false,
		error: ''
	},

	listNotify: {
		data: [],
		load: false,
		error: ''
	}
}

export default function socketIoReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_MESSAGE_ADMIN_REQUEST': {
			return {
				...state,
				listMessage: {
					...state.listMessage,
					load: true
				}
			};
		}

		case 'GET_LIST_MESSAGE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listMessage: {
					...state.listMessage,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_MESSAGE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listMessage: {
					...state.listMessage,
					load: false,
					error: error,
				},
			};
		}

		// ------------------------------------

		case 'POST_SEND_MESSAGE_ADMIN_REQUEST': {
			return {
				...state,
				sendMessage: {
					...state.sendMessage,
					load: true
				}
			};
		}

		case 'POST_SEND_MESSAGE_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				sendMessage: {
					...state.sendMessage,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_SEND_MESSAGE_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				sendMessage: {
					...state.sendMessage,
					load: false,
					error: error,
				},
			};
		}

		//  ------------------------------

		case 'GET_LIST_NOTIFY_ADMIN_REQUEST': {
			return {
				...state,
				listNotify: {
					...state.listNotify,
					load: true
				}
			};
		}

		case 'GET_LIST_NOTIFY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listNotify: {
					...state.listNotify,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_NOTIFY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listNotify: {
					...state.listNotify,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}

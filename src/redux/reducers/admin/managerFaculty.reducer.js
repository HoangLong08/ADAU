import { notification } from 'antd';
var infoFaculty = JSON.parse(localStorage.getItem("infoFaculty"));
const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 30
	});
};

const initialState = {
	listSlideFaculty: {
		data: [],
		load: false,
		error: '',
	},

	infoFaculty: infoFaculty ? infoFaculty : {},

	introFaculty: {
		data: {},
		load: false,
		error: '',
	},

	menuFaculty: {
		data: [],
		load: false,
		error: '',
	},

	delMenuFaculty: {
		data: { check: false },
		load: false,
		error: '',
	},

	listPostMenu: {
		data: [],
		load: false,
		error: '',
	},

	listInfoFaculty: {
		data: [],
		load: false,
		error: '',
	},

	listSpecialFaculty: {
		data: [],
		load: false,
		error: '',
	},

	detailSpecialFaculty: {
		data: {},
		load: false,
		error: '',
	},

	acceptPostMenuFaculty: {
		data: {},
		load: false,
		error: '',
	},

	addPostFaculty: {
		data: {},
		load: false,
		error: '',
	},

	updateSpecialFaculty: {
		data: "",
		load: false,
		error: '',
	}

}

export default function managerFacultyReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_SLIDE_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					load: true
				}
			};
		}

		case 'GET_LIST_SLIDE_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_SLIDE_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------

		case 'GET_INFO_FACULTY_ADMIN': {
			localStorage.setItem('infoFaculty', JSON.stringify(action.payload));
			return {
				...state,
				infoFaculty: action.payload,
			};
		}

		// --------------------------------

		case 'POST_IMAGE_SLIDE_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					load: true
				}
			};
		}

		case 'POST_IMAGE_SLIDE_FACULTY_ADMIN_SUCCESS': {

			const { data } = action.payload;
			let newArr = state.listSlideFaculty.data;
			newArr.push(data)
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					data: newArr,
					load: false,
				},
			}
		}

		case 'POST_IMAGE_SLIDE_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon("error", error?.msg)
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  --------------------------------

		case 'UPDATE_LIST_SLIDE_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					load: true
				}
			};
		}

		case 'UPDATE_LIST_SLIDE_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Cập nhật thành công")
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_LIST_SLIDE_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listSlideFaculty: {
					...state.listSlideFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ---------------------------------------------

		case 'GET_INTRO_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				introFaculty: {
					...state.introFaculty,
					load: true
				}
			};
		}

		case 'GET_INTRO_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				introFaculty: {
					...state.introFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_INTRO_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				introFaculty: {
					...state.introFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  ------------------------------

		case 'UPDATE_INTRO_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				introFaculty: {
					...state.introFaculty,
					load: true
				}
			};
		}

		case 'UPDATE_INTRO_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Cập nhật thành công")
			return {
				...state,
				introFaculty: {
					...state.introFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_INTRO_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				introFaculty: {
					...state.introFaculty,
					load: false,
					error: error,
				},
			};
		}

		// --------------------------------------------

		case 'GET_MENU_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				menuFaculty: {
					...state.menuFaculty,
					load: true
				}
			};
		}

		case 'GET_MENU_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				menuFaculty: {
					...state.menuFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_MENU_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				menuFaculty: {
					...state.menuFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  -----------------------------

		case 'UPDATE_MENU_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				menuFaculty: {
					...state.menuFaculty,
					load: true
				}
			};
		}

		case 'UPDATE_MENU_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			// window.location.reload();
			openNotificationWithIcon("success", "Cập nhật thành công")
			return {
				...state,
				menuFaculty: {
					...state.menuFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_MENU_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				menuFaculty: {
					...state.menuFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------

		case 'DELETE_MENU_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				delMenuFaculty: {
					...state.delMenuFaculty,
					load: true
				}
			};
		}

		case 'DELETE_MENU_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Xóa thành công")
			return {
				...state,
				delMenuFaculty: {
					...state.delMenuFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_MENU_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon("error", "Xóa thất bại")
			return {
				...state,
				delMenuFaculty: {
					...state.delMenuFaculty,
					load: false,
					error: error,
				},
			};
		}

		// -------------------------------------

		case 'GET_LIST_POST_MENU_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listPostMenu: {
					...state.listPostMenu,
					load: true
				}
			};
		}

		case 'GET_LIST_POST_MENU_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listPostMenu: {
					...state.listPostMenu,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_POST_MENU_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listPostMenu: {
					...state.listPostMenu,
					load: false,
					error: error,
				},
			};
		}

		// ---------------------------------------

		case 'GET_LIST_INFO_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: true
				}
			};
		}

		case 'GET_LIST_INFO_FACULTY_ADMIN_REQUEST_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_INFO_FACULTY_ADMIN_REQUEST_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  --------------------------------

		case 'UPDATE_INFO_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: true
				}
			};
		}

		case 'UPDATE_INFO_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Cập nhật thành công")
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_INFO_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  ---------------------------------------

		case 'DELETE_INFO_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: true
				}
			};
		}

		case 'DELETE_INFO_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Xóa thành công")
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_INFO_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ------------------------------

		case 'POST_INFO_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: true
				}
			};
		}

		case 'POST_INFO_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Thêm thông tin thành công")

			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'POST_INFO_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listInfoFaculty: {
					...state.listInfoFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------

		case 'GET_LIST_SPECIAL_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listSpecialFaculty: {
					...state.listSpecialFaculty,
					load: true
				}
			};
		}

		case 'GET_LIST_SPECIAL_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listSpecialFaculty: {
					...state.listSpecialFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_LIST_SPECIAL_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listSpecialFaculty: {
					...state.listSpecialFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ------------------------------------------

		case 'UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listPostMenu: {
					...state.listPostMenu,
					load: true
				}
			};
		}

		case 'UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listPostMenu: {
					...state.listPostMenu,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_ACCEPT_POST_MENU_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listPostMenu: {
					...state.listPostMenu,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------------

		case 'ADD_SPECIAL_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				addPostFaculty: {
					...state.addPostFaculty,
					load: true
				}
			};
		}

		case 'ADD_SPECIAL_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Thêm chuyên ngành thành công")
			return {
				...state,
				addPostFaculty: {
					...state.addPostFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'ADD_SPECIAL_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				addPostFaculty: {
					...state.addPostFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  --------------------------------

		case 'DELETE_SPECIAL_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				listSpecialFaculty: {
					...state.listSpecialFaculty,
					load: true
				}
			};
		}

		case 'DELETE_SPECIAL_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon("success", "Xóa chuyên ngành thành công")
			return {
				...state,
				listSpecialFaculty: {
					...state.listSpecialFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_SPECIAL_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listSpecialFaculty: {
					...state.listSpecialFaculty,
					load: false,
					error: error,
				},
			};
		}

		// -------------------------------------


		case 'GET_SPECIAL_BY_ID_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				detailSpecialFaculty: {
					...state.detailSpecialFaculty,
					load: true
				}
			};
		}

		case 'GET_SPECIAL_BY_ID_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				detailSpecialFaculty: {
					...state.detailSpecialFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_SPECIAL_BY_ID_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				detailSpecialFaculty: {
					...state.detailSpecialFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------

		case 'UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				detailSpecialFaculty: {
					...state.detailSpecialFaculty,
					load: true
				}
			};
		}

		case 'UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				detailSpecialFaculty: {
					...state.detailSpecialFaculty,
					data: {
						...state.detailSpecialFaculty.data,
						image: data.image
					},
					load: false,
				},
			}
		}

		case 'UPLOAD_IMAGE_SPECIAL_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error.msg)
			return {
				...state,
				detailSpecialFaculty: {
					...state.detailSpecialFaculty,
					load: false,
					error: error,
				},
			};
		}

		//  ---------------------------------------------

		case 'UPDATE_SPECIAL_FACULTY_ADMIN_REQUEST': {
			return {
				...state,
				updateSpecialFaculty: {
					...state.updateSpecialFaculty,
					load: true
				}
			};
		}

		case 'UPDATE_SPECIAL_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Cập nhật thành công")
			return {
				...state,
				updateSpecialFaculty: {
					...state.updateSpecialFaculty,
					data: data,
					load: false,
				},
			}
		}

		case 'UPDATE_SPECIAL_FACULTY_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error?.msg);
			return {
				...state,
				updateSpecialFaculty: {
					...state.updateSpecialFaculty,
					load: false,
					error: error,
				},
			};
		}

		// ------------------------------


		case 'UPDATE_NAME_FACULTY_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Cập nhật thành công")
			return {
				...state,
				infoFaculty: data,
			}
		}

		default:
			return state

	}
}

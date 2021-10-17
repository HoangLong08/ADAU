import { combineReducers } from "redux";

import authAdminReducer from "./admin/auth.reducer";
import dashboardReducer from "./admin/dashboard.reducer";
import managerAccountReducer from "./admin/managerAccount.reducer";
import managerFacultyReducer from "./admin/managerFaculty.reducer";
import managerFooterReducer from "./admin/managerFooter.reducer";
import managerPartnerReducer from "./admin/managerPartner.reducer";
import managerPostReducer from "./admin/managerPost.reducer";
import managerRecycleReducer from "./admin/managerRecycle.reducer";
import managerVideoReducer from "./admin/managerVideo.reducer";
import managerCelcReducer from "./admin/mangerCelc.reducer";
import sidebarReducer from "./admin/sidebar.reducer";
import socketIoReducer from "./admin/socketIo.reducer";

export default combineReducers({
	authAdminReducer: authAdminReducer,
	sidebarReducer: sidebarReducer,
	dashboardReducer: dashboardReducer,
	socketIoReducer: socketIoReducer,

	managerFacultyReducer: managerFacultyReducer,
	managerCelcReducer: managerCelcReducer,
	managerPartnerReducer: managerPartnerReducer,
	managerAccountReducer: managerAccountReducer,
	managerPostReducer: managerPostReducer,
	managerVideoReducer: managerVideoReducer,
	managerFooterReducer: managerFooterReducer,
	managerRecycleReducer: managerRecycleReducer,
})
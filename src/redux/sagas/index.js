import { fork } from "redux-saga/effects";

import authAdminSaga from './admin/auth.saga';
import dashboardAdminSaga from "./admin/dashboard.saga";
import managerAccountSaga from "./admin/managerAccount.saga";
import managerCelcSaga from "./admin/managerCelc.saga";
import managerFacultySaga from "./admin/managerFaculty.saga";
import managerFooterSaga from "./admin/managerFooter.saga";
import managerPartnerSaga from "./admin/managerPartner.saga";
import managerPostSaga from "./admin/managerPost.saga";
import managerRecycleSaga from "./admin/managerRecycle.saga";
import managerVideoSaga from "./admin/managerVideo.saga";
import sidebarAdminSaga from './admin/sidebar.saga';
import socketIoSaga from "./admin/socketIo.saga";

export default function* mySaga() {
	yield fork(authAdminSaga)
	yield fork(sidebarAdminSaga);
	yield fork(dashboardAdminSaga);
	yield fork(socketIoSaga);
	yield fork(managerFacultySaga);
	yield fork(managerCelcSaga);
	yield fork(managerPartnerSaga);
	yield fork(managerAccountSaga);
	yield fork(managerPostSaga);
	yield fork(managerVideoSaga);
	yield fork(managerFooterSaga);
	yield fork(managerRecycleSaga);
}

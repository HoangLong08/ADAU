import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "./utils/history";

import Login from "./pages/Login/Index.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import PagePersonal from "./pages/PagePersonal/Index.jsx";
import SidebarLayoutRoute from "./SidebarLayoutRoute.jsx";
import ManagerFaculty from "./pages/ManagerFaculty/Index.jsx";
import AccountUser from "./pages/AccountUser/Index.jsx";
import AddSpecial from "./pages/ManagerFaculty/ContentFaculty/AddSpecial/Index.jsx";
import EditSpecial from "./pages/ManagerFaculty/ContentFaculty/EditSpecial/Index.jsx";
import InfoCelc from "./pages/ManagerCelc/InfoCelc/Index.jsx";
import SlideCelc from "./pages/ManagerCelc/SlideCelc/Index.jsx";
import IntroCelc from "./pages/ManagerCelc/IntroCelc/Index.jsx";
import MenuCelc from "./pages/ManagerCelc/MenuCelc/Index.jsx";
import Partner from "./pages/Partner/Index.jsx";
import ManagerPost from "./pages/ManagerPost/Index.jsx";
import EditManagerPost from "./pages/EditManagerPost/Index.jsx";
import AddManagerPost from "./pages/AddManagerPost/Index.jsx";
import ManagerVideo from "./pages/ManagerVideo/Index.jsx";
import EditManagerVideo from "./pages/EditManagerVideo/Index.jsx";
import AddManagerVideo from "./pages/AddManagerVideo/Index.jsx";
import ManagerFooter from "./pages/ManagerFooter/Index.jsx";
import ManagerRecycle from "./pages/ManagerRecycle/Index.jsx";
import NotFound from "./pages/Error/NotFound.js";

function SwitchRoute() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <SidebarLayoutRoute
          exact
          path="/manage-bashboard"
          component={Dashboard}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-faculty/:id"
          component={ManagerFaculty}
        />
        <SidebarLayoutRoute
          exact
          path="/trang-ca-nhan"
          component={PagePersonal}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-account"
          component={AccountUser}
        />
        <SidebarLayoutRoute
          exact
          path="/add-special/:id"
          component={AddSpecial}
        />
        <SidebarLayoutRoute
          exact
          path="/edit-special/:id"
          component={EditSpecial}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-information-celc"
          component={InfoCelc}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-slide-celc"
          component={SlideCelc}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-introduce-celc"
          component={IntroCelc}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-menu-celc"
          component={MenuCelc}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-partner/:id"
          component={Partner}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-newfeed/:id"
          component={ManagerPost}
        />
        <SidebarLayoutRoute
          exact
          path="/edit-post-manager/:id/:faculty"
          component={EditManagerPost}
        />
        <SidebarLayoutRoute
          exact
          path="/add-post-manager/:id"
          component={AddManagerPost}
        />
        <SidebarLayoutRoute
          exact
          path="/manager-video"
          component={ManagerVideo}
        />
        <SidebarLayoutRoute
          exact
          path="/edit-video-manager/:id"
          component={EditManagerVideo}
        />
        <SidebarLayoutRoute
          exact
          path="/add-video-manager"
          component={AddManagerVideo}
        />
        <SidebarLayoutRoute
          exact
          path="/manage-footer"
          component={ManagerFooter}
        />
        <SidebarLayoutRoute exact path="/restore" component={ManagerRecycle} />
        <SidebarLayoutRoute component={NotFound} />
      </Switch>
    </Router>
  );
}

export default SwitchRoute;

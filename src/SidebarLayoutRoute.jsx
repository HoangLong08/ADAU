import React from "react";
import { Route, Redirect } from "react-router-dom";
import SidebarHeader from "./pages/SidebarHeader/Index.jsx";
import { connect } from "react-redux";
function SidebarLayoutRoute({
  infoAdmin,
  contentSidebar,
  component: Component,
  ...rest
}) {
  const infoAdminSession = JSON.parse(localStorage.getItem("infoAdmin"));

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if (!infoAdminSession || !infoAdmin.data) {
          localStorage.removeItem("infoAdmin");
          return <Redirect to="/" />;
        } else {
          return (
            <SidebarHeader>
              <Component {...matchProps} />
            </SidebarHeader>
          );
        }
      }}
    />
  );
}
const mapStateToProps = (state) => {
  const { infoAdmin } = state.authAdminReducer;
  const { contentSidebar } = state.sidebarReducer;
  return {
    infoAdmin: infoAdmin,
    contentSidebar: contentSidebar,
  };
};

export default connect(mapStateToProps, null)(SidebarLayoutRoute);

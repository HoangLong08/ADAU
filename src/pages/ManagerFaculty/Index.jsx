import React, { useState } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import {
  updateNameFacultyAdminAction,
  getInfoFacultyAdminAction,
} from "../../redux/actions";
import Slide from "./ContentFaculty/Slide/Index.jsx";
import Intro from "./ContentFaculty/Intro/Index.jsx";
import InfoFaculty from "./ContentFaculty/InfoFaculty/Index.jsx";
import Menu from "./ContentFaculty/Menu/Index.jsx";
import Special from "./ContentFaculty/Special/Index.jsx";
import "../ManagerFaculty/style.css";

const { TabPane } = Tabs;

function Index({
  match,
  infoFaculty,
  updateNameFacultyAdminTask,
  getInfoFacultyAdminTask,
}) {
  const idFaculty = match.params?.id;
  const [checkClick, setCheckClick] = useState(false);

  const [valueNameFaculty, setValueNameFaculty] = useState(
    infoFaculty?.nameFaculty
  );

  function handleChangeNameFaculty(e) {
    setValueNameFaculty(e.target.value);
  }

  return (
    <>
      <div className="wrap-manager-faculty">
        <div className="wrap-manager-faculty-top">
          <h3>Quản lý {infoFaculty?.nameFaculty}</h3>
          <div className="content-change-name-faculty">
            {checkClick && (
              <div className="content-change-name-faculty">
                <input
                  type="text"
                  name="valueNameFaculty"
                  value={valueNameFaculty}
                  onChange={(e) => handleChangeNameFaculty(e)}
                />
                <button
                  onClick={() => {
                    updateNameFacultyAdminTask({
                      idFaculty: idFaculty,
                      valueNameFaculty: valueNameFaculty,
                    });
                    getInfoFacultyAdminTask({
                      id: idFaculty,
                      nameFaculty: valueNameFaculty,
                    });
                  }}
                >
                  Cập nhật
                </button>
              </div>
            )}

            <div className="content-change-name-btn">
              <button onClick={() => setCheckClick(!checkClick)}>
                Đổi tên khoa
              </button>
            </div>
          </div>
        </div>

        <div className="wrap-manager-faculty-content">
          <Tabs type="card">
            <TabPane tab="Slide" key="1">
              <Slide idFaculty={idFaculty} />
            </TabPane>
            <TabPane tab="Giới thiệu" key="2">
              <Intro idFaculty={idFaculty} />
            </TabPane>
            <TabPane tab="Thông tin khoa" key="3">
              <InfoFaculty idFaculty={idFaculty} />
            </TabPane>
            <TabPane tab="Menu khoa" key="4">
              <Menu idFaculty={idFaculty} />
            </TabPane>
            <TabPane tab="Chuyên ngành" key="5">
              <Special idFaculty={idFaculty} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { infoFaculty } = state.managerFacultyReducer;
  return {
    infoFaculty: infoFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNameFacultyAdminTask: (params) =>
      dispatch(updateNameFacultyAdminAction(params)),
    getInfoFacultyAdminTask: (params) =>
      dispatch(getInfoFacultyAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

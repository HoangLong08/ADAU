import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getSizeDatabaseManagerRecycleAdminAction,
  getListManagerRecycleAdminAction,
  deleteListManagerRecycleAdminAction,
  deleteAllManagerRecycleAdminAction,
  restoreListManagerRecycleAdminAction,
} from "../../redux/actions";
import { Table } from "antd";
import "../ManagerRecycle/style.css";
function Index({
  sizeDatabase,
  listRecycle,
  getSizeDatabaseManagerRecycleAdminTask,
  getListManagerRecycleAdminTask,
  deleteListManagerRecycleAdminTask,
  deleteAllManagerRecycleAdminTask,
  restoreListManagerRecycleAdminTask,
}) {
  const [listRecycleState, setListRecycleState] = useState(listRecycle.data);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời gian",
      dataIndex: "updateAt",
      key: "updateAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    getListManagerRecycleAdminTask();
    getSizeDatabaseManagerRecycleAdminTask();
  }, [getListManagerRecycleAdminTask, getSizeDatabaseManagerRecycleAdminTask]);

  useEffect(() => {
    setListRecycleState(listRecycle.data);
  }, [listRecycle]);

  function renderListRecycle() {
    return listRecycleState?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        title: item.title,
        updateAt: item.updateAt,
        action: (
          <div className="content-recycle-btn">
            <button
              className="btn-recycle-restore"
              onClick={() => {
                restoreListManagerRecycleAdminTask({
                  id: item.id,
                  table: item.table,
                });
              }}
            >
              <i className="far fa-history"></i>
            </button>
            <button
              className="btn-recycle-del"
              onClick={() => {
                deleteListManagerRecycleAdminTask({
                  id: item.id,
                  table: item.table,
                });
              }}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        ),
      };
    });
  }

  return (
    <div>
      <div className="wrap-manager-recycle-top">
        <h3>Quản lý thùng rác</h3>
        <div>
          <p>Đã sử dụng {sizeDatabase.data?.size} MB</p>
          <button
            className="content-manager-recycle-btn-del-all"
            onClick={() => deleteAllManagerRecycleAdminTask()}
          >
            Xóa tất cả
          </button>
        </div>
      </div>
      <div className="wrap-manager-recycle-bottom">
        <Table
          columns={columns}
          pagination={false}
          dataSource={renderListRecycle()}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listRecycle, sizeDatabase } = state.managerRecycleReducer;
  return {
    listRecycle: listRecycle,
    sizeDatabase: sizeDatabase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSizeDatabaseManagerRecycleAdminTask: () =>
      dispatch(getSizeDatabaseManagerRecycleAdminAction()),
    getListManagerRecycleAdminTask: () =>
      dispatch(getListManagerRecycleAdminAction()),
    deleteListManagerRecycleAdminTask: (params) =>
      dispatch(deleteListManagerRecycleAdminAction(params)),
    deleteAllManagerRecycleAdminTask: (params) =>
      dispatch(deleteAllManagerRecycleAdminAction(params)),
    restoreListManagerRecycleAdminTask: (params) =>
      dispatch(restoreListManagerRecycleAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

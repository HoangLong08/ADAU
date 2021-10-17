import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getListManagerVideoAdminAction,
  deleteManagerVideoAdminAction,
  updateBrowseManagerVideoAdminAction,
} from "../../redux/actions";
import { Table } from "antd";
import Modal from "react-modal";
import "../ManagerVideo/style.css";
Modal.setAppElement("#root");
function Index({
  listManagerVideo,
  getListManagerVideoAdminTask,
  deleteManagerVideoAdminTask,
  updateBrowseManagerVideoAdminTask,
}) {
  const [listManagerState, setListManagerState] = useState(
    listManagerVideo.data
  );

  useEffect(() => {
    getListManagerVideoAdminTask();
  }, [getListManagerVideoAdminTask]);

  useEffect(() => {
    setListManagerState(listManagerVideo.data);
  }, [listManagerVideo]);

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  function renderListManagerVideo() {
    return listManagerState?.map((item, index) => {
      return {
        key: index,
        stt: index + 1,
        title: item.title,
        admin: item.admin,
        time: item.updatedAt,
        view: item.view,
        status: item.active,
        action: (
          <div className="content-post-manager-btn">
            <a href={`/edit-video-manager/${item.id}`}>
              <button className="edit-manager-post-btn" title="Chỉnh sửa">
                <i className="far fa-edit"></i>
              </button>
            </a>
            <button
              title="Duyệt hoặc hủy duyệt"
              className="browse-manager-post-btn"
              onClick={() =>
                updateBrowseManagerVideoAdminTask({
                  id: item.id,
                })
              }
            >
              <i className="fas fa-calendar-check"></i>
            </button>
            <button
              title="Xóa"
              className="del-manager-post-btn"
              onClick={() => toggleModalDelManagerVideo(item.id)}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        ),
      };
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [delManagerVideo, setDelManagerVideo] = useState(0);
  function toggleModalDelManagerVideo(id) {
    setDelManagerVideo(id);
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="wrap-manager-post-top">
        <h1>Quản lý video</h1>
        <div className="content-manager-video-add-btn">
          <Link to={`/add-video-manager`}>
            <button>Thêm video</button>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalDelManagerVideo}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-del-info-faculty">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelManagerVideo}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <p>Bạn chắc chắn có muốn xóa không ?</p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelManagerVideo}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteManagerVideoAdminTask({
                      delManagerVideo: delManagerVideo,
                    });
                    toggleModalDelManagerVideo();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="wrap-manager-post-bottom">
        <Table
          loading={listManagerVideo.load}
          columns={columns}
          pagination={true}
          dataSource={renderListManagerVideo()}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listManagerVideo } = state.managerVideoReducer;
  return {
    listManagerVideo: listManagerVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListManagerVideoAdminTask: (params) =>
      dispatch(getListManagerVideoAdminAction(params)),
    deleteManagerVideoAdminTask: (params) =>
      dispatch(deleteManagerVideoAdminAction(params)),
    updateBrowseManagerVideoAdminTask: (params) =>
      dispatch(updateBrowseManagerVideoAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

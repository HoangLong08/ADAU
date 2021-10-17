import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getListManagerPostAdminAction,
  deleteManagerPostAdminAction,
  updateBrowseManagerPostAdminAction,
  updateTypeManagerPostAction,
} from "../../redux/actions";
import { Table, Select } from "antd";

import "../ManagerPost/style.css";
import Modal from "react-modal";
const { Option } = Select;
Modal.setAppElement("#root");

function Index({
  match,
  listMangerPost,
  getListManagerPostAdminTask,
  deleteManagerPostAdminTask,
  updateBrowseManagerPostAdminTask,
  updateTypeManagerPostTask,
}) {
  const idFaculty = match.params?.id;
  const [listManagerState, setListManagerState] = useState(listMangerPost.data);
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getListManagerPostAdminTask({ idFaculty: idFaculty });
  }, [idFaculty, getListManagerPostAdminTask]);

  useEffect(() => {
    setListManagerState(listMangerPost.data);
  }, [listMangerPost]);

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
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
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

  const handleChangeType = (value, id, numberActive, numberType) => {
    // console.log("value: ", value, id, numberActive, numberType, idFaculty);
    updateTypeManagerPostTask({
      numberTypeNew: value,
      id: id,
      numberActive: numberActive,
      idFaculty: idFaculty,
    });
  };

  function renderListManagerPost() {
    return listManagerState?.map((item, index) => {
      console.log(
        "item.numberType === 2: ",
        item.numberType,
        item.numberType === 2
      );
      return {
        key: index,
        stt: index + 1,
        title: item.title,
        // type: item.type,
        type: (
          <Select
            defaultValue={
              item.numberType === 2 ? "Tin tức sự kiện" : "Bài viết thuộc menu"
            }
            style={{ width: 200 }}
            onChange={(value) => {
              handleChangeType(
                value,
                item.id,
                item.numberActive,
                item.numberType
              );
            }}
          >
            <Option value="2">Tin tức sự kiện</Option>
            <Option value="4">Bài viết thuộc menu</Option>
          </Select>
        ),
        admin: item.admin,
        time: item.updatedAT,
        view: item.view,
        status: item.active,
        action: (
          <div className="content-post-manager-btn">
            <a href={`/edit-post-manager/${item.id}/${idFaculty}`}>
              <button className="edit-manager-post-btn" title="Chỉnh sửa">
                <i className="far fa-edit"></i>
              </button>
            </a>

            <button
              title="Duyệt hoặc hủy duyệt"
              className="browse-manager-post-btn"
              onClick={() => {
                updateBrowseManagerPostAdminTask({
                  idFaculty: idFaculty,
                  id: item.id,
                });
              }}
            >
              <i className="fas fa-calendar-check"></i>
            </button>
            <button
              title="Xóa"
              className="del-manager-post-btn"
              onClick={() => toggleModalDelManagerPost(item.id)}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        ),
      };
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [delManagerPost, setDelManagerPost] = useState(0);
  function toggleModalDelManagerPost(id) {
    setDelManagerPost(id);
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="wrap-manager-post-top">
        <h1>Quản lý bài viết</h1>
        <div className="content-manager-post-add-btn">
          <Link to={`/add-post-manager/${idFaculty}`}>
            <button>Thêm bài viết</button>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalDelManagerPost}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-del-info-faculty">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelManagerPost}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <p>Bạn chắc chắn có muốn xóa không ?</p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelManagerPost}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteManagerPostAdminTask({
                      idFaculty: idFaculty,
                      delManagerPost: delManagerPost,
                    });
                    toggleModalDelManagerPost();
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
          loading={listMangerPost.load} // true is on
          columns={columns}
          pagination={true}
          dataSource={renderListManagerPost()}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listMangerPost } = state.managerPostReducer;
  return {
    listMangerPost: listMangerPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListManagerPostAdminTask: (params) =>
      dispatch(getListManagerPostAdminAction(params)),
    deleteManagerPostAdminTask: (params) =>
      dispatch(deleteManagerPostAdminAction(params)),
    updateBrowseManagerPostAdminTask: (params) =>
      dispatch(updateBrowseManagerPostAdminAction(params)),
    updateTypeManagerPostTask: (params) =>
      dispatch(updateTypeManagerPostAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

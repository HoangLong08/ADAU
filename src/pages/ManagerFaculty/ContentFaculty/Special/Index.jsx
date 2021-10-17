import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import {
  getListSpecialFacultyAdminAction,
  deleteSpecialFacultyAdminAction,
} from "../../../../redux/actions";
import "../Special/style.css";
import { connect } from "react-redux";

import Modal from "react-modal";

Modal.setAppElement("#root");

function Index({
  idFaculty,
  listSpecialFaculty,
  getListSpecialFacultyAdminTask,
  deleteSpecialFacultyAdminTask,
}) {
  useEffect(() => {
    getListSpecialFacultyAdminTask({ idFaculty: idFaculty });
  }, [getListSpecialFacultyAdminTask, idFaculty]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên chuyên ngành",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "des",
      key: "des",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  function renderListSpecial() {
    return listSpecialFaculty?.data?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        name: item.name,
        image: (
          <div className="image-special-faculty">
            <img src={item.image} alt="DAU" width="120" height="auto" />
          </div>
        ),
        des: item.des,
        action: (
          <div className="content-btn-special">
            <Link to={`/edit-special/${item.id}`}>
              <button className="edit-special-btn">
                <i className="far fa-edit"></i>
              </button>
            </Link>
            <button
              className="delete-special-btn"
              onClick={() => toggleModalDelPostFaculty(item.id)}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        ),
      };
    });
  }
  const [isOpenDelPost, setIsOpenPost] = useState(false);
  const [idDelPostFaculty, setIdDelPostFaculty] = useState(0);
  function toggleModalDelPostFaculty(id) {
    setIdDelPostFaculty(id);
    setIsOpenPost(!isOpenDelPost);
  }

  return (
    <div className="content-manager-faculty">
      <Modal
        isOpen={isOpenDelPost}
        onRequestClose={toggleModalDelPostFaculty}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-del-info-faculty">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelPostFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <p>Bạn chắc chắn có muốn xóa không ?</p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelPostFaculty}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteSpecialFacultyAdminTask({
                      idFaculty: idFaculty,
                      idDelPostFaculty: idDelPostFaculty,
                    });
                    toggleModalDelPostFaculty();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="wrap-special-faculty-top">
        <h1>Chuyên ngành khoa</h1>
        <div>
          <Link to={`/add-special/${idFaculty}`}>
            <button>Thêm chuyên ngành</button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={renderListSpecial()}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listSpecialFaculty } = state.managerFacultyReducer;
  return {
    listSpecialFaculty: listSpecialFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSpecialFacultyAdminTask: (params) =>
      dispatch(getListSpecialFacultyAdminAction(params)),
    deleteSpecialFacultyAdminTask: (params) =>
      dispatch(deleteSpecialFacultyAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

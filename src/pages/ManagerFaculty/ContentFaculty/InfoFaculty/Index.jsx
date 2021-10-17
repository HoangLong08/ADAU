import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getListInfoFacultyAdminAction,
  updateInfoFacultyAdminAction,
  deleteInfoFacultyAdminAction,
  postInfoFacultyAdminAction,
} from "../../../../redux/actions";
import Modal from "react-modal";
import { Table } from "antd";
import "../InfoFaculty/style.css";

Modal.setAppElement("#root");
function Index({
  idFaculty,
  listInfoFaculty,
  getListInfoFacultyAdminTask,
  updateInfoFacultyAdminTask,
  deleteInfoFacultyAdminTask,
  postInfoFacultyAdminTask,
}) {

  useEffect(() => {
    getListInfoFacultyAdminTask({ id: idFaculty });
  }, [getListInfoFacultyAdminTask, idFaculty]);
  const [listInfoState, setListInfoState] = useState(listInfoFaculty?.data);

  useEffect(() => {
    setListInfoState(listInfoFaculty?.data);
  }, [listInfoFaculty.data]);

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
      title: "Mô tả",
      dataIndex: "des",
      key: "des",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const [checkDoubleClick, setCheckDoubleClick] = useState({
    id: "",
    check: false,
    indexNumber: 0,
  });

  const [valueInfoFaculty, setValueInfoFaculty] = useState({
    id: "",
    title: "",
    des: "",
  });

  function handleChangeInfoFaculty(index, e) {
    const values = listInfoState.information[index];
    if (e.target.name === "title") {
      values.title = e.target.value;
    } else {
      values.des = e.target.value;
    }
    setValueInfoFaculty({ ...values });
  }

  function getId(item) {
    setCheckDoubleClick({
      ...checkDoubleClick,
      id: item.id,
      check: !checkDoubleClick.check,
      indexNumber: item.indexNumber,
    });
  }

  function renderListInfo() {
    return listInfoState.information?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        title: (
          <div key={index + 10}>
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              <input
                className="input-info-faculty input-info-tile"
                type="text"
                name="title"
                value={item.title}
                onChange={(e) => handleChangeInfoFaculty(index, e)}
              />
            ) : (
              <p> {item.title} </p>
            )}
          </div>
        ),
        des: (
          <div key={index + 20} className="div-info-des">
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              <input
                type="text"
                className="input-info-faculty input-info-des"
                name="des"
                value={item.des}
                onChange={(e) => handleChangeInfoFaculty(index, e)}
              />
            ) : (
              <p> {item.des} </p>
            )}
          </div>
        ),
        action: (
          <div className="content-info-faculty-btn" key={index}>
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              <button
                className="btn-update-info-faculty"
                onClick={() => {
                  setCheckDoubleClick({
                    id: "",
                    check: false,
                    indexNumber: 0,
                  });
                  updateInfoFacultyAdminTask({
                    idFaculty: idFaculty,
                    valueInfoFaculty: valueInfoFaculty,
                    indexNumber: checkDoubleClick.indexNumber,
                  });
                }}
              >
                <i className="fad fa-sync-alt"></i>
              </button>
            ) : (
              <button
                className="btn-edit-info-faculty"
                onClick={() => getId(item)}
              >
                <i className="far fa-edit"></i>
              </button>
            )}

            <button
              className="btn-del-info-faculty"
              onClick={() => toggleModalDelInfoFaculty(item.id)}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        ),
      };
    });
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddInfo, setIsOpenAddInfo] = useState(false);
  const [delInfoFaculty, setDelInfoFaculty] = useState(0);
  function toggleModalDelInfoFaculty(id) {
    setDelInfoFaculty(id);
    setIsOpen(!isOpen);
  }

  function toggleModalAddInfoFaculty() {
    setIsOpenAddInfo(!isOpenAddInfo);
  }

  const [valueAddInfoFaculty, setValueAddInfoFaculty] = useState({
    title: "",
    des: "",
  });

  const [errorAddInfoFaculty, setErrorAddInfoFaculty] = useState({
    title: "",
    des: "",
  });

  function handleAddInfoFaculty(e) {
    const { name, value } = e.target;
    setValueAddInfoFaculty({
      ...valueAddInfoFaculty,
      [name]: value,
    });
  }

  function handleSubAddInfoFaculty() {
    let isValue = true;

    const errorValue = {
      des: "",
      title: "",
    };

    if (valueAddInfoFaculty.des === "") {
      isValue = false;
      errorValue.des = "Vui lòng nhập mô tả ";
    } else {
      errorValue.des = "";
    }

    if (valueAddInfoFaculty.title === "") {
      isValue = false;
      errorValue.title = "Vui lòng nhập tiêu đề";
    } else {
      errorValue.title = "";
    }

    if (isValue) {
      postInfoFacultyAdminTask({
        ...valueAddInfoFaculty,
        idFaculty: idFaculty,
        indexNumber: 0,
      });
      setIsOpenAddInfo(!isOpenAddInfo);
      setErrorAddInfoFaculty({ ...errorValue });
    } else {
      setErrorAddInfoFaculty({ ...errorValue });
    }
  }

  return (
    <div className="content-manager-faculty">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalDelInfoFaculty}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-del-info-faculty">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelInfoFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <p>Bạn chắc chắn có muốn xóa không ?</p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelInfoFaculty}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteInfoFacultyAdminTask({
                      idFaculty: idFaculty,
                      delInfoFaculty: delInfoFaculty,
                    });
                    toggleModalDelInfoFaculty();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenAddInfo}
        onRequestClose={toggleModalAddInfoFaculty}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-add-info-faculty">
          <div className="modal-add-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalAddInfoFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <div className="form-group-info">
              <label htmlFor="">Tiêu để</label>
              <input
                type="text"
                placeholder="tiêu đề"
                value={valueAddInfoFaculty.title || ""}
                name="title"
                onChange={(e) => handleAddInfoFaculty(e)}
              />
              {errorAddInfoFaculty.title && (
                <small>{errorAddInfoFaculty.title}</small>
              )}
            </div>
            <div className="form-group-info form-input-error">
              <label htmlFor="">Mô tả</label>
              <input
                type="text"
                placeholder="Mô tả"
                value={valueAddInfoFaculty.des || ""}
                name="des"
                onChange={(e) => handleAddInfoFaculty(e)}
              />
              {errorAddInfoFaculty.des && (
                <small className="small-text-error">{errorAddInfoFaculty.des}</small>
              )}
            </div>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalAddInfoFaculty}>Hủy</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleSubAddInfoFaculty();
                  }}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <h1>Thông tin khoa</h1>
      <div className="content-info-faculty">
        <Table
          columns={columns}
          pagination={false}
          dataSource={renderListInfo()}
        />

        {listInfoFaculty?.data?.information?.length < 5 && (
          <div className="content-add-faculty">
            <button
              onClick={() => {
                toggleModalAddInfoFaculty();
              }}
            >
              Thêm thông tin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listInfoFaculty } = state.managerFacultyReducer;
  return {
    listInfoFaculty: listInfoFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListInfoFacultyAdminTask: (params) =>
      dispatch(getListInfoFacultyAdminAction(params)),
    updateInfoFacultyAdminTask: (params) =>
      dispatch(updateInfoFacultyAdminAction(params)),
    deleteInfoFacultyAdminTask: (params) =>
      dispatch(deleteInfoFacultyAdminAction(params)),
    postInfoFacultyAdminTask: (params) =>
      dispatch(postInfoFacultyAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Modal from "react-modal";
import { Table } from "antd";

import {
  getListPartnerAdminAction,
  updatePartnerAdminAction,
  deletePartnerAdminAction,
  addPartnerAdminAction,
} from "../../redux/actions";
import "../Partner/style.css";
import { notification } from "antd";
const openNotificationWithIcon = (type, notify) => {
  notification[type]({
    message: "",
    description: notify,
    duration: 30,
  });
};

Modal.setAppElement("#root");
function Index({
  match,
  listPartner,
  getListPartnerAdminTask,
  updatePartnerAdminTask,
  deletePartnerAdminTask,
  addPartnerAdminTask,
}) {
  const idFaculty = match.params.id;
  const [listPartnerState, setListPartnerState] = useState(listPartner.data);

  useEffect(() => {
    getListPartnerAdminTask({ idFaculty: idFaculty });
  }, [getListPartnerAdminTask, idFaculty]);

  useEffect(() => {
    setListPartnerState(listPartner.data);
  }, [listPartner]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên đối tác",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
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
  });

  const [valuePartner, setValuePartner] = useState({
    id: "",
    name: "",
    link: "",
    image: "",
  });

  const [checkSizeImage, setCheckSizeImage] = useState("");

  function handleChangePartner(index, e) {
    const values = listPartnerState[index];
    if (e.target.name === "name") {
      values.name = e.target.value;
    } else if (e.target.name === "link") {
      values.link = e.target.value;
    } else {
      if (e.target.files[0]?.size > 1048770) {
        setCheckSizeImage("Kích thước file tối đa 1MB");
        openNotificationWithIcon("error", "Kích thước file tối đa 1MB");
      } else {
        setCheckSizeImage("");
        values.image = e.target.files[0];
      }
    }
    setValuePartner({ ...values });
  }

  function getId(item) {
    setCheckDoubleClick({
      ...checkDoubleClick,
      id: item.id,
      check: !checkDoubleClick.check,
    });
  }
  const [isOpen, setIsOpen] = useState(false);
  const [delPartnerFaculty, setDelPartnerFaculty] = useState(0);

  function toggleModalDelPartnerFaculty(id) {
    setDelPartnerFaculty(id);
    setIsOpen(!isOpen);
  }

  function renderListPartner() {
    return listPartnerState?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        name: (
          <div key={index + 10}>
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              <input
                className="input-part-manager input-partner-name"
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleChangePartner(index, e)}
              />
            ) : (
              <p> {item.name} </p>
            )}
          </div>
        ),
        image: (
          <div key={index}>
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              <input
                className="input-part-manager input-partner-file"
                type="file"
                name="image"
                onChange={(e) => handleChangePartner(index, e)}
              />
            ) : (
              <div>
                <img src={item.image} alt="dau" width="auto" height="60" />
              </div>
            )}
          </div>
        ),
        link: (
          <div key={index}>
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              <input
                className="input-part-manager input-info-tile"
                type="text"
                name="link"
                value={item.link}
                onChange={(e) => handleChangePartner(index, e)}
              />
            ) : (
              <p>{item.link}</p>
            )}
          </div>
        ),
        action: (
          <div className="content-action-manager-partner">
            {checkDoubleClick.check && checkDoubleClick.id === item.id ? (
              checkSizeImage.length === 0 && (
                <button
                  className="btn-update-info-faculty"
                  onClick={() => {
                    setCheckDoubleClick({
                      id: "",
                      check: false,
                    });
                    updatePartnerAdminTask({
                      idFaculty: idFaculty,
                      valuePartner: valuePartner,
                    });
                  }}
                >
                  <i className="fad fa-sync-alt"></i>
                </button>
              )
            ) : (
              <button
                className="btn-edit-info-faculty"
                onClick={() => getId(item)}
              >
                <i className="far fa-edit"></i>
              </button>
            )}

            <button
              className="btn-del-partner"
              onClick={() => toggleModalDelPartnerFaculty(item.id)}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        ),
      };
    });
  }

  const [isOpenAddPartner, setIsOpenAddPartner] = useState(false);
  const [valuePartnerFaculty, setValuePartnerFaculty] = useState({
    name: "",
    link: "",
    image: "",
  });

  const [errorPartnerFaculty, setErrorPartnerFaculty] = useState({
    name: "",
    link: "",
    image: "",
  });

  function handleAddPartner(e) {
    const { name, value, type } = e.target;
    if (type === "file") {
      if (e.target.files[0]?.size > 1048770) {
        setCheckSizeImage("Kích thước file tối đa 1MB");
        openNotificationWithIcon("error", "Kích thước file tối đa 1MB");
      } 
    }
    else {
      setCheckSizeImage("");
      setValuePartnerFaculty({
        ...valuePartnerFaculty,
        [name]: type === "file" ? e.target.files[0] : value,
      });
    }
  }

  function toggleModalAddPartnerFaculty() {
    setIsOpenAddPartner(!isOpenAddPartner);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalDelPartnerFaculty}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-del-info-faculty">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelPartnerFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <p>Bạn chắc chắn có muốn xóa đối tác này không ?</p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelPartnerFaculty}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deletePartnerAdminTask({
                      idFaculty: idFaculty,
                      delPartnerFaculty: delPartnerFaculty,
                    });
                    toggleModalDelPartnerFaculty();
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
        isOpen={isOpenAddPartner}
        onRequestClose={toggleModalAddPartnerFaculty}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-del-add-partner">
          <div className="modal-del-add-partner-top">
            <h3>Thêm thông tin đối tác</h3>
            <div className="close-btn">
              <button onClick={toggleModalAddPartnerFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <div className="form-group-partner-add">
              <label htmlFor="">Tên đối tác</label>
              <input
                className={
                  errorPartnerFaculty.name.length > 0 ? "form-input-error" : ""
                }
                type="text"
                name="name"
                value={valuePartnerFaculty.name}
                onChange={(e) => handleAddPartner(e)}
              />
              {errorPartnerFaculty?.name && (
                <small className="small-text-error">
                  {errorPartnerFaculty?.name}
                </small>
              )}
            </div>
            <div className="form-group-partner-add">
              <label htmlFor="">Chọn logo của đối tác</label>
              <input
                className={
                  errorPartnerFaculty.image.length > 0 ? "form-input-error" : ""
                }
                type="file"
                name="image"
                onChange={(e) => handleAddPartner(e)}
              />
              {errorPartnerFaculty?.image && (
                <small className="small-text-error">
                  {errorPartnerFaculty?.image}
                </small>
              )}
            </div>

            <div className="form-group-partner-add">
              <label htmlFor="">Link đối tác</label>
              <input
                className={
                  errorPartnerFaculty.link.length > 0 ? "form-input-error" : ""
                }
                type="text"
                name="link"
                value={valuePartnerFaculty.link}
                onChange={(e) => handleAddPartner(e)}
              />
              {errorPartnerFaculty?.link && (
                <small className="small-text-error">
                  {errorPartnerFaculty?.link}
                </small>
              )}
            </div>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalAddPartnerFaculty}>Không</button>
              </div>
              <div>
                {checkSizeImage.length > 0 ? (
                  <button>
                    Thêm
                    <p>{checkSizeImage}</p>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      let isValue = true;

                      const errorValue = {
                        name: "",
                        link: "",
                        image: "",
                      };

                      if (valuePartnerFaculty.name === "") {
                        isValue = false;
                        errorValue.name = "Vui lòng nhập tên đối tác";
                      } else {
                        errorValue.name = "";
                      }

                      // if (valuePartnerFaculty.image === "") {
                      //   isValue = false;
                      //   errorValue.image = "Vui lòng chọn hình ảnh";
                      // } else {
                      //   errorValue.image = "";
                      // }

                      if (valuePartnerFaculty.link === "") {
                        isValue = false;
                        errorValue.link = "Vui lòng nhập link đối tác";
                      } else {
                        errorValue.link = "";
                      }

                      if (isValue) {
                        addPartnerAdminTask({
                          idFaculty: idFaculty,
                          valuePartnerFaculty: valuePartnerFaculty,
                        });
                        toggleModalAddPartnerFaculty();
                        setErrorPartnerFaculty({ ...errorValue });
                      } else {
                        setErrorPartnerFaculty({ ...errorValue });
                      }
                    }}
                  >
                    Thêm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="wrap-manager-partner-top">
        <h3>Quản lý đối tác</h3>
        <div className="content-manager-partner-add">
          <button onClick={toggleModalAddPartnerFaculty}>Thêm đối tác</button>
        </div>
      </div>

      <div className="wrap-manager-partner-bottom">
        <Table
          loading={listPartner.load}
          columns={columns}
          pagination={false}
          dataSource={renderListPartner()}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listPartner } = state.managerPartnerReducer;
  return {
    listPartner: listPartner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListPartnerAdminTask: (params) =>
      dispatch(getListPartnerAdminAction(params)),
    updatePartnerAdminTask: (params) =>
      dispatch(updatePartnerAdminAction(params)),

    deletePartnerAdminTask: (params) =>
      dispatch(deletePartnerAdminAction(params)),
    addPartnerAdminTask: (params) => dispatch(addPartnerAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getMenuFacultyAdminAction,
  updateMenuFacultyAdminAction,
  deleteMenuFacultyAdminAction,
  getListPostMenuFacultyAdminAction,
  updateAcceptPostMenuFacultyAdminAction,
  updateNoAcceptPostMenuFacultyAdminAction,
} from "../../../redux/actions";
import Modal from "react-modal";
import { Table, Button } from "antd";
import "../MenuCelc/style.css";
Modal.setAppElement("#root");
function Index({
  idFaculty = 9,
  menuFaculty,
  delMenuFaculty,
  listPostMenu,
  acceptPostMenuFaculty,
  getMenuFacultyAdminTask,
  updateMenuFacultyAdminTask,
  deleteMenuFacultyAdminTask,
  getListPostMenuFacultyAdminTask,
  updateAcceptPostMenuFacultyAdminTask,
  updateNoAcceptPostMenuFacultyAdminTask,
}) {
  const [idMain, setIdMain] = useState(100);
  const [idSub, setIdSub] = useState(parseInt(200) + parseInt(idFaculty));
  const [listPostMenuState, setListPostMenuState] = useState(
    listPostMenu?.data
  );
  const [idPostMenuFaculty, setIdPostMenuFaculty] = useState(0);
  const [inputFieldsMain, setInputFieldsMain] = useState([
    {
      id: "",
      numberIndex: 0,
      sub: [
        // {
        //   id: "",
        //   idOnly: "",
        //   link: "",
        //   numberIndex: 0,
        //   sub: [],
        //   table: "",
        //   title: "",
        // },
      ],
      table: "",
      title: "",
      link: "",
    },
  ]);

  useEffect(() => {
    getMenuFacultyAdminTask({ id: idFaculty });
  }, [getMenuFacultyAdminTask, idFaculty]);

  useEffect(() => {
    setInputFieldsMain(menuFaculty.data);
    setListPostMenuState(listPostMenu?.data);
  }, [menuFaculty, listPostMenu]);

  useEffect(() => {
    if (delMenuFaculty?.data?.check) {
      getMenuFacultyAdminTask({ id: idFaculty });
    }
  }, [delMenuFaculty, idFaculty, getMenuFacultyAdminTask]);

  function handleAddFieldMain(idMainAgr) {
    const values = [...inputFieldsMain];
    values.push({
      idMain: idMain + 1,
      idOnly: idMain + 2,
      id: "",
      numberIndex: idMainAgr + 2,
      sub: [
        // { id: "", link: "", numberIndex: 0, sub: [], table: "", title: "" },
      ],
      table: "",
      title: "",
      link: "",
    });
    setInputFieldsMain(values);
  }

  const handleInputChangeMain = (index, event) => {
    const values = [...inputFieldsMain];
    if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else {
      values[index].link = event.target.value;
    }
    setInputFieldsMain(values);
  };

  function handleAddFieldSub(idMainAgr) {
    const findElementMain = inputFieldsMain.filter((item) => {
      return item.idOnly === idMainAgr;
    });

    const arrTemp = [...findElementMain[0].sub];
    arrTemp.push({
      id: "",
      idOnly: idSub,
      link: "",
      numberIndex: 1,
      sub: [],
      table: "",
      title: "",
    });

    const res = inputFieldsMain.map((item) => ({
      ...item,
      sub: item.idOnly === idMainAgr ? arrTemp : item.sub,
    }));
    setInputFieldsMain(res);
  }

  const handleInputChangeSub = (idMainAgr, index, event) => {
    const findElementSub = inputFieldsMain.filter((item) => {
      return item.idOnly === idMainAgr;
    });
    const values = [...findElementSub[0].sub];
    if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else {
      values[index].link = event.target.value;
    }

    const res = inputFieldsMain.map((item) => ({
      ...item,
      sub: item.idOnly === idMainAgr ? values : item.sub,
    }));
    setInputFieldsMain(res);
  };

  function handleRemoveFieldMain(index) {
    const res = [...inputFieldsMain];
    res.splice(index, 1);
    setInputFieldsMain(res);
  }

  function handleRemoveFieldSub(idMainAgr, index) {
    const findElementSub = inputFieldsMain.filter((item) => {
      return item.idOnly === idMainAgr;
    });

    const values = [...findElementSub[0].sub];
    values.splice(index, 1);

    const res = inputFieldsMain.map((item) => ({
      ...item,
      sub: item.idOnly === idMainAgr ? values : item.sub,
    }));

    setInputFieldsMain(res);
  }

  function renderListInputSub(item, link) {
    if (item.sub.length === 0 && link.length === 0) {
      return (
        <div className="menu-sub" key={1}>
          <button
            className="add-li-menu"
            onClick={() => {
              setIdSub(idSub + 1);
              handleAddFieldSub(item.idOnly); // phân biệt nut thêm thuộc item nào trong menu - main
            }}
          >
            <i className="far fa-plus"></i>
          </button>
        </div>
      );
    } else {
      return item.sub.map((item_, index) => {
        return (
          <div className="menu-sub" key={index}>
            <input
              type="text"
              className="input-menu input-title"
              name="title"
              value={item_.title}
              onChange={(event) =>
                handleInputChangeSub(item.idOnly, index, event)
              }
              placeholder="title sub"
            />
            <input
              type="text"
              disabled={item_.link === "!@#$%^&*()" ? true : false}
              className="input-menu input-link"
              name="link"
              value={
                item_.link === "!@#$%^&*()"
                  ? item_.link.replace("!@#$%^&*()", "#")
                  : item_.link
              }
              onChange={(event) =>
                handleInputChangeSub(item.idOnly, index, event)
              }
              placeholder="link sub"
            />
            {item.sub.length - 1 === index && (
              <button
                className="add-li-menu"
                onClick={() => {
                  setIdSub(idSub + 1);
                  handleAddFieldSub(item.idOnly); // phân biệt nut thêm thuộc item nào trong menu - main
                }}
              >
                <i className="far fa-plus"></i>
              </button>
            )}

            {item_.link === "!@#$%^&*()" && (
              <button
                className="show-li-menu"
                onClick={() => {
                  setIdPostMenuFaculty(item_.id);
                  getListPostMenuFacultyAdminTask({
                    id: item_.id,
                    idFaculty: idFaculty,
                  });
                  toggleModalPostMenuFaculty();
                }}
              >
                <i className="far fa-network-wired"></i>
              </button>
            )}

            <button
              className="del-li-menu"
              onClick={() => {
                if (item_.title.length === 0 || item_.link.length === 0) {
                  handleRemoveFieldSub(item.idOnly, index);
                } else {
                  toggleModalDelMenuFaculty(item_.id, item_.table);
                }
              }}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        );
      });
    }
  }
  function renderListInput() {
    return inputFieldsMain.map((item, index) => {
      // if (item.sub.length === 0) {
      //   item.sub.push({
      //     id: idSub + index,
      //     link: "",
      //     numberIndex: "",
      //     sub: [],
      //     table: "",
      //     title: "",
      //   });
      // }
      return (
        <div className="menu-main" key={index}>
          <input
            type="text"
            className="input-menu input-title"
            name="title"
            value={item.title}
            onChange={(event) => handleInputChangeMain(index, event)}
            placeholder="title main"
          />
          <input
            type="text"
            disabled={item.sub.length > 0 && true}
            className="input-menu input-link"
            name="link"
            value={item.link === "#" ? item.link.replace("#", "") : item.link}
            onChange={(event) => handleInputChangeMain(index, event)}
            onKeyPress={(e) => {
              if (e.key === "#" && item.link.length === 1) {
                alert("Vui lòng không nhập ký tự #");
              }
              // e.target.value = item.link;
            }}
            placeholder="link main"
          />
          {inputFieldsMain.length - 1 === index && (
            <button
              className="add-li-menu"
              onClick={() => {
                setIdMain(idMain + 1);
                handleAddFieldMain(index);
              }}
            >
              <i className="far fa-plus"></i>
            </button>
          )}

          {item.link === "0" && (
            <button
              className="show-li-menu"
              onClick={() => {
                setIdPostMenuFaculty(item.id);
                getListPostMenuFacultyAdminTask({
                  id: item.id,
                  idFaculty: idFaculty,
                });
                toggleModalPostMenuFaculty();
              }}
            >
              <i className="far fa-network-wired"></i>
            </button>
          )}

          <button
            className="del-li-menu"
            onClick={(e) => {
              if (inputFieldsMain[index].title.length === 0) {
                handleRemoveFieldMain(index);
              } else {
                toggleModalDelMenuFaculty(item.id, item.table);
              }
            }}
          >
            <i className="far fa-trash"></i>
          </button>

          {renderListInputSub(item, item.link)}
        </div>
      );
    });
  }
  const [delMenuState, setDelMenuState] = useState({ id: 0, table: 0 });
  const [isOpen, setIsOpen] = useState(false);
  function toggleModalDelMenuFaculty(id, table) {
    setDelMenuState({ id: id, table: table });
    setIsOpen(!isOpen);
  }

  const [isOpenPostMenu, setIsOpenPostMenu] = useState(false);
  function toggleModalPostMenuFaculty() {
    setIsOpenPostMenu(!isOpenPostMenu);
  }

  const columns = [
    {
      title: "Tiêu đề bài viết",
      dataIndex: "namePost",
      key: "namePost",
    },
    {
      title: "Thời gian",
      dataIndex: "timePost",
      key: "timePost",
    },
    {
      title: "Tình trạng",
      dataIndex: "action",
      key: "action",
    },
  ];

  function renderListPostMenu() {
    return listPostMenuState?.map((item, index) => {
      return {
        key: index,
        namePost: item.title,
        timePost: <p className="time-post-faculty">{item.updatedAT}</p>,
        action: (
          <div className="content-btn-post-faculty">
            {item.active === 0 ? (
              <Button
                type="primary"
                loading={listPostMenu.load ? true : false}
                onClick={() =>
                  updateAcceptPostMenuFacultyAdminTask({
                    id: item.id,
                    idMenu: idPostMenuFaculty,
                    idFaculty: idFaculty,
                  })
                }
              >
                Liên kết
              </Button>
            ) : (
              <Button
                type="danger"
                loading={listPostMenu.load ? true : false}
                onClick={() => {
                  updateNoAcceptPostMenuFacultyAdminTask({
                    id: item.id,
                    idMenu: idPostMenuFaculty,
                    idFaculty: idFaculty,
                  });
                }}
              >
                Hủy liên kết
              </Button>
            )}
          </div>
        ),
      };
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalDelMenuFaculty}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-logout">
          <div className="modal-logout-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelMenuFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <h2>Bạn có chắc chắn muốn xóa không ?</h2>
            <p>
              <p className="text-note-menu-celc"> Lưu ý:</p> Nếu xóa thẻ này
              thì các bài viết được liên kết đồng thời sẽ bị xóa.
              <br />
              Nếu muốn sử dụng lại các bài viết <b> vui lòng hủy liên kết </b>
              trước khi xóa
            </p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelMenuFaculty}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    toggleModalDelMenuFaculty();
                    deleteMenuFacultyAdminTask(delMenuState);
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal // post của menu
        isOpen={isOpenPostMenu}
        onRequestClose={toggleModalPostMenuFaculty}
        contentLabel="My dialogg"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-menu-post">
          <div className="modal-menu-post-top">
            <div>Danh sách bài viết</div>
            <div className="close-btn">
              <button onClick={toggleModalPostMenuFaculty}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div className="modal-menu-post-bottom">
            <Table
              columns={columns}
              pagination={false}
              dataSource={renderListPostMenu()}
            />
          </div>
        </div>
      </Modal>

      <div className="content-manager-faculty">
        <div className="content-menu-faculty-top">
          <h1>Menu câu lạc bộ</h1>
          {/* <p>Lưu ý: Khi muốn </p> */}
          <div className="btn-update-menu-faculty">
            <button
              onClick={() =>
                updateMenuFacultyAdminTask({
                  idFaculty: idFaculty,
                  inputFieldsMain: inputFieldsMain,
                })
              }
            >
              Cập nhật
            </button>
          </div>
        </div>
        <div className="content-menu-faculty">
          {inputFieldsMain.length === 0 ? (
            <button
              className="add-li-menu"
              onClick={() => {
                setIdMain(idMain + 1);
                handleAddFieldMain(0);
              }}
            >
              <i className="far fa-plus"></i>
            </button>
          ) : (
            renderListInput()
          )}
        </div>
        {/* <pre>{JSON.stringify(inputFieldsMain, null, 2)}</pre> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { menuFaculty, delMenuFaculty, listPostMenu } =
    state.managerFacultyReducer;
  return {
    menuFaculty: menuFaculty,
    delMenuFaculty: delMenuFaculty,
    listPostMenu: listPostMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenuFacultyAdminTask: (params) =>
      dispatch(getMenuFacultyAdminAction(params)),
    updateMenuFacultyAdminTask: (params) =>
      dispatch(updateMenuFacultyAdminAction(params)),
    deleteMenuFacultyAdminTask: (params) =>
      dispatch(deleteMenuFacultyAdminAction(params)),
    getListPostMenuFacultyAdminTask: (params) =>
      dispatch(getListPostMenuFacultyAdminAction(params)),

    updateAcceptPostMenuFacultyAdminTask: (params) =>
      dispatch(updateAcceptPostMenuFacultyAdminAction(params)),

    updateNoAcceptPostMenuFacultyAdminTask: (params) =>
      dispatch(updateNoAcceptPostMenuFacultyAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

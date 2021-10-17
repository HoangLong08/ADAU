import React, { useState, useEffect } from "react";
import { Table } from "antd";
import {
  getListAccountAdminAction,
  getListRoleAdminAction,
  getListManagerAdminAction,
  updateRoleAccountAdminAction,
  deleteAccountAdminAction,
  updateBlockAndUnBlockAccountAction,
} from "../../redux/actions";
import "../AccountUser/style.css";
import { connect } from "react-redux";

import Modal from "react-modal";
Modal.setAppElement("#root");
function Index({
  listAccount,
  listRole,
  listManager,
  getListAccountAdminTask,
  getListRoleAdminTask,
  getListManagerAdminTask,
  updateRoleAccountAdminTask,
  deleteAccountAdminTask,
  updateBlockAndUnBlockAccountTask,
}) {
  const [listAccountState, setListAccountState] = useState(listAccount.data);
  const [listManagerState, setListManagerState] = useState(listManager.data);
  useEffect(() => {
    getListAccountAdminTask();
    getListRoleAdminTask();
    getListManagerAdminTask();
  }, [getListAccountAdminTask, getListRoleAdminTask, getListManagerAdminTask]);

  useEffect(() => {
    setListAccountState(listAccount.data);
    setListManagerState(listManager.data);
  }, [listAccount, listManager]);

  const columns = [
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Avatar", dataIndex: "image", key: "image" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Action", dataIndex: "action", key: "action" },
  ];

  const columnsTwo = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
  ];

  function renderListAccount() {
    return listAccountState?.map((item, index) => {
      return {
        key: index,
        name: item.fullName,
        image: (
          <div>
            <img
              src={item.image}
              alt="avatar"
              width="32"
              height="32"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        ),
        email: item.email,
        phone: item.phone,
        gender: item.gender,
        role: item.nameRole,
        birthday: item.birthday,
        address:
          item.address +
          "-" +
          item.street +
          "-" +
          item.district +
          "-" +
          item.city,

        action: (
          <>
            <div className="content-action-manager-account">
              <button
                className="btn-update-manager-account"
                onClick={() => {
                  toggleModalUpdateAccount(
                    item.id,
                    item.idRole,
                    item.manager,
                    item.fullName
                  );
                }}
              >
                <i className="fas fa-sync"></i>
              </button>
              <button
                className="btn-block-manager-account"
                onClick={() => toggleModalBlockAccount(item.id, item.disable)}
              >
                {item.disable === "0" ? (
                  <i className="far fa-lock-alt"></i>
                ) : (
                  <i className="far fa-lock-open-alt"></i>
                )}
              </button>
              <button
                className="btn-delete-manager-account"
                onClick={() => toggleModalDelAccount(item.id)}
              >
                <i className="far fa-trash"></i>
              </button>
            </div>
          </>
        ),
        listManager: item.manager.map((item_, index_) => {
          return {
            key: index_,
            id: item_.id,
            name: item_.name,
          };
        }),
      };
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [valueAccount, setValueAccount] = useState({
    id: 0,
    idRole: 0,
    manager: [],
  });

  function handleChangeUpdateAccount(e) {
    const { name, value } = e.target;
    setValueAccount({
      ...valueAccount,
      [name]: value,
    });
  }

  const [nameUser, setNameUser] = useState("");

  function toggleModalUpdateAccount(id, idRole, manager, name) {
    setValueAccount({
      ...valueAccount,
      id: id,
      idRole: idRole,
      manager: manager,
    });
    setIsOpen(!isOpen);
    setInputs(manager?.sort((a, b) => a?.id - b?.id));
    setNameUser(name);
  }

  function renderListRole() {
    return listRole.data?.map((item, index) => {
      return (
        <option key={index} value={parseInt(item.id)}>
          {item.name}
        </option>
      );
    });
  }

  const tmp_ = [];
  const [inputs, setInputs] = useState([]);

  function checkedBox(item) {
    if (parseInt(valueAccount.idRole) === 1) {
      return true;
    } else {
      const find = valueAccount?.manager?.findIndex(
        (item_) => item_?.id === parseInt(item.id)
      );
      return find > -1;
    }
  }

  function renderListManager() {
    for (let i = 0; i < valueAccount.manager?.length; i++) {
      let j = valueAccount.manager[i].id;
      tmp_.push(j?.toString());
    }
    return listManagerState?.map((item, index) => {
      return (
        <div key={index}>
          <input
            type="checkbox"
            id={item.name}
            defaultChecked={checkedBox(item)}
            disabled={parseInt(valueAccount.idRole) === 1 ? "disabled" : false}
            name="nameFaculty"
            value={item.name}
            onClick={() => {
              const index = inputs.findIndex(
                (item_) => item_.name === item.name
              );

              if (index > -1) {
                const newArr = [...inputs];
                newArr.splice(index, 1);
                setInputs(newArr.sort((a, b) => a.id - b.id));
              } else {
                setInputs([...inputs, item].sort((a, b) => a.id - b.id));
              }
            }}
          />
          <label htmlFor={item.name}> {item.name}</label>
        </div>
      );
    });
  }

  const [isOpenBlockAccount, setIsOpenBlockAccount] = useState(false);
  const [valueBlockAccount, setValueBlockAccount] = useState({
    id: 0,
    disable: 0,
  });
  function toggleModalBlockAccount(id, disable) {
    setValueBlockAccount({
      ...valueBlockAccount,
      id: id,
      disable: disable,
    });
    setInputs([]);
    setIsOpenBlockAccount(!isOpenBlockAccount);
  }

  const [isOpenDelAccount, setIsOpenDelAccount] = useState(false);
  const [valueDelAccount, setValueDelAccount] = useState(0);

  function toggleModalDelAccount(id) {
    setValueDelAccount(id);
    setIsOpenDelAccount(!isOpenDelAccount);
  }

  return (
    <div className="wrap-manger-account">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalUpdateAccount}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-manager-account">
          <div className="modal-manager-account-top">
            <h3>Thiết lập phân quyền cho {nameUser}</h3>
            <div className="close-btn">
              <button onClick={toggleModalUpdateAccount}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <div className="role-account-manager-group">
              <label htmlFor="">Vai trò</label>
              <select
                name="idRole"
                onChange={(e) => handleChangeUpdateAccount(e)}
                value={valueAccount.idRole}
              >
                <option value="5">Chọn phân quyền</option>
                {renderListRole()}
              </select>
            </div>
            <div className="list-manager-account-group">
              {valueAccount.idRole !== "5" && (
                <>
                  <label htmlFor="">Danh sách quản lý</label>
                  {renderListManager()}{" "}
                </>
              )}
            </div>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalUpdateAccount}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    updateRoleAccountAdminTask({
                      idRole: valueAccount.idRole,
                      id: valueAccount.id,
                      faculties: inputs,
                    });
                    toggleModalUpdateAccount();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal // modal block acc
        isOpen={isOpenBlockAccount}
        onRequestClose={toggleModalBlockAccount}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-manager-account">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalBlockAccount}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>
          <div>
            <p>
              Bạn có muốn
              {valueBlockAccount.disable === "0" ? " mở khóa " : "khóa "} tài
              khoản này không ?
            </p>
          </div>
          <div>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalBlockAccount}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    updateBlockAndUnBlockAccountTask({
                      id: valueBlockAccount.id,
                    });
                    toggleModalBlockAccount();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal // modal delete acc
        isOpen={isOpenDelAccount}
        onRequestClose={toggleModalDelAccount}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-manager-account">
          <div className="modal-del-info-faculty-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModalDelAccount}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>
          <div>Bạn chắc chắn có muốn xóa không ?</div>
          <div>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModalDelAccount}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteAccountAdminTask({ id: valueDelAccount });
                    toggleModalDelAccount();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <h1>Danh sách tài khoản</h1>
      <div>
        <Table
          loading={listAccount.load}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <p>Ngày sinh: {record.birthday}</p>
                <p>Địa chỉ: {record.address}</p>
                <Table
                  pagination={false}
                  columns={columnsTwo}
                  dataSource={record.listManager}
                />
              </>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={renderListAccount()}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listAccount, listManager, listRole } = state.managerAccountReducer;
  return {
    listAccount: listAccount,
    listManager: listManager,
    listRole: listRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListAccountAdminTask: () => dispatch(getListAccountAdminAction()),
    getListRoleAdminTask: () => dispatch(getListRoleAdminAction()),
    getListManagerAdminTask: () => dispatch(getListManagerAdminAction()),
    updateRoleAccountAdminTask: (params) =>
      dispatch(updateRoleAccountAdminAction(params)),
    deleteAccountAdminTask: (params) =>
      dispatch(deleteAccountAdminAction(params)),
    updateBlockAndUnBlockAccountTask: (params) =>
      dispatch(updateBlockAndUnBlockAccountAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

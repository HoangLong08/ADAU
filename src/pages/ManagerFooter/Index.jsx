import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getListManagerFooterAdminAction,
  updateListManagerFooterAdminAction,
  updateLogoFooterManagerAdminAction,
} from "../../redux/actions";
import "../ManagerFooter/style.css";
function Index({
  listManagerFooter,
  getListManagerFooterAdminTask,
  updateListManagerFooterAdminTask,
  updateLogoFooterManagerAdminTask,
}) {

  const [listFooterState, setListFooterState] = useState(
    listManagerFooter.data
  );

  const [valueInput, setValueInput] = useState([
    {
      id: 0,
      title: "",
      detail: [],
    },
  ]);

  const [imageLogoFooter, setImageLogoFooter] = useState("");

  useEffect(() => {
    getListManagerFooterAdminTask();
  }, [getListManagerFooterAdminTask]);

  useEffect(() => {
    setListFooterState(listManagerFooter.data);
    setValueInput(listManagerFooter.data);
  }, [listManagerFooter]);

  const handleChangeInput = (index, event) => {
    const values = [...valueInput];
    if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else {
      values[index].link = event.target.value;
    }
    setValueInput(values);
  };

  const handleChangeInputSub = (id, index, event) => {
    const findElementSub = valueInput.filter((item) => {
      return item.id === id;
    });

    const values = [...findElementSub[0].detail];
    if (event.target.type === "file") {
      values[index].title = event.target.files[0];
    } else if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else {
      values[index].link = event.target.value;
    }

    const res = valueInput.map((item) => ({
      ...item,
      detail: item.id === id ? values : item.detail,
    }));
    setValueInput(res);
  };

  function handleChangeImageInputSub(e) {
    setImageLogoFooter(e.target.files[0]);
  }

  const [checkClick, setCheckCLick] = useState(false);

  function handleAddFooterMain(idMain, index) {
    // const values = [...valueInput];
    // values.push({
    //   ...valueInput,
    //   detail: [...valueInput.detail],
    // });
    // setValueInput(values);
    const findElementSub = valueInput.filter((item) => {
      return item.id === idMain;
    });
    const values = [...findElementSub[0].detail];

    values.push({
      id: Math.floor(Math.random() * 3) + 105078,
      link: "",
      title: "",
    });
    const res = valueInput.map((item) => ({
      ...item,
      detail: item.id === idMain ? values : item.detail,
    }));
    setValueInput(res);
  }

  function handleDelFooterChild(idMain, idSub, index) {
    const findElementSub = valueInput.filter((item) => {
      return item.id === idMain;
    });

    const values = [...findElementSub[0].detail];

    values.splice(index, 1);
    const res = valueInput.map((item) => ({
      ...item,
      detail: item.id === idMain ? values : item.detail,
    }));

    setValueInput(res);
  }

  function renderFooterChild(arr, id_) {
    return arr.map((item, index) => {
      return (
        <div className="form-group-manager-footer" key={index}>
          <input
            type="text"
            name="title"
            value={item.title || ""}
            onChange={(e) => handleChangeInputSub(id_, index, e)}
          />
          {/* <button className="btn-edit-manager-footer">
            <i className="far fa-edit"></i>
          </button> */}
          <button
            className="btn-del-manager-footer"
            onClick={() => handleDelFooterChild(id_, item.id, index)}
          >
            <i className="far fa-trash"></i>
          </button>
          <div className="text-link-manager-footer">
            <input
              type="text"
              name="link"
              value={item.link || ""}
              onChange={(e) => handleChangeInputSub(id_, index, e)}
            />
          </div>
        </div>
      );
    });
  }

  function renderListFooter() {
    return valueInput?.map((item, index) => {
      if (index === 0) {
        return null;
      } else {
        return (
          <div className="content-manager-footer" key={index}>
            <div className="form-group-manager-footer">
              <input
                type="text"
                name="title"
                value={item.title || ""}
                onChange={(e) => handleChangeInput(index, e)}
              />
              <button
                className="btn-edit-manager-footer"
                onClick={() => handleAddFooterMain(item.id, index)}
              >
                <i className="far fa-plus"></i>
              </button>
              {/* <button className="btn-del-manager-footer">
                <i className="far fa-trash"></i>
              </button> */}
            </div>
            {renderFooterChild(item.detail, item.id)}
          </div>
        );
      }
    });
  }

  return (
    <>
      <div className="wrap-manager-footer-top">
        <h3> Quản lý footer</h3>
        <div>
          <button
            className="update-logo-footer-btn"
            onClick={() => setCheckCLick(!checkClick)}
          >
            Chỉnh sửa logo footer
          </button>
          {!checkClick && (
            <button
              className="update-link-footer-btn"
              onClick={() => {
                const tmp = [...valueInput];
                const res = tmp.splice(1);
                updateListManagerFooterAdminTask(res);
              }}
            >
              Cập nhật
            </button>
          )}
        </div>
      </div>
      <div className="wrap-manager-footer-bottom">
        {checkClick ? (
          <div className="update-logo-footer">
            <img
              src={
                // valueInput[0].detail[0].title === undefined &&
                listManagerFooter.data[0].detail[0].title
              }
              alt="DAU"
              width="140px"
              height="140px"
            />

            <div className="btn-upload-image-logo">
              {/* <label htmlFor="filePicker" style={{ padding: "5px 10px" }}>
                Chọn file ảnh của bạn
              </label> */}
              <input
                type="file"
                name="title"
                // style={{ visibility: "hidden", display: "none" }}
                onChange={(e) => handleChangeImageInputSub(e)}
              />
            </div>
            <div className="form-group-manager-footer">
              {/* <div className="text-link-manager-footer">
                <label htmlFor="">link hình ảnh</label>
                <input
                  type="text"
                  name="link"
                  value={valueInput[0].detail[0].link || ""}
                  onChange={(e) => handleChangeInputSub(0, 0, e)}
                />
              </div> */}
            </div>
            <div className="form-group-manager-footer">
              <div className="text-link-manager-footer">
                <label htmlFor="">Tên trường (VN)</label>
                <input
                  type="text"
                  name="title"
                  value={valueInput[0].detail[1].title || ""}
                  onChange={(e) => handleChangeInputSub(0, 1, e)}
                />
              </div>
              {/* <div className="text-link-manager-footer">
                <label htmlFor="">Link trường (VN)</label>
                <input
                  type="text"
                  name="link"
                  value={valueInput[0].detail[1].link || ""}
                  onChange={(e) => handleChangeInputSub(0, 1, e)}
                />
              </div> */}
              <div className="text-link-manager-footer">
                <label htmlFor="">Tên trường (US)</label>
                <input
                  type="text"
                  name="title"
                  value={valueInput[0].detail[2].title || ""}
                  onChange={(e) => handleChangeInputSub(0, 2, e)}
                />
              </div>
              {/* <div className="text-link-manager-footer">
                <label htmlFor="">Link trường (US)</label>
                <input
                  type="text"
                  name="link"
                  value={valueInput[0].detail[2].link || ""}
                  onChange={(e) => handleChangeInputSub(0, 2, e)}
                />
              </div> */}
            </div>
            <div>
              <button
                className="content-update-footer-logo-btn"
                onClick={() => {
                  const tmp_ = [...valueInput];
                  const res_ = tmp_.splice(0, 1);
                  updateLogoFooterManagerAdminTask({
                    value: res_,
                    image: imageLogoFooter,
                  });
                }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        ) : (
          <>{renderListFooter()} </>
        )}
      </div>
      {/* <div>
        <pre>{JSON.stringify(valueInput, null, 2)}</pre>
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => {
  const { listManagerFooter } = state.managerFooterReducer;
  return {
    listManagerFooter: listManagerFooter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListManagerFooterAdminTask: () =>
      dispatch(getListManagerFooterAdminAction()),
    updateListManagerFooterAdminTask: (params) =>
      dispatch(updateListManagerFooterAdminAction(params)),
    updateLogoFooterManagerAdminTask: (params) =>
      dispatch(updateLogoFooterManagerAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

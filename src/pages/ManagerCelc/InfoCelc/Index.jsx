import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getInfoCelcAdminAction,
  updateInfoCelcAdminAction,
} from "../../../redux/actions";

import "../InfoCelc/style.css";

function Index({ infoCelc, getInfoCelcAdminTask, updateInfoCelcAdminTask }) {
  const { logo, nameFaculty } = infoCelc.data;

  useEffect(() => {
    getInfoCelcAdminTask();
  }, [getInfoCelcAdminTask]);

  useEffect(() => {
    setValueCelc((valueCelc) => ({
      ...valueCelc,
      name: infoCelc.data?.nameFaculty,
      image: infoCelc.data?.logo,
    }));
  }, [infoCelc]);

  const [valueCelc, setValueCelc] = useState({
    name: nameFaculty,
    image: logo,
  });

  const [valueImage, setValueImage] = useState(valueCelc.image);

  const [errorCelc, setErrorCelc] = useState({
    name: "",
    image: "",
  });

  function handleChangeInfoCelc(e) {
    const { name, value } = e.target;
    setValueCelc({
      ...valueCelc,
      [name]: value,
    });
  }

  function handleChangeImageCelc(e) {
    setValueImage(e.target.files[0]);
  }

  function handleUpdateInfoCelc() {
    let isValue = true;

    const errorValue = {
      name: "",
      image: "",
    };

    if (valueCelc.name === "") {
      isValue = false;
      errorValue.name = "Vui lòng nhập tiêu đề ngắn";
    } else {
      errorValue.name = "";
    }

    // if (valueImage === "") {
    //   isValue = false;
    //   errorValue.image = "Vui lòng chọn hình ảnh";
    // } else {
    //   errorValue.image = "";
    // }

    if (isValue) {
      updateInfoCelcAdminTask({
        valueImage: valueImage,
        name: valueCelc.name,
      });
      setErrorCelc({ ...errorValue });
    } else {
      setErrorCelc({ ...errorValue });
    }
  }

  return (
    <div>
      <div className="wrap-info-celc-top">
        <h3>Thông tin câu lạc bộ</h3>
      </div>

      <div className="wrap-info-celc-bottom">
        <div className="form-group-info-celc">
          <label htmlFor="">Tên </label>
          <input
            className={errorCelc.name.length > 0 ? "form-input-error" : ""}
            type="text"
            placeholder="Tên trung tâm"
            value={valueCelc.name || ""}
            name="name"
            onChange={(e) => handleChangeInfoCelc(e)}
          />
          {errorCelc.name.length > 0 && (
            <small className="small-text-error">{errorCelc.name}</small>
          )}
        </div>
        <div className="form-group-info-celc">
          <div>
            <img src={valueCelc.image} alt="celc" width="auto" height="200" />
          </div>

          <label htmlFor="">Logo</label>
          <input
            className={errorCelc.image.length > 0 ? "form-input-error" : ""}
            type="file"
            name="image"
            required
            onChange={(e) => handleChangeImageCelc(e)}
          />
          {errorCelc.image.length > 0 && (
            <small className="small-text-error">{errorCelc.image}</small>
          )}
        </div>
        <div className="content-info-celc-btn">
          <button onClick={() => handleUpdateInfoCelc()}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { infoCelc } = state.managerCelcReducer;
  return {
    infoCelc: infoCelc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCelcAdminTask: () => dispatch(getInfoCelcAdminAction()),
    updateInfoCelcAdminTask: (params) =>
      dispatch(updateInfoCelcAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

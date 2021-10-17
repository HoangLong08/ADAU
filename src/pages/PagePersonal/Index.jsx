import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, DatePicker, Radio, Table } from "antd";
import moment from "moment";
import { URL } from "../../constants/app";
import {
  postChangeInfoAdminAction,
  postChangeImageAdminAction,
  getListHistoryLoginAdminAction,
  postChangePasswordAdminAction,
} from "../../redux/actions";
import "../PagePersonal/style.css";

function Index({
  infoAdmin,
  listHistoryLogin,
  postChangeInfoAdminTask,
  postChangeImageAvatarTask,
  getListHistoryLoginAdminTask,
  postChangePasswordAdminTask,
}) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Đăng nhập",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Đăng xuất",
      dataIndex: "logout",
      key: "logout",
    },
  ];

  const columnTwo = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khoa / celc",
      dataIndex: "name",
      key: "name",
    },
  ];

  function renderListHistory() {
    return listHistoryLogin?.data?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        status:
          item.active === "ON" ? (
            <p key={index} className="active-on">
              {" "}
              {item.active}{" "}
            </p>
          ) : (
            <p key={index} className="active-off">
              {" "}
              {item.active}{" "}
            </p>
          ),
        login: item.login,
        logout: item.logout,
      };
    });
  }

  function renderListManager() {
    return infoAdmin?.data?.account?.manager?.map((item, index) => {
      return {
        key: index,
        id: item.idFaculty,
        name: item.name,
      };
    });
  }

  const { account } = infoAdmin.data;

  const [values, setValues] = useState({
    fullName: account?.fullName,
    birthday: account?.birthday,
    gender: account?.gender !== "" ? account?.gender : "Nam",
    phone: account?.phone,
    city: account?.city,
    district: account?.district,
    street: account?.street,
    address: account?.address,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    gender: "",
    birthday: "",
    phone: "",
    city: "",
    district: "",
    street: "",
    address: "",
  });

  const [valueChangePass, setValueChangePass] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: "",
  });

  const [errorChangePass, setErrorChangePass] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: "",
  });

  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [isPassword, setIsPassword] = useState({
    passwordOld: false,
    passwordNew: false,
    confirmPassword: false,
  });

  const [tabChangePassword, setTabChangePassword] = useState(false);

  const fetchCountryData = async () => {
    const response = await fetch(URL + "city");
    const aa = await response.json();
    setCountries(aa);
  };

  async function fetchDistrictData(cityData) {
    const response = await fetch(URL + "district/" + cityData);
    const bb = await response.json();
    setDistricts(bb);
  }

  async function fetchWardsData(districtData) {
    const response = await fetch(URL + "street/" + districtData);
    const cc = await response.json();
    setWards(cc);
  }

  useEffect(() => {
    getListHistoryLoginAdminTask();
  }, [getListHistoryLoginAdminTask]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    if (values.city !== "") {
      fetchDistrictData(values.city);
    }
  }, [values.city]);

  useEffect(() => {
    if (values.district !== "") {
      fetchWardsData(values.district);
    }
  }, [values.district]);

  function renderCity() {
    return countries.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.district}
        </option>
      );
    });
  }

  function renderDistrict() {
    return districts.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.district}
        </option>
      );
    });
  }

  function renderWard() {
    return wards.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.street}
        </option>
      );
    });
  }

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setValueChangePass({
      ...valueChangePass,
      [name]: value,
    });
  }

  function handleChangeDate(date, dateString) {
    setValues({ ...values, birthday: dateString });
  }

  function handleChangeImageAvatar(e) {
    postChangeImageAvatarTask({
      type: e.target.files[0],
    });
  }

  function handleChangeInfo(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmitChangeInfo() {
    let isValue = true;
    const errorValue = {
      fullName: "",
      gender: "",
      birthday: "",
      phone: "",
      city: "",
      district: "",
      street: "",
      address: "",
    };

    if (values.fullName.length === 0) {
      isValue = false;
      errorValue.fullName = "Vui lòng nhập tên tài khoản !";
    } else {
      errorValue.fullName = "";
    }

    if (values.phone.length === 0) {
      isValue = false;
      errorValue.phone = "Vui lòng nhập số điện thoại !";
    } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)) {
      isValue = false;
      errorValue.phone = "Số điện thoại không hợp lệ";
    } else {
      errorValue.phone = "";
    }

    if (values.city.length === 0) {
      isValue = false;
      errorValue.city = "Vui lòng chọn thành phố hoặc tỉnh !";
    } else {
      errorValue.city = "";
    }

    if (values.district.length === 0) {
      isValue = false;
      errorValue.district = "Vui lòng chọn quận hoặc huyện !";
    } else {
      errorValue.district = "";
    }

    if (values.street.length === 0) {
      isValue = false;
      errorValue.street = "Vui lòng chọn xã hoặc phường !";
    } else {
      errorValue.street = "";
    }

    if (values.address.length === 0) {
      isValue = false;
      errorValue.address = "Vui lòng nhập địa chỉ chi tiết !";
    } else {
      errorValue.address = "";
    }

    if (isValue) {
      setErrors({ ...errorValue });
      postChangeInfoAdminTask({
        ...values,
        city: parseInt(values.city),
        district: parseInt(values.district),
        street: parseInt(values.street),
      });
    } else {
      setErrors({ ...errorValue });
    }
  }

  function handleSubmitChangePassword() {
    let isValue = true;
    const errorValue = {
      passwordOld: "",
      passwordNew: "",
      confirmPassword: "",
    };

    if (valueChangePass.passwordOld.length === 0) {
      isValue = false;
      errorValue.passwordOld = "Vui lòng nhập mật khẩu cũ của bạn !";
    } else {
      errorValue.passwordOld = "";
    }

    if (valueChangePass.passwordNew.length === 0) {
      isValue = false;
      errorValue.passwordNew = "Vui lòng nhập mật khẩu mới của bạn !";
    } else if (valueChangePass.passwordNew.length < 6) {
      isValue = false;
      errorValue.passwordNew = "Mật khẩu ít nhất là 6 ký tự !";
    } else {
      errorValue.passwordNew = "";
    }

    if (valueChangePass.confirmPassword.length === 0) {
      isValue = false;
      errorValue.confirmPassword = "Vui lòng xác nhận lại mật khẩu của bạn !";
    } else if (
      valueChangePass.confirmPassword !== valueChangePass.passwordNew
    ) {
      isValue = false;
      errorValue.confirmPassword = "Mật khẩu không trùng khớp !";
    } else {
      errorValue.confirmPassword = "";
    }

    if (isValue) {
      setErrorChangePass({ ...errorValue });
      postChangePasswordAdminTask(valueChangePass);
    } else {
      setErrorChangePass({ ...errorValue });
    }
  }
  return (
    <>
      <div className="wrap-page-personal">
        {!tabChangePassword ? (
          <Row gutter={[16, 16]}>
            <Col md={10}>
              <div className="left-wrap-info">
                <div className="info-image">
                  <img
                    src={account?.image}
                    height="100%"
                    width="100%"
                    alt="avatar"
                  />

                  <div className="upload-btn-wrapper">
                    <button className="btn">
                      <i className="fas fa-camera"></i>
                    </button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={(e) => handleChangeImageAvatar(e)}
                    />
                  </div>
                </div>
                <div className="info-name">
                  <p>{account?.fullName}</p>
                </div>
                <div className="info-button">
                  <button
                    className="btn-logout"
                    onClick={() => {
                      setTabChangePassword(!tabChangePassword);
                    }}
                  >
                    Thay đổi mật khẩu
                  </button>
                </div>
              </div>
            </Col>
            <Col md={14}>
              <div className="right-wrap-info">
                <Row gutter={[16, 16]}>
                  <Col md={12}>
                    <div className="form-groups">
                      <label htmlFor="">Tên đầy đủ</label>
                      <input
                        type="text"
                        placeholder="Nhập tên đầy đủ của bạn"
                        name="fullName"
                        value={values.fullName}
                        onChange={(e) => handleChangeInfo(e)}
                      />
                      {errors.fullName.length > 0 && (
                        <small className="error">{errors.fullName}</small>
                      )}
                    </div>
                    <div className="form-groups">
                      <label htmlFor="">Email</label>
                      <input type="text" disabled value={account?.email} />
                    </div>
                    <div className="form-groups">
                      <label htmlFor="">Giới tính</label>
                      <div>
                        <Radio.Group
                          onChange={(e) => handleChangeInfo(e)}
                          defaultValue={
                            values.gender === "" ? "Nam" : values.gender
                          }
                          value={values.gender === "" ? "Nam" : values.gender}
                          name="gender"
                        >
                          <Radio value={"Nam"}>Nam</Radio>
                          <Radio value={"Nữ"}>Nữ</Radio>
                          <Radio value={"Khác"}>Khác</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="form-groups">
                      <select
                        name="city"
                        onChange={(e) => handleChangeInfo(e)}
                        value={values.city}
                      >
                        <option value="">Chọn thành phố / tỉnh</option>
                        {renderCity()}
                      </select>
                      {errors.city.length > 0 && (
                        <small className="error">{errors.city}</small>
                      )}
                    </div>
                    <div className="form-groups">
                      <select
                        name="street"
                        onChange={(e) => handleChangeInfo(e)}
                        value={values.street}
                      >
                        <option value="">Chọn xã / phường</option>
                        {renderWard()}
                      </select>
                      {errors.street.length > 0 && (
                        <small className="error">{errors.street}</small>
                      )}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-groups">
                      <label htmlFor="">Số điện thoại</label>
                      <input
                        type="text"
                        placeholder="Nhập số điện thoại của bạn"
                        name="phone"
                        value={values.phone}
                        onChange={(e) => handleChangeInfo(e)}
                      />
                      {errors.phone.length > 0 && (
                        <small className="error">{errors.phone}</small>
                      )}
                    </div>
                    <div className="form-groups">
                      <label htmlFor="">Chức vụ</label>
                      <input type="text" disabled value={account?.nameRole} />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        style={{ display: "block", marginBottom: "12px" }}
                      >
                        Ngày sinh
                      </label>
                      <DatePicker
                        onChange={handleChangeDate}
                        defaultValue={moment(values.birthday, "DD-MM-YYYY")}
                        format={"DD-MM-YYYY"}
                      />
                    </div>
                    <div className="form-groups">
                      <select
                        name="district"
                        onChange={(e) => handleChangeInfo(e)}
                        value={values.district}
                      >
                        <option value="">Chọn quận / huyện</option>
                        {renderDistrict()}
                      </select>
                      {errors.district.length > 0 && (
                        <small className="error">{errors.district}</small>
                      )}
                    </div>
                    <div className="form-groups">
                      <input
                        type="text"
                        placeholder="Địa chỉ chi tiết. Ví dụ: 99A hoặc Tổ 6"
                        name="address"
                        value={values.address}
                        onChange={(e) => handleChangeInfo(e)}
                      />
                      {errors.address.length > 0 && (
                        <small className="error">{errors.address}</small>
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="content-button-info">
                  <button
                    className="button-info"
                    onClick={() => {
                      handleSubmitChangeInfo();
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <button
              className="back-btn"
              onClick={() => setTabChangePassword(!tabChangePassword)}
            >
              quay lai
            </button>
            <div className="wrap-change-password">
              <div className="form-change-password form-password">
                <label htmlFor="">Mật khẩu cũ</label>
                <input
                  type={isPassword.passwordOld ? "text" : "password"}
                  placeholder="Nhập mật khẩu cũ của bạn"
                  name="passwordOld"
                  value={valueChangePass.passwordOld}
                  onChange={(e) => handleChangePassword(e)}
                />
                <i
                  className={`fas ${
                    isPassword.passwordOld ? "fa-eye-slash" : "fa-eye"
                  } eye-password-icon`}
                  onClick={() =>
                    setIsPassword({
                      ...isPassword,
                      passwordOld: !isPassword.passwordOld,
                    })
                  }
                ></i>
                {errorChangePass.passwordOld.length > 0 && (
                  <small className="error">{errorChangePass.passwordOld}</small>
                )}
              </div>
              <div className="form-change-password form-password">
                <label htmlFor="">Mật khẩu mới</label>
                <input
                  type={isPassword.passwordNew ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới của bạn"
                  name="passwordNew"
                  value={valueChangePass.passwordNew}
                  onChange={(e) => handleChangePassword(e)}
                />
                <i
                  className={`fas ${
                    isPassword.passwordNew ? "fa-eye-slash" : "fa-eye"
                  } eye-password-icon`}
                  onClick={() =>
                    setIsPassword({
                      ...isPassword,
                      passwordNew: !isPassword.passwordNew,
                    })
                  }
                ></i>
                {errorChangePass.passwordNew.length > 0 && (
                  <small className="error">{errorChangePass.passwordNew}</small>
                )}
              </div>

              <div className="form-change-password form-password">
                <label htmlFor="">Xác nhận mật khẩu</label>
                <input
                  type={isPassword.confirmPassword ? "text" : "password"}
                  placeholder="Xác nhận lại mật khẩu của bạn"
                  name="confirmPassword"
                  value={valueChangePass.confirmPassword}
                  onChange={(e) => handleChangePassword(e)}
                />
                <i
                  className={`fas ${
                    isPassword.confirmPassword ? "fa-eye-slash" : "fa-eye"
                  } eye-password-icon`}
                  onClick={() =>
                    setIsPassword({
                      ...isPassword,
                      confirmPassword: !isPassword.confirmPassword,
                    })
                  }
                ></i>
                {errorChangePass.confirmPassword.length > 0 && (
                  <small className="error">
                    {errorChangePass.confirmPassword}
                  </small>
                )}
              </div>

              <div className="content-change-password">
                <button
                  className="btn-change-pass"
                  onClick={() => {
                    handleSubmitChangePassword();
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="wrap-page-personal-bottom">
        <Row gutter={[16, 16]}>
          <Col md={16}>
            <div className="content-history-login">
              <h3>Lịch sử đăng nhập</h3>
              <Table
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={renderListHistory()}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="content-list-manager">
              <h3>Danh sách quản lý</h3>
              <Table
                pagination={{ pageSize: 5 }}
                columns={columnTwo}
                dataSource={renderListManager()}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { infoAdmin, listHistoryLogin } = state.authAdminReducer;
  return {
    infoAdmin: infoAdmin,
    listHistoryLogin: listHistoryLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postChangeInfoAdminTask: (params) =>
      dispatch(postChangeInfoAdminAction(params)),
    postChangeImageAvatarTask: (params) =>
      dispatch(postChangeImageAdminAction(params)),
    getListHistoryLoginAdminTask: (params) =>
      dispatch(getListHistoryLoginAdminAction(params)),

    postChangePasswordAdminTask: (params) =>
      dispatch(postChangePasswordAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

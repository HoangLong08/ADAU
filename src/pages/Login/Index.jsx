import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Radio, Spin } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  postLoginAdminAction,
  postOtpAdminAction,
  postRegisterAdminAction,
  postEmailForgotPasswordAdminAction,
  postOtpForgotPasswordAdminAction,
  postResetPasswordForgotAdminAction,
} from "../../redux/actions";
import { URL } from "../../constants/app";
import eofficeLogin from "../../images/eoffice-login.png";

import "../Login/style.css";
import authHeaderAdmin from "../../services/auth-headers-admin";
import history from "../../utils/history";
import axios from "axios";

function Index({
  infoAdmin,
  emailForgotPassword,
  resetPassword,
  otpForgotPassword,
  optAdmin,
  registerAdmin,
  postLoginAdminTask,
  postRegisterAdminTask,
  postOtpTask,
  postEmailForgotPasswordAdminTask,
  postOtpForgotPasswordAdminTask,
  postResetPasswordForgotAdminTask,
}) {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [checkLoginRegister, setCheckLoginRegister] = useState({
    contentLogin: true,
    contentRegister: false,
    contentForgot: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [buttonRegisterLoading, setButtonRegisterLoading] = useState(false);
  // const [isLoadingForgot, setIsLoadingForgot] = useState(false);

  const [valueLogin, setValueLogin] = useState({
    emailLogin: "",
    passwordLogin: "",
  });

  const [errorLogin, setErrorLogin] = useState({
    emailLogin: "",
    passwordLogin: "",
  });

  const [valueRegister, setValueRegister] = useState({
    fullNameRegister: "",
    emailRegister: "",
    genderRegister: "Nam",
    phoneRegister: "",
    cityRegister: "",
    districtRegister: "",
    villageRegister: "",
    addressRegister: "",
    passwordRegister: "",
    confirmPasswordRegister: "",
  });

  const [errorRegister, setErrorRegister] = useState({
    fullNameRegister: "",
    emailRegister: "",
    genderRegister: "Nam",
    phoneRegister: "",
    cityRegister: "",
    districtRegister: "",
    villageRegister: "",
    addressRegister: "",
    passwordRegister: "",
    confirmPasswordRegister: "",
  });

  const [valueOtp, setValueOpt] = useState({
    optInput: "",
  });

  const [errorOtp, setErrorOtp] = useState({
    optInput: "",
  });

  // --------------

  const [valueEmailForgot, setValueEmailForgot] = useState({
    emailForgotPassword: "",
  });

  const [errorEmailForgot, setErrorValueEmailForgot] = useState({
    emailForgotPassword: "",
  });

  const [valueOtpForgot, setValueOtpForgot] = useState({
    optInputForgot: "",
  });

  const [errorOtpForgot, setErrorOtpForgot] = useState({
    optInputForgot: "",
  });

  const [valueFormForgot, setValueFormForgot] = useState({
    passwordForgot: "",
    confirmPasswordForgot: "",
  });

  const [errorFormForgot, setErrorFormForgot] = useState({
    passwordForgot: "",
    confirmPasswordForgot: "",
  });

  const [contentDiv, setContentDiv] = useState({
    contentFirst: true,
    contentSecond: false,
    contentThirst: false,
  });

  const [stringNotify, setStringNotify] = useState("");

  useEffect(() => {
    axios({
      method: "post",
      url: URL + "/auto-login",
      headers: authHeaderAdmin(),
      data: {},
    }).then((response) => {
      console.log("response.data: ", response.data);
      if (response.data.msg === "true") {
        history.push("/manage-bashboard");
      }
    });
  }, []);

  useEffect(() => {
    if (!infoAdmin.load) {
      setIsLoading(false);
    }
  }, [infoAdmin]);

  useEffect(() => {
    if (!emailForgotPassword?.load) {
      if (
        valueEmailForgot.emailForgotPassword ===
          emailForgotPassword?.data?.email &&
        emailForgotPassword?.data?.check === true
      ) {
        setIsLoading(false);
        setContentDiv((contentDiv) => ({
          ...contentDiv,
          contentFirst: false,
          contentSecond: true,
        }));
      } else {
        setIsLoading(false);
      }
    }
  }, [valueEmailForgot, emailForgotPassword]);

  useEffect(() => {
    if (!registerAdmin?.load) {
      setButtonRegisterLoading(false);
    } else {
      setButtonRegisterLoading(true);
    }
  }, [registerAdmin]);

  useEffect(() => {
    if (valueOtpForgot.optInputForgot.length === 6) {
      // setIsLoading(true);
      if (!otpForgotPassword.load) {
        if (
          valueOtpForgot.optInputForgot === otpForgotPassword?.data?.optInput &&
          otpForgotPassword?.data?.check === true
        ) {
          // setIsLoading(false);
          setContentDiv((contentDiv) => ({
            ...contentDiv,
            contentSecond: false,
            contentThirst: true,
          }));
        } else {
          // setIsLoading(false);
        }
      }
    }
  }, [valueOtpForgot, otpForgotPassword]);

  useEffect(() => {
    if (!resetPassword.load) {
      if (resetPassword?.data?.check === true) {
        setCheckLoginRegister((checkLoginRegister) => ({
          ...checkLoginRegister,
          contentLogin: true,
          contentRegister: false,
          contentForgot: false,
        }));
      } else {
        // setIsLoading(false);
      }
    }
  }, [resetPassword]);

  useEffect(() => {
    if (registerAdmin.data?.check === true) {
      setStringNotify(
        "Vui lòng chờ Admin xét duyệt tài khoản để được đăng nhập"
      );
      setCheckLoginRegister({
        contentLogin: true,
        contentRegister: false,
        contentForgot: false,
      });
    }
  }, [registerAdmin]);

  function handleChangeEmailForgot(e) {
    const { name, value } = e.target;
    setValueEmailForgot({
      ...valueEmailForgot,
      [name]: value,
    });
  }

  function handleChangePasswordForgot(e) {
    const { name, value } = e.target;
    setValueFormForgot({
      ...valueFormForgot,
      [name]: value,
    });
  }

  function handleChangeOptForgot(e) {
    const { name, value } = e.target;
    setValueOtpForgot({
      ...valueOtpForgot,
      [name]: value,
    });
  }

  function handleSubmitForgotPassword() {
    let isValue = true;

    const errorValue = {
      emailForgotPassword: "",
    };

    if (valueEmailForgot.emailForgotPassword === "") {
      isValue = false;
      errorValue.emailForgotPassword = "Vui lòng nhập email của bạn";
    } else if (
      !/.+@.+\.[A-Za-z]+$/.test(valueEmailForgot.emailForgotPassword)
    ) {
      isValue = false;
      errorValue.emailForgotPassword = "Email không hợp lệ.";
    } else {
      errorValue.emailForgotPassword = "";
    }

    if (isValue) {
      setIsLoading(true);
      postEmailForgotPasswordAdminTask(valueEmailForgot);
      setErrorValueEmailForgot({ ...errorValue });
    } else {
      setErrorValueEmailForgot({ ...errorValue });
    }
  }

  function handleSubmitOtpForgotPassword() {
    let isValue = true;
    const errorValue = {
      optInputForgot: "",
    };

    if (valueOtpForgot.optInputForgot === "") {
      isValue = false;
      errorValue.optInputForgot = "Vui lòng nhập mã xác nhận của bạn";
    } else if (valueOtpForgot.optInputForgot.length !== 6) {
      isValue = false;
      errorValue.optInputForgot = "Mã xác nhận chỉ bao gồm 6 ký tự";
    } else {
      errorValue.optInputForgot = "";
    }

    if (isValue) {
      // setIsLoading(true);
      setErrorOtpForgot({ ...errorValue });
      postOtpForgotPasswordAdminTask(valueOtpForgot);
    } else {
      setErrorOtpForgot({ ...errorValue });
    }
  }

  // ---------------------

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const fetchCountryData = async () => {
    const response = await fetch(URL + "city");
    const res = await response.json();
    setCities(res);
  };

  async function fetchDistrictData(cityData) {
    const [code] = cityData.split("/");
    const response = await fetch(URL + "district/" + code);
    const bb = await response.json();
    setDistricts(bb);
  }

  async function fetchWardsData(districtData) {
    const [code] = districtData.split("/");
    const response = await fetch(URL + "street/" + code);
    const cc = await response.json();
    setWards(cc);
  }

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    if (valueRegister.cityRegister !== "") {
      fetchDistrictData(valueRegister.cityRegister);
    }
  }, [valueRegister.cityRegister]);

  useEffect(() => {
    if (valueRegister.districtRegister !== "") {
      fetchWardsData(valueRegister.districtRegister);
    }
  }, [valueRegister.districtRegister]);

  function renderCity() {
    return cities.map((item, index) => {
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

  function handleChangeLogin(e) {
    const { name, value } = e.target;
    setValueLogin({
      ...valueLogin,
      [name]: value,
    });
  }

  function handleChangeRegister(e) {
    const { name, value } = e.target;
    setValueRegister({
      ...valueRegister,
      [name]: value,
    });
  }

  function handleChangeOpt(e) {
    const { name, value } = e.target;
    setValueOpt({
      ...valueOtp,
      [name]: value,
    });
  }

  function handleSubmitLogin() {
    let isValue = true;

    const errorValue = {
      emailLogin: "",
      passwordLogin: "",
    };

    if (valueLogin.emailLogin === "") {
      isValue = false;
      errorValue.emailLogin = "Vui lòng nhập email của bạn";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(valueLogin.emailLogin)) {
      isValue = false;
      errorValue.emailLogin = "Email không hợp lệ.";
    } else {
      errorValue.emailLogin = "";
    }

    if (valueLogin.passwordLogin === "") {
      isValue = false;
      errorValue.passwordLogin = "Vui lòng nhập mật khẩu của bạn";
    } else {
      errorValue.passwordLogin = "";
    }

    if (isValue) {
      setIsLoading(true);
      setErrorLogin({ ...errorValue });
      postLoginAdminTask(valueLogin);
    } else {
      setErrorLogin({ ...errorValue });
    }
  }

  function handleSubmitRegister() {
    let isValue = true;

    const errorValue = {
      fullNameRegister: "",
      emailRegister: "",
      genderRegister: "Nam",
      phoneRegister: "",
      cityRegister: "",
      districtRegister: "",
      villageRegister: "",
      addressRegister: "",
      passwordRegister: "",
      confirmPasswordRegister: "",
    };

    if (valueRegister.fullNameRegister === "") {
      isValue = false;
      errorValue.fullNameRegister = "Vui lòng nhập họ của bạn";
    } else {
      errorValue.fullNameRegister = "";
    }

    if (valueRegister.emailRegister === "") {
      isValue = false;
      errorValue.emailRegister = "Vui lòng nhập email của bạn";
    } else if (!/.+@.+\.[A-Za-z]+$/.test(valueRegister.emailRegister)) {
      isValue = false;
      errorValue.emailRegister = "Email không hợp lệ.";
    } else {
      errorValue.emailRegister = "";
    }

    if (valueRegister.phoneRegister.length === 0) {
      isValue = false;
      errorValue.phoneRegister = "Vui lòng nhập số điện thoại !";
    } else if (
      !/((09|03|07|08|05)+([0-9]{8})\b)/g.test(valueRegister.phoneRegister)
    ) {
      isValue = false;
      errorValue.phoneRegister = "Số điện thoại không hợp lệ";
    } else {
      errorValue.phoneRegister = "";
    }

    if (valueRegister.passwordRegister === "") {
      isValue = false;
      errorValue.passwordRegister = "Vui lòng nhập mật khẩu của bạn";
    }
    if (valueRegister.passwordRegister.length < 6) {
      isValue = false;
      errorValue.passwordRegister = "Mật khẩu có ít nhất 6 ký tự";
    } else {
      errorValue.passwordRegister = "";
    }

    if (valueRegister.confirmPasswordRegister === "") {
      isValue = false;
      errorValue.confirmPasswordRegister =
        "Vui lòng xác nhận lại mật khẩu của bạn";
    } else {
      errorValue.confirmPasswordRegister = "";
    }

    if (
      valueRegister.confirmPasswordRegister !== valueRegister.passwordRegister
    ) {
      isValue = false;
      errorValue.confirmPasswordRegister = "Mật khẩu không trùng khớp";
    }

    if (valueRegister.cityRegister.length === 0) {
      isValue = false;
      errorValue.cityRegister = "Vui lòng chọn thành phố hoặc tỉnh !";
    } else {
      errorValue.cityRegister = "";
    }

    if (valueRegister.districtRegister.length === 0) {
      isValue = false;
      errorValue.districtRegister = "Vui lòng chọn quận hoặc huyện !";
    } else {
      errorValue.districtRegister = "";
    }

    if (valueRegister.villageRegister.length === 0) {
      isValue = false;
      errorValue.villageRegister = "Vui lòng chọn xã hoặc phường !";
    } else {
      errorValue.villageRegister = "";
    }

    if (valueRegister.addressRegister.length === 0) {
      isValue = false;
      errorValue.addressRegister = "Vui lòng nhập địa chỉ chi tiết !";
    } else {
      errorValue.addressRegister = "";
    }

    if (isValue) {
      setErrorRegister({ ...errorValue });
      postRegisterAdminTask(valueRegister);
    } else {
      setErrorRegister({ ...errorValue });
    }
  }

  function handleSubmitOtp() {
    let isValue = true;
    const errorValue = {
      optInput: "",
    };

    if (valueOtp.optInput === "") {
      isValue = false;
      errorValue.optInput = "Vui lòng nhập mã xác nhận của bạn";
    } else if (valueOtp.optInput.length !== 6) {
      isValue = false;
      errorValue.optInput = "Mã xác nhận chỉ bao gồm 6 ký tự";
    } else {
      errorValue.optInput = "";
    }

    if (isValue) {
      setErrorOtp({ ...errorValue });
      postOtpTask(valueOtp);
    } else {
      setErrorOtp({ ...errorValue });
    }
  }

  function handleSubmitPassForgot() {
    let isValue = true;
    const errorValue = {
      passwordForgot: "",
      confirmPasswordForgot: "",
    };

    if (valueFormForgot.passwordForgot === "") {
      isValue = false;
      errorValue.passwordForgot = "Vui lòng nhập mật khẩu của bạn";
    } else if (valueFormForgot.passwordForgot.length < 6) {
      isValue = false;
      errorValue.passwordForgot = "Mật khẩu có ít nhất 6 ký tự";
    } else {
      errorValue.passwordForgot = "";
    }

    if (valueFormForgot.confirmPasswordForgot === "") {
      isValue = false;
      errorValue.confirmPasswordForgot = "Vui lòng nhập lại mật khẩu của bạn";
    } else {
      errorValue.confirmPasswordForgot = "";
    }

    if (
      valueFormForgot.passwordForgot !== valueFormForgot.confirmPasswordForgot
    ) {
      isValue = false;
      errorValue.confirmPasswordForgot = "Mật khẩu không trùng khớp";
    } else {
      errorValue.confirmPasswordForgot = "";
    }

    if (isValue) {
      setButtonRegisterLoading(true);
      setErrorFormForgot({ ...errorValue });
      postResetPasswordForgotAdminTask({
        ...valueFormForgot,
        code: otpForgotPassword?.data?.optInput,
      });
    } else {
      setErrorFormForgot({ ...errorValue });
    }
  }

  return (
    <>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="wrap-login">
          {/* <img src={slideLoginOne} alt="" /> */}
          <div className="content-login">
            <Row gutter={[16, 16]}>
              <Col
                md={
                  checkLoginRegister.contentLogin ||
                  checkLoginRegister.contentForgot
                    ? 16
                    : 14
                }
              >
                <div className="content-login-left">
                  <Slider {...settings}>
                    <div className="banner-img">
                      <img
                        src="http://117.3.81.221:5000/images/users/slide1.png"
                        alt="hinh anh"
                      />
                    </div>
                    <div className="banner-img">
                      <img
                        src="http://117.3.81.221:5000/images/users/slide2.png"
                        alt="hinh anh"
                      />
                    </div>
                  </Slider>
                </div>
              </Col>
              <Col
                md={
                  checkLoginRegister.contentLogin ||
                  checkLoginRegister.contentForgot
                    ? 8
                    : 10
                }
              >
                <div className="content-login-right">
                  {checkLoginRegister.contentLogin ? (
                    <>
                      {!infoAdmin?.data?.checkOtp ? (
                        <>
                          <div className="form-login-top">
                            {stringNotify.length > 0 && (
                              <p className="notify-register">{stringNotify}</p>
                            )}
                            <div className="form-login-image">
                              <img
                                src={eofficeLogin}
                                width="300"
                                height="75"
                                alt="dau"
                              />
                            </div>
                            <p>Đăng nhập hệ thống</p>
                          </div>
                          <div className="form-login-bottom">
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập email của bạn"
                                name="emailLogin"
                                value={valueLogin.emailLogin}
                                onChange={(e) => handleChangeLogin(e)}
                              />
                              {errorLogin.emailLogin.length > 0 && (
                                <small className="error">
                                  {errorLogin.emailLogin}
                                </small>
                              )}
                            </div>
                            <div className="form-groups form-password">
                              <input
                                type={isPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu của bạn"
                                name="passwordLogin"
                                value={valueLogin.passwordLogin}
                                onChange={(e) => handleChangeLogin(e)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handleSubmitLogin();
                                  }
                                }}
                              />
                              <i
                                className={`fas ${
                                  isPassword ? "fa-eye-slash" : "fa-eye"
                                } eye-password-icon`}
                                onClick={() => setIsPassword(!isPassword)}
                              ></i>
                              {errorLogin.passwordLogin.length > 0 && (
                                <small className="error">
                                  {errorLogin.passwordLogin}
                                </small>
                              )}
                            </div>
                            <div className="form-group-button">
                              <button
                                onClick={() => {
                                  handleSubmitLogin();
                                }}
                              >
                                Đăng nhập
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-login-top">
                            <div className="form-login-image">
                              <img src={eofficeLogin} alt="dau" />
                            </div>
                            <p>Mã Xác Minh</p>
                            <span>
                              Vui lòng kiểm tra email của bạn để nhận mã xác
                              minh
                            </span>
                          </div>
                          <div className="form-login-bottom">
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập mã xác minh của bạn"
                                name="optInput"
                                value={valueOtp.optInput}
                                onChange={(e) => handleChangeOpt(e)}
                              />
                              {errorOtp.optInput.length > 0 && (
                                <small className="error">
                                  {errorOtp.optInput}
                                </small>
                              )}
                            </div>

                            <div className="form-group-button">
                              <button
                                onClick={() => {
                                  handleSubmitOtp();
                                }}
                              >
                                Gửi
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : checkLoginRegister.contentRegister ? (
                    <>
                      <div className="form-register-top">
                        {/* <div className="form-login-image">
                        <img
                          src="http://giangvien.dau.edu.vn/Content/AConfig/images/eoffice-login.png"
                          alt="dau"
                        />
                      </div> */}
                        <p>Đăng ký hệ thống</p>
                      </div>
                      <div className="form-login-bottom">
                        <Row gutter={[4, 4]}>
                          <Col md={12}>
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập họ tên đầy đủ của bạn"
                                name="fullNameRegister"
                                value={valueRegister.fullNameRegister}
                                onChange={(e) => handleChangeRegister(e)}
                              />
                              {errorRegister.fullNameRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.fullNameRegister}
                                </small>
                              )}
                            </div>
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập số điện thoại của bạn"
                                name="phoneRegister"
                                value={valueRegister.phoneRegister}
                                onChange={(e) => handleChangeRegister(e)}
                              />
                              {errorRegister.phoneRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.phoneRegister}
                                </small>
                              )}
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập email của bạn"
                                name="emailRegister"
                                value={valueRegister.emailRegister}
                                onChange={(e) => handleChangeRegister(e)}
                              />
                              {errorRegister.emailRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.emailRegister}
                                </small>
                              )}
                            </div>
                            <div className="form-groups">
                              <label htmlFor="">Giới tính</label>
                              <div>
                                <Radio.Group
                                  onChange={(e) => handleChangeRegister(e)}
                                  defaultValue={
                                    valueRegister.genderRegister === ""
                                      ? "Nam"
                                      : valueRegister.genderRegister
                                  }
                                  value={
                                    valueRegister.genderRegister === ""
                                      ? "Nam"
                                      : valueRegister.genderRegister
                                  }
                                  name="genderRegister"
                                >
                                  <Radio value={"Nam"}>Nam</Radio>
                                  <Radio value={"Nữ"}>Nữ</Radio>
                                  <Radio value={"Khác"}>Khác</Radio>
                                </Radio.Group>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <div className="form-groups form-password">
                          <input
                            type={isPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu của bạn"
                            name="passwordRegister"
                            value={valueRegister.passwordRegister}
                            onChange={(e) => handleChangeRegister(e)}
                          />
                          <i
                            className={`fas ${
                              isPassword ? "fa-eye-slash" : "fa-eye"
                            } eye-password-icon`}
                            onClick={() => setIsPassword(!isPassword)}
                          ></i>
                          {errorRegister.passwordRegister.length > 0 && (
                            <small className="error">
                              {errorRegister.passwordRegister}
                            </small>
                          )}
                        </div>
                        <div className="form-groups form-password">
                          <input
                            type={isPasswordConfirm ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu của bạn"
                            name="confirmPasswordRegister"
                            value={valueRegister.confirmPasswordRegister}
                            onChange={(e) => handleChangeRegister(e)}
                          />
                          <i
                            className={`fas ${
                              isPasswordConfirm ? "fa-eye-slash" : "fa-eye"
                            } eye-password-icon`}
                            onClick={() =>
                              setIsPasswordConfirm(!isPasswordConfirm)
                            }
                          ></i>
                          {errorRegister.confirmPasswordRegister.length > 0 && (
                            <small className="error">
                              {errorRegister.confirmPasswordRegister}
                            </small>
                          )}
                        </div>

                        <Row gutter={[4, 4]}>
                          <Col md={12}>
                            <div className="form-groups">
                              <select
                                name="cityRegister"
                                onChange={(e) => handleChangeRegister(e)}
                                value={valueRegister.cityRegister}
                              >
                                <option value="">Chọn thành phố / tỉnh</option>
                                {renderCity()}
                              </select>
                              {errorRegister.cityRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.cityRegister}
                                </small>
                              )}
                            </div>
                            <div className="form-groups">
                              <select
                                name="villageRegister"
                                onChange={(e) => handleChangeRegister(e)}
                                value={valueRegister.villageRegister}
                              >
                                <option value="">Chọn xã / phường</option>
                                {renderWard()}
                              </select>
                              {errorRegister.villageRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.villageRegister}
                                </small>
                              )}
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-groups">
                              <select
                                name="districtRegister"
                                onChange={(e) => handleChangeRegister(e)}
                                value={valueRegister.districtRegister}
                              >
                                <option value="">Chọn quận / huyện</option>
                                {renderDistrict()}
                              </select>
                              {errorRegister.districtRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.districtRegister}
                                </small>
                              )}
                            </div>
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Địa chỉ chi tiết. Ví dụ: 99A hoặc Tổ 6"
                                name="addressRegister"
                                value={valueRegister.addressRegister}
                                onChange={(e) => handleChangeRegister(e)}
                              />
                              {errorRegister.addressRegister.length > 0 && (
                                <small className="error">
                                  {errorRegister.addressRegister}
                                </small>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <div className="form-group-register-button">
                          {buttonRegisterLoading ? (
                            <button>Loading ... </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleSubmitRegister();
                              }}
                            >
                              Đăng ký
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {contentDiv.contentFirst ? (
                        <>
                          <div className="form-login-top">
                            <div className="form-login-image">
                              <img src={eofficeLogin} alt="dau" />
                            </div>
                            <p>Quên mật khẩu</p>
                          </div>
                          <div className="form-login-bottom">
                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập email của bạn"
                                name="emailForgotPassword"
                                value={valueEmailForgot.emailForgotPassword}
                                onChange={(e) => handleChangeEmailForgot(e)}
                              />
                              {errorEmailForgot.emailForgotPassword.length >
                                0 && (
                                <small className="error">
                                  {errorEmailForgot.emailForgotPassword}
                                </small>
                              )}
                            </div>

                            <div className="form-group-button">
                              <button
                                onClick={() => {
                                  handleSubmitForgotPassword();
                                }}
                              >
                                Gửi
                              </button>
                            </div>
                          </div>
                        </>
                      ) : contentDiv.contentSecond ? (
                        <>
                          <div className="content-otp-forgot-password">
                            <button
                              className="button-back"
                              onClick={() => {
                                setContentDiv({
                                  ...contentDiv,
                                  contentFirst: true,
                                  contentSecond: false,
                                });
                              }}
                            >
                              Trở lại
                            </button>
                            <div className="form-login-image">
                              <img src={eofficeLogin} alt="dau" />
                            </div>
                            <h2>Vui lòng nhập mã xác nhận</h2>
                            <p className="text-name">
                              Mã xác minh của bạn sẽ được gửi bằng email đến
                            </p>
                            <p className="text-name">
                              {emailForgotPassword?.data?.email}
                            </p>

                            <div className="form-groups">
                              <input
                                type="text"
                                placeholder="Nhập mã otp của bạn"
                                name="optInputForgot"
                                value={valueOtpForgot.optInputForgot}
                                onChange={(e) => handleChangeOptForgot(e)}
                              />
                              {errorOtpForgot.optInputForgot.length > 0 && (
                                <small className="error">
                                  {errorOtpForgot.optInputForgot}
                                </small>
                              )}
                            </div>

                            <button
                              className="button-back button-pass"
                              style={{ width: "100%" }}
                              onClick={() => {
                                handleSubmitOtpForgotPassword();
                              }}
                            >
                              Gửi
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="content-reset-forgot-password">
                            <button
                              className="button-back"
                              onClick={() => {
                                setContentDiv({
                                  ...contentDiv,
                                  contentSecond: true,
                                  contentThirst: false,
                                });
                              }}
                            >
                              Trở lại
                            </button>
                            <div className="form-login-image">
                              <img src={eofficeLogin} alt="dau" />
                            </div>
                            <h2>Thiết lập mật khẩu</h2>
                            <p>Tạo mật khẩu mới cho</p>
                            <p className="text-name">
                              {emailForgotPassword?.data?.email}
                            </p>
                            <div className="form-groups form-password">
                              <input
                                type={isPassword ? "text" : "password"}
                                placeholder="Nhập mât khẩu mới của bạn"
                                name="passwordForgot"
                                value={valueFormForgot.passwordForgot}
                                onChange={(e) => handleChangePasswordForgot(e)}
                              />
                              <i
                                className={`fas ${
                                  isPassword ? "fa-eye-slash" : "fa-eye"
                                } eye-password-icon`}
                                onClick={() => setIsPassword(!isPassword)}
                              ></i>
                              {errorFormForgot.passwordForgot.length > 0 && (
                                <small className="error">
                                  {errorFormForgot.passwordForgot}
                                </small>
                              )}
                            </div>
                            <div className="form-groups form-password">
                              <input
                                type={isPasswordConfirm ? "text" : "password"}
                                placeholder="Xác nhận lại mật khẩu của bạn"
                                name="confirmPasswordForgot"
                                value={valueFormForgot.confirmPasswordForgot}
                                onChange={(e) => handleChangePasswordForgot(e)}
                              />
                              <i
                                className={`fas ${
                                  isPasswordConfirm ? "fa-eye-slash" : "fa-eye"
                                } eye-password-icon`}
                                onClick={() =>
                                  setIsPasswordConfirm(!isPasswordConfirm)
                                }
                              ></i>
                              {errorFormForgot.confirmPasswordForgot.length >
                                0 && (
                                <small className="error">
                                  {errorFormForgot.confirmPasswordForgot}
                                </small>
                              )}
                            </div>

                            <button
                              className="button-back button-pass"
                              style={{ width: "100%" }}
                              onClick={() => {
                                handleSubmitPassForgot();
                              }}
                            >
                              Gửi
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="form-groups-bonus">
                    <p
                      onClick={() =>
                        setCheckLoginRegister({
                          ...checkLoginRegister,
                          contentRegister: false,
                          contentLogin: false,
                          contentForgot: true,
                        })
                      }
                    >
                      <span>Quên mật khẩu</span>
                    </p>
                    {checkLoginRegister.contentRegister ? (
                      <p
                        onClick={() =>
                          setCheckLoginRegister({
                            ...checkLoginRegister,
                            contentRegister: false,
                            contentLogin: true,
                            contentForgot: false,
                          })
                        }
                      >
                        <span>Đăng nhập</span>
                      </p>
                    ) : (
                      <p
                        onClick={() =>
                          setCheckLoginRegister({
                            ...checkLoginRegister,
                            contentRegister: true,
                            contentLogin: false,
                            contentForgot: false,
                          })
                        }
                      >
                        <span>Đăng ký</span>
                      </p>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Spin>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    infoAdmin,
    emailForgotPassword,
    otpForgotPassword,
    resetPassword,
    registerAdmin,
    optAdmin,
  } = state.authAdminReducer;
  return {
    infoAdmin: infoAdmin,
    emailForgotPassword: emailForgotPassword,
    otpForgotPassword: otpForgotPassword,
    resetPassword: resetPassword,
    registerAdmin: registerAdmin,
    optAdmin: optAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLoginAdminTask: (params) => dispatch(postLoginAdminAction(params)),
    postOtpTask: (params) => dispatch(postOtpAdminAction(params)),
    postRegisterAdminTask: (params) =>
      dispatch(postRegisterAdminAction(params)),
    postEmailForgotPasswordAdminTask: (params) =>
      dispatch(postEmailForgotPasswordAdminAction(params)),
    postOtpForgotPasswordAdminTask: (params) =>
      dispatch(postOtpForgotPasswordAdminAction(params)),

    postResetPasswordForgotAdminTask: (params) =>
      dispatch(postResetPasswordForgotAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

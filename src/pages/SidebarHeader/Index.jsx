import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  getContentSidebarAdminAction,
  getInfoFacultyAdminAction,
  postLogoutAdminAction,
  postSendMessageAdminAction,
  getListNotifyAdminAction,
} from "../../redux/actions";
import Modal from "react-modal";
import { Spin } from "antd";
import "../SidebarHeader/style.css";
import { URL_IMAGE } from "../../constants/app";
Modal.setAppElement("#root");
// let socket = io("http://127.0.0.1:5005");

function Index({
  contentSidebar,
  infoAdmin,
  listNotify,
  getContentSidebarAdminTask,
  postLogoutAdminTask,
  getInfoFacultyAdminTask,
  getListNotifyAdminTask,
  children,
}) {
  const [checkClickBar, setCheckClickBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [checkClickMessage, setCheckClickMessage] = useState(false);
  // const [counterSendMessage, setCounterSendMessage] = useState(0);
  /**
   * 12-12-2021 13:12:05"
   */
  function currentTime() {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var res = date + " " + time;
    return res;
  }

  const [valueMessage, setValueMessage] = useState({
    id: infoAdmin?.data?.account?.id,
    auth: infoAdmin?.data?.account?.fullName,
    image: infoAdmin?.data?.account?.image,
    content: "",
    createdAt: currentTime(),
  });

  function handleMessage(e) {
    setValueMessage({ ...valueMessage, content: e.target.value });
  }

  useEffect(() => {
    if (!infoAdmin.load) {
      setIsLoading(false);
    }
  }, [infoAdmin]);

  useEffect(() => {
    getContentSidebarAdminTask();
    getListNotifyAdminTask();
  }, [getContentSidebarAdminTask, getListNotifyAdminTask]);

  const [listMessage, setListMessage] = useState([]);

  const [listNotifyState, setListNotifyState] = useState({
    notifies: listNotify?.data?.notifies,
    number: listNotify?.data?.number,
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
    // socket.on("message", (message) => {
    //   setListMessage([...listMessage, message]);
    // });

    // setNotifyMessage([...listNotify, notify]);
  }, [listMessage]);

  useEffect(() => {
    setListNotifyState(listNotify?.data);
  }, [listNotify]);

  function renderListNotify() {
    return listNotifyState?.notifies?.map((item, index) => {
      return (
        <li className="notify-bell-li" key={index}>
          <div className="notify-bell-image">
            <img src={item.image} alt="avatar" />
          </div>
          <div className="notify-bell-content">
            <p style={{ fontSize: "12px" }}>{item.auth}</p>
            <p className="notify-bell-text">{item.content}</p>
            <div className="notify-bell-bottom">
              <p className="notify-bell-time">{item.createdAt}</p>
              <p className="notify-bell-status">{item.status}</p>
            </div>
          </div>
        </li>
      );
    });
  }

  function renderListMessage() {
    return listMessage?.map((item, index) => {
      return (
        <li
          className={
            item?.id === infoAdmin?.data?.account?.id
              ? "message message-reverse"
              : "message"
          }
          // className="message"
          key={index}
        >
          {item?.id !== listMessage[index - 1]?.id ? (
            <div className="message-image">
              <img src={item.image} alt="avatar" />
            </div>
          ) : (
            <>
              <div className="message-image-none">
                {/* <img src={item.image} alt="avatar" /> */}
              </div>
            </>
          )}

          <div className="message-text">
            <p>{item.content}</p>
          </div>
          <div className="wrap-time-user-info">
            <p>{item.auth}</p>
            <p>{item.createdAt}</p>
          </div>
        </li>
      );
    });
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function renderSubMenu(item) {
    return item.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() =>
            getInfoFacultyAdminTask({ id: item.id, nameFaculty: item.title })
          }
        >
          <Link to={"/" + item.url}>{item.title}</Link>
        </li>
      );
    });
  }

  function renderContentSidebar() {
    return contentSidebar?.data?.map((item, index) => {
      if (item.array.length === 0) {
        return (
          <li
            key={index}
            className={
              checkClickBar ? "wrap-menu-main-li-clicked" : "wrap-menu-main-li"
            }
          >
            <Link to={"/" + item.url} className="aa">
              <span
                className={checkClickBar ? "icon-menu-clicked" : "icon-menu"}
                dangerouslySetInnerHTML={{ __html: item.icon }}
              ></span>
              <span className={checkClickBar ? `d-none` : `wrap-menu-main-a`}>
                {item.title}
              </span>
            </Link>
          </li>
        );
      } else {
        return (
          <li
            key={index}
            className={
              checkClickBar ? "wrap-menu-main-li-clicked" : "wrap-menu-main-li"
            }
          >
            <Link to="#" className="aa">
              <span
                className={checkClickBar ? "icon-menu-clicked" : "icon-menu"}
                dangerouslySetInnerHTML={{ __html: item.icon }}
              >
                {/* <i className="fas fa-chart-line"></i> */}
              </span>
              <span className={checkClickBar ? `d-none` : `wrap-menu-main-a`}>
                {item.title}
              </span>
            </Link>
            <ul
              className={
                checkClickBar ? "wrap-menu-sub-clicked" : "wrap-menu-sub"
              }
            >
              {renderSubMenu(item.array)}
            </ul>
          </li>
        );
      }
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-logout">
          <div className="modal-logout-top">
            <div>Thông báo</div>
            <div className="close-btn">
              <button onClick={toggleModal}>
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>

          <div>
            <p>Bạn có muốn đăng xuất không ?</p>
            <div className="modal-btn">
              <div>
                <button onClick={toggleModal}>Không</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    postLogoutAdminTask();
                    toggleModal();
                  }}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="wrap-sidebar-header">
          {checkClickMessage ? (
            <div className="wrap-message">
              <div className="wrap-message-top">
                <div className="message-info">
                  <div className="message-info-image">
                    <img
                      width="32"
                      height="32"
                      src={URL_IMAGE + "1_TH1057/Images/logo-dhktdn-150.png"}
                      alt="avatar"
                    />
                  </div>
                  <div className="message-info-name">
                    <p>DAU Message</p>
                  </div>
                </div>
                <div className="message-close">
                  <button
                    onClick={() => setCheckClickMessage(!checkClickMessage)}
                  >
                    <i className="far fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="wrap-message-middle">
                <ul className="conversation" ref={messagesEndRef}>
                  {/* {listMessage ? ( */}
                  <>
                    <div className="conversation-image">
                      <img
                        src={URL_IMAGE + "1_TH1057/Images/logo-dhktdn-150.png"}
                        alt="logo"
                      />
                    </div>

                    <h1>DANANG ARCHITECTURE UNIVERSITY</h1>
                    <p className="conversation-address">
                      566 Núi Thành, P. Hòa Cường Nam, Q. Hải Châu, TP. Đà Nẵng
                    </p>
                  </>
                  {renderListMessage()}
                </ul>
              </div>
              <div className="wrap-message-bottom">
                <div className="wrap-message-box">
                  <input
                    type="text"
                    placeholder="Aa"
                    value={valueMessage.content}
                    onChange={(e) => {
                      handleMessage(e);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        // postSendMessageAdminTask(valueMessage);

                        // setTimeout(
                        //   () => setCounterSendMessage(counterSendMessage + 1),
                        //   5000
                        // );
                        // if (valueMessage.content.trim().length !== 0) {
                        //   socket.emit("message", valueMessage);
                        // }
                        setValueMessage({
                          id: infoAdmin?.data?.account?.id,
                          auth: infoAdmin?.data?.account?.fullName,
                          image: infoAdmin?.data?.account?.image,
                          content: "",
                          createdAt: currentTime(),
                        });
                      }
                    }}
                  />
                </div>
                <div>
                  <button className="message-send">
                    <i className="far fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            className={checkClickBar ? "wrap-header-clicked" : "wrap-header"}
          >
            <div className="content-header-left">
              <button
                className="content-header-button"
                onClick={() => setCheckClickBar(!checkClickBar)}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div className="content-header-right">
              <ul className="content-header-ul">
                <li
                  className="notify "
                  onClick={() => setCheckClickMessage(!checkClickMessage)}
                >
                  <i className="far fa-comments"></i>
                  <span className="round">9</span>
                </li>
                {/* <li className="notify">
                  <i className="far fa-envelope"></i>
                  <span className="round">12</span>
                </li> */}
                <li className="notify notify-bell">
                  <i className="far fa-bell"></i>
                  <span className="round">{listNotifyState.number}</span>
                  <ul className="menu-sub-notify-spell">
                    <h3>Notifications</h3>
                    {renderListNotify()}
                  </ul>
                </li>
                <li>
                  <Link to="/trang-ca-nhan">
                    <div className="content-header-info">
                      <div className="content-header-avatar">
                        <img
                          width="30"
                          height="30"
                          src={infoAdmin?.data?.account?.image}
                          alt="avatar"
                        />
                      </div>
                      <div className="content-header-name">
                        <p>{infoAdmin?.data?.account?.fullName}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={checkClickBar ? "wrap-website-clicked" : "wrap-website"}
          >
            {children}
          </div>
          {contentSidebar.load ? (
            <SkeletonTheme color="#4ba4c7" highlightColor="#4ba4c7">
              <div
                className={
                  checkClickBar ? "wrap-sidebar-clicked" : "wrap-sidebar"
                }
              >
                <div className="wrap-admin">
                  <div
                    className={
                      checkClickBar
                        ? "content-avatar-clicked"
                        : "content-avatar"
                    }
                  >
                    {checkClickBar ? (
                      <img
                        width="32"
                        height="32"
                        src={URL_IMAGE + "1_TH1057/Images/logo-dhktdn-150.png"}
                        alt="avatar"
                      />
                    ) : (
                      <img
                        width="32"
                        height="32"
                        src={URL_IMAGE + "1_TH1057/Images/logo-dhktdn-150.png"}
                        alt="avatar"
                      />
                    )}
                  </div>
                  <div
                    className={checkClickBar ? "d-none" : "content-name"}
                    // className="content-name"
                  >
                    <h3>DAU MANAGER</h3>
                  </div>
                </div>
                <ul className="wrap-menu">
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>
                  <Skeleton
                    height={30}
                    className={
                      checkClickBar
                        ? "wrap-menu-main-li-clicked"
                        : "wrap-menu-main-li"
                    }
                  ></Skeleton>

                  <li className="li-logout" onClick={toggleModal}>
                    <div
                      className={
                        checkClickBar ? "icon-menu-clicked" : "icon-menu"
                      }
                    >
                      <i className="fas fa-door-open" />
                    </div>
                    <div
                      className={checkClickBar ? `d-none` : `wrap-menu-main-a`}
                    >
                      Đăng xuất
                    </div>
                  </li>
                </ul>
              </div>
            </SkeletonTheme>
          ) : (
            <div
              className={
                checkClickBar ? "wrap-sidebar-clicked" : "wrap-sidebar"
              }
            >
              <div className="wrap-admin">
                <div
                  className={
                    checkClickBar ? "content-avatar-clicked" : "content-avatar"
                  }
                >
                  {checkClickBar ? (
                    <img
                      width="32"
                      height="32"
                      src={URL_IMAGE + "1_TH1057/Images/logo-dhktdn-150.png"}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      width="32"
                      height="32"
                      src={URL_IMAGE + "1_TH1057/Images/logo-dhktdn-150.png"}
                      alt="avatar"
                    />
                  )}
                </div>
                <div
                  className={checkClickBar ? "d-none" : "content-name"}
                  // className="content-name"
                >
                  <h3>DAU MANAGER</h3>
                </div>
              </div>
              <ul className="wrap-menu">
                {renderContentSidebar()}

                <li className="li-logout" onClick={toggleModal}>
                  <div
                    className={
                      checkClickBar ? "icon-menu-clicked" : "icon-menu"
                    }
                  >
                    <i className="fas fa-door-open" />
                  </div>
                  <div
                    className={checkClickBar ? `d-none` : `wrap-menu-main-a`}
                  >
                    Đăng xuất
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Spin>
    </>
  );
}

const mapStateToProps = (state) => {
  const { contentSidebar } = state.sidebarReducer;
  const { infoAdmin } = state.authAdminReducer;
  const { listNotify } = state.socketIoReducer;
  return {
    contentSidebar: contentSidebar,
    infoAdmin: infoAdmin,
    listNotify: listNotify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContentSidebarAdminTask: () => dispatch(getContentSidebarAdminAction()),
    getInfoFacultyAdminTask: (params) =>
      dispatch(getInfoFacultyAdminAction(params)),
    postLogoutAdminTask: () => dispatch(postLogoutAdminAction()),
    postSendMessageAdminTask: (params) =>
      dispatch(postSendMessageAdminAction(params)),
    getListNotifyAdminTask: () => dispatch(getListNotifyAdminAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

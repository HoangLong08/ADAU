import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, DatePicker, Spin } from "antd";
import { Line } from "react-chartjs-2";
import {
  getContentDashboardAdminAction,
  getContentDashboardByDatedAdminAction,
} from "../../redux/actions";

import moment from "moment";

import "../Dashboard/style.css";

const { RangePicker } = DatePicker;

function Index({
  contentDashboard,
  getContentDashboardAdminTask,
  getContentDashboardByDatedAdminTask,
}) {
  const { accessAndRequest, listAccountOnline, sum, topNewfeed, topVideo } =
    contentDashboard.data;

  const [dateFromTo, setDateFromTo] = useState({});

  let arrayAccess = [];
  let arrayRequest = [];
  let arrayDate = [];

  accessAndRequest?.forEach((item) => {
    arrayAccess.push(item.access);
  });

  accessAndRequest?.forEach((item) => {
    arrayRequest.push(parseInt(item.requestClient));
  });

  accessAndRequest?.forEach((item) => {
    arrayDate.push(item.day.toString());
  });

  const data = {
    labels: arrayDate,
    datasets: [
      {
        label: "Truy cập",
        data: arrayAccess,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Yêu cầu",
        data: arrayRequest,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const columnAccountOnline = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
  ];

  const columnNewFeed = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày đăng",
      dataIndex: "updatedAT",
      key: "updatedAT",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
  ];

  const columnVideo = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày đăng",
      dataIndex: "updatedAT",
      key: "updatedAT",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
  ];

  function onChange(dates, dateStrings) {
    setDateFromTo({ dateFrom: dateStrings[0], dateTo: dateStrings[1] });
  }

  function renderAccountOnline() {
    return listAccountOnline?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        name: item.name,
        image: (
          <div className="dashboard-avatar" key={index}>
            <img src={item.image} alt="avatar" width="32" height="32" />
          </div>
        ),
      };
    });
  }

  function renderNewFeed() {
    return topNewfeed?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        title: <p>{item.title}</p>,
        updatedAT: item.updatedAT,
        view: item.view,
      };
    });
  }

  function renderVideo() {
    return topVideo?.map((item, index) => {
      return {
        key: index,
        id: item.id,
        title: item.title,
        updatedAT: item.updatedAT,
        view: item.view,
      };
    });
  }

  useEffect(() => {
    getContentDashboardAdminTask();
  }, [getContentDashboardAdminTask]);

  return (
    <>
      <div className="wrap-dashboard">
        <div className="wrap-dashboard-title">
          <h3>Dashboard</h3>
          <div>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              onChange={onChange}
            />
            <button
              className="refresh-btn"
              onClick={() => getContentDashboardByDatedAdminTask(dateFromTo)}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        <Spin tip="Loading..." spinning={contentDashboard.load}>
          <div className="content-dashboard-top">
            <div className="card-sum">
              <div className="cart-icon-zero">
                <i className="fal fa-thumbs-up"></i>
              </div>
              <div className="cart-text-right">
                <span>{sum?.sumLike}</span>
                <span className="cart-sum-text">Total like</span>
              </div>
            </div>
            <div className="card-sum">
              <div className="cart-icon-one">
                <i className="far fa-eye"></i>
              </div>
              <div className="cart-text-right">
                <span>{sum?.sumView}</span>
                <span className="cart-sum-text">Total view</span>
              </div>
            </div>
            <div className="card-sum">
              <div className="cart-icon-two">
                <i className="far fa-video"></i>
              </div>
              <div className="cart-text-right">
                <span>{sum?.sumVideo}</span>
                <span className="cart-sum-text">Total video</span>
              </div>
            </div>
            <div className="card-sum">
              <div className="cart-icon-three">
                <i className="fal fa-book"></i>
              </div>
              <div className="cart-text-right">
                <span>{sum?.sumPost}</span>
                <span className="cart-sum-text">Total post</span>
              </div>
            </div>
          </div>
          <div className="content-dashboard-mid">
            <Row>
              <Col md={16}>
                <div className="chart-left">
                  <Line data={data} />
                </div>
              </Col>
              <Col md={8}>
                <div className="chart-right">
                  <h3>Danh sách tài khoản online</h3>
                  <Table
                    pagination={{ pageSize: 3 }}
                    columns={columnAccountOnline}
                    dataSource={renderAccountOnline()}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="content-dashboard-bottom">
            <div className="table-video">
              <h3>Top 5 video </h3>
              <Table
                pagination={{ pageSize: 5 }}
                columns={columnVideo}
                dataSource={renderVideo()}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                pagination={false}
              />
            </div>
            <div className="table-new-feed">
              <h3>Top 5 bài viết </h3>
              <Table
                pagination={{ pageSize: 5 }}
                columns={columnNewFeed}
                dataSource={renderNewFeed()}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                pagination={false}
              />
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { contentDashboard } = state.dashboardReducer;
  return {
    contentDashboard: contentDashboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContentDashboardAdminTask: () =>
      dispatch(getContentDashboardAdminAction()),
    getContentDashboardByDatedAdminTask: (params) =>
      dispatch(getContentDashboardByDatedAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

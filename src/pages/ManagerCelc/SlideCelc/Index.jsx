import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import {
  getListSlideFacultyAdminAction,
  postImageSlideFacultyAdminAction,
  updateListSlideFacultyAdminAction,
} from "../../../redux/actions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../SlideCelc/style.css";

function Index({
  idFaculty = 9,

  listSlideFaculty,
  getListSlideFacultyAdminTask,
  postImageSlideFacultyAdminTask,
  updateListSlideFacultyAdminTask,
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

  const [listSlideState, setListSlideState] = useState(listSlideFaculty?.data);

  useEffect(() => {
    getListSlideFacultyAdminTask({ id: idFaculty });
  }, [getListSlideFacultyAdminTask, idFaculty]);

  useEffect(() => {
    setListSlideState(listSlideFaculty?.data);
  }, [listSlideFaculty]);

  function handleChangeImageAvatar(e) {
    postImageSlideFacultyAdminTask({
      idFaculty: idFaculty,
      type: e.target.files[0],
    });
  }

  function renderListSlide() {
    return listSlideState?.map((item, index) => {
      return (
        <div className="banner-img" key={index}>
          <img src={item.image} alt="hinh anh" />
        </div>
      );
    });
  }

  function delImageSlide(index) {
    const new_arr2 = listSlideState.filter((item, ind) => index !== ind);
    return setListSlideState(new_arr2);
  }

  function renderListImageThumbnail() {
    return listSlideState?.map((item, index) => {
      return (
        <div className="thumbnail-image" key={index}>
          <img src={item.image} alt="hinh anh" />
          <div className="thumbnail-action">
            <div className="" onClick={() => delImageSlide(index)}>
              {/* <button> */}
              <i className="far fa-trash"></i>
              {/* </button> */}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="content-manager-faculty">
      {listSlideFaculty?.load ? (
        <>
          <SkeletonTheme>
            <h1>
              <Skeleton />
            </h1>
            <div className="content-slide-demo">
              <Skeleton height={500} />
            </div>
            <div className="wrap-list-image-slide">
              <div className="list-image-sl">
                <div className="list-thumbnail-image">
                  <Skeleton
                    width={104}
                    height={104}
                    style={{ marginRight: "12px" }}
                  />
                  <Skeleton
                    width={104}
                    height={104}
                    style={{ marginRight: "12px" }}
                  />
                  <Skeleton
                    width={104}
                    height={104}
                    style={{ marginRight: "12px" }}
                  />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </>
      ) : (
        <>
          <h1>Slide câu lạc bộ</h1>
          <div className="content-slide-demo">
            <Slider {...settings}>{renderListSlide()}</Slider>
          </div>
          <div className="wrap-list-image-slide">
            <div className="list-image-sl">
              <div className="list-thumbnail-image">
                {renderListImageThumbnail()}
                {/* <div className="thumbnail-image">
              <img
                src={URL_IMAGE + "1_TH1057/Images/202012/7-20201225100609-e.jpg"}
                alt="hinh anh"
              />
              <div className="thumbnail-action">
                <div className="">
                  <i className="far fa-trash"></i>
                </div>
              </div>
            </div> */}
                <div className="upload-image">
                  <label htmlFor="filePicker" style={{ padding: "5px 10px" }}>
                    Chọn file ảnh của bạn
                  </label>
                  <input
                    id="filePicker"
                    type="file"
                    name="myFile"
                    style={{ visibility: "hidden" }}
                    onChange={(e) => handleChangeImageAvatar(e)}
                  />
                </div>
              </div>
            </div>
            <div className="btn-update-demo">
              {/* <div className="content-btn-demo">
                <button
                  onClick={() => {
                    setListSlideState(listSlideFaculty?.data);
                  }}
                >
                  Hủy
                </button>
              </div> */}
              <div className="content-btn-update">
                <button
                  onClick={() => {
                    updateListSlideFacultyAdminTask({
                      listImgSlide: listSlideState,
                      idFaculty: idFaculty,
                    });
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listSlideFaculty } = state.managerFacultyReducer;
  return {
    listSlideFaculty: listSlideFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSlideFacultyAdminTask: (params) =>
      dispatch(getListSlideFacultyAdminAction(params)),
    postImageSlideFacultyAdminTask: (params) =>
      dispatch(postImageSlideFacultyAdminAction(params)),
    updateListSlideFacultyAdminTask: (params) =>
      dispatch(updateListSlideFacultyAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

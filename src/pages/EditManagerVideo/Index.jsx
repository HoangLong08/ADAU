import React, { useState, useEffect } from "react";
import {
  getDetailManagerVideoAdminAction,
  updateDetailManagerVideoAdminAction,
} from "../../redux/actions";
import { connect } from "react-redux";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../constants/funcUploadImage";

import "../EditManagerVideo/style.css";

const defaultFonts = [
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
];

function Index({
  match,
  detailManagerVideo,
  getDetailManagerVideoAdminTask,
  updateDetailManagerVideoAdminTask,
}) {
  const idVideoManager = match.params?.id;

  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();

  const { admin, des, detail, iframe, title } = detailManagerVideo.data;
  useEffect(() => {
    getDetailManagerVideoAdminTask({ idVideoManager: idVideoManager });
  }, [idVideoManager, getDetailManagerVideoAdminTask]);

  const [valueManagerVideo, setValueManagerVideo] = useState({
    admin: admin,
    des: des,
    iframe: iframe,
    title: title,
  });

  const [errorManagerVideo, setErrorManagerVideo] = useState({
    admin: "",
    des: "",
    iframe: "",
    title: "",
  });

  useEffect(() => {
    setValueManagerVideo((valueManagerVideo) => ({
      ...valueManagerVideo,
      admin: detailManagerVideo.data?.admin,
      des: detailManagerVideo.data?.des,
      iframe: detailManagerVideo.data?.iframe,
      title: detailManagerVideo.data?.title,
    }));
    setEditorState((editorState) => ({
      ...editorState,
      valueEditor: detailManagerVideo.data?.detail,
    }));
  }, [detailManagerVideo]);

  function handleChangeEditManagerVideo(e) {
    const { name, value, type } = e.target;
    setValueManagerVideo({
      ...valueManagerVideo,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  }

  const [editorState, setEditorState] = useState({
    valueEditor: detail,
  });

  // function handleChangeEditor(e) {
  //   setEditorState({
  //     ...editorState,
  //     valueEditor: e,
  //   });
  // }

  function handleSubmitUpdateManagerVideo() {
    let isValue = true;

    const errorValue = {
      des: "",
      title: "",
      iframe: "",
      detail: "",
    };

    if (valueManagerVideo.des === "") {
      isValue = false;
      errorValue.des = "Vui lòng nhập mô tả ngắn";
    } else {
      errorValue.des = "";
    }

    if (valueManagerVideo.iframe === "") {
      isValue = false;
      errorValue.iframe = "Vui lòng nhập link nhúng youtube";
    } else {
      errorValue.iframe = "";
    }

    if (valueManagerVideo.title === "") {
      isValue = false;
      errorValue.title = "Vui lòng nhập tiêu đề";
    } else {
      errorValue.title = "";
    }

    if (isValue) {
      updateDetailManagerVideoAdminTask({
        idVideoManager: idVideoManager,
        editorState: editorState.valueEditor,
        valueManagerVideo: valueManagerVideo,
      });
      setErrorManagerVideo({ ...errorValue });
    } else {
      setErrorManagerVideo({ ...errorValue });
    }
  }

  return (
    <>
      <div className="wrap-edit-manager-post-top">
        <h3>Cập nhật video</h3>
      </div>
      <div className="wrap-edit-manager-post-bottom">
        <div className="form-group-middle">
          <div className="form-group-edit-post-manager">
            <label htmlFor="">Tiêu đề</label>
            <input
              className={
                errorManagerVideo.title.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="Nhập tiêu đề bài viết"
              value={valueManagerVideo.title || ""}
              name="title"
              onChange={(e) => handleChangeEditManagerVideo(e)}
            />
            {errorManagerVideo.title && (
              <small className="small-text-error">
                {errorManagerVideo.title}
              </small>
            )}
          </div>

          {/* <div className="form-group-edit-post-manager">
            <label htmlFor="">Loại</label>
            <input
              type="text"
              placeholder="Loại"
              value={valueManagerVideo.title || ""}
              name="title"
              onChange={(e) => handleChangeEditManagerVideo(e)}
            />
          </div> */}
        </div>
        <div className="form-group-edit-post-manager">
          <label htmlFor="">Mô tả ngắn</label>
          <textarea
            className={
              errorManagerVideo.des.length > 0 ? "form-input-error" : ""
            }
            type="text"
            placeholder="Mô tả ngắn"
            value={valueManagerVideo.des || ""}
            name="des"
            onChange={(e) => handleChangeEditManagerVideo(e)}
          ></textarea>
          {errorManagerVideo.des && (
            <small className="small-text-error">{errorManagerVideo.des}</small>
          )}
        </div>
        <div className="form-group-edit-post-manager">
          <label htmlFor="">Youtube</label>
          <input
            className={
              errorManagerVideo.iframe.length > 0 ? "form-input-error" : ""
            }
            type="text"
            placeholder="youtube"
            value={valueManagerVideo.iframe || ""}
            name="iframe"
            onChange={(e) => handleChangeEditManagerVideo(e)}
          />
          {errorManagerVideo.iframe && (
            <small className="small-text-error">
              {errorManagerVideo.iframe}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="">Bài viết chi tiết</label>

          <SunEditor
            value={editorState.valueEditor || ""}
            setContents={editorState.valueEditor || ""}
            setOptions={{
              height: "auto",
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize"],
                // ['paragraphStyle', 'blockquote'],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor"],
                ["align", "list", "lineHeight"],
                ["outdent", "indent"],

                ["table", "horizontalRule", "link", "image", "video"],
                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                // ['imageGallery'], // You must add the "imageGalleryUrl".
                // ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["removeFormat"],

                // ['save', 'template'],
                // '/', Line break
              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              attributesWhitelist: {
                table: "style",
                tbody: "style",
                thead: "style",
                tr: "style",
                td: "style",
              },
              defaultTag: "div",
              showPathLabel: false,
              font: sortedFontOptions,
              dialogsInBody: true,
            }}
            onChange={(e) => setEditorState({ ...editorState, valueEditor: e })}
            onImageUploadBefore={function (files, info, uploadHandler) {
              uploadImage(files[0], info, uploadHandler);
            }}
          />
        </div>

        <div className="content-edit-manager-video-btn">
          <button
            className="btn-edit-manager-video"
            onClick={() => handleSubmitUpdateManagerVideo()}
          >
            Cập nhật video
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { detailManagerVideo } = state.managerVideoReducer;
  return {
    detailManagerVideo: detailManagerVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailManagerVideoAdminTask: (params) =>
      dispatch(getDetailManagerVideoAdminAction(params)),
    updateDetailManagerVideoAdminTask: (params) =>
      dispatch(updateDetailManagerVideoAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

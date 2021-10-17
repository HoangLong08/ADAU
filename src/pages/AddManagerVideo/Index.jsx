import React, { useState } from "react";
import { addDetailManagerVideoAdminAction } from "../../redux/actions";
import { connect } from "react-redux";
import { Spin } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../constants/funcUploadImage";

import "../AddManagerVideo/style.css";

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

function Index({ addManagerVideo, addDetailManagerVideoAdminTask }) {
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

  const [valueManagerVideo, setValueManagerVideo] = useState({
    admin: "",
    des: "",
    iframe: "",
    title: "",
  });

  const [errorManagerVideo, setErrorManagerVideo] = useState({
    admin: "",
    des: "",
    iframe: "",
    title: "",
  });

  function handleChangeEditManagerVideo(e) {
    const { name, value } = e.target;
    setValueManagerVideo({
      ...valueManagerVideo,
      [name]: value,
    });
  }

  const [editorState, setEditorState] = useState({
    valueEditor: "",
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
      addDetailManagerVideoAdminTask({
        valueManagerVideo: valueManagerVideo,
        editorState: editorState.valueEditor,
      });
      setErrorManagerVideo({ ...errorValue });
    } else {
      setErrorManagerVideo({ ...errorValue });
    }
  }

  return (
    <>
      <Spin spinning={addManagerVideo.load}>
        <div className="wrap-edit-manager-post-top">
          <h3>Thêm video</h3>
        </div>
        <div className="wrap-edit-manager-post-bottom">
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
              <small className="small-text-error">
                {errorManagerVideo.des}
              </small>
            )}
          </div>
          <div className="form-group-edit-post-manager">
            <label htmlFor="">Youtube</label>
            <input
              className={
                errorManagerVideo.iframe.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="Youtube"
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
              onChange={(e) =>
                setEditorState({ ...editorState, valueEditor: e })
              }
              onImageUploadBefore={function (files, info, uploadHandler) {
                uploadImage(files[0], info, uploadHandler);
              }}
            />
          </div>

          <div className="content-add-video-btn">
            <button
              className="btn-add-video"
              onClick={() => handleSubmitUpdateManagerVideo()}
            >
              Thêm video
            </button>
          </div>
        </div>
      </Spin>
    </>
  );
}

const mapStateToProps = (state) => {
  const { addManagerVideo, detailManagerVideo } = state.managerVideoReducer;
  return {
    detailManagerVideo: detailManagerVideo,
    addManagerVideo: addManagerVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDetailManagerVideoAdminTask: (params) =>
      dispatch(addDetailManagerVideoAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

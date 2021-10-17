import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getIntroFacultyAdminAction,
  updateIntroFacultyAdminAction,
} from "../../../redux/actions";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../../constants/funcUploadImage";

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
  idFaculty = 9,
  introFaculty,
  getIntroFacultyAdminTask,
  updateIntroFacultyAdminTask,
}) {
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

  const [valueIntroFaculty, setValueIntroFaculty] = useState({
    des: "",
    title: "",
    iframe: "",
  });

  const [errorIntroFaculty, setErrorIntroFaculty] = useState({
    des: "",
    title: "",
    iframe: "",
  });

  const [editorState, setEditorState] = useState({
    valueEditor: "",
  });

  const [checkClickDetailPost, setCheckClickDetailPost] = useState(false);

  useEffect(() => {
    getIntroFacultyAdminTask({ idFaculty: idFaculty });
  }, [getIntroFacultyAdminTask, idFaculty]);

  useEffect(() => {
    setValueIntroFaculty((valueIntroFaculty) => ({
      ...valueIntroFaculty,
      des: introFaculty?.data?.des,
      title: introFaculty?.data?.title,
      iframe: introFaculty?.data?.iframe,
    }));
    setEditorState((editorState) => ({
      ...editorState,
      valueEditor: introFaculty?.data?.detail && introFaculty?.data?.detail,
    }));
  }, [introFaculty]);

  // function handleChangeEditor(e) {
  //   setEditorState({
  //     ...editorState,
  //     valueEditor: e,
  //   });
  // }

  function handleIntroFaculty(e) {
    const { name, value } = e.target;
    setValueIntroFaculty({
      ...valueIntroFaculty,
      [name]: value,
    });
  }

  function handleUpdateIntroFaculty() {
    let isValue = true;

    const errorValue = {
      des: "",
      title: "",
      iframe: "",
      detail: "",
    };

    if (valueIntroFaculty.des === "") {
      isValue = false;
      errorValue.des = "Vui lòng nhập mô tả ngắn";
    } else {
      errorValue.des = "";
    }

    if (valueIntroFaculty.title === "") {
      isValue = false;
      errorValue.title = "Vui lòng nhập tiêu đề ngắn";
    } else {
      errorValue.title = "";
    }

    if (valueIntroFaculty.iframe === "") {
      isValue = false;
      errorValue.iframe = "Vui lòng nhập link youtube";
    } else {
      errorValue.iframe = "";
    }

    if (isValue) {
      updateIntroFacultyAdminTask({
        ...valueIntroFaculty,
        id: introFaculty?.data?.id,
        editorEdit: editorState.valueEditor,
      });
      setErrorIntroFaculty({ ...errorValue });
    } else {
      setErrorIntroFaculty({ ...errorValue });
    }
  }

  return (
    <div className="content-manager-faculty">
      <div className="title-intro-faculty">
        <h1>Giới thiệu câu lạc bộ</h1>

        <div className="edit-detail-post">
          <button
            onClick={() => setCheckClickDetailPost(!checkClickDetailPost)}
          >
            Chỉnh sửa bài viết
          </button>
        </div>
      </div>
      {/* ---------------------- */}

      {/* ------------------- */}
      <div className="wrap-intro-faculty-frame">
        <div className="content-intro-faculty-top">
          <div className="form-group-intro">
            <label htmlFor="">Youtube</label>
            <input
              className={
                errorIntroFaculty.iframe.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="link nhúng video"
              value={valueIntroFaculty.iframe || ""}
              name="iframe"
              onChange={(e) => handleIntroFaculty(e)}
            />
            {errorIntroFaculty.iframe && (
              <small className="small-text-error">
                {errorIntroFaculty.iframe}
              </small>
            )}
          </div>
          <div className="form-group-intro">
            <label htmlFor="">Tiêu đề</label>
            <input
              className={
                errorIntroFaculty.title.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="tiêu đề"
              value={valueIntroFaculty.title || ""}
              name="title"
              onChange={(e) => handleIntroFaculty(e)}
            />
            {errorIntroFaculty.title && (
              <small className="small-text-error">
                {errorIntroFaculty.title}
              </small>
            )}
          </div>
        </div>
        <div>
          <div className="form-group-intro-des">
            <label htmlFor="">Mô tả ngắn</label>
            <textarea
              className={
                errorIntroFaculty.des.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="mô tả ngắn"
              value={valueIntroFaculty.des || ""}
              name="des"
              onChange={(e) => handleIntroFaculty(e)}
            >
              {valueIntroFaculty?.des}
            </textarea>
            {errorIntroFaculty.des && (
              <small className="small-text-error">
                {errorIntroFaculty.des}
              </small>
            )}
          </div>
        </div>
        {/* detail post */}
        {checkClickDetailPost && (
          <div className="wrap-edit-intro-faculty">
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
        )}
        <div className="content-update-intro-faculty">
          {/* {checkClickDetailPost && (
            <button style={{ marginRight: "12px" }}>Code</button>
          )} */}
          <button onClick={() => handleUpdateIntroFaculty()}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { introFaculty } = state.managerFacultyReducer;
  return {
    introFaculty: introFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIntroFacultyAdminTask: (params) =>
      dispatch(getIntroFacultyAdminAction(params)),
    updateIntroFacultyAdminTask: (params) =>
      dispatch(updateIntroFacultyAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

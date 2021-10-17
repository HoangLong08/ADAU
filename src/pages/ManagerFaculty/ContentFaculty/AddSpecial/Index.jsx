import React, { useState } from "react";
import { connect } from "react-redux";
import { addSpecialFacultyAdminAction } from "../../../../redux/actions";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../../../constants/funcUploadImage";

import "../AddSpecial/style.css";

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

function Index({ match, addSpecialFacultyAdminTask }) {
  const idFaculty = match.params.id;

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

  const [editorState, setEditorState] = useState({
    valueEditor: "",
  });

  const [valuePostFaculty, setValuePostFaculty] = useState({
    des: "",
    title: "",
    image: "",
  });

  const [errorPostFaculty, setErrorPostFaculty] = useState({
    des: "",
    title: "",
    image: "",
  });

  function handleChangeAddPostFaculty(e) {
    const { name, value, type } = e.target;
    setValuePostFaculty({
      ...valuePostFaculty,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  }

  // function handleChangeEditor(e) {
  //   setEditorState({
  //     ...editorState,
  //     valueEditor: e,
  //   });
  // }

  function handleAddPostFaculty() {
    let isValue = true;

    const errorValue = {
      name: "",
      des: "",
    };

    if (valuePostFaculty.des === "") {
      isValue = false;
      errorValue.des = "Vui lòng nhập mô tả ngắn";
    } else {
      errorValue.des = "";
    }

    if (valuePostFaculty.title === "") {
      isValue = false;
      errorValue.title = "Vui lòng nhập tiêu đề";
    } else {
      errorValue.title = "";
    }

    // if (valuePostFaculty.image === "") {
    //   isValue = false;
    //   errorValue.image = "Vui lòng chọn hình ảnh";
    // } else {
    //   errorValue.image = "";
    // }

    if (isValue) {
      addSpecialFacultyAdminTask({
        idFaculty: idFaculty,
        valuePostFaculty: valuePostFaculty,
        editorState: editorState.valueEditor,
      });
      setErrorPostFaculty({ ...errorValue });
    } else {
      setErrorPostFaculty({ ...errorValue });
    }
  }

  return (
    <>
      <div className="wrap-add-specil-top">
        <h3>Thêm chuyên ngành</h3>
      </div>
      <div className="wrap-add-special-bottom">
        <div>
          <div className="form-group-add-special">
            <label htmlFor="">Tên chuyên ngành</label>
            <input
              className={
                errorPostFaculty.title.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="Tên chuyên ngành"
              value={valuePostFaculty.title || ""}
              name="title"
              onChange={(e) => handleChangeAddPostFaculty(e)}
            />
            {errorPostFaculty.title && (
              <small className="small-text-error">
                {errorPostFaculty.title}
              </small>
            )}
          </div>
          <div className="form-group-add-special">
            <label htmlFor="">Hình ảnh</label>
            <input
              className={
                errorPostFaculty.image?.length > 0 ? "form-input-error" : ""
              }
              type="file"
              name="image"
              placeholder="link nhúng video"
              // value={valuePostFaculty.image || ""}
              onChange={(e) => handleChangeAddPostFaculty(e)}
            />
            {errorPostFaculty?.image && (
              <small className="small-text-error">
                {errorPostFaculty?.image}
              </small>
            )}
          </div>
        </div>
        <div>
          <div className="form-group-add-special">
            <label htmlFor="">Mô tả ngắn</label>
            <input
              className={
                errorPostFaculty.des.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="mô tả ngắn"
              value={valuePostFaculty.des || ""}
              name="des"
              onChange={(e) => handleChangeAddPostFaculty(e)}
            />
            {errorPostFaculty.des.length > 0 && (
              <small className="small-text-error">{errorPostFaculty.des}</small>
            )}
          </div>
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
        <div className="content-add-special-btn">
          <button onClick={handleAddPostFaculty}>Thêm chuyên ngành</button>
        </div>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   const { introFaculty } = state.managerFacultyReducer;
//   return {
//     introFaculty: introFaculty,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    addSpecialFacultyAdminTask: (params) =>
      dispatch(addSpecialFacultyAdminAction(params)),
  };
};

export default connect(null, mapDispatchToProps)(Index);

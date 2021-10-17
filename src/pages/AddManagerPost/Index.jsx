import React, { useState } from "react";
import { Radio, Spin } from "antd";
import { connect } from "react-redux";
import { addDetailManagerPostAdminAction } from "../../redux/actions";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../constants/funcUploadImage";
import "../AddManagerPost/style.css";
import { notification } from "antd";
const openNotificationWithIcon = (type, notify) => {
  notification[type]({
    message: "",
    description: notify,
    duration: 30,
  });
};
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

function Index({ match, addManagerPost, addDetailManagerPostAdminTask }) {
  const idFaculty = match.params?.id;

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

  const [valueManagerPost, setValueManagerPost] = useState({
    admin: "",
    des: "",
    image: "",
    title: "",
    type: 2,
  });

  const [errorManagerPost, setErrorManagerPost] = useState({
    admin: "",
    des: "",
    image: "",
    title: "",
  });

  const [checkSizeImage, setCheckSizeImage] = useState("");

  function handleChangeEditManagerPost(e) {
    const { name, value, type } = e.target;
    if (type === "file") {
      if (e.target.files[0]?.size > 1048770) {
        setCheckSizeImage("Kích thước file tối đa 1MB");
        openNotificationWithIcon("error", "Kích thước file tối đa 1MB");
      }else{
        setCheckSizeImage("");
        setValueManagerPost({
          ...valueManagerPost,
          image: e.target.files[0],
        });
      }
    }
    else {
      setCheckSizeImage("");
      setValueManagerPost({
        ...valueManagerPost,
        [name]: type === "file" ? e.target.files[0] : value,
      });
    }
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

  function handleSubmitUpdateManagerPost() {
    let isValue = true;

    const errorValue = {
      admin: "",
      des: "",
      image: "",
      title: "",
    };

    if (valueManagerPost.des === "") {
      isValue = false;
      errorValue.des = "Vui lòng nhập mô tả ngắn";
    } else {
      errorValue.des = "";
    }

    if (valueManagerPost.title === "") {
      isValue = false;
      errorValue.title = "Vui lòng nhập tiêu đề";
    } else {
      errorValue.title = "";
    }

    // if (valueManagerPost.image === "") {
    //   isValue = false;
    //   errorValue.image = "Vui lòng chọn hình ảnh";
    // } else {
    //   errorValue.image = "";
    // }

    if (isValue) {
      addDetailManagerPostAdminTask({
        idFaculty: idFaculty,
        valueManagerPost: valueManagerPost,
        editorState: editorState.valueEditor,
      });
      setErrorManagerPost({ ...errorValue });
    } else {
      setErrorManagerPost({ ...errorValue });
    }
  }

  return (
    <>
      <Spin spinning={addManagerPost.load}>
        <div className="wrap-edit-manager-post-top">
          <h3>Thêm bài viết</h3>
        </div>
        <div className="wrap-edit-manager-post-bottom">
          <div className="form-group-middle">
            <div className="form-group-edit-post-manager">
              <label htmlFor="">Tiêu đề</label>
              <input
                className={
                  errorManagerPost.title.length > 0 ? "form-input-error" : ""
                }
                type="text"
                placeholder="Nhập tiêu đề bài viết"
                value={valueManagerPost.title || ""}
                name="title"
                onChange={(e) => handleChangeEditManagerPost(e)}
              />
              {errorManagerPost.title && (
                <small className="small-text-error">
                  {errorManagerPost.title}
                </small>
              )}
            </div>
            <Radio.Group
              onChange={(e) => handleChangeEditManagerPost(e)}
              name="type"
              value={valueManagerPost.type}
            >
              <Radio value={2}>Bài viết tin tức</Radio>
              <Radio value={4}>Bài viết menu</Radio>
            </Radio.Group>
            <div className="form-group-edit-post-manager">
              {/* <input
              type="text"
              placeholder="Loại"
              value={valueManagerPost.title || ""}
              name="title"
              onChange={(e) => handleChangeEditManagerPost(e)}
            /> */}
            </div>
          </div>
          <div className="form-group-edit-post-manager">
            <label htmlFor="">Mô tả ngắn</label>
            <textarea
              className={
                errorManagerPost.des.length > 0 ? "form-input-error" : ""
              }
              type="text"
              placeholder="Mô tả ngắn"
              value={valueManagerPost.des || ""}
              name="des"
              onChange={(e) => handleChangeEditManagerPost(e)}
            ></textarea>
            {errorManagerPost.des && (
              <small className="small-text-error">{errorManagerPost.des}</small>
            )}
          </div>
          <div>
            <label htmlFor="">Thumbnail</label>
            <div className="image-manager-post">
              {/* <img src={valueManagerPost.image} alt="DAU" /> */}
              <input
                className={
                  errorManagerPost.image.length > 0 ? "form-input-error" : ""
                }
                type="file"
                name="image"
                onChange={(e) => handleChangeEditManagerPost(e)}
              />
              {errorManagerPost.image && (
                <small className="small-text-error">
                  {errorManagerPost.image}
                </small>
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
              onChange={(e) =>
                setEditorState({ ...editorState, valueEditor: e })
              }
              onImageUploadBefore={function (files, info, uploadHandler) {
                uploadImage(files[0], info, uploadHandler);
              }}
            />
          </div>

          <div className="content-add-post-manager">
            {checkSizeImage.length === 0 ? (
              <button
                className="btn-add-post-manager"
                onClick={() => handleSubmitUpdateManagerPost()}
              >
                Thêm bài viết
              </button>
            ) : (
              <button className="btn-add-post-manager">
                Thêm bài viết
                <p>{checkSizeImage}</p>
              </button>
            )}
          </div>
        </div>
      </Spin>
    </>
  );
}

const mapStateToProps = (state) => {
  const { detailManagerPost, addManagerPost } = state.managerPostReducer;
  return {
    detailManagerPost: detailManagerPost,
    addManagerPost: addManagerPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDetailManagerPostAdminTask: (params) =>
      dispatch(addDetailManagerPostAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

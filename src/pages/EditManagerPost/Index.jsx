import React, { useState, useEffect } from "react";

// import { Radio } from "antd";
// import axios from "axios";
import {
  getDetailManagerPostAdminAction,
  updateDetailManagerPostAdminAction,
} from "../../redux/actions";
import { connect } from "react-redux";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../constants/funcUploadImage";

import "../EditManagerPost/style.css";
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

function Index({
  match,
  detailManagerPost,
  getDetailManagerPostAdminTask,
  updateDetailManagerPostAdminTask,
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

  const idPostManager = match.params?.id;
  const idFaculty = match.params?.faculty;
  console.log("detailManagerPost.data: ", detailManagerPost.data);

  const { des, detail, image, title, type, numberType, numberActive } =
    detailManagerPost.data;
  const [numberTypeState, setNumberTypeState] = useState(
    detailManagerPost.data?.numberType
  );
  useEffect(() => {
    getDetailManagerPostAdminTask({ idPostManager: idPostManager });
  }, [idPostManager, getDetailManagerPostAdminTask]);

  const [valueManagerPost, setValueManagerPost] = useState({
    // admin: admin,
    des: des,
    image: image,
    title: title,
    type: type,
    numberType: numberType,
    numberActive: numberActive,
  });

  const [errorManagerPost, setErrorManagerPost] = useState({
    // admin: admin,
    des: "",
    image: "",
    title: "",
    type: "",
  });
  const [checkSizeImage, setCheckSizeImage] = useState("");
  // console.log("numberTypeState: ", numberTypeState);
  useEffect(() => {
    setValueManagerPost((valueManagerPost) => ({
      ...valueManagerPost,
      admin: detailManagerPost.data?.admin,
      des: detailManagerPost.data?.des,
      image: detailManagerPost.data?.image,
      title: detailManagerPost.data?.title,
      type: detailManagerPost.data?.type,
      numberType: detailManagerPost.data?.numberType,
      numberActive: detailManagerPost.data?.numberActive,
    }));
    setNumberTypeState(detailManagerPost.data?.numberType);
    setEditorState((editorState) => ({
      ...editorState,
      valueEditor: detailManagerPost.data?.detail,
    }));
  }, [detailManagerPost]);

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
    }else {
      setCheckSizeImage("");
      setValueManagerPost({
        ...valueManagerPost,
        [name]: type === "file" ? e.target.files[0] : value,
      });
    }
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

  function handleSubmitUpdateManagerPost() {
    let isValue = true;
    const errorValue = {
      des: "",
      image: "",
      title: "",
      type: "",
    };

    if (valueManagerPost.des === "") {
      isValue = false;
      errorValue.des = "Vui lòng nhập mô tả ngắn";
    } else {
      errorValue.des = "";
    }

    // if (valueManagerPost.image === "") {
    //   isValue = false;
    //   errorValue.image = "Vui lòng chọn hình ảnh";
    // } else {
    //   errorValue.image = "";
    // }

    if (valueManagerPost.title === "") {
      isValue = false;
      errorValue.title = "Vui lòng nhập tiêu đề";
    } else {
      errorValue.title = "";
    }

    if (isValue) {
      /**
   * numberTypeOld   =  request.form["numberTypeOld"]
        numberTypeNew   =  request.form["numberTypeNew"]
        numberActive    =  request.form["numberActive"]
        idFaculty       =  request.form["idFaculty"]
   */
      updateDetailManagerPostAdminTask({
        idPostManager: idPostManager,
        editorState: editorState.valueEditor,
        valueManagerPost: valueManagerPost,
        numberTypeOld: numberTypeState, // old
        numberTypeNew: valueManagerPost.numberType,
        numberActive: numberActive,
        idFaculty: idFaculty,
      });
      setErrorManagerPost({ ...errorValue });
    } else {
      setErrorManagerPost({ ...errorValue });
    }
  }

  return (
    <>
      <div className="wrap-edit-manager-post-top">
        <h3>Cập nhật bài viết</h3>
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
            {errorManagerPost.title.length > 0 && (
              <small className="small-text-error">
                {errorManagerPost.title}
              </small>
            )}
          </div>
          {/* <Radio.Group
            onChange={(e) => handleChangeEditManagerPost(e)}
            name="numberType"
            value={valueManagerPost.numberType}
          >
            <Radio value={2}>Bài viết tin tức</Radio>
            <Radio value={4}>Bài viết menu</Radio>
          </Radio.Group> */}
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
          {errorManagerPost.des.length > 0 && (
            <small className="small-text-error">{errorManagerPost.des}</small>
          )}
        </div>
        <div>
          <label htmlFor="">Thumbnail</label>
          <div className="image-manager-post">
            <img src={valueManagerPost.image} alt="DAU" />
            <input
              type="file"
              name="image"
              onChange={(e) => handleChangeEditManagerPost(e)}
            />
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

        <div className="content-update-manager-post-btn">
          {checkSizeImage.length === 0 ? (
            <button
              className="btn-update-manager-post"
              onClick={() => handleSubmitUpdateManagerPost()}
            >
              Cập nhật bài viết
            </button>
          ) : (
            <button className="btn-update-manager-post">
              Cập nhật bài viết
              <p>{checkSizeImage}</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { detailManagerPost } = state.managerPostReducer;
  return {
    detailManagerPost: detailManagerPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailManagerPostAdminTask: (params) =>
      dispatch(getDetailManagerPostAdminAction(params)),
    updateDetailManagerPostAdminTask: (params) =>
      dispatch(updateDetailManagerPostAdminAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

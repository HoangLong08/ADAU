import React, { useState, useEffect } from "react";
import {
  getSpecialByIdFacultyAdminAction,
  uploadImageSpecialFacultyAction,
  updateSpecialFacultyAction,
} from "../../../../redux/actions";
import "../EditSpecial/style.css";
import { connect } from "react-redux";
import { Spin } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImage } from "../../../../constants/funcUploadImage";
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
  updateSpecialFaculty,
  detailSpecialFaculty,
  getSpecialByIdFacultyAdminTask,
  uploadImageSpecialFacultyTask,
  updateSpecialFacultyTask,
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

  const { des, detail, image, name } = detailSpecialFaculty.data; // id, idAdmin
  const idSpecial = match.params.id;

  const [editorState, setEditorState] = useState({
    valueEditor: detail,
  });

  const [valueSpecialFaculty, setValueSpecialFaculty] = useState({
    des: des,
    title: name,
    image: image,
  });

  const [errorSpecialFaculty, setErrorSpecialFaculty] = useState({
    des: "",
    title: "",
    image: "",
  });

  useEffect(() => {
    getSpecialByIdFacultyAdminTask({ id: idSpecial });
  }, [getSpecialByIdFacultyAdminTask, idSpecial]);

  const [contentLp, setContentLp] = useState(editorState.valueEditor);
  useEffect(() => {
    setEditorState((editorState) => ({
      ...editorState,
      valueEditor: detailSpecialFaculty.data?.detail,
    }));
    setValueSpecialFaculty((valueSpecialFaculty) => ({
      ...valueSpecialFaculty,
      des: detailSpecialFaculty.data?.des,
      title: detailSpecialFaculty.data?.name,
      image: detailSpecialFaculty.data?.image,
    }));
    setContentLp(detailSpecialFaculty.data?.detail);
  }, [detailSpecialFaculty]);

  function handleChangeAddSpecialFaculty(e) {
    const { name, value } = e.target;
    setValueSpecialFaculty({
      ...valueSpecialFaculty,
      [name]: value,
    });
  }

  const [sizeImage, setSizeImage] = useState("");

  function handleChangeImageSpecial(e) {
    const { name, value, type } = e.target;
    console.log(e.target.files[0].size);
    if (type === "file") {
      if (e.target.files[0]?.size > 1048770) {
        setSizeImage("Vui l??ng ch???n l???i file ???nh c?? k??ch th?????c t???i ??a 1MB");
        openNotificationWithIcon("error", "K??ch th?????c file t???i ??a 1MB");
      } 
    }
    else {
      setSizeImage("");
      uploadImageSpecialFacultyTask({
        type: e.target.files[0],
      });
    }
  }

  // function handleChangeEditor(e) {
  //   setEditorState({
  //     ...editorState,
  //     valueEditor: e,
  //   });
  // }

  function handleAddSpecialFaculty() {
    let isValue = true;

    const errorValue = {
      name: "",
      des: "",
    };

    if (valueSpecialFaculty.des === "") {
      isValue = false;
      errorValue.des = "Vui l??ng nh???p m?? t??? ng???n";
    } else {
      errorValue.des = "";
    }

    if (valueSpecialFaculty.title === "") {
      isValue = false;
      errorValue.title = "Vui l??ng nh???p t??n chuy??n ng??nh";
    } else {
      errorValue.title = "";
    }

    if (isValue) {
      updateSpecialFacultyTask({
        idSpecial: idSpecial,
        valueSpecialFaculty: valueSpecialFaculty,
        editorState: editorState.valueEditor,
      });
      setErrorSpecialFaculty({ ...errorValue });
    } else {
      setErrorSpecialFaculty({ ...errorValue });
    }
  }
  return (
    <>
      <Spin spinning={updateSpecialFaculty.load}>
        <div className="wrap-edit-special-top">
          <h3>C???p nh???t chuy??n ng??nh</h3>
        </div>
        <div className="wrap-edit-special-bottom">
          <div>
            <div className="form-group-special">
              <label htmlFor="">T??n chuy??n ng??nh</label>
              <input
                className={
                  errorSpecialFaculty.title.length > 0 ? "form-input-error" : ""
                }
                type="text"
                placeholder="T??n chuy??n ng??nh"
                value={valueSpecialFaculty.title || ""}
                name="title"
                onChange={(e) => handleChangeAddSpecialFaculty(e)}
              />
              {errorSpecialFaculty.title.length > 0 && (
                <small className="small-text-error">
                  {errorSpecialFaculty.title}
                </small>
              )}
            </div>
            <div>
              <div className="form-group-special">
                <label htmlFor="">M?? t??? ng???n</label>
                <input
                  className={
                    errorSpecialFaculty.des.length > 0 ? "form-input-error" : ""
                  }
                  type="text"
                  placeholder="m?? t??? ng???n"
                  value={valueSpecialFaculty.des || ""}
                  name="des"
                  onChange={(e) => handleChangeAddSpecialFaculty(e)}
                />
                {errorSpecialFaculty.des.length > 0 && (
                  <small className="small-text-error">
                    {errorSpecialFaculty.des}
                  </small>
                )}
              </div>
            </div>
            <div>
              <img
                src={valueSpecialFaculty.image}
                alt=""
                width="auto"
                height="200"
              />
            </div>
            <div className="form-group-special">
              <label htmlFor="">H??nh ???nh</label>
              <input
                type="file"
                name="image"
                onChange={(e) => handleChangeImageSpecial(e)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="">B??i vi???t chi ti???t</label>
            <SunEditor
              value={editorState.valueEditor || ""}
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
              setContents={contentLp}
              onChange={(e) =>
                setEditorState({ ...editorState, valueEditor: e })
              }
              onImageUploadBefore={function (files, info, uploadHandler) {
                uploadImage(files[0], info, uploadHandler);
              }}
            />
          </div>
          <div className="content-update-special-btn">
            {sizeImage.length > 0 ? (
              <button>
                C???p nh???t chuy??n ng??nh <p>{sizeImage}</p>
              </button>
            ) : (
              <button onClick={handleAddSpecialFaculty}>
                C???p nh???t chuy??n ng??nh
              </button>
            )}
          </div>
        </div>
      </Spin>
    </>
  );
}

const mapStateToProps = (state) => {
  const { updateSpecialFaculty, detailSpecialFaculty } =
    state.managerFacultyReducer;
  return {
    detailSpecialFaculty: detailSpecialFaculty,
    updateSpecialFaculty: updateSpecialFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialByIdFacultyAdminTask: (params) =>
      dispatch(getSpecialByIdFacultyAdminAction(params)),
    uploadImageSpecialFacultyTask: (params) =>
      dispatch(uploadImageSpecialFacultyAction(params)),
    updateSpecialFacultyTask: (params) =>
      dispatch(updateSpecialFacultyAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

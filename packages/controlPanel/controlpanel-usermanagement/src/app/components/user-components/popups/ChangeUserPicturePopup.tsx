import React, { FC, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { fetchUser } from "../../../features/users-slice/userSlice";
import { useParams } from "react-router-dom";
import { editUserPicture } from "../../../features/users-slice/editUserPictureSlice";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import Swal from "sweetalert2";

type ChangeUserPicturePopupProps = {
  showChangeUserPicturePopup?: any;
  handleCloseChangeUserPicturePopup: () => any;
  id?: number | Number | string;
};

export const ChangeUserPicturePopup: FC<ChangeUserPicturePopupProps> = ({
  showChangeUserPicturePopup,
  handleCloseChangeUserPicturePopup,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let { id } = useParams();
  let inputRef = useRef<HTMLInputElement | null>(null);
  let userImg = useSelector((state: RootState) => {
    return state?.user?.data?.imageUrl;
  });
  let user = useSelector((state: RootState) => {
    return state?.user?.data;
  });
  useEffect(() => {
    setImagePreview(
      userImg
        ? `${UserManagmentRootUrl}${userImg}`
        : user?.userGender == 0
        ? toAbsoluteUrl("/media/avatars/300-3.jpg")
        : user?.userGender == 1
        ? toAbsoluteUrl("/media/avatars/300-3.jpg")
        : ""
    );
  }, [userImg]);
  const [imagePreview, setImagePreview] = useState<any>("");

  let [file, setFile] = useState<File>();

  let [message, setMessage] = useState<any>("");
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFile(file);
    }
  }
  function handleCancel() {
    setImagePreview("");
  }

  const putUserPicture = async () => {
    let body = {
      id,
      data: file,
    };
    dispatch(editUserPicture(body as any) as any).then((res: any) => {
      setMessage(res?.payload?.message);
    });
  };
  useEffect(() => {
    if (message == "userImageAddedSuccessfully") {
      showSuccessAlert(true, "ModifiedSuccessfully", intl);
      handleCloseChangeUserPicturePopup();
      dispatch(fetchUser(id as string) as any);
    } else if (message != "") {
      Swal.fire({
        text: intl.formatMessage({ id: "UserDoesNotHaveEditPermission" }),
        icon: "warning",
        heightAuto: false,
        buttonsStyling: false,
        confirmButtonText: intl.formatMessage({ id: "Agree" }),
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  return (
    <>
      <div className="modal-dialog modal-dialog-centered mw-1000px">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showChangeUserPicturePopup}
          onHide={handleCloseChangeUserPicturePopup}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <h2 className="flex-column align-items-center">
                    <span className="fw-bolder mb-2 fs-3">
                      {intl.formatMessage({
                        id: "ChangeUserPicture",
                      })}
                    </span>
                  </h2>
                </Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="row w-100">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <div className="position-relative basic-img-container">
                    <img
                      alt="user pic."
                      src={`${imagePreview}`}
                      className="d-inline-block myrounded-10 w-100 h-100"
                      onError={(e: any) =>
                        (e.target.src = `${toAbsoluteUrl(
                          "/media/avatars/300-3.jpg"
                        )}`)
                      }
                    />

                    <div
                      onClick={() => {
                        inputRef?.current?.click();
                      }}
                      className="d-flex edit-img cursor-pointer bg-white w-30px h-30px align-items-center justify-content-center"
                    >
                      <i className="fa-solid fa-pen-to-square fs-3 text-gray-500"></i>{" "}
                      <input
                        ref={inputRef}
                        style={{ display: "none" }}
                        type="file"
                        name="avatar"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="mt-8 mb-5 d-flex gap-4 mx-auto">
                <button
                  type="reset"
                  className="btn btn-light px-15"
                  onClick={handleCloseChangeUserPicturePopup}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-15"
                  disabled={file ? false : true}
                  onClick={() => {
                    putUserPicture();
                  }}
                >
                  <span className="indicator-label">
                    {intl.formatMessage({ id: "Edit" })}
                  </span>
                  <span className="indicator-progress">
                    {intl.formatMessage({ id: "PleaseWait" })}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
};

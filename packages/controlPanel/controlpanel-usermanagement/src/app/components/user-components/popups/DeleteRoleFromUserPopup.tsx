import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteRoleFromUser } from "../../../features/users-slice/deleteRoleFromUser";
import { fetchUserRoles } from "../../../features/users-slice/userRolesSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type DeletePopupProps = {
  id?: number | Number | string;
  handleDelete?: (id: number, additionalData: {}) => void;
  additionalData?: {};
  showDelete?: any;
  handleCloseDelete?: any;
  roleId: number | Number | string;
};

export const DeleteRoleFromUserPopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id = 0,
  roleId,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let [message, setMessage] = useState<string>("");

  let deleteHandler = (
    id: number | Number | string,
    roleId: number | Number | string
  ) => {
    dispatch(deleteRoleFromUser({ id, roleId: roleId }) as any).then(
      (res: any) => {
        setMessage(res?.payload?.message);
      }
    );
  };
  useEffect(() => {
    if (message == "userRoleRemovedSuccessfully") {
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      handleCloseDelete();
      dispatch(
        fetchUserRoles({
          pageSize: 1000,
          pageNumber: 1,
          id,
        }) as any
      ) as any;
      const selectedRoleIdsFromLocalStorage = JSON.parse(
        localStorage.getItem("selectedRoleIds") || "[]"
      );
      const updatedSelectedRoleIds = selectedRoleIdsFromLocalStorage.filter(
        (roleIdFromLocalStorage: number | Number | string) =>
          roleIdFromLocalStorage !== roleId
      );

      localStorage.setItem(
        "selectedRoleIds",
        JSON.stringify(updatedSelectedRoleIds)
      );
      window.location.reload();
    }
  }, [message]);
  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <Modal centered show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmDeletion" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({ id: "AreYouSureToDeleteThisItem" })}
              </h5>
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center py-2">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleCloseDelete}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={() => {
                      deleteHandler(id, roleId);
                    }}
                    className="  btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Delete" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Deleting" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

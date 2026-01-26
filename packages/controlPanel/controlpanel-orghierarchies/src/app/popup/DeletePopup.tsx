import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  deleteOrgManager,
  deleteOrgMemberAsync,
} from "../features/orghierarchies-slice/delete-org-memberSlice";
// import { DeleteOrgMember } from "../models/delete-org-member-model";
import { ResponseStatus } from "../models/response-status";
import { fetchOrgMembers } from "../features/orghierarchies-slice/org-membersSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type DeletePopupProps = {
  id?: string | null;
  deleteModel: any;
  showDelete?: any;
  handleCloseDelete?: any;
  comeFrom?: string;
};

export const DeletePopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id = 0,
  deleteModel,
  comeFrom = "employee",
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const delteSubmited = () => {
    if (comeFrom === "employee") {
      dispatch(deleteOrgMemberAsync(deleteModel) as any).then((res: any) => {
        if (res?.error?.message == "Request failed with status code 403") {
          showSuccessAlert(false, "UserDoesNotHaveEditPermission", intl);
        } else if (
          res?.payload?.statusEnum == ResponseStatus.SavedSuccessfully
        ) {
          showSuccessAlert(true, "DeletedSuccessfully", intl, () => {
            window.location.reload();
          });
          let myparams = {
            pageSize: pageSize,
            pageNumber: pageIndex,
          };
          dispatch(
            fetchOrgMembers({
              id: deleteModel.orgId as string,
              myparams,
            }) as any
          );
          handleCloseDelete();
        } else if (res?.payload?.message == "Not found this Members") {
          showSuccessAlert(
            false,
            "AnEmployeeCannotBeDeletedUnlessDeletedFromDepartment",
            intl
          );
        } else {
          showSuccessAlert(false, res?.payload?.message, intl);
          handleCloseDelete();
        }
      });
    } else {
      dispatch(deleteOrgManager(deleteModel) as any).then((res: any) => {
        if (res?.error?.message == "Request failed with status code 403") {
          showSuccessAlert(false, "UserDoesNotHaveEditPermission", intl);
        } else if (
          res?.payload?.statusEnum == ResponseStatus.SavedSuccessfully
        ) {
          showSuccessAlert(true, "DeletedSuccessfully", intl, () => {
            window.location.reload();
          });

          handleCloseDelete();
        } else if (res?.payload?.message == "Not found this Members") {
          showSuccessAlert(
            false,
            "AnEmployeeCannotBeDeletedUnlessDeletedFromDepartment",
            intl
          );
        } else {
          showSuccessAlert(false, res?.payload?.message, intl);
          handleCloseDelete();
        }
      });
    }
  };

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
                    onClick={delteSubmited}
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

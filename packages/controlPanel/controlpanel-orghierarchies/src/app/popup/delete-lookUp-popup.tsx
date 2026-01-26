import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLookUpById,
  getAllLookUps,
  getLookUps,
} from "../features/orghierarchies-slice/look-upSlice";
import { RootState } from "../features/store";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type DeletePopupProps = {
  id: string;
  showDelete?: any;
  handleCloseDelete?: any;
};

export const DeleteLookUpPopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id,
}) => {
  const intl = useIntl();

  const dispatch = useDispatch();

  let pagination = useSelector((state: RootState) => {
    return state?.lookUp?.pagination;
  });
  const handleDeleteLookUp = (id: string) => {
    dispatch(deleteLookUpById(id) as any).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "DeletedSuccessfully", intl, () => {
          window.location.reload();
        });
        dispatch(
          getLookUps({
            PageNumber: pagination?.pageIndex,
            PageSize: pagination?.pageSize,
          }) as any
        );
        dispatch(getAllLookUps() as any);
        handleCloseDelete();
      } else if (res?.payload?.message == "CatagoryAlreadyHasOrg") {
        showSuccessAlert(false, res?.payload?.message, intl);
        handleCloseDelete();
      } else {
        showSuccessAlert(false, res?.payload?.message, intl);
        handleCloseDelete();
      }
    });
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
                    onClick={() => handleDeleteLookUp(id)}
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

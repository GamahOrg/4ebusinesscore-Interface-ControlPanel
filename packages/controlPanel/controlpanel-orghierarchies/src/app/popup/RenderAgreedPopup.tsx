import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteOrgAsync } from "../features/orghierarchies-slice/delete-orgSlice";
import { ResponseStatus } from "../models/response-status";
import { fetchOrgs } from "../features/orghierarchies-slice/orgSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type PopupProps = {
  show: boolean;
  handleClose: any;
  orgid?: string;
};
export const RenderAgreedPopup: FC<PopupProps> = ({
  show,
  handleClose,
  orgid,
}) => {
  const intl = useIntl();
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch();
  const [deletionReason, setDeletionReason] = useState("");

  useEffect(() => {
    if (isDeleted) {
      dispatch(fetchOrgs({}) as any);
      setIsDeleted(false);
    }
  }, [isDeleted]);

  const handleSubmitDelete = () => {
    dispatch(
      deleteOrgAsync({
        id: orgid as string,
        removeReason: deletionReason,
      }) as any
    ).then((res: any) => {
      if (res?.payload?.statusEnum == ResponseStatus.SavedSuccessfully) {
        showSuccessAlert(true, "DeletedSuccessfully", intl);
        setIsDeleted(true);
        setTimeout(() => {
          handleClose();
        }, 200);
      } else if (res?.payload?.message == "orgHaveChildren") {
        showSuccessAlert(false, "TheSubMustBeDeletedFirst", intl);
      } else {
        showSuccessAlert(false, "UserDoesNotHaveEditPermission", intl);
      }
    });
  };

  const handleDeletionReasonChange = (event: any) => {
    setDeletionReason(event.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0 bg-transparent">
            <Row className="justify-content-center mt-5 mb-10">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h3> {intl.formatMessage({ id: "ConfirmDeletion" })} </h3>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}{" "}
                  </span>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Row className="justify-content-center mb-5">
            <label className="form-label px-2  fontSz-6 mb-5">
              {intl.formatMessage({ id: "DeletionReason" })}
            </label>
            <textarea
              className="form-control form-control-solid"
              rows={5}
              placeholder={intl.formatMessage({ id: "DeletionReason" })}
              value={deletionReason}
              onChange={handleDeletionReasonChange}
            ></textarea>
          </Row>
        </Modal.Body>

        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-5 w-100"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>

                  <button
                    type="submit"
                    onClick={handleSubmitDelete}
                    className="btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Delete" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "ADD" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

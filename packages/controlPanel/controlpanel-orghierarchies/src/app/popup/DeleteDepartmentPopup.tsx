import { FC, Fragment } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type DeletePopupProps = {
  OrgId: string;
  handleDelete?: (id: string, additionalData: {}) => void;
  additionalData?: {};
  showDelete?: any;
  handleCloseDelete?: any;
};
export const DeleteDepartmentPopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
}) => {
  const intl = useIntl();

  return (
    <Fragment>
      <div className="modal fade" aria-hidden="true">
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
            <Row className="justify-content-center mt-5 mb-20">
              <div className="text-center">
                <h1>{intl.formatMessage({ id: "DeleteDepartment/Sector" })}</h1>
              </div>
            </Row>
            <Row className="justify-content-center mb-5">
              <div className="text-center">
                <h5 className="mb-3">هذه الاداره او القطاع تابع له موظفين</h5>
                <h5>من فضلك قم بنقل الموظفين اولا</h5>
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
                      className="btn btn-secondary  me-3 w-200"
                      onClick={handleCloseDelete}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>
                    <div className=" me-5 w-100 "></div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
};

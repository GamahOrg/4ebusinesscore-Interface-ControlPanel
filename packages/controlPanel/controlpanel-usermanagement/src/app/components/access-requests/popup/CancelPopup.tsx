import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRequestsUsers } from "../../../features/requests-users-slice/requestsUsersSlice";
import { deleteRequestUser } from "../../../features/requests-users-slice/requestUserSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type PopupProps = {
  show: boolean;
  handleClose: any;
  id?: string | number | Number;
};
export const CancelPopup: FC<PopupProps> = ({ show, handleClose, id }) => {
  const intl = useIntl();

  let dispatch = useDispatch();

  let [message, setMessage] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let params: any = {
      pageSize: searchParams.get("pageSize"),
      pageNumber: searchParams.get("pageNumber"),
    };
    if (message == "userRemovedSuccessfully") {
      handleClose();
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      dispatch(fetchRequestsUsers(params) as any);
    }
  }, [message]);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Row className="justify-content-center mt-5 mb-5">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M55.9973 64C55.9413 64 56.0507 64 55.9973 64V64ZM52 0H12C5.384 0 0 5.384 0 12V17.3333C0 23.9493 5.384 29.3333 12 29.3333H13.3333C14.808 29.3333 16 28.1387 16 26.6667C16 25.1947 14.808 24 13.3333 24H12C8.32267 24 5.33333 21.008 5.33333 17.3333V12C5.33333 8.32533 8.32267 5.33333 12 5.33333H52C55.6773 5.33333 58.6667 8.32533 58.6667 12V17.3333C58.6667 21.008 55.6773 24 52 24H45.3333C43.8587 24 42.6667 25.1947 42.6667 26.6667C42.6667 28.1387 43.8587 29.3333 45.3333 29.3333H52C58.616 29.3333 64 23.9493 64 17.3333V12C64 5.384 58.616 0 52 0ZM50.0347 49.472L37.352 44.7173V32.2853C37.352 28.2427 34.4827 24.728 30.6747 24.1093C28.3307 23.7253 25.96 24.384 24.1707 25.9067C22.3813 27.4293 21.352 29.6507 21.352 32.0027V52.1707L18.688 50.0507C15.4613 47.152 10.48 47.3547 7.50933 50.536C4.496 53.7573 4.66667 58.8293 7.856 61.816L9.344 63.2507C9.84 63.7307 10.504 63.9973 11.1947 63.9973C13.5947 63.9973 14.7733 61.0773 13.0453 59.4107L11.5307 57.9493C10.456 56.9413 10.4 55.248 11.408 54.1733C12.4027 53.1093 14.072 53.0533 15.144 54.0267C15.2027 54.0827 19.8933 57.8213 19.8933 57.8213C21.1653 58.8347 22.8613 59.016 24.32 58.3173C25.7813 57.6107 26.688 56.1653 26.688 54.544V31.9973C26.688 31.2133 27.032 30.472 27.6293 29.9653C28.2373 29.448 29.0133 29.2427 29.8213 29.368C31.056 29.5707 32.0213 30.8507 32.0213 32.2827V46.56C32.0213 47.672 32.712 48.6667 33.7493 49.0587L48.16 54.464C51.1227 55.5733 53.1547 58.3307 53.3387 61.4853C53.4213 62.904 54.5973 64 55.9973 64C57.4667 63.9147 58.7467 62.6453 58.6613 61.176C58.3547 55.9147 54.968 51.3227 50.0347 49.472Z"
                      fill="#F14A6C"
                    />
                  </svg>
                </div>
                <div className="text-center mt-10">
                  <h3> {intl.formatMessage({ id: "AccessRequests" })}</h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({
                  id: "AreYouSureToCancelTheAccessRequest",
                })}
              </h5>
            </div>
          </Row>
        </Modal.Body>

        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                <div className="d-flex gap-4 justify-content-center align-items-center w-100">
                  <button
                    type="submit"
                    onClick={() => {
                      dispatch(deleteRequestUser(id as string) as any).then(
                        (res: any) => {
                          setMessage(res?.payload?.message);
                        }
                      );
                    }}
                    className="btn btn-danger w-100 px-15 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Yes" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Yes" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary w-100 px-15"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Retreat" })}
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

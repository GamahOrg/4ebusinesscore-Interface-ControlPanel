import moment from "moment";
import { FC, Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgManagers } from "../features/orghierarchies-slice/all-org-managers";
import { RootState } from "../features/store";
import { UserGender } from "../models/response-status";
import { OrgRootUrl } from "@4eplatform/shared/apis/org";
import { Modal } from "react-bootstrap";

export interface IProp {
  orgId: string;
  show: boolean;
  handleClose: any;
  parentId: string;
}
export const ExManagersPopup: FC<IProp> = ({ show, handleClose, parentId }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const allManagers = useSelector((state: RootState) => {
    return state?.allOrgManagers.data;
  });
  const status = useSelector((state: RootState) => state.allOrgManagers.status);

  useEffect(() => {
    dispatch(fetchOrgManagers(parentId) as any);
  }, [parentId, dispatch]);
  if (status === "loading") {
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">
                    {intl.formatMessage({
                      id: "FormerManagers",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({
                      id: "YouCanSeeTheExManagersInTheOrganization",
                    })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className="pb-0 mx-4">
            <div className="card-body mx-5">
              <div className="my-4">
                <div className="table-responsive">
                  <table className="table table-rounded border  table-row-gray-200 align-middle gs-0 gy-4 text-center">
                    <thead>
                      <tr className="fw-bold bg-light">
                        <th className="min-w-100px text-center  border-end border-bottom">
                          ID
                        </th>
                        <th className="min-w-150px text-center  border-end border-bottom">
                          {intl.formatMessage({ id: "ManagerData" })}{" "}
                        </th>
                        <th className="min-w-100px text-center border-end border-bottom">
                          {intl.formatMessage({ id: "From" })}{" "}
                        </th>
                        <th className="min-w-100px text-center border-end border-bottom">
                          {intl.formatMessage({ id: "To" })}{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {allManagers?.map((user: any, index: number) => {
                        return (
                          <>
                            <tr key={user?.managerId}>
                              <td className="text-center border-end border-bottom ">
                                {index}
                              </td>
                              <td className="text-center border-end border-bottom">
                                <div className="d-flex align-items-center">
                                  <div className=" ms-1 symbol symbol-50 symbol-light mr-4">
                                    <span className="symbol-label">
                                      <img
                                        src={
                                          user?.imgUrl
                                            ? `${OrgRootUrl}/${user?.imgUrl}`
                                            : user?.managerUserGender ==
                                              UserGender.Male
                                            ? "/media/avatars/300-3.jpg"
                                            : "/media/avatars/woman.jpg"
                                        }
                                        className="h-75 w-75 align-self-end rounded-circle mb-2 "
                                        alt="avatar"
                                      />
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                                      {user?.managerUserName}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center border-end border-bottom">
                                {moment(user?.fromAppointmentDay).format(
                                  "YYYY-MM-DD",
                                )}
                              </td>
                              <td className="text-center border-end border-bottom">
                                {user?.toAppointmentDay != null
                                  ? moment(user?.toAppointmentDay).format(
                                      "YYYY-MM-DD",
                                    )
                                  : "-"}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-50">
                  <div
                    onClick={() => {
                      handleClose();
                    }}
                    className="btn btn-secondary mx-1 text-center w-100"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </Fragment>
  );
};

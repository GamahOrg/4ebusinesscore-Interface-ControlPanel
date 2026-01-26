import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DeletePopup } from "../partials/DeletePopup";
import { StopPopup } from "../partials/StopPopup";
import { deleteSubSystems } from "../slices/removeSubsystemSlice";
import { useDispatch } from "react-redux";
import { putWorkspaceActivation } from "../slices/putWorkspaceActivation";
import { getSubSystems } from "../slices/workspaceSlice";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type ActionProps = {
  id: string;
  searchTerm: string;
  URL: string;
  cardInfo: any;
};

export const SystemsAndServicesActions: FC<ActionProps> = ({
  id,
  searchTerm,
  URL,
  cardInfo,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const [showStop, setShowStop] = useState(false);
  const handleCloseStop = () => setShowStop(false);

  const handelDelete = async (id: string) => {
    await dispatch(deleteSubSystems(id) as any).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "DeletedSuccessfully", intl);
      }
    });
    dispatch(
      getSubSystems({
        searchTerm: searchTerm,
        subsystemType:
          URL === "/external-systems" ? 0
          : URL === "/systems-settings" ? 1
          : URL === "/external-components" ? 2
          : URL === "/sso-systems" ? 3 : "",
      }) as any
    );
  };
  const handelstop = (id: string) => {
    dispatch(putWorkspaceActivation(id) as any);
  };
  let location = useLocation();
  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  return (
    <>
      <div className="card-toolbar text-center">
        <div className="me-n3">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="btn-icon btn-light"
            >
              <i className="bi bi-three-dots fs-2"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-3">
              {URL === "/external-systems" || URL === "/sso-systems" ? <>
                <Dropdown.Item
                  as={Link}
                  to={cardInfo?.url || "#"}
                  target="_blank"
                  className="menu-link px-1 text-info"
                  state={{
                    cardId: cardId,
                    cardTitle: cardName,
                    partTitle: partTitle,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span className="svg-icon svg-icon-3 mx-2">
                      <i className="fa-solid fa-arrow-up-right-from-square text-info"></i>
                    </span>{" "}
                    {intl.formatMessage({ id: "Move1" })}
                  </div>
                </Dropdown.Item>
              </> : <></>}
              <Dropdown.Item
                as={Link}
                to={
                  URL === "/external-systems"
                    ? `/systems-services-settings/view-system/external-systems/${id}`
                    : URL === "/external-components"
                      ? `/systems-services-settings/view-system/external-components/${id}`
                      : URL === "/sso-systems"
                        ? `/systems-services-settings/view-system/sso-systems/${id}`
                        : `/systems-services-settings/view-system/${id}`
                }
                className="menu-link px-1 text-primary"
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  partTitle: partTitle,
                }}
              >
                <div className="d-flex align-items-center">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="fa-solid fa-eye"></i>
                  </span>
                  {intl.formatMessage({ id: "Show" })}
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={
                  URL === "/external-systems"
                    ? `/systems-services-settings/edit-external-system/${id}`
                    : URL === "/external-components"
                      ? `/systems-services-settings/edit-external-component/${id}`
                      : URL === "/sso-systems"
                        ? `/systems-services-settings/edit-sso-system/${id}`
                        : `/systems-services-settings/edit-system/${id}`
                }
                className="menu-link px-1 text-primary"
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  partTitle: partTitle,
                }}
              >
                <div className="d-flex align-items-center">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                  </span>
                  {intl.formatMessage({ id: "Edit" })}
                </div>
              </Dropdown.Item>
              {URL === "/external-systems" || URL === "/sso-systems" ? <></> : <>
              <Dropdown.Item
                as={Link}
                to={ URL === "/external-systems" ? `#` 
                : URL === "/external-components" ? `/systems-services-settings/admin-panel-viewallcards/external-components/${id}`
                : URL === "/sso-systems" ? `#`
                : `/systems-services-settings/admin-panel-viewallcards/${id}` 
                }
                className="menu-link px-1 text-dark"
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  systemName: intl.locale == "en" ? cardInfo?.noteNameEn : cardInfo?.noteNameAr,
                  partTitle: partTitle,
                }}
              >
                <div className="d-flex align-items-center">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="bi bi-info-circle text-dark"></i>
                  </span>{" "}
                  {intl.formatMessage({ id: "Details" })}
                </div>
              </Dropdown.Item>
              </>}
              {URL === "" || URL === "/systems-settings" ? <></> : <>
              <Dropdown.Item
                onClick={() => setShowDelete(true)}
                className="menu-link px-1 text-danger"
              >
                <div className="d-flex align-items-center">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="far fa-trash-alt text-danger"></i>
                  </span>{" "}
                  {intl.formatMessage({ id: "Delete" })}
                </div>
              </Dropdown.Item>
              </>}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
          id={id}
          handleDelete={handelDelete}
        />
      </div>
      <div className="modal fade">
        <StopPopup
          handleCloseStop={handleCloseStop}
          showStop={showStop}
          id={id}
          handelstop={handelstop}
        />
      </div>
    </>
  );
};
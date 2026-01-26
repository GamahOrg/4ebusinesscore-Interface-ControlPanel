import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { ChangePasswordPopup } from "../popups/change-password-popup";
import { DeleteUserPopup } from "../popups/DeleteUserPopup";
import { FaRegTrashAlt } from "react-icons/fa";

type ActionProps = {
  id: number | string | Number;
  userName: string;
  detailsLink?: string;
};

export const UserActions: FC<ActionProps> = ({ id, userName }) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const [showChangePasswordPopup, setChangePasswordPopup] = useState(false);
  const handleShowChangePasswordPopup = () => setChangePasswordPopup(true);

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link
            to={`/admin-panel-users-workspace/admin-panel-users/details/${id}`}
            state={{
              serviceName: cardTitle,
            }}
            className="menu-link text-dark"
          >
            <Dropdown.Item as="button">
              <i className="fa-solid fa-eye mx-5"></i>
              {intl.formatMessage({ id: "Show" })}
            </Dropdown.Item>
          </Link>

          <Dropdown.Item as="button">
            <span
              className="menu-link px-3 text-info"
              onClick={handleShowChangePasswordPopup}
            >
              <span className="svg-icon svg-icon-3 ms-2">
                <i className="bi bi-lock-fill fs-4"></i>
              </span>
              {intl.formatMessage({ id: "ChangePassword" })}
            </span>
          </Dropdown.Item>
          {userName !== "SystemAdmin" ? (
            <Dropdown.Item as="button">
              <span
                onClick={() => setShowDelete(true)}
                className="menu-link px-3 text-danger"
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <FaRegTrashAlt />
                </span>
                {intl.formatMessage({ id: "Delete" })}
              </span>
            </Dropdown.Item>
          ) : (
            <></>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {showChangePasswordPopup && (
        <div className="modal fade" aria-hidden="true">
          <ChangePasswordPopup
            handleCloseChangePasswordPopup={() => setChangePasswordPopup(false)}
            showChangePasswordPopup={showChangePasswordPopup}
            id={id}
          />
        </div>
      )}

      {showDelete && (
        <div className="modal fade" aria-hidden="true">
          <DeleteUserPopup
            handleCloseDelete={handleCloseDelete}
            showDelete={showDelete}
            id={id}
          />
        </div>
      )}
    </>
  );
};

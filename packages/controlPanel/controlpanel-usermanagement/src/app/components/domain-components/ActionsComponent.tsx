import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { EditDomain } from "./popups/EditDomainPopup";
import { DeletePopup } from "./popups/DeletePopup";
import { ChangePasswordPopup } from "../user-components/popups/change-password-popup";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

type ActionProps = {
  id: number | string | Number;
  enableActionView?: boolean;
  editLink?: string;
  isEditPopup?: boolean;
  showChangePassword?: boolean;
  showEdit?: boolean;
  detailsLink?: string;
};

export const Actions: FC<ActionProps> = ({
  id,
  editLink,
  detailsLink = "#",
  enableActionView = true,
  showChangePassword = false,
  isEditPopup = false,
  showEdit = true,
}) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const [showE, setShowE] = useState(false);
  const handleCloseEdit = () => setShowE(false);

  const [showChangePasswordPopup, setChangePasswordPopup] = useState(false);
  const handleCloseChangePasswordPopup = () => setChangePasswordPopup(false);
  const handleShowChangePasswordPopup = () => setChangePasswordPopup(true);
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
          {enableActionView && (
            <Dropdown.Item as="button">
              <Link to={detailsLink} className="menu-link px-3 text-dark">
                <i className="fa-solid fa-eye mx-2"></i>
                {intl.formatMessage({ id: "Show" })}
              </Link>
            </Dropdown.Item>
          )}

          {showEdit && (
            <Dropdown.Item as="button">
              <Link
                to={isEditPopup ? "" : (editLink as unknown as string)}
                className="menu-link px-3 text-primary active-text-light"
                onClick={() => {
                  setShowE(true);
                }}
              >
                <MdEdit className="mx-2" />
                {intl.formatMessage({ id: "Edit" })}
              </Link>
            </Dropdown.Item>
          )}

          {showChangePassword && (
            <Dropdown.Item as="button">
              <Link
                to=""
                className="menu-link px-3 text-info"
                onClick={handleShowChangePasswordPopup}
              >
                <span className="svg-icon svg-icon-3 ms-2">
                  <i className="bi bi-lock-fill fs-4"></i>
                </span>
                {intl.formatMessage({ id: "ChangePassword" })}
              </Link>
            </Dropdown.Item>
          )}

          <Dropdown.Item as="button">
            <a
              onClick={() => setShowDelete(true)}
              className="menu-link px-3 text-danger"
            >
              <FaRegTrashAlt className="mx-2" />
              {intl.formatMessage({ id: "Delete" })}
            </a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {showDelete ? (
        <>
          <div className="modal fade" aria-hidden="true">
            <DeletePopup
              handleCloseDelete={handleCloseDelete}
              showDelete={showDelete}
              id={id}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {showE ? (
        <>
          {" "}
          <div
            className="modal fade creatForm"
            id="Rega_modal_Edit_domain"
            tabIndex={-1}
            aria-hidden="true"
          >
            <EditDomain
              showEditDomain={showE}
              handleClose={() => {
                handleCloseEdit();
              }}
              id={id}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="modal fade" aria-hidden="true">
        <ChangePasswordPopup
          handleCloseChangePasswordPopup={handleCloseChangePasswordPopup}
          showChangePasswordPopup={showChangePasswordPopup}
        />
      </div>
    </>
  );
};

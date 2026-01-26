import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { DeleteGroupPopup } from "./popups/DeleteGroupPopup";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

type ActionProps = {
  id: number | string | Number;
};

export const ActionsGroupComponent: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);

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
          <Dropdown.Item as="button">
            <Link
              to={`/admin-panel-users-workspace/admin-panel-users/groups/edit/${id}`}
              state={{
                serviceName: cardTitle,
              }}
              className="menu-link px-3 text-primary active-text-light"
            >
              <MdEdit className="me-2" /> {intl.formatMessage({ id: "Edit" })}
            </Link>
          </Dropdown.Item>

          <Dropdown.Item as="button">
            <a
              onClick={() => {
                setShowDelete(true);
              }}
              className="menu-link px-3 text-danger"
            >
              <FaRegTrashAlt className="mx-2" />
              {intl.formatMessage({ id: "Delete" })}
            </a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {showDelete && (
        <div className="modal fade" aria-hidden="true">
          <DeleteGroupPopup
            handleCloseDelete={() => {
              setShowDelete(false);
            }}
            showDelete={showDelete}
            groupId={id}
          />
        </div>
      )}
    </>
  );
};

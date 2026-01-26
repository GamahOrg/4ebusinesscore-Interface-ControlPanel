import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { DeleteRoleUserPopup } from "../popup/DeleteRoleUserPopup";
import { FaRegTrashAlt } from "react-icons/fa";

type ActionProps = {
  userId: string;
  RoleId: string;
};

export const RoleUsersActions: FC<ActionProps> = ({ userId, RoleId }) => {
  const intl = useIntl();

  const [showDelete, setShowDelete] = useState(false);

  // const handleDeleteClick = () => {
  //   const data = {
  //     userId,
  //     roleId: RoleId,
  //   };
  //   dispatch(removeUserRoleAsync(data) as any)
  //     .then((result: any) => {
  //       if (result.payload.statusEnum === 5) {
  //         showAlert(true, result.payload.message);
  //       } else {
  //         showAlert(false, result.payload.message);
  //       }
  //     })
  //     .catch((err: any) => {});
  // };

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
            to={`/admin-panel-users-workspace/admin-panel-users/details/${userId}`}
            state={{
              serviceName: cardTitle,
            }}
          >
            <Dropdown.Item as="button" className="menu-link px-8 text-primary">
              <i className="fa-solid fa-eye mx-2"></i>

              {intl.formatMessage({ id: "Show" })}
            </Dropdown.Item>
          </Link>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setShowDelete(true);
            }}
          >
            <a className="menu-link px-3 text-danger">
              <span className="svg-icon svg-icon-3 mx-2">
                <FaRegTrashAlt />
              </span>
              {intl.formatMessage({ id: "Delete" })}
            </a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" aria-hidden="true"></div>
      {showDelete && (
        <div className="modal fade" aria-hidden="true">
          <DeleteRoleUserPopup
            userId={userId}
            RoleId={RoleId}
            handleCloseDelete={() => {
              setShowDelete(false);
            }}
            showDelete={showDelete}
          />
        </div>
      )}
    </>
  );
};

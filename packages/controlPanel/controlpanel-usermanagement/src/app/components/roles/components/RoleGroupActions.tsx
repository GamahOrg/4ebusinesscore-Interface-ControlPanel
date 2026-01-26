import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { DeleteRoleGroupPopup } from "../popup/DeleteRoleGroupPopup";
import { FaRegTrashAlt } from "react-icons/fa";

type ActionProps = {
  groupId: string;
  RoleId: string;
};

export const RoleGroupsActions: FC<ActionProps> = ({ groupId, RoleId }) => {
  const intl = useIntl();

  const [showDelete, setShowDelete] = useState(false);

  // const handleDeleteClick = () => {
  //   let data: DeleteGroupRoleModel = {
  //     GroupId: groupId,
  //     id: RoleId,
  //   };

  //   dispatch(removeGroupRoleAsync(data) as any)
  //     .then((result: any) => {
  //       if (result.payload.statusEnum === 5) {
  //         showSuccessAlert(true, result.payload.message, intl);
  //       } else {
  //         showSuccessAlert(false, result.payload.message, intl);
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
          <Dropdown.Item as="button">
            <Link
              to={`/admin-panel-users-workspace/admin-panel-users/groups/edit/${groupId}`}
              state={{
                serviceName: cardTitle,
              }}
              className="menu-link px-3 text-primary"
            >
              <i className="fa-solid fa-eye mx-2"></i>

              {intl.formatMessage({ id: "Show" })}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <a
              onClick={() => {
                setShowDelete(true);
              }}
              className="menu-link px-3 text-danger"
            >
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
        <DeleteRoleGroupPopup
          groupId={groupId}
          RoleId={RoleId}
          handleCloseDelete={() => {
            setShowDelete(false);
          }}
          showDelete={showDelete}
        />
      )}
    </>
  );
};

import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { EditRoleServicePopup } from "../popup/EditRoleServicePopup";

type ActionProps = {
  RoleId: string;
  WorkSpaceId: string;
  workSpaceKey: number;
  handleCheckboxChangeA: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChangeB: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChangeC: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedSubsystemType?: any;
};

export const RoleServicesActions: FC<ActionProps> = ({
  RoleId,
  workSpaceKey,
  WorkSpaceId,
  handleCheckboxChangeA,
  handleCheckboxChangeB,
  handleCheckboxChangeC,
  selectedSubsystemType,
}) => {
  const intl = useIntl();
  const [showEdit, setShowEdit] = useState(false);
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
          <Dropdown.Item as="button" onClick={() => setShowEdit(true)}>
            <span className="svg-icon svg-icon-3 mx-2 menu-link px-3 text-primary">
              {intl.formatMessage({ id: "Edit" })}
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showEdit && (
        <div className="modal fade" aria-hidden="true">
          {showEdit && (
            <EditRoleServicePopup
              show={showEdit}
              handleClose={() => setShowEdit(false)}
              WorkSpaceId={WorkSpaceId}
              workSpaceKey={workSpaceKey}
              RoleId={RoleId}
              handleCheckboxChangeA={handleCheckboxChangeA}
              handleCheckboxChangeB={handleCheckboxChangeB}
              handleCheckboxChangeC={handleCheckboxChangeC}
              selectedSubsystemType={selectedSubsystemType}
            />
          )}
        </div>
      )}
    </>
  );
};

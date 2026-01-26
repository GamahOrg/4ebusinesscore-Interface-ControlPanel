import { RoleServicesActions } from "../RoleServicesActions";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import { WorkspaceTreeModel } from "../../../../models/role-workspace-permision/WorkspaceTreeModel";
import { useIntl } from "react-intl";

interface SubServiceRowProps {
  subService: WorkspaceTreeModel;
  index: number;
  roleId: string;
  level: number;
  selectedSubsystemType?: any;
}

const SubServiceRow: React.FC<SubServiceRowProps> = ({
  subService,
  index,
  roleId,
  level,
  selectedSubsystemType,
}) => {
  const [rowsState, setRowsState] = useState<boolean[]>([]);
  const [isCheckedA, setIsCheckedA] = useState(false);
  const [isCheckedB, setIsCheckedB] = useState(false);

  const handleCheckboxChangeA = () => {
    setIsCheckedA(true);
  };
  const handleCheckboxChangeB = () => {
    setIsCheckedB(true);
  };

  const handleCheckboxChangeC = () => {
    setIsCheckedA(false);
    setIsCheckedB(false);
  };

  const intl = useIntl();

  const handleExpandRow = (currentIndex: number) => {
    rowsState[currentIndex] = !rowsState[currentIndex];
    setRowsState([...rowsState]);
  };

  return (
    <>
      <tr key={index} className="align-middle">
        <td className="" onClick={() => handleExpandRow(index)}>
          {subService.workspaceTreeDtos.length ? (
            <>
              {rowsState[index] ? (
                <IoIosArrowDown
                  size={22}
                  className="text-muted cursor-pointer"
                />
              ) : (
                <IoIosArrowBack
                  size={22}
                  className="text-muted cursor-pointer"
                />
              )}
            </>
          ) : null}
        </td>

        <td>
          <div
            className={`d-flex justify-content-start align-items-center px-${
              level * 3
            }`}
          >
            <div
              className="symbol symbol-50px mb-2 toolsIcon"
              style={{ transform: `scale(${1 - level / 10})` }}
            >
              <span
                className={`symbol-label ${
                  subService.color == 0
                    ? `danger`
                    : subService.color == 1
                      ? `success`
                      : subService.color == 2
                        ? `warning`
                        : ``
                }`}
              >
                <span
                  className={`svg-icon svg-icon-${
                    subService.color == 0
                      ? `danger`
                      : subService.color == 1
                        ? `success`
                        : subService.color == 2
                          ? `warning`
                          : ``
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(subService.icon as string),
                    }}
                  />
                </span>
              </span>
            </div>
            <div className="d-flex mx-2 gap-2">
              <div className="form-check form-check-success form-check-custom form-check-solid d-flex">
                <input
                  className="form-check-input widget-9-check xCheckBg mx-2"
                  type="checkbox"
                  checked={
                    subService?.isRoleChecked || isCheckedA || isCheckedB
                  }
                />
              </div>
              <div className="d-flex flex-column align-items-start">
                <span
                  className={`workspace-name`}
                  onClick={() => handleExpandRow(index)}
                >
                  {intl?.locale.toLowerCase() == "ar"
                    ? subService.noteNameAr
                    : subService.noteNameEn}
                </span>
                <span className="text-gray-600">{subService.description}</span>
              </div>
            </div>
          </div>
        </td>
        <td className="text-center">
          {intl?.locale.toLowerCase() == "ar"
            ? subService.lkNoteTypes?.nameAr
            : subService.lkNoteTypes?.nameEn}
        </td>
        <td className="p-5">
          <RoleServicesActions
            WorkSpaceId={subService.id}
            workSpaceKey={subService.workSpaceKey}
            RoleId={roleId}
            handleCheckboxChangeA={handleCheckboxChangeA}
            handleCheckboxChangeB={handleCheckboxChangeB}
            handleCheckboxChangeC={handleCheckboxChangeC}
            selectedSubsystemType={selectedSubsystemType}
          />
        </td>
      </tr>
      {rowsState[index] &&
        subService?.workspaceTreeDtos.length > 0 &&
        subService?.workspaceTreeDtos?.map(
          (nestedService: any, nestedIndex: number) => (
            <SubServiceRow
              key={nestedIndex}
              subService={nestedService}
              index={nestedIndex}
              roleId={roleId}
              level={level + 1}
            />
          )
        )}
    </>
  );
};

export default SubServiceRow;

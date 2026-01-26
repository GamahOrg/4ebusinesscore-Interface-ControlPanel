import { FC, Fragment, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import AddServicesAndToolsToRole from "../../popup/add-services-and-tools-to-role";
import { RootState } from "../../../../features/store";
import { fetchWorkspaceTreePermision } from "../../../../features/role-workspace-permision/RoleWorkspacePermisionSlice";
import { WorkspaceTreeModel } from "../../../../models/role-workspace-permision/WorkspaceTreeModel";
import SubServiceRow from "./SubServiceRow";
import DOMPurify from "dompurify";
import { useSearchParams } from "react-router-dom";

interface Props {
  roleId: string;
}

const RoleServicesAndToolsTable: FC<Props> = ({ roleId }) => {
  const intl = useIntl();
  let roleWorkspacePermision = useSelector((state: RootState) => {
    return state?.roleWorkspacePermision.WorkspaceTree.data;
  });
  const dispatch = useDispatch();
  const [selectedSubsystemType, setSelectedSubsystemType] = useState<
    number | null | string
  >(null);
  const [rowsState, setRowsState] = useState<boolean[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const SubsystemTypes = [
    { name: "AllSystems", sys: "All", id: "null" },
    { name: "ExternalSys", sys: "External", id: 0 },
    { name: "InternalSys", sys: "Internal", id: 1 },
    { name: "IntegrationExternalSolutions", sys: "ExternalComponent", id: 2 },
    { name: "SinglSignOnSys", sys: "SinglSignOn", id: 3 },
  ];

  const handleSearchChangePramas = (fieldName: string, value: string) => {
    setSearchParams((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const test = { ...{ subsystemType: selectedSubsystemType } };

  let [searchTerm, setSearchTerm] = useState("");

  const pr = {
    RoleId: roleId,
    // SearchTerm: searchParams.get("SearchTerm"),
    SearchTerm: searchTerm,
    ...(selectedSubsystemType !== null && selectedSubsystemType !== "null"
      ? { subsystemType: selectedSubsystemType }
      : {}),
  };

  useEffect(() => {
    const params = {
      RoleId: roleId,
      // SearchTerm: searchParams.get("SearchTerm"),
      SearchTerm: searchTerm,
      ...(selectedSubsystemType !== null && selectedSubsystemType !== "null"
        ? { subsystemType: selectedSubsystemType }
        : {}),
    };
    dispatch(fetchWorkspaceTreePermision({ params }) as any);
  }, [selectedSubsystemType, searchParams, roleId, dispatch, searchTerm]);

  const handleExpandRow = (index: number) => {
    rowsState[index] = !rowsState[index];
    setRowsState([...rowsState]);
  };

  return (
    <>
      <div className="mb-10">
        <div className="card card-xl-stretch mb-xl-0 pb-4 pt-15">
          <div className="d-flex justify-content-between p-4 align-items-center"></div>
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="position-relative w-50 ">
                    <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"></span>
                    <input
                      type="text"
                      className="form-control form-control-solid ps-10"
                      name="search"
                      // onChange={(e) =>
                      //   handleSearchChangePramas("SearchTerm", e.target.value)
                      // }
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e?.target?.value);
                      }}
                      placeholder={intl.formatMessage({
                        id: "TypeYourSearchHere",
                      })}
                    />
                  </div>
                  <div>
                    <select
                      id="SubsystemTypes"
                      className="form-select text-muted myform-control inputHeight form-select-solid select2-hidden-accessible"
                      data-placeholder={intl.formatMessage({
                        id: "SubsystemType",
                      })}
                      tabIndex={0}
                      onChange={(e: any) =>
                        setSelectedSubsystemType(e.target.value)
                      }
                    >
                      {SubsystemTypes?.map((systemType, idx) => (
                        <option value={systemType?.id} key={idx}>
                          {intl.formatMessage({ id: systemType?.name })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="table-responsive fs-6 mt-2">
                <table className="table text-center table-borderless align-middle mt-5">
                  <thead className="p-4 text-center fw-bolder border">
                    <tr className="fw-bolder text-muted">
                      <th className="min-w-250px text-center" colSpan={2}>
                        {intl.formatMessage({ id: "CardName" })}
                      </th>
                      <th className="min-w-130px text-center">
                        {intl.formatMessage({ id: "Category" })}
                      </th>
                      <th className="min-w-130px text-center">
                        {intl.formatMessage({ id: "SystemType" })}
                      </th>

                      <th className="min-w-130px text-center pe-2">
                        {intl.formatMessage({ id: "Actions" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="p-4 text-center border">
                    {roleWorkspacePermision?.map(
                      (service: WorkspaceTreeModel, index: number) => (
                        <Fragment key={service?.id}>
                          <tr key={service?.id} className="align-middle ">
                            <td
                              className=""
                              onClick={() => handleExpandRow(index)}
                            >
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
                            </td>
                            <td>
                              <div className="d-flex justify-content-start align-items-center LargeIconSize">
                                <div className="symbol symbol-50px mb-2 toolsIcon">
                                  <span
                                    className={`symbol-label ${
                                      service.color == 0
                                        ? `danger`
                                        : service.color == 1
                                          ? `success`
                                          : service.color == 2
                                            ? `warning`
                                            : ``
                                    }`}
                                  >
                                    <span
                                      className={`svg-icon svg-icon-4x svg-icon-${
                                        service.color == 0
                                          ? `danger`
                                          : service.color == 1
                                            ? `success`
                                            : service.color == 2
                                              ? `warning`
                                              : ``
                                      }`}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(
                                            service.icon as string
                                          ),
                                        }}
                                      />
                                    </span>
                                  </span>
                                </div>
                                <div className="d-flex flex-column align-items-start mx-3">
                                  <span
                                    className=" workspace-name"
                                    onClick={() => handleExpandRow(index)}
                                  >
                                    {intl?.locale.toLowerCase() == "ar"
                                      ? service.noteNameAr
                                      : service.noteNameEn}
                                  </span>
                                  <span className="text-gray-600">
                                    {service.description}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">
                              {intl?.locale.toLowerCase() == "ar"
                                ? service.lkNoteTypes?.nameAr
                                : service.lkNoteTypes?.nameEn}
                            </td>
                            <td className="text-center">
                              {service?.subsystemType === 0
                                ? intl.formatMessage({ id: "ExternalSys" })
                                : service?.subsystemType === 1
                                  ? intl.formatMessage({ id: "InternalSys" })
                                  : service?.subsystemType === 2
                                    ? intl.formatMessage({
                                        id: "IntegrationExternalSolutions",
                                      })
                                    : intl.formatMessage({
                                        id: "SinglSignOnSys",
                                      })}
                            </td>
                            <td className="p-5"></td>
                          </tr>
                          {rowsState[index] &&
                            service?.workspaceTreeDtos.length > 0 &&
                            service?.workspaceTreeDtos?.map(
                              (subService: any, subIndex: number) => (
                                <SubServiceRow
                                  key={subService?.id}
                                  subService={subService}
                                  index={subIndex}
                                  roleId={roleId}
                                  level={1}
                                  selectedSubsystemType={selectedSubsystemType}
                                  // parentService={service}
                                />
                              )
                            )}
                        </Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddServicesAndToolsToRole />
    </>
  );
};

export default RoleServicesAndToolsTable;

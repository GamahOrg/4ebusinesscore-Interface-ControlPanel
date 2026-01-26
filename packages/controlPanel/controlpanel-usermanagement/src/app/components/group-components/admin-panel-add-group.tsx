import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AddPopup } from "../user-components/popups/AddPopup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddGroupVildation,
  addGroupSchema,
} from "../../validation/add-group-validation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { fetchRoles } from "../../features/role/rolesSlice";
import { AddGroup } from "../../features/Group/Group-slice";
import { PostGroupModel } from "../../models/group/post-group-model";
import { fetchOrgMembers } from "../../features/org/org-slice";
import { fetchAllUser } from "../../features/users-slice/all_users_slice";
import { ALLusersModel } from "../../models/users/all_users_agg_model";
import GroupsRolesChekboxDropDown from "./GroupsRolesChekboxDropDown";
import { RoleModelArray } from "../../models/role/role-model";
import { ManagementHierarchyPopup } from "./popups/ManagementHierarchyPopup";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { UserGender } from "../../models/users/users-enums";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

export const AdminPanelAddGroup: FC = () => {
  const [employeeRole, setEmployeeRole] = useState([]);
  const [employeeRolseOptions, setEemployeeRolseOptions] =
    useState<RoleModelArray>();
  let [selectedEmployeeRolesIds, setSelectedEmployeeRolesIds] = useState<
    string[]
  >([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const intl = useIntl();
  let language = intl.locale;
  let params: any = {
    pageSize: 10000,
    pageNumber: 1,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddGroupVildation>({
    resolver: yupResolver(addGroupSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let [orgName, setOrgName] = useState<string>("");
  let [orgId, setOrgId] = useState<string>("");
  let allUsers = useSelector((state: RootState) => {
    return state?.AlluserSlice.data;
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const handleSearchChangePramas = (fieldName: string, value: string) => {
    setSearchParams((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  let roles = useSelector((state: RootState) => {
    return state?.roles.data;
  });
  let MebmersOrg = useSelector((state: RootState) => {
    return state?.orgAgg.data;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoles(params) as any);
  }, []);
  const [recordsTableData, setRecordsTableData] = useState<ALLusersModel[]>([]);
  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);
  function handleSelectRecord(input: ALLusersModel) {
    const newCheckedUserIds = checkedUserIds.includes(input.userId)
      ? checkedUserIds.filter((id) => id !== input.userId)
      : [...checkedUserIds, input.userId];

    setCheckedUserIds(newCheckedUserIds);
  }
  useEffect(() => {
    let paramsAllUser: any = {
      pageSize: 10000,
      pageNumber: 1,
      SearchTerm: searchParams.get("search"),
    };
    dispatch(fetchAllUser({ params: paramsAllUser }) as any);
  }, [searchParams.get("search")]);
  const deepEqual = (obj1: any, obj2: any) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  };
  useEffect(() => {
    const updatedRecords = recordsTableData.map((user) => ({
      ...user,
      isChecked: checkedUserIds.includes(user.userId),
    }));

    // Check if the state needs an update to avoid the infinite loop
    if (!deepEqual(updatedRecords, recordsTableData)) {
      setRecordsTableData(updatedRecords);
    }
  }, [checkedUserIds, recordsTableData]);
  useEffect(() => {
    setRecordsTableData(allUsers);
  }, [allUsers]);
  useEffect(() => {
    setEemployeeRolseOptions(roles as any);
  }, [roles]);
  useEffect(() => {
    if (orgId !== null && orgId !== "") {
      dispatch(fetchOrgMembers({ id: orgId, params: params }) as any);
    }
  }, [orgId]);
  let navigate = useNavigate();

  const Submit = async (formValues: AddGroupVildation) => {
    if (
      recordsTableData.filter((a) => a.isChecked === true).map((a) => a.userId)
        .length <= 0
    ) {
      showSuccessAlert(false, "MustChooseUsers", intl);
    } else {
      const data: PostGroupModel = {
        RoleIds: selectedEmployeeRolesIds,
        Description: formValues.description,
        ManagerId: formValues.managerId,
        GroupName: formValues.groupName,
        organizationId: orgId,
        UserIds: recordsTableData
          .filter((a) => a.isChecked === true)
          .map((a) => a.userId),
        MainImage: formValues.MainImage[0],
      };
      var bodyFormData = new FormData();
      bodyFormData.append("Description", data?.Description);
      bodyFormData.append("ManagerId", data?.ManagerId);
      bodyFormData?.append("GroupName", data?.GroupName);
      bodyFormData?.append("OrganizationId", data?.organizationId);
      bodyFormData.append("MainImage", data?.MainImage);

      if (data?.UserIds[0] != null) {
        for (let index = 0; index < data?.UserIds.length; index++) {
          bodyFormData.append("UserIds", data?.UserIds[index]);
        }
      }
      if (data?.RoleIds[0] != null) {
        for (let index = 0; index < data?.RoleIds.length; index++) {
          bodyFormData.append("RoleIds", data?.RoleIds[index]);
        }
      }
      if (
        !data.MainImage ||
        (Array.isArray(data.MainImage) && data.MainImage.length === 0)
      ) {
        showSuccessAlert(false, "MustChoseImage", intl);
      } else if (
        recordsTableData
          .filter((a) => a.isChecked === true)
          .map((a) => a.userId).length <= 0
      ) {
        showSuccessAlert(false, "MustChooseatleastoneuser", intl);
      } else if (selectedEmployeeRolesIds.length === 0) {
        showSuccessAlert(false, "MustChooseatleastonerole", intl);
      } else {
        await dispatch(AddGroup(bodyFormData) as any).then((res: any) => {
          if (res?.payload?.message === '["GroupsNamealreadyExist"]') {
            showSuccessAlert(false, "GroupsNamealreadyExist", intl);
          } else if (res?.payload?.statusEnum === 1) {
            showSuccessAlert(true, "GroupAddedSuccessfully", intl);
            navigate("/admin-panel-users-workspace/admin-panel-users/groups");
          }
        });
      }
    }
  };

  let location = useLocation();

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/admin-panel-users-workspace/admin-panel-users/groups",
      defaultName: "Groups",
      name: cardName || serviceName,
    },
    { path: "", defaultName: "AddGroup", name: "" },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="AddGroup"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />

      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8 pt-5">
              <div>
                <div className="card-header px-1 pb-2 mb-5 mt-5 px-2 px-3">
                  <p className="card-title align-items-start flex-column px-5 pb-5">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      <bdi>
                        {intl.formatMessage({
                          id: "AddNewGroup",
                        })}
                      </bdi>
                    </span>
                    <span className="mt-1 fw-semibold fs-5 text-muted">
                      {intl.formatMessage({
                        id: "PleaseEnterTheData",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <form
                noValidate
                className="form outputForm"
                onSubmit={handleSubmit(Submit)}
              >
                <div className="card-body">
                  <div className="row d-flex align-items-center">
                    <div className="col-12 col-lg-1 col-md-1 col-sm-1">
                      <label
                        className="position-relative"
                        role="button"
                        htmlFor="image_file"
                      >
                        {watch("MainImage")?.length ? (
                          <>
                            <img
                              style={{
                                height: "50px",
                                width: "50px",
                                display: "inline-block",
                              }}
                              src={URL.createObjectURL(watch("MainImage")[0])}
                            />
                            <i
                              className="bi bi-plus fa-2x bg-white text-success rounded-pill shadow-sm px-1 position-absolute bottom-0"
                              style={{ right: "25px" }}
                            ></i>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-file-earmark-image fa-4x text-muted"></i>
                            <i
                              className="bi bi-plus fa-2x bg-white text-success rounded-pill shadow-sm px-1 position-absolute bottom-0"
                              style={{ right: "25px" }}
                            ></i>
                          </>
                        )}
                      </label>

                      <input
                        type="file"
                        id="image_file"
                        className="d-none"
                        {...register("MainImage", { required: true })}
                      />
                      {DisplayErrorMessage(
                        errors?.MainImage?.message as string,
                        intl,
                        intl.locale,
                      )}
                    </div>
                    <div className="col-12 col-lg-11 col-md-11 col-sm-11">
                      <div className="row">
                        <div className="col-12 col-md-4 col-lg-4">
                          <div className="mb-2 pt-2 pb-3 ">
                            <label
                              style={{
                                width: "100%",
                                textAlign: language == "ar" ? "right" : "left",
                              }}
                              className="form-label px-2  fs-6 text-gray-700 required"
                            >
                              {intl.formatMessage({
                                id: "GroupName",
                              })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="special fas fa-users"></i>
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={intl.formatMessage({
                                  id: "GroupName",
                                })}
                                {...register("groupName")}
                              />
                            </div>
                            {DisplayErrorMessage(
                              errors?.groupName?.message,
                              intl,
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-3 col-md-4">
                          <div className="mb-2 pt-2 pb-3 ">
                            <label
                              className="form-label px-2  fs-6 text-gray-700 required"
                              style={{
                                textAlign: language == "ar" ? "right" : "left",
                                width: "100%",
                                display: "block",
                              }}
                            >
                              {intl.formatMessage({
                                id: "EmployeeManagement",
                              })}
                            </label>

                            <div className="mx-auto mt-1  ">
                              <div
                                className="input-group"
                                role="button"
                                onClick={() => {
                                  setModalHShow(true);
                                }}
                              >
                                <input
                                  type="select"
                                  className="form-control form-control-solid ps-10"
                                  name="search"
                                  value={orgName}
                                  placeholder={intl.formatMessage({
                                    id: "Choose",
                                  })}
                                  role="button"
                                  readOnly={true}
                                />

                                <i className="bi bi-diagram-3 fs-1 input-group-text border-radius-0"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4">
                          <div className="mb-2 pt-1 pb-3 ">
                            <label
                              style={{
                                width: "100%",
                                textAlign: language == "ar" ? "right" : "left",
                              }}
                              className="form-label px-2  fs-6 text-gray-700 required"
                            >
                              {intl.formatMessage({
                                id: "ManagerName",
                              })}
                            </label>
                            <select
                              id="managerId"
                              className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                              defaultValue=""
                              {...register("managerId", { required: true })}
                            >
                              <option disabled value="">
                                {intl.formatMessage({ id: "Choose" })}
                              </option>
                              {MebmersOrg?.map((MebmerOrg) => (
                                <option
                                  key={MebmerOrg?.memberId}
                                  value={MebmerOrg?.memberId}
                                >
                                  {MebmerOrg.memberName}
                                </option>
                              ))}
                            </select>
                            {DisplayErrorMessage(
                              errors?.managerId?.message,
                              intl,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700 required"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "DetermineEmployeeRole" })}
                        </label>
                        <div className="mx-auto mt-1">
                          <GroupsRolesChekboxDropDown
                            selectedOptions={employeeRole}
                            setSelectedOptions={setEmployeeRole}
                            options={employeeRolseOptions}
                            defaultValuesRoles={
                              intl.locale.toLowerCase() === "ar"
                                ? employeeRolseOptions?.data.find(
                                    (role) => role.nameAr === "الموظف",
                                  )?.nameAr
                                : employeeRolseOptions?.data.find(
                                    (role) => role.nameAr === "الموظف",
                                  )?.nameEn
                            }
                            defaultValuesRolesId={
                              employeeRolseOptions?.data.find(
                                (role) => role.nameAr === "الموظف",
                              )?.id
                            }
                            selectedRoleIds={selectedEmployeeRolesIds}
                            setSelectedRoleIds={setSelectedEmployeeRolesIds}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-2 pt-2 pb-3 ">
                        <label
                          style={{
                            width: "100%",
                            textAlign: language == "ar" ? "right" : "left",
                          }}
                          className="form-label px-2  fs-6 text-gray-700 required"
                        >
                          {`${intl.formatMessage({
                            id: "Description",
                          })} - ${intl.formatMessage({
                            id: "CreatingGroupPurpose",
                          })}`}
                        </label>
                        <textarea
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 min-h-100px"
                          placeholder={intl.formatMessage({
                            id: "PermissionsAndCreatingPurpose",
                          })}
                          {...register("description")}
                        ></textarea>
                        {DisplayErrorMessage(
                          errors?.description?.message,
                          intl,
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-2 pt-2 pb-3 ">
                        <label
                          style={{
                            width: "100%",
                            textAlign: language == "ar" ? "right" : "left",
                          }}
                          className="form-label px-2  fs-6 text-gray-700 d-flex align-items-center"
                          role="button"
                        >
                          <i className="bi bi-plus fa-2x fw-bolder text-success border-dashed border-2 border-success px-2 rounded-3"></i>
                          <span className="mx-3">
                            {intl.formatMessage({
                              id: "AddPeopleToGroup",
                            })}
                          </span>
                        </label>
                        <div className="border border-1 rounded-3">
                          <div>
                            <div className="position-relative w-md-600px mt-5 mx-auto">
                              <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"></span>
                              <input
                                type="text"
                                className="form-control form-control-solid ps-10"
                                name="search"
                                onChange={(e) =>
                                  handleSearchChangePramas(
                                    "search",
                                    e.target.value,
                                  )
                                }
                                placeholder={intl.formatMessage({
                                  id: "TypeYourSearchHere",
                                })}
                              />
                            </div>
                            <div className="my-8 text-center">
                              <div className="symbol position-relative symbol-circle symbol-35px">
                                {recordsTableData
                                  .filter(
                                    (user) =>
                                      recordsTableData.find(
                                        (a) => a.userId === user.userId,
                                      )?.isChecked,
                                  )
                                  .map((item) => (
                                    <span
                                      className="position-relative symbol position-relative symbol-circle symbol-35px"
                                      key={item.userId}
                                    >
                                      <img
                                        alt="Pic"
                                        className="mx-4"
                                        src={
                                          item?.imageUrl
                                            ? `${UserManagmentRootUrl}${item?.imageUrl}`
                                            : item?.userGender ===
                                              UserGender.Male
                                            ? toAbsoluteUrl(
                                                "/media/avatars/300-3.jpg",
                                              )
                                            : toAbsoluteUrl(
                                                "/media/avatars/300-3.jpg",
                                              )
                                        }
                                        onError={(e: any) =>
                                          (e.target.src =
                                            item?.userGender === UserGender.Male
                                              ? `${toAbsoluteUrl(
                                                  "/media/avatars/300-3.jpg",
                                                )}`
                                              : `${toAbsoluteUrl(
                                                  "/media/avatars/300-3.jpg",
                                                )}`)
                                        }
                                      />
                                      <span
                                        className="position-absolute bg-danger rounded-pill w-15px h-15px d-flex justify-content-center align-items-center"
                                        style={{
                                          right: "8px",
                                          bottom: "-5px",
                                        }}
                                        role="button"
                                        onClick={() => {
                                          handleSelectRecord(item);
                                        }}
                                      >
                                        <i className="bi bi-x text-light fa-md"></i>
                                      </span>
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          <div className="border-top border-1 h-200px overflow-auto px-8">
                            {recordsTableData?.map((user) => (
                              <div
                                className="d-flex justify-content-between my-8"
                                key={user?.userId}
                              >
                                <div className="d-flex align-items-center">
                                  <div className="symbol position-relative  symbol-circle symbol-35px">
                                    <img
                                      alt="Pic"
                                      className="mx-4"
                                      src={
                                        user?.imageUrl
                                          ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                          : user?.userGender === UserGender.Male
                                          ? toAbsoluteUrl(
                                              "/media/avatars/300-3.jpg",
                                            )
                                          : toAbsoluteUrl(
                                              "/media/avatars/300-3.jpg",
                                            )
                                      }
                                      onError={(e: any) =>
                                        (e.target.src =
                                          user?.userGender === UserGender.Male
                                            ? `${toAbsoluteUrl(
                                                "/media/avatars/300-3.jpg",
                                              )}`
                                            : `${toAbsoluteUrl(
                                                "/media/avatars/300-3.jpg",
                                              )}`)
                                      }
                                    />
                                  </div>

                                  <div>
                                    <p className="mb-0">
                                      {`${user.fisrtName ?? ""} ${
                                        user.secondName ?? ""
                                      } ${user.thirdName ?? ""} ${
                                        user.forthName ?? ""
                                      }`.trim() || user.userName}
                                    </p>
                                    <p>
                                      {` ${
                                        intl?.locale.toLowerCase() == "ar"
                                          ? user.orgNameAr ?? ""
                                          : user.orgNameEn ?? ""
                                      }`.trim() || ""}
                                    </p>
                                  </div>
                                </div>
                                <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                  <input
                                    className="form-check-input widget-9-check xCheckBg"
                                    type="checkbox"
                                    defaultValue={1}
                                    name="getMyToolsList"
                                    checked={user.isChecked}
                                    onClick={() => handleSelectRecord(user)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 text-center pb-5">
                    <Link
                      className="btn btn-secondary m-3 px-5 py-3"
                      style={{ width: "125px" }}
                      to="/admin-panel-users-workspace/admin-panel-users/groups"
                    >
                      {intl.formatMessage({
                        id: "Cancel",
                      })}
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-success px-15 ms-5"
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <div
        className="modal fade"
        id="rega_modal_departmental_organizational_structure"
        aria-hidden="true"
      >
        <ManagementHierarchyPopup
          show={modalHShow}
          orgId={orgId}
          setOrgId={setOrgId}
          orgName={orgName}
          setOrgName={setOrgName}
          handleClose={() => {
            setModalHShow(false);
          }}
        />
      </div>
    </>
  );
};

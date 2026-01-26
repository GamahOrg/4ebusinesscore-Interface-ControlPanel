import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { AddPopup } from "../popup/AddPopup";
import { JobTime, UserPosition } from "../../../models/users/users-enums";
import { jobDegreeModel } from "../../../models/job-degree/job-degree-model";
import UsersCheckBoxDropDown from "./UsersCheckBoxDropDown";
import { JobRoleModel } from "../../../models/job-role/job-role";
import { AddUserJobInfoActions } from "./AddUserJobInfoActions";
import { AddUserPermissionsActions } from "./AddUserPermissionsActions";
import { fetchRoles } from "../../../features/role/rolesSlice";
import { RootState } from "../../../features/store";
import { fetchJobRoles } from "../../../features/jobRoles-slice/jobRolesSlice";
import { fetchDomains } from "../../../features/domains-slice/domainsSlice";
import { fetchJobDegree } from "../../../features/users-slice/jobDegreeSlice";
import { fetchJobNames } from "../../../features/jobNames-slice/jobNamesSlice";
import { JobNameModel } from "../../../models/job-name/job-name";
import { ManagementHierarchyPopup } from "../popup/ManagementHierarchyPopup";
import {
  editUser,
  fetchRequestUser,
} from "../../../features/requests-users-slice/requestUserSlice";
import {
  EditUserProps,
  EditUserSchema,
} from "../../../validation/edit-user-validation";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

const AddNewUserRequest = () => {
  const intl = useIntl();
  let { id } = useParams();

  const [employeeRolseOptions, setEemployeeRolseOptions] = useState([
    {
      id: 1,
      name: "الدور الاول",
    },
    {
      id: 2,
      name: "الدور الثاني",
    },
    {
      id: 3,
      name: "الدور الثالث",
    },
  ]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoles({ pageSize: 1000, pageNumber: 1 } as any) as any);
    dispatch(fetchDomains({ pageSize: 1000, pageNumber: 1 } as any) as any);
    dispatch(fetchJobDegree({ pageSize: 1000, pageNumber: 1 } as any) as any);
    dispatch(fetchJobRoles({ pageSize: 1000, pageNumber: 1 } as any) as any);
    dispatch(fetchJobNames({ pageSize: 1000, pageNumber: 1 } as any) as any);
  }, []);

  let roles = useSelector((state: RootState) => {
    return state?.roles?.data?.data;
  });

  let jobDegrees = useSelector((state: RootState) => {
    return state?.jobDegrees?.data;
  });
  let jobRoles = useSelector((state: RootState) => {
    return state?.jobRoles?.data;
  });
  let jobNames = useSelector((state: RootState) => {
    return state?.jobNames?.data;
  });

  useEffect(() => {
    setEemployeeRolseOptions(roles as any);
  }, [roles]);

  useEffect(() => {
    dispatch(fetchRequestUser(id as string) as any);
  }, [id]);

  let user = useSelector((state: RootState) => {
    return state?.requestUser?.data;
  });

  const [modalShow, setModalShow] = useState<boolean>(false);

  let language: string = intl.locale;

  const [employeeRole, setEmployeeRole] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EditUserProps>({
    resolver: yupResolver(EditUserSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });

  let [message, setMessage] = useState<any>("");

  // all radio varables

  let [userPosition, setUserPosition] = useState<UserPosition>(
    UserPosition.Manager
  );
  let [jobTime, setJobTime] = useState<JobTime>(JobTime.Main);
  let [isNafaz, setIsNafaz] = useState<boolean>(true);
  // for getting data from form
  let formValues = watch();
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  let [orgId, setOrgId] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");

  interface informationJobs {
    id?: number | Number | string;
    orgId?: string;
    orgName?: string;
    startDate: Date | string;
    endDate: Date | string;
    jobTime: JobTime;
    hiringDate: Date | string;
    jobDegreeId: string;
    jobRoleId: string;
    userKind: UserPosition;
  }
  let [informationJobsForTable, setInformationJobsForTable] = useState<
    informationJobs[]
  >([]);
  let [informationJobsForPosting, setInformationJobsForPosting] = useState<
    informationJobs[]
  >([]);

  useEffect(() => {
    setValue("isExpired", true);
  }, []);

  const handleIsExpiredChange = (e: any) => {
    setValue("isExpired", e.currentTarget.value == 0 ? true : false);
    trigger("isExpired");
  };

  let addInformationJobs = (data: informationJobs) => {
    if (orgId != "" && orgName != "") {
      if (true) {
        if (editedItemIndexForJobs > -1) {
          // logic for add edited item to its exact position
          let newTableData = informationJobsForTable?.splice(
            editedItemIndexForJobs,
            0,
            {
              id: Math.random() * 100000,
              orgId: data?.orgId,
              orgName: data?.orgName,
              startDate: data.startDate,
              endDate: data.endDate,
              jobTime: data.jobTime,
              hiringDate: data.hiringDate,
              jobDegreeId: data.jobDegreeId,
              jobRoleId: data.jobRoleId,
              userKind: data.userKind,
            }
          );
          setInformationJobsForTable((prevState: informationJobs[]) => {
            return [...prevState, ...newTableData];
          });
          setInformationJobsForPosting((prevState: informationJobs[]) => {
            return [...prevState, ...newTableData];
          });
          showSuccessAlert(true, "SavedSuccessfully", intl);
          setEditedItemIndexForJobs(-1);
          setJobTime(JobTime.Main);
          setOrgName("");
        } else {
          setInformationJobsForTable((prevState: informationJobs[]) => {
            return [
              ...prevState,
              {
                id: Math.random() * 100000,
                orgId: data?.orgId,
                orgName: data?.orgName,
                startDate: data.startDate,
                endDate: data.endDate,
                jobTime: data.jobTime,
                hiringDate: data.hiringDate,
                jobDegreeId: data.jobDegreeId,
                jobRoleId: data.jobRoleId,
                userKind: data.userKind,
              },
            ];
          });
          setInformationJobsForPosting((prevState: informationJobs[]) => {
            return [
              ...prevState,
              {
                orgId: data?.orgId,
                startDate: data.startDate,
                endDate: data.endDate,
                jobTime: data.jobTime,
                hiringDate: data.hiringDate,
                jobDegreeId: data.jobDegreeId,
                jobRoleId: data.jobRoleId,
                userKind: data.userKind,
              },
            ];
          });
          showSuccessAlert(true, "SavedSuccessfully", intl);
        }
      } else {
        showSuccessAlert(false, "YouMustFillRequiredInputs", intl);
      }
    } else {
      showSuccessAlert(false, "YouMustSelectTheEmployee", intl);
    }
  };
  var [editedItemIndexForJobs, setEditedItemIndexForJobs] =
    useState<number>(-1);
  let handleEditForJob = (id: number | string | Number) => {
    // for finding item that has this id
    let editedItemForJobs: informationJobs | undefined =
      informationJobsForTable?.find((item) => {
        return item?.id == id;
      });
    // for finding item index that has this id
    setEditedItemIndexForJobs(
      informationJobsForTable?.findIndex((item) => {
        return item?.id == id;
      })
    );

    // to remove item from table
    setInformationJobsForTable(
      informationJobsForTable?.filter((item) => {
        return item?.id != id;
      })
    );
    setValue("startDate", editedItemForJobs?.startDate as string);
    setValue("endDate", editedItemForJobs?.endDate as string);
    setValue("hiringDate", editedItemForJobs?.hiringDate as unknown as string);
    setJobTime(editedItemForJobs?.jobTime as JobTime);
    setOrgName(editedItemForJobs?.orgName as string);
    setOrgId(editedItemForJobs?.orgId as string);
  };

  interface Permissions {
    id?: number | string | Number;
    isExpired: boolean;
    isNafaz: boolean;
    expirationDateFrom: any;
    expirationDateTo: any;
  }

  let [permissionsForTable, setPermissionsForTable] = useState<Permissions[]>(
    []
  );
  let [permissionsForPosting, setPermissionsForPosting] = useState<
    Permissions[]
  >([]);

  const addPermissions = (data: Permissions) => {
    if (true) {
      if (editedItemIndexForPermissions > -1) {
        let newTableData = permissionsForTable?.splice(
          editedItemIndexForPermissions,
          0,
          {
            id: Math.random() * 100000,
            isExpired: data.isExpired,
            isNafaz: data.isNafaz,
            expirationDateFrom: data.expirationDateFrom,
            expirationDateTo: data.expirationDateTo,
          }
        );
        setPermissionsForTable((prevState: Permissions[]) => {
          return [...prevState, ...newTableData];
        });
        setPermissionsForPosting((prevState: Permissions[]) => {
          return [...prevState, ...newTableData];
        });
        setEditedItemIndexForPermissions(-1);
        showSuccessAlert(true, "SavedSuccessfully", intl);

        setIsNafaz(true);
      } else {
        setPermissionsForTable((prevState: any) => {
          return [
            ...prevState,
            {
              id: Math.random() * 100000,
              isExpired: data.isExpired,
              isNafaz: data.isNafaz,
              expirationDateFrom: data.expirationDateFrom,
              expirationDateTo: data.expirationDateTo,
            },
          ];
        });
        setPermissionsForPosting((prevState: any) => {
          return [
            ...prevState,
            {
              id: Math.random() * 100000,
              isExpired: data.isExpired,
              isNafaz: data.isNafaz,
              expirationDateFrom: data.expirationDateFrom,
              expirationDateTo: data.expirationDateTo,
            },
          ];
        });
        showSuccessAlert(true, "SavedSuccessfully", intl);
      }
    } else {
      showSuccessAlert(false, "YouMustFillRequiredInputs", intl);
    }
  };
  let [selectedEmployeeRolesIds, setSelectedEmployeeRolesIds] = useState<
    string[]
  >([]);

  const EditUser = async (formValues: EditUserProps) => {
    let body = {
      userId: id,
      jobNameId: formValues.jobNameId || "",
      informationJobs: informationJobsForTable?.map((item: any) => {
        return {
          orgId: item?.orgId,
          startDate: moment(item?.startDate).toISOString(),
          endDate: moment(item?.endDate).toISOString(),
          jobTime: item?.jobTime,
          hiringDate:
            moment(item?.hiringDate).toISOString() || moment().toISOString(),
          jobDegreeId: item?.jobDegreeId || "",
          jobRoleId: item?.jobRoleId || "",
          userKind: item?.userKind,
        };
      }),
      loginPermissions: permissionsForTable?.map((item) => {
        return {
          isExpired: !item?.isExpired,
          isNafaz: !item?.isNafaz,
          expirationDateFrom:
            moment(item?.expirationDateFrom).toISOString() ||
            moment().toISOString(),
          expirationDateTo:
            moment(item?.expirationDateTo).toISOString() ||
            moment().toISOString(),
        };
      }),
      roleIds:
        selectedEmployeeRolesIds.map((item) => {
          return item.toString();
        }) || [],
    };
    dispatch(editUser(body) as any).then((res: any) => {
      return setMessage(res?.payload?.message);
    });
  };
  useEffect(() => {
    if (message) {
      if (message === "ExternalUserAddedSuccessfully") {
        showSuccessAlert(true, "SavedSuccessfully", intl);
        navigate(
          "/admin-panel-users-workspace/admin-panel-users/access-requests"
        );
      } else if (message == '["userAlreadyExists"]') {
        showSuccessAlert(false, "UserAlreadyExists", intl);
      } else {
        showSuccessAlert(false, "AnErrorOccured", intl);
      }
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  var [editedItemIndexForPermissions, setEditedItemIndexForPermissions] =
    useState<number>(-1);

  let handleEditForPermission = (id: number | string | Number) => {
    let editedItemForPermissions: Permissions | undefined =
      permissionsForTable?.find((item) => {
        return item?.id == id;
      });
    // for finding item index that has this id
    setEditedItemIndexForPermissions(
      permissionsForTable?.findIndex((item) => {
        return item?.id == id;
      })
    );

    setPermissionsForTable(
      permissionsForTable?.filter((item) => {
        return item?.id != id;
      })
    );
    setValue(
      "expirationDateFrom",
      editedItemForPermissions?.expirationDateFrom as string
    );
    setValue(
      "expirationDateTo",
      editedItemForPermissions?.expirationDateTo as string
    );
    setIsNafaz(editedItemForPermissions?.isNafaz as any);
    setValue("isExpired", editedItemForPermissions?.isExpired);
  };

  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <form onSubmit={handleSubmit(EditUser)}>
              <div className="card mb-5 mb-xl-8 pt-5">
                <div>
                  <div className="card-header px-1 pb-2 mb-5 mt-5 px-2 px-3">
                    <p className="card-title align-items-start flex-column px-5 pb-5">
                      <span className="card-label fw-bolder fs-3 mb-2 ">
                        {intl.formatMessage({
                          id: "AddNewUser",
                        })}
                      </span>
                      <span className="mt-1 fw-semibold fs-5 text-muted">
                        {intl.formatMessage({
                          id: "PleaseEnterTheData",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div
                    className="row pt-10 mb-15 rounded px-6 mx-1"
                    style={{
                      border: "1px solid #D9D9D9",
                    }}
                  >
                    <h3
                      className="h1 mb-8"
                      style={{
                        textAlign: language == "ar" ? "right" : "left",
                      }}
                    >
                      {intl.formatMessage({ id: "BasicData" })}
                    </h3>

                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                          className="form-label px-2  fs-6 text-gray-500 fw-bolder"
                        >
                          {intl.formatMessage({
                            id: "Username",
                          })}
                        </label>
                        <div className="mt-5">
                          <label className="fw-bolder">
                            {/* {intl.formatMessage({
                              id: "Username",
                            })} */}
                            {user?.userName}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-500 fw-bolder"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "Email" })}
                        </label>
                        <div className="mt-5">
                          {/* <label className="fw-bolder">
                            {intl.formatMessage({
                              id: "Email",
                            })}
                          </label> */}
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-500 fw-bolder"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({
                            id: "QuadrupleName",
                          })}{" "}
                        </label>
                        <div className="mt-5">
                          <label className="fw-bolder">
                            {user?.firstName} {} {user?.secondName} {}{" "}
                            {user?.thirdName} {} {user?.forthName}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-500 fw-bolder"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "Management" })}
                        </label>
                        <div className="mt-5">
                          <label className="fw-bolder">
                            {user?.domainOrgName}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <h3
                      className="h1 mb-8"
                      style={{ textAlign: language == "ar" ? "right" : "left" }}
                    >
                      {intl.formatMessage({ id: "JobInformation" })}
                    </h3>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3 ">
                        <label
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                          className="form-label px-2  fs-6 text-gray-700 required"
                        >
                          {intl.formatMessage({ id: "JobDegree" })}
                        </label>

                        <div className="mx-auto mt-1  ">
                          <select
                            {...register("jobDegreeId")}
                            className="form-select form-select-solid"
                          >
                            <option value={""} selected disabled>
                              {intl.formatMessage({ id: "ChooseJobDegree" })}
                            </option>
                            {jobDegrees?.map((jobDegree: jobDegreeModel) => (
                              <option value={jobDegree?.id} key={jobDegree?.id}>
                                {language == "ar"
                                  ? jobDegree?.nameAr
                                  : jobDegree?.nameEn}
                              </option>
                            ))}
                          </select>
                          {DisplayErrorMessage(
                            errors?.jobDegreeId?.message as string,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </div>
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
                          {intl.formatMessage({ id: "JobRole" })}
                        </label>
                        <div className="mx-auto mt-1  ">
                          <select
                            {...register("jobRoleId")}
                            className="form-select form-select-solid"
                          >
                            <option value={""} selected disabled>
                              {intl.formatMessage({
                                id: "ChooseJobRole",
                              })}
                            </option>

                            {jobRoles?.map((role: JobRoleModel) => (
                              <option value={role?.id} key={role?.id}>
                                {language == "ar" ? role?.nameAr : role?.nameEn}
                              </option>
                            ))}
                          </select>
                          {DisplayErrorMessage(
                            errors?.jobRoleId?.message as string,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </div>
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
                          {intl.formatMessage({
                            id: "JobPosition",
                          })}
                        </label>
                        <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                          <div className="form-check form-check-success form-check-sm form-check-custom">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="jobPosition"
                              id="managerPosition"
                              onClick={() => {
                                setUserPosition(UserPosition.Manager);
                              }}
                              checked={
                                userPosition == UserPosition.Manager
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="managerPosition"
                            >
                              {intl.formatMessage({
                                id: "Manager",
                              })}
                            </label>
                          </div>
                          <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="jobPosition"
                              id="employeePosition"
                              onClick={() => {
                                setUserPosition(UserPosition.Employee);
                              }}
                              checked={
                                userPosition == UserPosition.Employee
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="employeePosition"
                            >
                              {intl.formatMessage({
                                id: "Employee",
                              })}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700 required "
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "JobName" })}
                        </label>
                        <div className="mx-auto mt-1  ">
                          <select
                            {...register("jobNameId")}
                            className="form-select form-select-solid"
                          >
                            <option value={""} selected disabled>
                              {intl.formatMessage({ id: "ChooseJobName" })}
                            </option>

                            {jobNames?.map((jobName: JobNameModel) => (
                              <option value={jobName?.id} key={jobName?.id}>
                                {language == "ar"
                                  ? jobName?.nameAr
                                  : jobName?.nameEn}
                              </option>
                            ))}
                          </select>
                          {DisplayErrorMessage(
                            errors?.jobNameId?.message,
                            intl
                          )}
                        </div>
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
                          {intl.formatMessage({ id: "DateFrom" })}
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "DateFrom",
                          })}
                          {...register("startDate")}
                        />
                        {DisplayErrorMessage(errors?.startDate?.message, intl)}
                      </div>
                    </div>
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
                          {intl.formatMessage({ id: "DateTo" })}
                        </label>
                        <input
                          type="date"
                          {...register("endDate")}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "DateTo",
                          })}
                        />
                        {DisplayErrorMessage(errors?.endDate?.message, intl)}
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4 ">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700 required"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({
                            id: "JobPeriod",
                          })}
                        </label>
                        <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                          <div className="form-check form-check-success form-check-sm form-check-custom">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="JobPeriod"
                              id="main"
                              onClick={() => {
                                setJobTime(JobTime.Main);
                              }}
                              checked={jobTime == JobTime.Main ? true : false}
                            />
                            <label className="form-check-label" htmlFor="main">
                              {intl.formatMessage({
                                id: "Main",
                              })}
                            </label>
                          </div>
                          <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="JobPeriod"
                              id="delegated"
                              onClick={() => {
                                setJobTime(JobTime.Delegated);
                              }}
                              checked={
                                jobTime == JobTime.Delegated ? true : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="delegated"
                            >
                              {intl.formatMessage({
                                id: "Delegated",
                              })}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
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
                          {intl.formatMessage({ id: "HiringDate" })}
                        </label>
                        <input
                          type="date"
                          {...register("hiringDate")}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "HiringDate",
                          })}
                        />
                        {DisplayErrorMessage(errors?.hiringDate?.message, intl)}
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4"></div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3 d-flex flex-column w-100">
                        <label className="form-label px-2  fs-6 text-gray-700 required invisible">
                          {intl.formatMessage({ id: "Add" })}
                        </label>
                        <div
                          className="btn btn-success mb-3 mb-lg-2  w-300px align-self-end "
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            addInformationJobs({
                              orgId,
                              orgName,
                              startDate: formValues.startDate,
                              endDate: formValues.endDate,
                              jobTime,
                              hiringDate: formValues.hiringDate,
                              jobDegreeId: formValues.jobDegreeId,
                              jobRoleId: formValues.jobRoleId,
                              userKind: userPosition,
                            });
                          }}
                        >
                          {intl.formatMessage({
                            id: "Save",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                        <div className="table-responsive px-2  fs-6 ">
                          <table className="table table-borderless align-middle text-gray-800">
                            <thead className="bg-light p-4 text-center fw-lighter border">
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "AffiliatedManagementAndJob",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "DateFrom",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "DateTo",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "HiringDate",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "WorkPeriod",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "Actions",
                                })}
                              </td>
                            </thead>
                            <tbody className="text-center border">
                              {informationJobsForTable?.map(
                                (job: informationJobs, index: number) => {
                                  return (
                                    <Fragment key={index}>
                                      <tr className="text-center fw-lighter">
                                        <td className="p-5">
                                          {/* الادارة الاولي */}
                                          {job.orgName}
                                          <span className="d-block text-center fa-sm text-muted mt-3">
                                            {
                                              jobNames?.find((item) => {
                                                return (
                                                  item?.id ==
                                                  formValues?.jobNameId
                                                );
                                              })?.nameAr
                                            }
                                            {/* عالم */}
                                          </span>
                                        </td>

                                        <td className="p-5">
                                          {moment(job.startDate).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </td>
                                        <td className="p-5">
                                          {moment(job.endDate).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </td>
                                        <td className="p-5">
                                          {moment(job.hiringDate).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </td>
                                        <td className="p-5">
                                          {job.jobTime == 0
                                            ? intl.formatMessage({
                                                id: "Main",
                                              })
                                            : intl.formatMessage({
                                                id: "Delegated",
                                              })}
                                        </td>
                                        <td className="p-5">
                                          <div>
                                            <AddUserJobInfoActions
                                              id={job.id}
                                              informationJobsForTable={
                                                informationJobsForTable
                                              }
                                              setInformationJobsForTable={
                                                setInformationJobsForTable
                                              }
                                              handleEditForJob={
                                                handleEditForJob
                                              }
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </Fragment>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <h3
                      className="h1 mb-8"
                      style={{ textAlign: language == "ar" ? "right" : "left" }}
                    >
                      {intl.formatMessage({ id: "Permissions" })}
                    </h3>
                  </div>
                  <div className="row d-flex justify-content-between">
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
                          {intl.formatMessage({
                            id: "UnifiedEntry",
                          })}
                        </label>
                        <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                          <div className="form-check form-check-success form-check-sm form-check-custom">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="unifiedEntry"
                              id="unifiedEntryEnabled"
                              checked={isNafaz ? true : false}
                              onClick={() => {
                                setIsNafaz(true);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="unifiedEntryEnabled"
                            >
                              {intl.formatMessage({
                                id: "Enabled",
                              })}
                            </label>
                          </div>
                          <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="unifiedEntry"
                              id="unifiedEntryDisabled"
                              checked={!isNafaz ? true : false}
                              onClick={() => {
                                setIsNafaz(false);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="unifiedEntryDisabled"
                            >
                              {intl.formatMessage({
                                id: "Disabled",
                              })}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700 "
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "DetermineEmployeeRole" })}
                        </label>
                        <div className="mx-auto mt-1">
                          <UsersCheckBoxDropDown
                            selectedOptions={employeeRole}
                            setSelectedOptions={setEmployeeRole}
                            options={employeeRolseOptions}
                            selectedRoleIds={selectedEmployeeRolesIds}
                            setSelectedRoleIds={setSelectedEmployeeRolesIds}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                        <label className="form-label px-2  fs-6 text-gray-700  invisible">
                          {intl.formatMessage({ id: "Add" })}
                        </label>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            addPermissions({
                              isNafaz,
                              isExpired:
                                formValues?.isExpired as unknown as boolean,
                              expirationDateFrom: formValues.expirationDateFrom,
                              expirationDateTo: formValues.expirationDateTo,
                            });
                          }}
                          className="mb-3 mb-lg-2 btn btn-success w-150px align-self-end m-auto"
                        >
                          {intl.formatMessage({
                            id: "Save",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                          className="form-label px-2  fs-6 text-gray-700 required"
                        >
                          {intl.formatMessage({
                            id: "EnablePermission",
                          })}
                        </label>
                        <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                          <div className="form-check form-check-success form-check-sm form-check-custom">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="enablePermission"
                              id="enabled"
                              value={0}
                              onChange={(e) => {
                                handleIsExpiredChange(e);
                              }}
                              checked={formValues.isExpired ? true : false}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="enabled"
                            >
                              {intl.formatMessage({
                                id: "Enabled",
                              })}
                            </label>
                          </div>
                          <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="enablePermission"
                              id="disabled"
                              value={1}
                              onChange={(e) => {
                                handleIsExpiredChange(e);
                              }}
                              checked={!formValues?.isExpired ? true : false}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="disabled"
                            >
                              {intl.formatMessage({
                                id: "Disabled",
                              })}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
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
                          {intl.formatMessage({
                            id: "PermissionPeriodFrom",
                          })}
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "PermissionPeriodFrom",
                          })}
                          {...register("expirationDateFrom")}
                        />
                        {DisplayErrorMessage(
                          errors?.expirationDateFrom?.message,
                          intl
                        )}
                      </div>
                    </div>
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
                          {intl.formatMessage({
                            id: "PermissionPeriodTo",
                          })}
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "PermissionPeriodTo",
                          })}
                          {...register("expirationDateTo")}
                        />
                        {DisplayErrorMessage(
                          errors?.expirationDateTo?.message,
                          intl
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                        <div className="table-responsive px-2  fs-6 ">
                          <table className="table table-borderless align-middle text-gray-800">
                            <thead className="bg-light p-4 text-center fw-lighter border">
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "UnifiedEntry",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "EnablePermission",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "PermissionPeriodFrom",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "PermissionPeriodTo",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "Actions",
                                })}
                              </td>
                            </thead>
                            <tbody className="text-center border">
                              {permissionsForTable?.map(
                                (permission: Permissions, index: number) => {
                                  return (
                                    <Fragment key={index}>
                                      <tr className="text-center fw-lighter">
                                        <td className="p-5">
                                          {permission?.isNafaz
                                            ? intl.formatMessage({
                                                id: "Enabled",
                                              })
                                            : intl.formatMessage({
                                                id: "Disabled",
                                              })}
                                        </td>
                                        <td className="p-5">
                                          {permission?.isExpired
                                            ? intl.formatMessage({
                                                id: "Enabled",
                                              })
                                            : intl.formatMessage({
                                                id: "Disabled",
                                              })}
                                        </td>
                                        <td className="p-5">
                                          {permission?.expirationDateFrom
                                            ? moment(
                                                permission?.expirationDateFrom
                                              ).format("YYYY-MM-DD")
                                            : "--"}
                                        </td>
                                        <td className="p-5">
                                          {" "}
                                          {permission?.expirationDateTo
                                            ? moment(
                                                permission?.expirationDateTo
                                              ).format("YYYY-MM-DD")
                                            : "--"}
                                        </td>
                                        <td className="p-5">
                                          <div>
                                            <AddUserPermissionsActions
                                              id={permission?.id}
                                              permissionsForTable={
                                                permissionsForTable
                                              }
                                              setPermissionsForTable={
                                                setPermissionsForTable
                                              }
                                              handleEditForPermission={
                                                handleEditForPermission
                                              }
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </Fragment>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center pb-5">
                  <Link
                    className="btn btn-secondary m-3 px-5 py-3"
                    style={{ width: "125px" }}
                    to="/admin-panel-users-workspace/admin-panel-users/access-requests"
                  >
                    {intl.formatMessage({
                      id: "Cancel",
                    })}
                  </Link>

                  <>
                    <button
                      type="submit"
                      className="btn btn-success m-3 px-5 py-3"
                      style={{ width: "125px" }}
                    >
                      {intl.formatMessage({
                        id: "Add",
                      })}
                    </button>
                  </>
                </div>
              </div>
            </form>
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
export default AddNewUserRequest;

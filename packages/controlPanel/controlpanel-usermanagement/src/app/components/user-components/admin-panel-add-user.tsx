import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AddPopup } from "./popups/AddPopup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import {
  AddUserProps,
  AddUserSchema,
} from "../../validation/add-user-validation";
import {
  UserGender,
  UserTypeEnum,
  UserPosition,
  JobTime,
} from "../../models/users/users-enums";
import moment from "moment";
import UsersCheckBoxDropDown from "./components/UsersCheckBoxDropDown";
import { AddUserPermissionsActions } from "./components/AddUserPermissionsActions";
import { AddUserJobInfoActions } from "./components/AddUserJobInfoActions";
import { fetchRoles } from "../../features/role/rolesSlice";
import { fetchDomains } from "../../features/domains-slice/domainsSlice";
import { fetchJobDegree } from "../../features/users-slice/jobDegreeSlice";
import { jobDegreeModel } from "../../models/job-degree/job-degree-model";
import { addUser } from "../../features/users-slice/addUserSlice";
import { fetchJobRoles } from "../../features/jobRoles-slice/jobRolesSlice";
import { fetchJobNames } from "../../features/jobNames-slice/jobNamesSlice";
import { JobRoleModel } from "../../models/job-role/job-role";
import { JobNameModel } from "../../models/job-name/job-name";
import { ManagementHierarchyPopup } from "./popups/ManagementHierarchyPopup";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

interface IProps {}

export const AdminPanelAddUser: FC<IProps> = () => {
  const [employeeRolseOptions, setEemployeeRolseOptions] = useState<any[]>([]);
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
  let domains = useSelector((state: RootState) => {
    return state?.domains?.data;
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
  const [modalShow, setModalShow] = useState<boolean>(false);
  const intl = useIntl();
  let language: string = intl.locale;

  const [employeeRole, setEmployeeRole] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];
  const maxDate = "9999-12-31";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddUserProps>({
    resolver: yupResolver(AddUserSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });

  let [message, setMessage] = useState<any>("");

  let [userGender, setuserGender] = useState<UserGender>(UserGender.Male);
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
    // jobName:string;
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
    setValue("userType", 0);
    setValue("isExpired", true);
  }, []);
  const handleUserTypeChange = (e: any) => {
    setValue("userType", e.currentTarget.value);
    trigger("userType");
  };
  const [showPermissionDate, setShowPermissionDate] = useState(true);

  const handleIsExpiredChange = (e: any) => {
    setValue("isExpired", e.currentTarget.value == 0 ? true : false);
    setShowPermissionDate(e.currentTarget.value == 0 ? true : false);
    trigger("isExpired");
  };

  let addInformationJobs = (data: informationJobs) => {
    // trigger("hiringDate");
    // trigger("endDate");
    // trigger("startDate");
    let newObj = {
      orgId: data?.orgId,
      orgName: data?.orgName,
      startDate: data.startDate,
      endDate: data.endDate,
      jobTime: data.jobTime,
      hiringDate: data.hiringDate,
    };

    if (orgId != "" && orgName != "") {
      if (
        !informationJobsForTable?.some((item) => {
          return (
            item?.orgId == newObj?.orgId &&
            item?.orgName == newObj?.orgName &&
            item?.startDate == newObj?.startDate &&
            (item?.endDate == newObj?.endDate ? data.endDate : new Date()) &&
            item?.jobTime == newObj?.jobTime
          );
        })
      ) {
        if (true) {
          if (editedItemIndexForJobs > -1) {
            let newTableData = informationJobsForTable?.splice(
              editedItemIndexForJobs,
              0,
              {
                id: Math.random() * 100000,
                orgId: data?.orgId,
                orgName: data?.orgName,
                // jobName:data?.jobName,
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

            if (!data.jobDegreeId && !data.jobRoleId) {
              showSuccessAlert(false, "YouMustEnterTheJobRoleAndDegree", intl);
              return;
            } else if (!data.jobDegreeId) {
              showSuccessAlert(false, "YouMustEnterTheJobDegree", intl);
              return;
            } else if (!data.jobRoleId) {
              showSuccessAlert(false, "YouMustEnterTheJobRole", intl);
              return;
            } else if (!data.startDate) {
              showSuccessAlert(false, "YouMustEnterTheDateFrom", intl);
              return;
            } else if (new Date(data.startDate) > new Date(data.endDate)) {
              showSuccessAlert(false, "DateToMustBeAfterDateFrom", intl);
              return;
            } else if (!data.hiringDate) {
              showSuccessAlert(false, "YouMustEnterTheHiringDate", intl);
              return;
            }

            showSuccessAlert(true, "AddedSuccessfully", intl);
            // setEditedItemIndexForJobs(-1);
            setValue("jobDegreeId", "");
            setValue("jobRoleId", "");
            // setValue("jobNameId", "");
            setValue("hiringDate", "" as any);
            setValue("startDate", "" as any);
            setValue("endDate", "" as any);
            setJobTime(JobTime.Main);
            setOrgName("");
            setOrgId("");
          } else {
            if (!data.jobDegreeId && !data.jobRoleId) {
              showSuccessAlert(false, "YouMustEnterTheJobRoleAndDegree", intl);
              return;
            } else if (!data.jobDegreeId) {
              showSuccessAlert(false, "YouMustEnterTheJobDegree", intl);
              return;
            } else if (!data.jobRoleId) {
              showSuccessAlert(false, "YouMustEnterTheJobRole", intl);
              return;
            } else if (!data.startDate) {
              showSuccessAlert(false, "YouMustEnterTheDateFrom", intl);
              return;
            } else if (new Date(data.startDate) > new Date(data.endDate)) {
              showSuccessAlert(false, "DateToMustBeAfterDateFrom", intl);
              return;
            } else if (!data.hiringDate) {
              showSuccessAlert(false, "YouMustEnterTheHiringDate", intl);
              return;
            }

            setInformationJobsForTable((prevState: informationJobs[]) => {
              return [
                ...prevState,
                {
                  id: Math.random() * 100000,
                  orgId: data?.orgId,
                  orgName: data?.orgName,
                  // jobName:data?.jobName,
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
                  // jobName:data?.jobName,
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
            showSuccessAlert(true, "AddedSuccessfully", intl);

            setValue("jobDegreeId", "");
            setValue("jobRoleId", "");
            // setValue("jobNameId", "");

            setValue("hiringDate", "" as any);
            setValue("startDate", "" as any);
            setValue("endDate", "" as any);
            setJobTime(JobTime.Main);
            setOrgName("");
            setOrgId("");
          }
        } else {
          showSuccessAlert(false, "YouMustFillRequiredInputs", intl);
        }
      } else {
        showSuccessAlert(false, "There'sRepetitionInData", intl);
      }
    } else {
      showSuccessAlert(false, "YouMustSelectTheEmployee'sDepartment", intl);
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
    setValue("jobDegreeId", editedItemForJobs?.jobDegreeId as string);
    setValue("jobRoleId", editedItemForJobs?.jobRoleId as string);
  };

  interface Permissions {
    id?: number | string | Number;
    isExpired: boolean;
    isNafaz: boolean;
    // expirationDateFrom: string;
    expirationDateFrom: any;
    // expirationDateTo: string;
    expirationDateTo: any;
  }

  let [permissionsForTable, setPermissionsForTable] = useState<Permissions[]>(
    []
  );
  let [permissionsForPosting, setPermissionsForPosting] = useState<
    Permissions[]
  >([]);

  const addPermissions = (data: Permissions) => {
    // trigger("expirationDateFrom");
    // trigger("expirationDateTo");

    // if (formValues.expirationDateFrom) {
    // if (true) {

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
      showSuccessAlert(true, "AddedSuccessfully", intl);
      // setValue("expirationDateFrom", "" as any);
      // setValue("expirationDateTo", "" as any);
      // setIsExpired(true);
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
      showSuccessAlert(true, "AddedSuccessfully", intl);
      // setValue("expirationDateFrom", "" as any);
      // setValue("expirationDateTo", "" as any);
      // setValue("jobRoleId", "");

      // setIsExpired(true);
      // setIsNafaz(true);
    }
    // } else {
    // showRequiredInputsAlert("PleaseEnterPermissionDateFrom");
    // }
  };
  let [selectedEmployeeRolesIds, setSelectedEmployeeRolesIds] = useState<
    string[]
  >([]);

  const AddUser = async (formValues: AddUserProps) => {
    var name = formValues?.quadrupleName.split(" ");
    let forthName: string = "";
    if (name.length > 3) {
      for (let index = 3; index < name.length; index++) {
        forthName = forthName + " " + name[index];
      }
    }
    let body = {
      userName: formValues.userName,
      firstName: name[0],
      secondName: name[1],
      thirdName:
        name?.length > 2 ? formValues.quadrupleName?.split(" ")[2] : "",
      forthName: forthName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      mobile: formValues?.mobile,
      transactionNumber: formValues?.transactionNumber,
      address: formValues.address || "",
      nationalId: formValues?.nationalId?.toString() || "",
      userType: formValues.userType,
      userGender: userGender,
      // userKind: userPosition,
      domainId: formValues.domainId || "00000000-0000-0000-0000-000000000000",
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
          // isNafaz: !item?.isNafaz,
          expirationDateFrom:
            moment(item?.expirationDateFrom).add(1, "day").toISOString() ||
            moment().toISOString(),
          expirationDateTo: item?.expirationDateTo
            ? moment(item?.expirationDateTo).add(1, "day").toISOString()
            : undefined,
        };
      }),
      roleIds: selectedEmployeeRolesIds.map((item) => item.toString()),
    };
    dispatch(addUser(body) as any).then((res: any) => {
      return setMessage(res?.payload?.message);
    });
  };

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  useEffect(() => {
    if (message) {
      if (message === "userAddedSuccessfully") {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        navigate("/admin-panel-users-workspace/admin-panel-users/users", {
          state: { serviceName: cardTitle },
        });
      } else if (message == '["userNameAlreadyExists"]') {
        showSuccessAlert(false, "UserNAameAlreadyExists", intl);
      } else if (message == '["userNameAlreadyExists","emailAlreadyExists"]') {
        showSuccessAlert(false, "UserNAameAndEmailAlreadyExists", intl);
      } else if (message == '["emailAlreadyExists"]') {
        showSuccessAlert(false, "EmailAlreadyExists", intl);
      } else if (message === "Request failed with status code 403") {
        showSuccessAlert(false, "UserDoesNotHaveEditPermission", intl);
      } else {
        showSuccessAlert(false, "AnErrorOccureds", intl);
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
    // setIsExpired(editedItemForPermissions?.isExpired as any);
    setValue("isExpired", editedItemForPermissions?.isExpired);
  };

  const [isSaveClicked, setIsSaveClicked] = useState(false);

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/admin-panel-users-workspace/admin-panel-users/users",
      defaultName: "Users",
      name: cardName || serviceName,
    },
    { path: "", defaultName: "AddUser", name: "" },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="AddUser"
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
            <form onSubmit={handleSubmit(AddUser)}>
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
                  <div className="row">
                    <h3
                      className="h1 mb-8"
                      style={{ textAlign: language == "ar" ? "right" : "left" }}
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
                          className="form-label px-2  fs-6 text-gray-700 required"
                        >
                          {intl.formatMessage({
                            id: "QuadrupleName",
                          })}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="bi bi-person special"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={intl.formatMessage({
                              id: "QuadrupleName",
                            })}
                            {...register("quadrupleName")}
                          />
                          {DisplayErrorMessage(
                            errors?.quadrupleName?.message as string,
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
                          {intl.formatMessage({ id: "Username" })}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="bi bi-person-circle special"></i>
                            </span>
                          </div>
                          <input
                            {...register("userName")}
                            type="text"
                            className="form-control"
                            placeholder={intl.formatMessage({
                              id: "Username",
                            })}
                          />
                          {DisplayErrorMessage(
                            errors?.userName?.message as string,
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
                          {intl.formatMessage({ id: "Email" })}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special bi bi-envelope"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            {...register("email")}
                            className="form-control"
                            placeholder={intl.formatMessage({
                              id: "Email",
                            })}
                          />
                          {DisplayErrorMessage(
                            errors?.email?.message as string,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </div>
                    {/* رقم الجوال */}
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
                          {intl.formatMessage({ id: "PhoneNumber" })}
                        </label>
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <span className="input-group-text">966+</span>
                          </div>

                          <input
                            type="number"
                            className="form-control"
                            placeholder="5xxxxxxxx"
                            {...register("phoneNumber")}
                          />
                          {DisplayErrorMessage(
                            errors?.phoneNumber?.message as string,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </div>
                    {/* رقم التحويله */}
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
                          {intl.formatMessage({ id: "TransactionNumber" })}
                        </label>
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <span className="input-group-text"></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="xxxxx"
                            {...register("transactionNumber")}
                          />
                          {DisplayErrorMessage(
                            errors?.transactionNumber?.message as string,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </div>
                    {/* رقم الهاتف */}
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
                          {intl.formatMessage({ id: "Phone" })}
                        </label>
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <span className="input-group-text">011</span>
                          </div>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="011xxxxxxx"
                            {...register("mobile")}
                          />
                          {DisplayErrorMessage(
                            errors?.mobile?.message as string,
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
                            id: "Gender",
                          })}
                        </label>
                        <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                          <div className="form-check form-check-success form-check-sm form-check-custom">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="gender"
                              id="male_gender"
                              onChange={() => {
                                setuserGender(UserGender.Male);
                              }}
                              checked={
                                userGender == UserGender.Male ? true : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="male_gender"
                            >
                              {intl.formatMessage({
                                id: "Male",
                              })}
                            </label>
                          </div>
                          <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              name="gender"
                              id="female_gender"
                              onChange={() => {
                                setuserGender(UserGender.Female);
                              }}
                              checked={
                                userGender == UserGender.Female ? true : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female_gender"
                            >
                              {intl.formatMessage({
                                id: "Female",
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
                          {`${intl.formatMessage({
                            id: "IDNumber",
                          })}
                          / ${intl.formatMessage({
                            id: "Residence",
                          })}`}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fa-solid fa-id-card"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            {...register("nationalId")}
                            placeholder="xxxxxxxxxx"
                          />
                          {DisplayErrorMessage(
                            errors?.nationalId?.message as string,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-12 col-sm-3 col-md-4"></div> */}
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
                          {intl.formatMessage({ id: "UserType" })}
                        </label>
                        <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                          <div className="form-check form-check-success form-check-sm form-check-custom">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              value={0}
                              id="systemUser"
                              // {...register("userType")}
                              onChange={(e) => {
                                // setUserType(UserTypeEnum.systemUser);
                                // setValue("userType", true);
                                handleUserTypeChange(e);
                              }}
                              checked={
                                // userType == UserTypeEnum.systemUser
                                //   ? true
                                //   : false
                                formValues.userType == 0 ? true : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="systemUser"
                            >
                              {intl.formatMessage({
                                id: "SystemUser",
                              })}
                            </label>
                          </div>
                          <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                            <input
                              className="form-check-input text-danger"
                              type="radio"
                              {...register("userType")}
                              id="domainUser"
                              value={1}
                              onChange={(e) => {
                                // setUserType(UserTypeEnum.domainUser);
                                // setValue("userType", false);
                                handleUserTypeChange(e);
                              }}
                              checked={
                                // userType == UserTypeEnum.domainUser
                                //   ? true
                                //   : false
                                // !formValues.userType
                                formValues.userType == 1 ? true : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="domainUser"
                            >
                              {intl.formatMessage({
                                id: "DomainUser",
                              })}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {formValues.userType == 1 && (
                      <>
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
                              {intl.formatMessage({ id: "Domains" })}
                            </label>

                            <div className="mx-auto mt-1">
                              <select
                                {...register("domainId")}
                                className="form-select form-select-solid"
                                defaultValue=""
                              >
                                <option value={""} disabled>
                                  {intl.formatMessage({ id: "ChooseDomain" })}
                                </option>
                                {domains?.map((domain) => (
                                  <option value={domain?.id} key={domain?.id}>
                                    {domain?.domainName}
                                  </option>
                                ))}
                              </select>
                              {DisplayErrorMessage(
                                errors?.domainId?.message as string,
                                intl,
                                intl.locale
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-12">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "Address" })}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text h-100">
                              <i className="special bi bi-geo-alt"></i>
                            </span>
                          </div>
                          <textarea
                            className="form-control"
                            {...register("address")}
                            placeholder={intl.formatMessage({
                              id: "Address",
                            })}
                          ></textarea>
                          {DisplayErrorMessage(
                            errors?.address?.message as string,
                            intl,
                            intl.locale
                          )}
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
                          className="form-label px-2  fs-6 text-gray-700 required "
                        >
                          {intl.formatMessage({ id: "JobDegree" })}
                        </label>

                        <div className="mx-auto mt-1  ">
                          {/* <CheckBoxDropDown
                            selectedOptions={jobDegree}
                            setSelectedOptions={setJobDegree}
                            options={jobDegreeOptions}

                          /> */}
                          <select
                            {...register("jobDegreeId")}
                            className="form-select form-select-solid"
                            defaultValue=""
                          >
                            <option value={""} disabled>
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
                          {/* <CheckBoxDropDown
                            selectedOptions={jobTitle}
                            setSelectedOptions={setJobTitle}
                            options={jobTitleOptions}
                          /> */}
                          <select
                            {...register("jobRoleId")}
                            className="form-select form-select-solid"
                            defaultValue=""
                          >
                            <option value={""} disabled>
                              {intl.formatMessage({
                                id: "ChooseJobRole",
                              })}
                            </option>
                            {/* {jobDegreeOptions?.map((role) => (
                              <option value={role?.id} key={role?.id}>
                                {role?.name}
                              </option>
                            ))} */}
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
                          className="form-label px-2  fs-6 text-gray-700 required "
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
                              onChange={() => {
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
                              onChange={() => {
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
                          className="form-label px-2  fs-6 text-gray-700 required"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {intl.formatMessage({ id: "JobName" })}
                        </label>
                        <div className="mx-auto mt-1  ">
                          {/* <CheckBoxDropDown
                            selectedOptions={jobTitle}
                            setSelectedOptions={setJobTitle}
                            options={jobTitleOptions}
                          /> */}
                          <select
                            {...register("jobNameId")}
                            className="form-select form-select-solid"
                            defaultValue=""
                          >
                            <option value={""} disabled>
                              {intl.formatMessage({ id: "ChooseJobName" })}
                            </option>
                            {/* {jobDegreeOptions?.map((role) => (
                              <option value={role?.id} key={role?.id}>
                                {role?.name}
                              </option>
                            ))} */}
                            {jobNames?.map((jobName: JobNameModel) => (
                              <option value={jobName?.id} key={jobName?.id}>
                                {language == "ar"
                                  ? jobName?.nameAr
                                  : jobName?.nameEn}
                              </option>
                            ))}
                          </select>
                          {DisplayErrorMessage(
                            errors?.jobNameId?.message as string,
                            intl,
                            intl.locale
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
                              // setShowHierarchy(true);
                              setModalHShow(true);
                            }}
                            // data-bs-toggle="modal"
                            // data-bs-target="#rega_modal_departmental_organizational_structure"
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
                          max={maxDate}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "DateFrom",
                          })}
                          {...register("startDate")}
                        />
                        {DisplayErrorMessage(
                          errors?.startDate?.message as string,
                          intl,
                          intl.locale
                        )}
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
                          {intl.formatMessage({ id: "DateTo" })}
                        </label>
                        <input
                          type="date"
                          max={maxDate}
                          {...register("endDate")}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "DateTo",
                          })}
                        />
                        {DisplayErrorMessage(
                          errors?.endDate?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4 ">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700 "
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
                              onChange={() => {
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
                              onChange={() => {
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
                          max={currentDate}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "HiringDate",
                          })}
                        />
                        {DisplayErrorMessage(
                          errors?.hiringDate?.message as string,
                          intl,
                          intl.locale
                        )}
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
                              // jobName:formValues.jobNameId,
                              startDate: formValues.startDate,
                              endDate: formValues.endDate
                                ? formValues.endDate
                                : "",
                              jobTime,
                              hiringDate: formValues.hiringDate,
                              jobDegreeId: formValues.jobDegreeId,
                              jobRoleId: formValues.jobRoleId,
                              userKind: userPosition,
                            });
                          }}
                        >
                          {/* <i className="bi bi-plus-lg text-primary border border-primary fw-bolder rounded-1 ms-2 px-1"></i> */}
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
                              <tr>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "AffiliatedManagementAndJob",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "DateFrom",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "DateTo",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "HiringDate",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "WorkPeriod",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "Actions",
                                  })}
                                </th>
                              </tr>
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
                                          {job.startDate
                                            ? moment(job.startDate).format(
                                                "YYYY-MM-DD"
                                              )
                                            : "_"}
                                        </td>
                                        <td className="p-5">
                                          {job.endDate
                                            ? moment(job.endDate).format(
                                                "YYYY-MM-DD"
                                              )
                                            : "_"}
                                        </td>
                                        <td className="p-5">
                                          {job.hiringDate
                                            ? moment(job.hiringDate).format(
                                                "YYYY-MM-DD"
                                              )
                                            : "_"}
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
                    {/* <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3">
                        <label
                          className="form-label px-2  fs-6 text-gray-700 "
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
                              onChange={() => {
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
                              onChange={() => {
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
                    </div> */}
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
                            defaultValuesRoles={
                              intl.locale.toLowerCase() === "ar"
                                ? employeeRolseOptions.find(
                                    (role: any) => role?.nameAr === "الموظف"
                                  )?.nameAr
                                : employeeRolseOptions.find(
                                    (role: any) => role.nameAr === "الموظف"
                                  )?.nameEn
                            }
                            defaultValuesRolesId={
                              employeeRolseOptions.find(
                                (role: any) => role.nameAr === "الموظف"
                              )?.id
                            }
                            selectedRoleIds={selectedEmployeeRolesIds}
                            setSelectedRoleIds={setSelectedEmployeeRolesIds}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3 col-md-4"></div>
                    <div className="col-12 col-sm-3 col-md-4">
                      <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                        <label className="form-label px-2  fs-6 text-gray-700  invisible">
                          {intl.formatMessage({ id: "Add" })}
                        </label>

                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const expirationDateFrom = moment(
                              formValues?.expirationDateFrom
                            );
                            const expirationDateTo = moment(
                              formValues?.expirationDateTo
                            );

                            if (expirationDateFrom.isAfter(expirationDateTo)) {
                              setError("expirationDateTo", {
                                type: "manual",
                                message:
                                  "ExpirationDateToMustBeEqualToOrGreaterThanExpirationDateFrom",
                              });
                              return;
                            }

                            let isPermissionRepeated =
                              permissionsForTable?.some(
                                (permission) =>
                                  permission.expirationDateFrom ===
                                    formValues.expirationDateFrom &&
                                  permission.expirationDateTo ===
                                    formValues.expirationDateTo
                              );

                            if (!isPermissionRepeated) {
                              addPermissions({
                                isNafaz,
                                isExpired:
                                  formValues?.isExpired as unknown as boolean,
                                expirationDateFrom:
                                  formValues.expirationDateFrom,
                                expirationDateTo: formValues.expirationDateTo,
                              });
                            } else {
                              isPermissionRepeated = false;
                            }

                            setIsSaveClicked(true);
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
                          className="form-label px-2  fs-6 text-gray-700 "
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
                    {showPermissionDate && (
                      <>
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
                              max={maxDate}
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                              placeholder={intl.formatMessage({
                                id: "PermissionPeriodFrom",
                              })}
                              {...register("expirationDateFrom")}
                            />
                            {DisplayErrorMessage(
                              errors?.expirationDateFrom?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-3 col-md-4">
                          <div className="mb-2 pt-2 pb-3">
                            <label
                              className="form-label px-2  fs-6 text-gray-700"
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
                              max={maxDate}
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                              placeholder={intl.formatMessage({
                                id: "PermissionPeriodTo",
                              })}
                              {...register("expirationDateTo")}
                            />
                            {DisplayErrorMessage(
                              errors?.expirationDateTo?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-12">
                      <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                        <div className="table-responsive px-2  fs-6 ">
                          <table className="table table-borderless align-middle text-gray-800">
                            <thead className="bg-light p-4 text-center fw-lighter border">
                              <tr>
                                {/* <th className="p-5">
                                {intl.formatMessage({
                                  id: "UnifiedEntry",
                                })}
                              </th> */}
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "EnablePermission",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "PermissionPeriodFrom",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "PermissionPeriodTo",
                                  })}
                                </th>
                                <th className="p-5">
                                  {intl.formatMessage({
                                    id: "Actions",
                                  })}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-center border">
                              {permissionsForTable?.map(
                                (permission: Permissions, index: number) => {
                                  return (
                                    <Fragment key={index}>
                                      <tr className="text-center fw-lighter">
                                        {/* <td className="p-5">
                                          {permission?.isNafaz
                                            ? intl.formatMessage({
                                                id: "Enabled",
                                              })
                                            : intl.formatMessage({
                                                id: "Disabled",
                                              })}
                                        </td> */}
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
                    to="/admin-panel-users-workspace/admin-panel-users/users"
                    state={{ serviceName: cardTitle }}
                  >
                    {intl.formatMessage({
                      id: "Cancel",
                    })}
                  </Link>

                  {/* {selectedEmployeeRolesIds.length > 0 ? (
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
                  ) : (
                    <>
                      <div
                        className="btn btn-success m-3 px-5 py-3"
                        onClick={() => {
                          showFailureRolesAlert();
                        }}
                        style={{ width: "125px" }}
                      >
                        {intl.formatMessage({
                          id: "Add",
                        })}
                      </div>
                    </>
                  )} */}
                  <>
                    <button
                      disabled={!isSaveClicked}
                      type="submit"
                      className="btn btn-success m-3 px-5 py-3"
                      style={{ width: "125px" }}
                      onClick={() => {
                        const lastObj =
                          informationJobsForTable[
                            informationJobsForTable.length - 1
                          ];

                        setValue("startDate", lastObj?.startDate as string);
                        setValue("endDate", lastObj?.endDate as string);
                        setValue(
                          "hiringDate",
                          lastObj?.hiringDate as unknown as string
                        );
                        setJobTime(lastObj?.jobTime as JobTime);
                        setOrgName(lastObj?.orgName as string);
                        setOrgId(lastObj?.orgId as string);
                        setValue("jobDegreeId", lastObj?.jobDegreeId as string);
                        setValue("jobRoleId", lastObj?.jobRoleId as string);
                      }}
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
        {/* <DepartmentalOrganizationalStructurePopup
          showHierarchy={showHierarchy}
          orgId={orgId}
          setOrgId={setOrgId}
          orgName={orgName}
          setOrgName={setOrgName}
          handleClose={() => {
            setShowHierarchy(false);
          }}
        /> */}
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

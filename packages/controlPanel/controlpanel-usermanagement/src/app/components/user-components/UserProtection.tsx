import { ChangeEvent, FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { EditPopup } from "./popups/EditPopup";
import { ChangePasswordPopup } from "./popups/change-password-popup";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/users-slice/userSlice";
import { RootState } from "../../features/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import {
  userProtectionProps,
  userProtectionSchema,
} from "../../validation/user-protection-validation";
import { editUserSummary } from "../../features/users-slice/editUserSummarySlice";
import {
  AddUserLoginPermissionProps,
  AddUserLoginPermissionSchema,
} from "../../validation/add-login-permission.-validation";
import { addUserLoginPermission } from "../../features/users-slice/addUserLoginPermission";
import { fetchUserPermissions } from "../../features/users-slice/permissionsSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import Swal from "sweetalert2";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type inputTypes = {
  id: number;
  title: string;
  value: string;
  name: string;
  inputType: string;
  readonly?: boolean;
  options?: {
    id: number;
    name: string;
  }[];
  attributes?: {};
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type emailNotificationsCheckBoxTypes = {
  id: number;
  title: string;
  subTitle: string;
  name: string;
  isChecked: boolean;
  className?: string;
  onChange: (input: emailNotificationsCheckBoxTypes) => void;
};

export const UserProtection: FC = () => {
  const {
    register: register1,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userProtectionProps>({
    resolver: yupResolver(userProtectionSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    setError,
    formState: { errors: errors2 },
  } = useForm<AddUserLoginPermissionProps>({
    resolver: yupResolver(AddUserLoginPermissionSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(id as string) as any);
  }, [id]);
  let user = useSelector((state: RootState) => {
    return state?.user?.data;
  });
  const intl = useIntl();
  let language = intl.locale;
  const [showChangePasswordPopup, setChangePasswordPopup] = useState(false);
  const handleShowChangePasswordPopup = () => setChangePasswordPopup(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  let [isNafaz, setIsNafaz] = useState<boolean>(true);
  let [isExpired, setIsExpired] = useState<boolean>(true);

  let [showDate, setShowDate] = useState<boolean>(true);

  const [inputs, setInputs] = useState<any>();

  useEffect(() => {
    setValue("email", user?.email);
    const updatedInputs: any = [
      {
        id: 1,
        title: intl.formatMessage({ id: "Email" }),
        value: user?.email,
        name: "email",
        inputType: "text",
        readonly: true,
        onChange: handleChange,
        inputName: "email",
      },
    ];
    if (user?.userType == 0) {
      updatedInputs.push({
        id: 2,
        title: intl.formatMessage({ id: "Password" }),
        value: "01000000000",
        name: "password",
        inputType: "password",
        readonly: true,
        onChange: handleChange,
        inputName: "password",
        attributes: {
          "data-bs-toggle": "modal",
          "data-bs-target": "#rega_modal_change_password",
        },
      });
    }

    setInputs(updatedInputs);
  }, [user]);

  const [inputPermissions, setInputPermissions] = useState<any>([
    {
      id: 1,
      title: intl.formatMessage({ id: "EnablePermission" }),
      value: intl.formatMessage({ id: "Disabled" }),
      name: "enablePermission",
      inputType: "radio",
      inputName: "enablePermission",
      options: [
        {
          id: 1,
          name: intl.formatMessage({ id: "Enabled" }),
        },
        {
          id: 2,
          name: intl.formatMessage({ id: "Disabled" }),
        },
      ],
      onChange: handleInputPermissionChange,
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "PermissionPeriodFrom" }),
      value: "",
      name: "expirationDateFrom",
      inputType: "date",
      onChange: handleInputPermissionChange,
      inputName: "expirationDateFrom",
    },
    {
      id: 4,
      title: intl.formatMessage({ id: "PermissionPeriodTo" }),
      value: "",
      name: "expirationDateTo",
      inputType: "date",
      onChange: handleInputPermissionChange,
      inputName: "expirationDateTo",
    },
  ]);

  const permissions = useSelector((state: RootState) => {
    return state?.userPermissions?.userPermissions;
  });

  useEffect(() => {
    if (user.id) dispatch(fetchUserPermissions(user.id) as any);
  }, [user]);

  useEffect(() => {
    let fields = [...inputPermissions];
    if (permissions.length) {
      fields[0] &&
        (fields[0].value = permissions[0]?.isExpired
          ? intl.formatMessage({ id: "Disabled" })
          : intl.formatMessage({ id: "Enabled" }));
      let dateFrom = permissions[0]?.expirationDateFrom;
      let dateTo = permissions[0]?.expirationDateTo;

      fields[1] && (fields[1].value = dateFrom?.split("T")[0]);
      fields[2] && (fields[2].value = dateTo?.split("T")[0]);
      let isPermissionEnabled = !permissions[0]?.isExpired
        ? intl.formatMessage({ id: "Disabled" })
        : intl.formatMessage({ id: "Enabled" });
      setValue2("enablePermission", isPermissionEnabled);
      setShowDate(
        isPermissionEnabled == intl.formatMessage({ id: "Disabled" })
      );

      setValue2(
        "expirationDateFrom",
        moment(permissions[0]?.expirationDateFrom).format("YYYY-MM-DD")
      );
      if (permissions[0]?.expirationDateTo)
        setValue2(
          "expirationDateTo",
          moment(permissions[0]?.expirationDateTo).format("YYYY-MM-DD")
        );
    } else {
      fields[0] && (fields[0].value = intl.formatMessage({ id: "Disabled" }));
      fields[1] && (fields[1].value = "");
      fields[2] && (fields[2].value = "");
    }
    setInputPermissions((prev: any) => [...fields]);
  }, [permissions]);

  const [emailNotificationCheckBox, setEmailNotificationCheckBox] = useState<
    emailNotificationsCheckBoxTypes[]
  >([
    {
      id: 1,
      title: intl.formatMessage({ id: "SelectAll" }),
      subTitle: "",
      name: "selectAll",
      isChecked: false,
      className: "text-primary",
      onChange: selectAllNotificationsCheckBox,
    },
    {
      id: 2,
      title: intl.formatMessage({ id: "Tasks" }),
      subTitle: intl.formatMessage({
        id: "ReceiveNotificationForNewTasks",
      }),
      name: "tasks",
      isChecked: false,
      onChange: handleEmailNotificationCheckBoxChange,
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "AddNewIdeaChallenge" }),
      subTitle: intl.formatMessage({
        id: "ReceiveNotificationForNewIdeas",
      }),
      name: "newIdeaChallenge",
      isChecked: false,
      onChange: handleEmailNotificationCheckBoxChange,
    },
  ]);
  const [editEmail, setEditEmail] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputs((inputs: any) =>
      inputs?.map((input: any) => {
        return input?.name === name ? { ...input, value: value } : input;
      })
    );
  }

  function handleInputPermissionChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name == "enablePermission") {
      setIsExpired(
        value == intl.formatMessage({ id: "Enabled" }) ? true : false
      );
      setShowDate(
        value == intl.formatMessage({ id: "Enabled" }) ? true : false
      );
    }
    if (name == "unifiedEntry") {
      setIsNafaz(value == intl.formatMessage({ id: "Enabled" }) ? true : false);
    }
    var inputIndex = inputPermissions?.findIndex((x: any) => x.name == name);
    var model = inputPermissions[inputIndex];
    inputPermissions[inputIndex].value = value;
    setValue2(model?.name, value);
    setInputPermissions([...inputPermissions]);
  }

  const handleEdit = (input: inputTypes) => {
    if (input.name === "email") {
      setEditEmail(true);
    }
    input.readonly = !input.readonly;
    setInputs([...inputs]);
  };

  function handleEmailNotificationCheckBoxChange(
    input: emailNotificationsCheckBoxTypes
  ) {
    input.isChecked = !input.isChecked;
    setEmailNotificationCheckBox([...emailNotificationCheckBox]);
  }

  function selectAllNotificationsCheckBox(
    input: emailNotificationsCheckBoxTypes
  ) {
    input.isChecked = !input.isChecked;
    let items: emailNotificationsCheckBoxTypes[] =
      emailNotificationCheckBox?.map(
        (
          item: emailNotificationsCheckBoxTypes
        ): emailNotificationsCheckBoxTypes => {
          item.isChecked = input.isChecked;
          return item;
        }
      );
    setEmailNotificationCheckBox(items);
  }
  let [message, setMessage] = useState<string>("");
  let [messageForAddPermission, setMessageForAddPermission] =
    useState<string>("");
  let [messageForEditPermission, setMessageForEditPermission] =
    useState<string>("");

  const AddUserData = async (formValues: userProtectionProps) => {
    let body = {
      id,
      userName: user?.userName,
      email: formValues?.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      nationalId: user?.nationalId,
      userGender: user?.userGender,
      firstName: user?.firstName,
      secondName: user?.secondName,
      thirdName: user?.thirdName,
      forthName: user?.forthName,
      orgId: user?.orgId,
    };
    dispatch(editUserSummary(body as any) as any).then((res: any) => {
      return setMessage(res?.payload?.message);
    });
  };

  useEffect(() => {
    if (message == "userUpdatedSuccessfully") {
      showSuccessAlert(true, "ModifiedSuccessfully", intl);
      dispatch(fetchUser(id as any) as any);
    } else if (JSON.parse(JSON.stringify(message)) == '["userAlreadyExists"]') {
      showSuccessAlert(false, "UserAlreadyExists", intl);
    }

    return () => {
      setMessage("");
    };
  }, [message]);

  const AddUserLoginPermission = async (
    formValues: AddUserLoginPermissionProps
  ) => {
    const expirationDateFrom = moment(formValues?.expirationDateFrom);
    const expirationDateTo = moment(formValues?.expirationDateTo);
    if (!expirationDateFrom.isValid()) {
      setError("expirationDateFrom", {
        type: "manual",
        message: "InputFieldIsRequried",
      });
      return;
    }
    if (expirationDateFrom.isAfter(expirationDateTo)) {
      setError("expirationDateTo", {
        type: "manual",
        message: "ExpirationDateToMustBeEqualToOrGreaterThanExpirationDateFrom",
      });
      return;
    }

    const DateFrom = new Date(
      formValues?.expirationDateFrom ? formValues?.expirationDateFrom : ""
    );
    DateFrom.setDate(DateFrom.getDate());
    const DateFromString = DateFrom.toISOString();

    let DateToString = moment(formValues?.expirationDateTo).toISOString();
    if (formValues?.expirationDateTo) {
      const DateTo = new Date(formValues?.expirationDateTo);
      DateTo.setDate(DateTo.getDate());
      DateToString = DateTo.toISOString();
    }

    let body = {
      id,
      isNafaz,
      isExpired: !isExpired,
      expirationDateFrom: DateFromString,
      expirationDateTo: DateToString,
    };
    dispatch(addUserLoginPermission(body as any) as any).then((res: any) => {
      if (res.payload.statusEnum == 1) {
        showSuccessAlert(true, "ModifiedSuccessfully", intl);
      } else if (
        res.payload.message === "Request failed with status code 403"
      ) {
        Swal.fire({
          text: intl.formatMessage({ id: "UserDoesNotHaveEditPermission" }),
          icon: "warning",
          heightAuto: false,
          buttonsStyling: false,
          confirmButtonText: intl.formatMessage({ id: "Agree" }),
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } else {
        showSuccessAlert(false, "AnErrorOccured", intl);
      }
      return setMessageForAddPermission(res?.payload?.message);
    });
  };

  useEffect(() => {
    if (messageForAddPermission == "userPermissionAddedSuccessfully") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
    }
    return () => {
      setMessageForAddPermission("");
    };
  }, [messageForAddPermission]);
  // const EditUserLoginPermission = async (
  //   formValues: AddUserLoginPermissionProps
  // ) => {
  //   let body = {
  //     id,
  //     isNafaz,
  //     isExpired,
  //     expirationDateFrom: moment(formValues?.expirationDateFrom),
  //     expirationDateTo: moment(formValues?.expirationDateTo),
  //   };
  //   dispatch(addUserLoginPermission(body as any) as any).then((res: any) => {
  //     return setMessage(res?.payload?.message);
  //   });
  // };
  useEffect(() => {
    if (messageForEditPermission == "userPermissionUpdatedSuccessfully") {
      showSuccessAlert(true, "ModifiedSuccessfully", intl);
    }
    return () => {
      setMessageForEditPermission("");
    };
  }, [messageForEditPermission]);

  return (
    <>
      <div className="mb-10">
        
         
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <h3 style={{ textAlign: language == "ar" ? "right" : "left" }}>
                  {intl.formatMessage({
                    id: "MyProfile",
                  })}
                </h3>
                <form onSubmit={handleSubmit(AddUserData)}>
                  <div>
                    {inputs?.map((input: any) => (
                      <div key={input?.id} className="row mb-3">
                        <div className="col-12">
                          <label
                            className="form-label fw-bolder text-dark fs-6 d-flex justify-content-between align-items-center"
                            htmlFor={input?.name}
                          >
                            <span className="fw-bolder mb-1">{input.title}</span>
                            {input.inputType !== "password" && (
                              <button
                                type="button"
                                className="btn btn-link p-0 ms-2"
                                style={{ minWidth: 32 }}
                                onClick={() => handleEdit(input)}
                                tabIndex={0}
                                aria-label="Edit Email"
                              >
                                <i
                                  className={`bi bi-${input?.readonly ? "pencil-square" : "check-lg"} fs-3 text-muted`}
                                  role="button"
                                ></i>
                              </button>
                            )}
                            {input.inputType === "password" && (
                              <button
                                type="button"
                                className="btn btn-link p-0 ms-2"
                                style={{ minWidth: 32 }}
                                onClick={handleShowChangePasswordPopup}
                                tabIndex={0}
                                aria-label="Change Password"
                              >
                                <i
                                  className="bi bi-pencil-square fs-3 text-muted" role="button"></i>
                              </button>
                            )}
                          </label>
                          {input?.inputType !== "select" && (
                            <div className="input-group">
                              <span className="input-group-text h-100">
                                <i
                                  className={
                                    input.id === 1
                                      ? "fa-regular fa-envelope special"
                                      : "fa-solid fa-key special"
                                  }
                                ></i>
                              </span>
                              <input
                                type={input?.inputType}
                                className="form-control"
                                readOnly={input?.readonly}
                                id={input?.id}
                                {...register1(`${input?.inputName}` as any)}
                              />
                              {DisplayErrorMessage(
                                errors?.[
                                  input?.inputName as keyof userProtectionProps
                                ]?.message,
                                intl,
                                intl.locale
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      disabled={!editEmail}
                      className="btn btn-success m-3 px-5 py-3 w-100 w-md-auto"
                      style={{ maxWidth: "300px" }}
                      type="submit"
                    >
                      {intl.formatMessage({
                        id: "Save",
                      })}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    

      <div className="my-10">
        <div className="card card-xl-stretch mb-xl-0 py-4">
          <div className="d-flex justify-content-between p-4 align-items-center"></div>
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <h3 style={{ textAlign: language == "ar" ? "right" : "left" }}>
                  {intl.formatMessage({
                    id: "MyProfile",
                  })}
                </h3>
                <form onSubmit={handleSubmit2(AddUserLoginPermission)}>
                  <div className="row">
                    {inputPermissions?.map((input: any) => (
                      <div
                        key={input.id}
                        className={`my-5 ${
                          input.id == 1
                            ? "col-12 "
                            : "col-12 col-lg-6 col-md-6 col-sm-6"
                        }`}
                      >
                        {(showDate || input.inputType == "radio") && (
                          <label
                            className="form-label fw-bolder text-dark fs-6 d-flex justify-content-between"
                            htmlFor={input.name}
                          >
                            <p className="fw-bolder mb-1">{input.title}</p>
                          </label>
                        )}
                        {input.inputType !== "radio" && showDate ? (
                          <>
                            <input
                              type={input.inputType}
                              className="form-control form-control-solid"
                              value={input.value}
                              readOnly={input.readonly}
                              id={input.name}
                              {...register2(input?.inputName)}
                              onChange={(e) => {
                                handleInputPermissionChange(e);
                              }}
                            />
                            {DisplayErrorMessage(
                              errors2?.[
                                input?.inputName as keyof AddUserLoginPermissionProps
                              ]?.message,
                              intl
                            )}
                          </>
                        ) : (
                          input.inputType == "radio" && buildRatioButtons(input)
                        )}
                      </div>
                    ))}

                    <div className="p-3 text-center pb-5">
                      <Link
                        className="btn btn-secondary m-3 px-5 py-3"
                        style={{ width: "125px" }}
                        to="/admin-panel-users-workspace/admin-panel-users/users"
                      >
                        {intl.formatMessage({
                          id: "Cancel",
                        })}
                      </Link>

                      <button
                        className="btn btn-success m-3 px-5 py-3"
                        style={{ width: "125px" }}
                        type="submit"
                      >
                        {intl.formatMessage({
                          id: "Save",
                        })}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" aria-hidden="true">
        <EditPopup handleCloseEdit={handleCloseEdit} showEdit={showEdit} />
      </div>
      {showChangePasswordPopup && (
        <div className="modal fade" aria-hidden="true">
          <ChangePasswordPopup
            handleCloseChangePasswordPopup={() => setChangePasswordPopup(false)}
            showChangePasswordPopup={showChangePasswordPopup}
            id={id}
          />
        </div>
      )}
    </>
  );
};

const buildRatioButtons = (input: inputTypes) => {
  return (
    <div className="form-control form-control-solid d-flex gap-2 w-100">
      {input?.options?.map((option) => (
        <div
          className="form-check form-check-success form-check-sm form-check-custom col-6 "
          key={option?.id}
        >
          <input
            className="form-check-input"
            type="radio"
            name={input?.name}
            value={option?.name}
            id={`${input?.name}${option?.id}`}
            checked={input?.value === option?.name ? true : false}
            onChange={input?.onChange}
          />
          <label
            className="form-check-label"
            htmlFor={`${input?.name}${option.id}`}
          >
            {option?.name}
          </label>
        </div>
      ))}
    </div>
  );
};

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../features/users-slice/userSlice";
import { AppDispatch, RootState } from "../../features/store";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  userSummaryProps,
  userSummarySchema,
} from "../../validation/user-summary-validation";
import { editUserSummary } from "../../features/users-slice/editUserSummarySlice";
import { ManagementHierarchyPopup } from "../user-components/popups/ManagementHierarchyPopup";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { fetchAllUser } from "../../features/users-slice/all_users_slice";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type inputTypes = {
  id: number;
  title: string;
  value: string;
  name: string;
  inputType: string;
  readonly: boolean;
  options?: {
    id: number;
    name: string;
  }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UserSummary: FC = () => {
  const intl = useIntl();

  let [orgName, setOrgName] = useState<string>();
  let [orgId, setOrgId] = useState<string>();
  let [managerId, setManagerId] = useState<string>();
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  let language = intl.locale;

  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser(id as string) as any);
  }, [id]);
  let user = useSelector((state: RootState) => {
    return state?.user?.data;
  });

  const [inputs, setInputs] = useState<any>([]);

  useEffect(() => {
    setValue("address", user?.address);
    setValue("nationalId", user?.nationalId);
    setValue("phoneNumber", user?.phoneNumber);
    setValue("userName", user?.userName);

    let fullName = `${user?.firstName ?? ""} ${user?.secondName ?? ""} ${user?.thirdName ?? ""} ${user?.forthName ?? ""}`;
    setValue("fullName", fullName);
    setValue(
      "userGender",
      user?.userGender == 0
        ? intl.formatMessage({ id: "Male" })
        : intl.formatMessage({ id: "Female" })
    );
    setValue("managerId", user?.managerId);
    setOrgId(user?.orgId);

    let userOrgName =
      getCurrentSystemLanguage() == "ar" ? user?.orgNameAr : user?.orgNameEn;
    setOrgName(userOrgName);
    setInputs([
      {
        id: 1,
        title: intl.formatMessage({ id: "Username" }),
        value: user?.userName,
        name: "username",
        inputName: "userName",
        inputType: "text",
        readonly: true,
        onChange: handleChange,
      },
      {
        id: 2,
        title: intl.formatMessage({ id: "FullName" }),
        value: fullName,
        name: "fullName",
        inputName: "fullName",
        inputType: "text",
        readonly: true,
        onChange: handleChange,
      },
      {
        id: 3,
        title: intl.formatMessage({ id: "Adminstration" }),
        value: "",
        name: "orgId",
        inputName: "orgId",
        inputType: "text",
        readonly: false,
        onChange: handleChange,
      },
      {
        id: 4,
        title: intl.formatMessage({ id: "DirectManager" }),
        value: "",
        name: "DirectManager",
        inputName: "DirectManager",
        inputType: "text",
        readonly: false,
        onChange: handleChange,
      },
      {
        id: 5,
        title: intl.formatMessage({ id: "PhoneNumber" }),
        value: user?.phoneNumber,
        name: "phoneNumber",
        inputName: "phoneNumber",
        inputType: "text",
        readonly: true,
        onChange: handleChange,
      },
      {
        id: 6,
        title: intl.formatMessage({ id: "TransactionNumber" }),
        value: "",
        name: "TransactionNumber",
        inputName: "TransactionNumber",
        inputType: "text",
        readonly: false,
        onChange: handleChange,
      },
      {
        id: 7,
        title: `${intl.formatMessage({ id: "IDNumber" })}/${intl.formatMessage({
          id: "Residence",
        })}`,
        value: user?.nationalId,
        name: "idNumber",
        inputName: "nationalId",
        inputType: "text",
        readonly: true,
        onChange: handleChange,
      },
      {
        id: 8,
        title: intl.formatMessage({ id: "Address" }),
        value: user?.address,
        name: "address",
        inputName: "address",
        inputType: "text",
        readonly: true,
        onChange: handleChange,
      },
      {
        id: 9,
        title: intl.formatMessage({ id: "Gender" }),
        value:
          user?.userGender == 0
            ? intl.formatMessage({ id: "Male" })
            : intl.formatMessage({ id: "Female" }),
        name: "gender",
        inputName: "userGender",
        inputType: "select",
        readonly: true,
        options: [
          {
            id: 0,
            name: intl.formatMessage({ id: "Male" }),
          },
          {
            id: 1,
            name: intl.formatMessage({ id: "Female" }),
          },
        ],
        onChange: handleChange,
      },
    ]);
  }, [user]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setInputs((inputs: any) =>
      inputs.map((input: any) =>
        input.name === name ? { ...input, value: value } : input
      )
    );
  }

  const handleEdit = (input: inputTypes) => {
    input.readonly = !input.readonly;
    setInputs([...inputs]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<userSummaryProps>({
    resolver: yupResolver(userSummarySchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const EditUserSummary = async (formValues: userSummaryProps) => {
    let name = watch("fullName");
    name = name?.replace(/\s+/g, " ");
    let body = {
      id,
      userName: formValues?.userName,
      firstName: name?.split(" ")[0] ?? "",
      secondName: name?.split(" ")[1] ?? "",
      thirdName: name?.split(" ")[2] ?? "",
      forthName: name?.split(" ")[3] ?? "",
      orgId: orgId,
      managerId: formValues?.managerId || managerId,
      email: user?.email,
      phoneNumber: formValues?.phoneNumber,
      address: formValues?.address,
      nationalId: formValues?.nationalId,
      userGender:
        formValues?.userGender == intl.formatMessage({ id: "Male" }) ? 0 : 1,
    };
    dispatch(editUserSummary(body as any) as any);
  };
  let { message } = useSelector((state: RootState) => {
    return state?.userSummary;
  });
  useEffect(() => {
    if (message == "userUpdatedSuccessfully") {
      showSuccessAlert(true, "ModifiedSuccessfully", intl);
      dispatch(fetchUser(id as any) as any);
    } else if (JSON.parse(JSON.stringify(message)) == '["userAlreadyExists"]') {
      showSuccessAlert(false, "UserAlreadyExists", intl);
    }
  }, [message]);
  useEffect(() => {
    return () => {
      dispatch({ type: "editUserSummary/pending" });
    };
  }, []);
  let formValues = watch();

  useEffect(() => {
    dispatch(fetchAllUser({ params: { pageNumber: 1, pageSize: 1000 } }));
  }, []);

  let users = useSelector((state: any) => {
    return state?.AlluserSlice?.data;
  });

  const options = users?.map((user: any) => ({
    value: user?.userId,
    label: user?.userName,
  }));

  return (
      <div className="card-body py-3 px-3 mx-8">
        <div className="tab-content">
          <div
            className="tab-pane fade active show"
            id="REGA_table_widget_5_tab_1"
          >
            <h3 style={{ textAlign: language == "ar" ? "right" : "left" }}>
              {intl.formatMessage({
                id: "BasicInformation",
              })}
            </h3>
            <div>
              <form onSubmit={handleSubmit(EditUserSummary)}>
                {inputs?.map((input: any) => (
                  <div key={input.id} className="my-5">
                    <label
                      className="form-label fw-bolder text-dark fs-6 d-flex justify-content-between"
                      onClick={() => handleEdit(input)}
                      htmlFor={input.name}
                    >
                      <p className="fw-bolder mb-1">{input.title}</p>
                      {input.id !== 1 && (
                        <i
                          className={`bi bi-${
                            input.readonly ? "pencil-square" : "check-lg"
                          } fs-3 text-muted`}
                          role="button"
                        ></i>
                      )}
                    </label>
                    {input.inputType === "text" ? (
                      input.id == 3 ? (
                        <>
                          <div className="mb-2 pt-2 pb-3 ">
                            <div className="mx-auto mt-1  ">
                              <div
                                className="input-group"
                                role="button"
                                onClick={() => {
                                  setModalHShow(true);
                                }}
                              >
                                <i className="bi bi-diagram-3 fs-1 input-group-text border-radius-0"></i>

                                <input
                                  type="select"
                                  className="form-control  ps-10"
                                  name="search"
                                  value={orgName}
                                  placeholder={intl.formatMessage({
                                    id: "Choose",
                                  })}
                                  role="button"
                                  readOnly={true}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : input?.id == 4 ? (
                        <>
                          <Controller
                            name="managerId"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Select
                                {...field}
                                id="ManagerName"
                                className="react-select__container"
                                classNamePrefix="react-select"
                                placeholder={intl.formatMessage({
                                  id: "SelectManagerName",
                                })}
                                options={options}
                                isClearable={true}
                                onChange={(selectedOption) => {
                                  field.onChange(
                                    selectedOption ? selectedOption.value : ""
                                  );
                                  setManagerId(
                                    selectedOption ? selectedOption.value : null
                                  );
                                }}
                                value={options.find(
                                  (option: any) => option.value === field.value
                                )}
                                noOptionsMessage={() =>
                                  intl.formatMessage({
                                    id: "NotAvailableUserName",
                                  })
                                }
                              />
                            )}
                          />
                          {DisplayErrorMessage(
                            errors?.managerId?.message as string,
                            intl,
                            intl.locale
                          )}
                        </>
                      ) : input?.id === 6 ? (
                        <>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              {input.id === 6 ? (
                                <span className="input-group-text">
                                  <i className="fa-solid fa-phone"></i>
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              value={user?.transactionNumber}
                              disabled
                            />
                          </div>
                        </>
                      ) : (
                        <div className="input-group">
                          <div className="input-group-prepend">
                            {input.id === 5 ? (
                              <span className="input-group-text">966+</span>
                            ) : (
                              <span className="input-group-text h-100">
                                <i
                                  className={`${
                                    input.id === 1
                                      ? "special bi bi-person-circle"
                                      : input.id === 5 || input.id == 2
                                        ? "fa-solid fa-id-card special"
                                        : "fas fa-map-marker-alt special"
                                  }`}
                                ></i>
                              </span>
                            )}
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            readOnly={input.readonly}
                            id={input.id}
                            {...register(`${input.inputName}` as any)}
                          />
                          {DisplayErrorMessage(
                            errors?.[input?.inputName as keyof userSummaryProps]
                              ?.message,
                            intl,
                            intl.locale
                          )}
                        </div>
                      )
                    ) : (
                      <select
                        className="form-select form-select-solid fw-bolder"
                        aria-label="Default select example"
                        disabled={input.readonly}
                        defaultValue={input.value}
                        {...register("userGender")}
                      >
                        {input.options?.map((option: any) => (
                          <option
                            key={option.id}
                            value={option.name}
                            // selected={option.name === input.value}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
                <div
                  className="modal fade"
                  id="rega_modal_departmental_organizational_structure"
                  aria-hidden="true"
                >
                  <ManagementHierarchyPopup
                    show={modalHShow}
                    orgId={orgId as string}
                    setOrgId={setOrgId}
                    orgName={orgName}
                    setOrgName={setOrgName}
                    handleClose={() => {
                      setModalHShow(false);
                    }}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center">
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
              </form>
            </div>
          </div>
        </div>
      </div>

  );
};

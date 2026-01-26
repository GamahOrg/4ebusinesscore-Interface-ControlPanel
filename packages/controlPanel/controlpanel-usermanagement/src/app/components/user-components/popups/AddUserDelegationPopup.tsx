import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  addUserDelegationsSchema,
  AddUserDelegationValidationProps,
} from "../../../models/user-delegations/add-user-delegation-model";
import { RootState } from "../../../features/store";
import { fetchUsers } from "../../../features/users-slice/usersSlice";
import {
  getAllDelegationFromUserByUserId,
  getAllDelegationToUserByUserId,
  postUserDelegation,
} from "../../../features/user-delegation-slice/user-delegation-slice";
import { Notification } from "@4eplatform/shared/services/notifications";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show: boolean;
  handleClose: any;
};

const AddUserDelegationPopup = ({ show, handleClose }: PopupProps) => {
  const intl = useIntl();
  const [activeState, setActiveState] = useState(true);
  const [approve, setApprove] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    userName: "",
    commonNameAD: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ pageSize: "1000", pageNumber: "1" }) as any);
  }, [dispatch]);

  const user = useSelector((state: RootState) => {
    return state?.user?.data;
  });

  const users = useSelector((state: RootState) => {
    return state?.users?.data;
  });

  const notificationUser = users?.find((user) => user.id === id);

  const options = users
    ?.map((user) => ({
      value: user?.id,
      label: user?.userName,
    }))
    .filter((user) => user.value !== id);

  const handleActive = () => {
    setActiveState(!activeState);
  };
  const handleApprove = () => {
    setApprove(!approve);
  };

  const checkUndefinedName = (name: any) => {
    if (
      name === "undefined" ||
      name === "null" ||
      name === undefined ||
      name == null
    ) {
      return "";
    } else {
      return name;
    }
  };

  useEffect(() => {
    setUserData({
      firstName: checkUndefinedName(notificationUser?.firstName),
      secondName: checkUndefinedName(notificationUser?.secondName),
      thirdName: checkUndefinedName(notificationUser?.thirdName),
      fourthName: checkUndefinedName(notificationUser?.forthName),
      userName: checkUndefinedName(notificationUser?.userName),
      commonNameAD: checkUndefinedName(notificationUser?.commonNameAD),
    });
  }, [notificationUser]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserDelegationValidationProps>({
    resolver: yupResolver(addUserDelegationsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const handleUserDelegationSubmit = (formvalues: any) => {
    const body = {
      delegeatedToUserId: formvalues?.alternativeId,
      delegeatedFromUserId: id,
      startDate: formvalues?.startDate,
      endDate: formvalues?.endDate,
      isActive: activeState,
      isApprovedFrom: !approve,
    };

    dispatch(postUserDelegation(body) as any).then((result: any) => {
      if (result.payload?.message === "alternaiveUserSavedSuccessfully") {
        handleClose();
        const body = {
          id,
          myParams: {
            pageNumber: 1,
            pageSize: 1000,
          },
        };
        dispatch(getAllDelegationFromUserByUserId(body) as any);
        dispatch(getAllDelegationToUserByUserId(body) as any);
        showSuccessAlert(true, "DelagetedSuccessfully", intl, () => {
          if (result.isConfirmed) {
            handleClose();
          }
        });
        approve
          ? Notification.addDelegation(
              id as string,
              `/user-profile/outgoing-delegation/details/${result?.payload?.result}`,
              89,
              result.payload?.result,
              user?.email,
              true,
              78,
              new Date(),
              "Qimah Admin",
              ""
            )
          : Notification.addDelegation(
              formvalues?.alternativeId as string,
              `/user-profile/incoming-delegation/details/${result?.payload?.result}`,
              89,
              result.payload?.result,
              users?.find((user) => user?.id === formvalues?.alternativeId)
                ?.email as string,
              true,
              78,
              new Date(),
              userData.commonNameAD
                ? userData.commonNameAD
                : `${userData.firstName} ${userData.secondName} ${userData.thirdName} ${userData.fourthName}`.trim(),
              ""
            );
      } else if (result.payload?.message === '["The user has same delegate"]') {
        showSuccessAlert(false, "TheUserHasSameDelegate", intl);
      } else {
        showSuccessAlert(false, "DelagationFailed", intl);
      }
    });
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <form onSubmit={handleSubmit(handleUserDelegationSubmit as any)}>
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale === "ar" ? "flex-start" : "center",
                flexDirection: intl.locale === "en" ? "column-reverse" : "row",
              }}
              className="pb-0 border-bottom-0"
            >
              <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
                <Modal.Title id="contained-modal-title-vcenter">
                  <h3 className="card-title flex-column align-items-center">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "AddingDelegation" })}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body className="pb-0 mx-4">
              <div className="row mb-5">
                <div className="col-sm-6 col-12">
                  <div className="d-flex flex-column mb-8">
                    <label className="fs-6 fw-bold mb-2" htmlFor="employee">
                      {intl.formatMessage({ id: "TheEmployee" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-user-cog special"></i>
                        </span>
                      </div>

                      <Controller
                        name="alternativeId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            id="alternativeId"
                            className="react-select__container"
                            classNamePrefix="react-select"
                            placeholder={intl.formatMessage({
                              id: "Choose",
                            })}
                            options={options}
                            isClearable={true}
                            onChange={(selectedOption) =>
                              field.onChange(
                                selectedOption ? selectedOption.value : ""
                              )
                            }
                            value={
                              options?.find(
                                (option) => option.value === field.value
                              ) || null
                            }
                            noOptionsMessage={() =>
                              intl.formatMessage({
                                id: "NotAvailableDocumentOwner",
                              })
                            }
                          />
                        )}
                      />

                      {DisplayErrorMessage(
                        errors?.alternativeId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-12">
                  <div className="d-flex flex-column mb-8">
                    <label className="fs-6 fw-bold mb-2" htmlFor="start date">
                      {intl.formatMessage({ id: "DelegationStatus" })}
                    </label>
                    <div className="form-control form-control-solid">
                      <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          id="Checkbox1"
                          checked={activeState}
                          onChange={handleActive}
                        />
                      </div>
                      <label
                        htmlFor="Checkbox1"
                        className=" d-inline-block ms-4"
                      >
                        {intl.formatMessage({
                          id: "Active",
                        })}
                      </label>
                      <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          id="Checkbox2"
                          checked={!activeState}
                          onChange={handleActive}
                        />
                      </div>
                      <label htmlFor="Checkbox2">
                        {intl.formatMessage({
                          id: "NotActive",
                        })}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-sm-6 col-12">
                  <div className="d-flex flex-column mb-8">
                    <label className="fs-6 fw-bold mb-2" htmlFor="start date">
                      {intl.formatMessage({ id: "DelegationStartDate" })}
                    </label>
                    <input
                      className="form-control form-control-solid"
                      id="startDate"
                      {...register("startDate")}
                      type="datetime-local"
                      placeholder={intl.formatMessage({ id: "From" })}
                    />
                  </div>
                  {DisplayErrorMessage(
                    errors?.startDate?.message as string,
                    intl,
                    intl.locale
                  )}
                </div>
                <div className="col-sm-6 col-12">
                  <div className="d-flex flex-column mb-8">
                    <label className="fs-6 fw-bold mb-2" htmlFor="end date">
                      {intl.formatMessage({ id: "DelegationEndDate" })}
                    </label>
                    <input
                      className="form-control form-control-solid"
                      {...register("endDate")}
                      type="datetime-local"
                      id="endDate"
                      placeholder={intl.formatMessage({ id: "To" })}
                    />
                  </div>
                  {DisplayErrorMessage(
                    errors?.endDate?.message as string,
                    intl,
                    intl.locale
                  )}
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-sm-6 col-12">
                  <div className="d-flex flex-column mb-8">
                    <label className="fs-6 fw-bold mb-2" htmlFor="start date">
                      {intl.formatMessage({ id: "DoYouWantUserApproval" })}
                    </label>
                    <div className="form-control form-control-solid">
                      <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          id="Checkbox1"
                          checked={approve}
                          onChange={handleApprove}
                        />
                      </div>
                      <label
                        htmlFor="Checkbox1"
                        className=" d-inline-block ms-4"
                      >
                        {intl.formatMessage({
                          id: "Yes",
                        })}
                      </label>
                      <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          id="Checkbox2"
                          checked={!approve}
                          onChange={handleApprove}
                        />
                      </div>
                      <label htmlFor="Checkbox2">
                        {intl.formatMessage({
                          id: "No",
                        })}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0 gap-4">
              <button className="btn btn-secondary px-15" onClick={handleClose}>
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button type="submit" className="btn btn-success px-15">
                {intl.formatMessage({ id: "Delegation" })}
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddUserDelegationPopup;

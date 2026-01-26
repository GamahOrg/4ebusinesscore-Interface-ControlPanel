import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { ManagementHierarchyPopup } from "../partials/ManagementHierarchyPopup";
import { Controller, useForm } from "react-hook-form";
import {
  ValidationFormsProps,
  ValidationFormsSchema,
} from "../validations/ValidationForms";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { addWorkSpace } from "../slices/addWorkspaceSlice";
import { RootState } from "../store/workspaceStore";
import { Color } from "../models/Colors";
import { getSubsystemsDropdown } from "../slices/getAllSubsystemSlice";
import { getNoteTypeId } from "../slices/getLookUpsSlice";
import { format } from "date-fns";
import { GetAllTypesWithParent } from "../slices/getAllTypesWithParent";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import Select from "react-select";
import { Lookup } from "../models/Lookup";
import { getAllSubSystemMainLookUP } from "../slices/getAllSubsytemMainLookUpSlice";
import { getAllSubSystemSettingsMainClassification } from "../slices/getAllSubsytemSettingsMainClassification";

const ViewAllcardsAddCardContent = ({
  setIcon,
  setOrg,
  setColor,
  setSystemName,
  setSystemDescription,
}: any) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const language = intl.locale;
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errorSelectedCategory, setErrorSelectedCategory] =
    useState<Boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("no");
  const [isHide, setIsHide] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");
  const URL = location?.state?.url;
  const cardType = location?.state?.cardType;
  const additionalId = location?.state?.additionalId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<ValidationFormsProps>({
    resolver: yupResolver(ValidationFormsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const formValues = watch();

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsSelected(selectedOption);
  };

  useEffect(() => {
    dispatch(getSubsystemsDropdown({}) as any);
    dispatch(GetAllTypesWithParent() as any);
    dispatch(getNoteTypeId() as any);
    dispatch(getAllSubSystemMainLookUP({}) as any);
    dispatch(getAllSubSystemSettingsMainClassification({}) as any);
  }, [dispatch]);
  const [isIntegrated, setIsIntegrated] = useState(false);

  useEffect(() => {
    setValue("isIntegerated", isIntegrated ? "yes" : "no");
  }, [isIntegrated]);

  const handleIntegrationChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsIntegrated(selectedOption === "yes");
  };

  let subsystemWithParent = useSelector((state: RootState) => {
    return state?.AllTypesWithParents.items;
  });
  let Subcategories = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });
  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  const categoryOptions =
    Array.isArray(Subcategories) &&
    Subcategories?.map((subCategory: Lookup) => ({
      value: subCategory?.id,
      label: language === "ar" ? subCategory?.nameAr : subCategory?.nameEn,
    }));

  useEffect(() => {
    if (selectedCategory?.id) {
      setValue("subsytemMainId", selectedCategory?.id);
      trigger("subsytemMainId");
    }

    const id =
      (Array.isArray(selectedCategory) &&
        selectedCategory?.map((category: any) => category.value)) ||
      [];
    setSelectedCategoryIds(id);
  }, [selectedCategory]);

  const Addworkspace = async (formValues: ValidationFormsProps) => {
    if (selectedCategoryIds?.length == 0) {
      return setErrorSelectedCategory(true);
    }
    setErrorSelectedCategory(false);

    let body = {
      noteNameAr: formValues.noteNameAr,
      noteNameEn: formValues.noteNameEn,
      url: formValues.url,
      description: formValues.description,
      icon: formValues.icon,
      color: formValues.color,
      state: 0,
      isActive: true,
      visitDate: format(new Date(), "yyyy-MM-dd"),
      noteTypeId: formValues.noteTypeId,
      parentId: formValues.parentId || null,
      organizationHierarchyId: orgId,
      isVisiable: isSelected == "yes" ? true : false,
      subsystemIsVisiable: !isHide,
      subsytemMainId: selectedCategoryIds,
      subsytemMainLookupId: formValues.subsytemMainLookupId,
      isExternal: true,
      isIntegerated: isIntegrated,
      endPoint: formValues?.endPoint,
      isSinglSignOn:
        URL === "/external-components" && cardType === 1 ? true : false,
      identityProvider:
        URL === "/external-components" && cardType === 1
          ? formValues.identityProvider
          : null,
      clientId:
        URL === "/external-components" && cardType === 1
          ? formValues.clientId
          : null,
      clientSecret:
        URL === "/external-components" && cardType === 1
          ? formValues.clientSecret
          : null,
    };

    try {
      const result = await dispatch(addWorkSpace(body) as any);

      if (
        result?.payload.statusEnum === 1 ||
        result?.payload.message === "WorkSpaceUpdatedSuccessfully"
      ) {
        showSuccessAlert(true, "AddedSuccessfully", intl, () => {
          navigate(-1);
        });
      } else if (result?.payload?.message == '["NameEn is already exist"]') {
        showSuccessAlert(false, "CardNameEnIsAlreadyExist", intl);
      } else if (
        result?.payload?.message ==
        '["NameEn is already exist","NameAr is already exist"]'
      ) {
        showSuccessAlert(false, "CardNameArEnIsAlreadyExist", intl);
      } else if (result?.payload?.message == '["NameAr is already exist"]') {
        showSuccessAlert(false, "CardNameArIsAlreadyExist", intl);
      } else if (result?.payload?.message == '["Type is Invalid"]') {
        showSuccessAlert(false, "YouMustSelectTheMainSystem", intl);
      } else {
        console.error("Error:", result.payload.message);
        showSuccessAlert(false, "AnErrorOccured", intl);
      }
    } catch (error) {
      console.error("Error:", error);
      showSuccessAlert(false, "AnErrorOccured", intl);
    }
  };

  useEffect(() => {
    setSystemName(
      language == "ar" ? formValues?.noteNameAr : formValues?.noteNameEn
    );
    setIcon(formValues?.icon);
    setSystemDescription(formValues?.description);
  }, [formValues]);

  useEffect(() => {
    setOrg(orgName);
  }, [orgName]);

  useEffect(() => {
    if (URL === "/external-components" && Array.isArray(subsystemWithParent)) {
      setSelectedComponentId(subsystemWithParent[0]?.id);
      setValue("noteTypeId", subsystemWithParent[0]?.id);
      setSelectedWorkspaceId(additionalId);
      setValue("parentId", additionalId);
    }
  }, [location, subsystemWithParent]);

  const handleComponentChange = (event: any) => {
    setSelectedComponentId(event.target.value);
    setSelectedWorkspaceId("");
  };

  const handleWorkspaceChange = (event: any) => {
    setSelectedWorkspaceId(event.target.value);
  };
  useEffect(() => {
    setColor(formValues?.color);
  }, [formValues?.color]);
  return (
    <div
      id="kt_content_container"
      className="d-flex flex-column-fluid align-items-start"
    >
      <div id="kt_content">
        <div className="row">
          <div>
            <div className="card card-xl-stretch card-body">
              <div className="card-header py-5 mb-5">
                <div className="py-2">
                  <h3>{intl.formatMessage({ id: "AddNewCard" })}</h3>
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(Addworkspace)}
                style={{ textAlign: "start" }}
              >
                <div className="row gy-5 p-3">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="CardName" className="mb-2 required">
                        {intl.formatMessage({ id: "CardNameInArabic" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-gear"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="noteNameAr"
                          placeholder={intl.formatMessage({ id: "CardName" })}
                          {...register("noteNameAr")}
                        />
                      </div>
                      {DisplayErrorMessage(
                        errors?.noteNameAr?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="CardName" className="mb-2 required">
                        {intl.formatMessage({ id: "CardNameInEnglish" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-gear"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="noteNameEn"
                          placeholder={intl.formatMessage({ id: "SystemName" })}
                          {...register("noteNameEn")}
                        />
                        {DisplayErrorMessage(
                          errors?.noteNameEn?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="ManagementName" className="mb-2 required">
                        {intl.formatMessage({ id: "ManagementName" })}
                      </label>
                      <div className="position-relative">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fas fa-user-shield"></i>
                            </span>
                          </div>
                          <input
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="organizationHierarchyId"
                            placeholder={intl.formatMessage({
                              id: "ManagementName",
                            })}
                            disabled
                            value={orgName}
                          />
                          <div
                            className="position-absolute translate-middle-y"
                            style={{
                              top: "50%",
                              left: intl.locale == "ar" ? "15px" : "",
                              right: intl.locale == "en" ? "15px" : "",
                            }}
                          >
                            <i
                              className="bi bi-diagram-3 cursor-pointer fs-1 text-muted"
                              onClick={() => setModalHShow(true)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardDescription"
                        className="mb-2 required"
                      >
                        {intl.formatMessage({ id: "CardDescription" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-circle-info"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          placeholder={intl.formatMessage({
                            id: "CardDescription",
                          })}
                          {...register("description")}
                        />
                        {DisplayErrorMessage(
                          errors?.description?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Icon" className="mb-2 required">
                        {intl.formatMessage({ id: "Icon" })}
                      </label>
                      <div className="position-relative">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fa-solid fa-icons"></i>
                            </span>
                          </div>
                          <input
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="icon"
                            placeholder={intl.formatMessage({ id: "Icon" })}
                            {...register("icon")}
                          />
                          <div
                            style={{
                              top: "50%",
                              left: intl.locale == "ar" ? "15px" : "",
                              right: intl.locale == "en" ? "15px" : "",
                            }}
                            className="position-absolute translate-middle-y"
                          >
                            <a
                              href="https://fontawesome.com/v5/search?q=file&o=r&s=duotone"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-solid fa-link fs-5 text-muted"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      {DisplayErrorMessage(
                        errors?.icon?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Color" className="mb-2 required">
                        {intl.formatMessage({ id: "Color" })}
                      </label>
                      <select
                        id="Color"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        tabIndex={-1}
                        {...register("color")}
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "Color" })}
                        </option>
                        <option value={Color.Red}>
                          {intl.formatMessage({ id: "Red" })}
                        </option>
                        <option value={Color.Green}>
                          {intl.formatMessage({ id: "Green" })}
                        </option>
                        <option value={Color.Yellow}>
                          {intl.formatMessage({ id: "Yellow" })}
                        </option>
                      </select>
                      {DisplayErrorMessage(
                        errors?.color?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="noteTypeId" className="mb-2 required">
                        {intl.formatMessage({ id: "Type" })}
                      </label>
                      <select
                        id="noteTypeId"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        tabIndex={-1}
                        {...register("noteTypeId")}
                        value={selectedComponentId}
                        onChange={handleComponentChange}
                      >
                        <option disabled value="">
                          {intl.formatMessage({ id: "Type" })}
                        </option>
                        {URL === "/external-components" ? (
                          <>
                            {Array.isArray(subsystemWithParent) ? (
                              <>
                                <option
                                  value={subsystemWithParent[0]?.id}
                                  key={subsystemWithParent[0]?.id}
                                >
                                  {subsystemWithParent[0]?.nameAr}{" "}
                                </option>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            {Array.isArray(subsystemWithParent) &&
                              subsystemWithParent?.map((ele) => (
                                <option value={ele?.id} key={ele?.id}>
                                  {ele.nameAr}{" "}
                                </option>
                              ))}
                          </>
                        )}
                      </select>
                      {DisplayErrorMessage(
                        errors?.noteTypeId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="CardLink" className="mb-2 required">
                        {intl.formatMessage({ id: "CardLink" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-link"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="url"
                          placeholder={intl.formatMessage({ id: "CardLink" })}
                          {...register("url")}
                        />
                        {DisplayErrorMessage(
                          errors?.url?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="CardLink" className="mb-2 required">
                        {intl.formatMessage({ id: "MainSystem" })}
                      </label>

                      <select
                        id="MainSystem"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        tabIndex={-1}
                        {...register("parentId")}
                        value={selectedWorkspaceId}
                        onChange={handleWorkspaceChange}
                      >
                        <option disabled value="">
                          {intl.formatMessage({ id: "MainSystem" })}
                        </option>
                        {Array.isArray(subsystemWithParent) &&
                          subsystemWithParent
                            ?.find(
                              (component) =>
                                component.id === selectedComponentId
                            )
                            ?.workspaces?.map((workspace) => (
                              <option key={workspace?.id} value={workspace?.id}>
                                {workspace?.noteNameAr}
                              </option>
                            ))}
                      </select>
                      {DisplayErrorMessage(
                        errors?.parentId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "ShowServiceAtWorkspace" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fad fa-eye fs-3"></i>
                          </span>
                        </div>
                        <select
                          className="form-select form-select-solid px-4 py-0 m-0"
                          id="selectOption"
                          value={isSelected}
                          onChange={handleSelectChange}
                        >
                          <option value="yes">
                            {intl.formatMessage({ id: "YES" })}
                          </option>
                          <option value="no">
                            {intl.formatMessage({ id: "NO" })}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "SubCategory" })}
                      </label>
                      <div className="d-flex w-100">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-layer-group fs-3"></i>
                          </span>
                        </div>
                        <Controller
                          name="subsytemMainId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              id="subsytemMainId"
                              className="react-select__container"
                              classNamePrefix="react-select"
                              placeholder={intl.formatMessage({
                                id: "SelectUserName",
                              })}
                              options={categoryOptions as any}
                              isMulti={true}
                              isClearable={true}
                              onChange={(selectedOption) =>
                                setSelectedCategory(selectedOption)
                              }
                              value={selectedCategory}
                              noOptionsMessage={() =>
                                intl.formatMessage({
                                  id: "NotAvailable",
                                })
                              }
                            />
                          )}
                        />
                      </div>
                      {errorSelectedCategory ? (
                        <>
                          {DisplayErrorMessage(
                            "ThisFelidIsRequired" as string,
                            intl,
                            intl.locale
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="col-6 mb-2 pt-2 pb-3">
                    <label className="required text-gray-600 fw-bold fs-8 mb-1">
                      {intl.formatMessage({ id: "HideFromDigitalServices" })}
                    </label>
                    <div className="d-flex align-items-center gap-4 my-3">
                      <div className="d-flex">
                        <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="radio"
                            name="HideFromDigitalServices"
                            id="Show"
                            value="Show"
                            checked={!isHide}
                            onChange={() => setIsHide(false)}
                          />
                        </div>
                        <label className="form-check-label ms-3" htmlFor="Show">
                          {intl.formatMessage({ id: "ShowCard" })}
                        </label>
                      </div>
                      <div className="d-flex">
                        <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="radio"
                            name="HideFromDigitalServices"
                            id="Hide"
                            value="Hide"
                            checked={isHide}
                            onChange={() => setIsHide(true)}
                          />
                        </div>
                        <label className="form-check-label ms-3" htmlFor="Hide">
                          {intl.formatMessage({ id: "HideCard" })}
                        </label>
                      </div>
                    </div>
                  </div>
                  {!URL?.includes("external") ? (
                    <>
                      <div className="col-6">
                        <div className="mb-1 py-2 ">
                          <label className="form-label px-2  fs-6 text-gray-700 required">
                            {intl.formatMessage({ id: "IntegrationAbility" })}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="bi bi-gear-fill fs-3"></i>
                              </span>
                            </div>
                            <select
                              className="form-select form-select-solid px-4 py-0 m-0"
                              id="selectOption"
                              value={isIntegrated ? "yes" : "no"}
                              onChange={handleIntegrationChange}
                            >
                              <option value="yes">
                                {intl.formatMessage({ id: "YES" })}
                              </option>
                              <option value="no">
                                {intl.formatMessage({ id: "NO" })}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {cardType === 1 ? (
                    <>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="description"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "IdentityProvider" })}
                            {language === "ar" ? (
                              <> (Identity Provider)</>
                            ) : (
                              <></>
                            )}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="special fa-solid fa-circle-info"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="identityProvider"
                              placeholder={intl.formatMessage({
                                id: "IdentityProvider",
                              })}
                              {...register("identityProvider")}
                            />
                            {DisplayErrorMessage(
                              errors?.identityProvider?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="ClientId"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "ClientId" })}
                            {language === "ar" ? <> (Client Id)</> : <></>}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="special fa-solid fa-circle-info"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="ClientId"
                              placeholder={intl.formatMessage({
                                id: "ClientId",
                              })}
                              {...register("clientId")}
                            />
                            {DisplayErrorMessage(
                              errors?.clientId?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="ClientSecret"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "ClientSecret" })}
                            {language === "ar" ? <> (Client Secret)</> : <></>}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="special fa-solid fa-circle-info"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="ClientSecret"
                              placeholder={intl.formatMessage({
                                id: "ClientSecret",
                              })}
                              {...register("clientSecret")}
                            />
                            {DisplayErrorMessage(
                              errors?.clientSecret?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="col-md-6">
                    <div className="mb-1 py-2 ">
                      <label
                        className="fs-6 fw-bold mb-2 required"
                        htmlFor="SystemStatus"
                      >
                        {intl.formatMessage({ id: "SystemStatus" })}{" "}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-newspaper special"></i>
                          </span>
                        </div>
                        <select
                          id="SystemStatus"
                          className="form-select form-select-solid px-4 py-0 m-0"
                          {...register("subsytemMainLookupId")}
                        >
                          <option value="" selected disabled>
                            {intl.formatMessage({ id: "Choose" })}
                          </option>
                          {Array.isArray(AllSubSystemMainLookUp) &&
                            AllSubSystemMainLookUp?.map((item: Lookup) => (
                              <option key={item?.id} value={item?.id}>
                                {intl.locale === "ar"
                                  ? item?.nameAr
                                  : item?.nameEn}
                              </option>
                            ))}
                        </select>
                      </div>
                      {DisplayErrorMessage(
                        errors?.subsytemMainLookupId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>

                  {!URL?.includes("external") ? (
                    <>
                      <div className="col-12 mt-2">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="CardLink"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "EndpointLink" })}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="special fa-solid fa-link"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              // readOnly
                              // disabled
                              id="EndpointLink"
                              placeholder={intl.formatMessage({
                                id: "EndpointLink",
                              })}
                              {...register("endPoint")}
                            />
                            {DisplayErrorMessage(
                              errors?.endPoint?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="d-flex justify-content-center my-5">
                    <span
                      onClick={() => navigate(-1)}
                      className="btn btn-secondary px-15 me-5"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </span>
                    {orgId != "" ? (
                      <button
                        type="submit"
                        className="btn btn-success px-15 ms-5"
                      >
                        {intl.formatMessage({ id: "Add" })}
                      </button>
                    ) : (
                      <div
                        className="btn btn-success px-15 ms-5"
                        onClick={() => {
                          showSuccessAlert(
                            false,
                            "YouMustSelectTheDepartment",
                            intl
                          );
                        }}
                      >
                        {intl.formatMessage({ id: "Add" })}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" id="Rega_modal_viewallcards_hierarchy">
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
        <div className="modal fade" id="Rega_modal_viewallcards_addcard">
          <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
        </div>
      </div>
    </div>
  );
};

export { ViewAllcardsAddCardContent };

import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ManagementHierarchyPopup } from "../partials/ManagementHierarchyPopup";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "../store/workspaceStore";
import { Color } from "../models/Colors";
import { addWorkSpaceCard } from "../slices/addCardsystemsSlice";
import {
  ValidationSFormsSchema,
  ValidationSystemFormsProps,
} from "../validations/ValidationSystemFormsProps";
import { format } from "date-fns";
import { getAllSubSystemSettingsMainClassification } from "../slices/getAllSubsytemSettingsMainClassification";
import { Lookup } from "../models/Lookup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { getAllSubSystemMainLookUP } from "../slices/getAllSubsytemMainLookUpSlice";
import Select from "react-select";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";

const AddSystemContent = ({
  setOrg,
  setIcon,
  setColor,
  setSystemName,
  setSystemDescription,
}: any) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const intl = useIntl();
  let language = intl.locale;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSystemFormsProps>({
    resolver: yupResolver(ValidationSFormsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let dispatch = useDispatch();

  const [isHide, setIsHide] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("no");
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errorSelectedCategory, setErrorSelectedCategory] =
    useState<Boolean>(false);

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsSelected(selectedOption);
  };

  useEffect(() => {
    dispatch(getAllSubSystemSettingsMainClassification({}) as any);
    dispatch(getAllSubSystemMainLookUP({}) as any);
  }, [dispatch]);
  let Subcategories = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });

  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  const categoryOptions = Subcategories?.map((subCategory: Lookup) => ({
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

  let location = useLocation();
  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  let [orgId, setOrgId] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");
  const navigate = useNavigate();

  const Addworkspace = async (formValues: ValidationSystemFormsProps) => {
    if (selectedCategoryIds?.length == 0) {
      return setErrorSelectedCategory(true);
    }
    setErrorSelectedCategory(false);
    let body = {
      noteNameAr: formValues.noteNameAr,
      noteNameEn: formValues.noteNameEn,
      organizationHierarchyId: orgId,
      description: formValues.description,
      icon: formValues.icon,
      url: formValues.url,
      color: formValues.color,
      state: 0,
      visitDate: format(new Date(), "yyyy-MM-dd"),
      isActive: true,
      isExternal: false,
      subsytemMainId: selectedCategoryIds,
      isVisiable: isSelected === "yes" ? true : false,
      subsystemIsVisiable: !isHide,
      isSinglSignOn: false,
      identityProvider: null,
      clientId: null,
      clientSecret: null,
      subsytemMainLookupId: formValues.subsytemMainLookupId,
    };
    try {
      const result = await dispatch(addWorkSpaceCard(body) as any);

      if (result?.payload.statusEnum === 1) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        navigate("/systems-services-settings/systems-settings", {
          state: { serviceName: cardName, cardId: cardId, cardTitle: cardName, partTitle: partTitle },
        });
      } else if (
        result?.payload?.message ==
        '["NameEn is already exist","NameAr is already exist"]'
      )
        showSuccessAlert(false, "NameArAndNameEnAlreadyExists", intl);
      else if (result?.payload?.message == '["NameAr is already exist"]')
        showSuccessAlert(false, "NameArIsAlreadyExists", intl);
      else if (result?.payload?.message == '["NameEn is already exist"]')
        showSuccessAlert(false, "NameEnIsAlreadyExists", intl);
      else showSuccessAlert(false, result?.payload?.message, intl);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  let formValues = watch();
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
  useEffect(()=>{
    setColor(formValues?.color)
  },[formValues?.color])
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
                  <h3>{intl.formatMessage({ id: "AddNewSystem" })}</h3>
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit(Addworkspace)}>
                <div className="row gy-5 p-3" style={{ textAlign: "start" }}>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="noteNameAr"
                        className="mb-2 mx-3 required"
                      >
                        {intl.formatMessage({ id: "SystemNameInArabic" })}
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
                          placeholder={intl.formatMessage({ id: "SystemName" })}
                          {...register("noteNameAr")}
                        />
                        {DisplayErrorMessage(
                          errors?.noteNameAr?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="noteNameEn"
                        className="mb-2 mx-3  required"
                      >
                        {intl.formatMessage({ id: "SystemNameInEnglish" })}
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
                      <label
                        htmlFor="organizationHierarchyId"
                        className="mb-2 mx-3 required"
                      >
                        {intl.formatMessage({ id: "FollowingManagementName" })}
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
                            disabled
                            className="form-control"
                            id="organizationHierarchyId"
                            placeholder={intl.formatMessage({
                              id: "FollowingManagementName",
                            })}
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
                      {DisplayErrorMessage(
                        errors?.organizationHierarchyId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="mb-2 mx-3 required"
                      >
                        {intl.formatMessage({ id: "Description" })}
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
                            id: "Description",
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
                      <label htmlFor="icon" className="mb-2 mx-3 required">
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
                    </div>
                    {DisplayErrorMessage(
                      errors?.icon?.message as string,
                      intl,
                      intl.locale
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="color" className="mb-2 mx-3 required">
                        {intl.formatMessage({ id: "Color" })}
                      </label>
                      <select
                        id="color"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder={intl.formatMessage({ id: "Color" })}
                        tabIndex={-1}
                        aria-hidden="true"
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
                      <label htmlFor="url" className="mb-2 mx-3 required">
                        {intl.formatMessage({ id: "SystemLink" })}
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
                          placeholder={intl.formatMessage({ id: "SystemLink" })}
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
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "ShowSystemAtWorkspace" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                          >
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
                      <div className="input-group">
                        <div className="d-flex w-100">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                            >
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
                                options={categoryOptions}
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
                          {intl.formatMessage({ id: "ShowSystem" })}
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
                            onChange={() => setIsHide(true)}
                          />
                        </div>
                        <label className="form-check-label ms-3" htmlFor="Hide">
                          {intl.formatMessage({ id: "HideSystem" })}
                        </label>
                      </div>
                    </div>
                  </div>
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
                          {AllSubSystemMainLookUp?.map((item: Lookup) => (
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
                  <div className="d-flex justify-content-center my-5">
                    <Link
                      to={`/systems-services-settings/systems-settings`}
                      state={{
                        cardId: cardId,
                        cardTitle: cardName,
                        partTitle: partTitle,
                      }}
                      type="reset"
                      className="btn btn-secondary px-15 me-5"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </Link>
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
        <div
          className="modal fade"
          id="Rega_modal_viewallcards_hierarchy"
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
        <div
          className="modal fade"
          id="Rega_modal_viewallcards_addcard"
          aria-hidden="true"
        >
          <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
        </div>
      </div>
    </div>
  );
};

export { AddSystemContent };

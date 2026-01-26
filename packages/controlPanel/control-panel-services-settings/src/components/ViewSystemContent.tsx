import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EmployeeHierarchyPopup } from "../partials/EmployeeHierarchyPopup";
import { GetWorkSpaceByIdResponse } from "../Shared/models/VM/GetWorkSpaceByIdResponse";
import { Color } from "../Shared/models/response-status";
import { getAllSubSystemSettingsMainClassification } from "../slices/getAllSubsytemSettingsMainClassification";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/workspaceStore";
import { Lookup } from "../models/Lookup";
import { getAllSubSystemMainLookUP } from "../slices/getAllSubsytemMainLookUpSlice";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  ValidationSFormsSchema,
  ValidationSystemFormsProps,
} from "../validations/ValidationSystemFormsProps";
import { yupResolver } from "@hookform/resolvers/yup";
interface GetSubSystemSettingProp {
  subSystemSetting: GetWorkSpaceByIdResponse;
}

const ViewSystemContent: FC<GetSubSystemSettingProp> = ({
  subSystemSetting,
}: GetSubSystemSettingProp) => {
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  const intl = useIntl();
  let language = intl.locale;
  const dispatch = useDispatch<AppDispatch>();

  const [signOn, setSignOn] = useState<string>("no");
  const [selectedCategory, setSelectedCategory] = useState<any>([]);


  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSystemFormsProps>({
    resolver: yupResolver(ValidationSFormsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(getAllSubSystemSettingsMainClassification({}) as any);
    dispatch(getAllSubSystemMainLookUP({}));
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
    if (subSystemSetting?.subsytemMainIds) {
      const selectedOptions =
        Array.isArray(subSystemSetting?.subsytemMainIds) &&
        subSystemSetting?.subsytemMainIds
          ?.map((id: string) => {
            const matchingCategory =
              Array.isArray(Subcategories) &&
              Subcategories?.find(
                (subCategory: Lookup) => subCategory?.id === id
              );
            if (matchingCategory) {
              return {
                value: matchingCategory?.id,
                label:
                  language === "ar"
                    ? matchingCategory?.nameAr
                    : matchingCategory?.nameEn,
              };
            }
            return null;
          })
          ?.filter((option) => option !== null);
      setValue("subsytemMainId", subSystemSetting?.subsytemMainIds);
      setSelectedCategory(selectedOptions);
    }
  }, [subSystemSetting, Subcategories]);

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
                  <h3>{intl.formatMessage({ id: "Viewsystem" })}</h3>
                </div>
              </div>
              <form>
                <div className="row gy-5 p-3">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="SystemName"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
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
                          readOnly
                          type="text"
                          className="form-control"
                          id="SystemName"
                          value={subSystemSetting?.noteNameAr}
                          placeholder={intl.formatMessage({ id: "SystemName" })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="SystemName"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
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
                          readOnly
                          type="text"
                          className="form-control"
                          id="SystemName"
                          value={subSystemSetting?.noteNameEn}
                          placeholder={intl.formatMessage({ id: "SystemName" })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="ManagementName"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
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
                            readOnly
                            value={subSystemSetting?.orgNameAr}
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="ManagementName"
                            placeholder={intl.formatMessage({
                              id: "FollowingManagementName",
                            })}
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
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
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
                          readOnly
                          value={subSystemSetting?.description}
                          type="text"
                          className="form-control"
                          id="CardDescription"
                          placeholder={intl.formatMessage({
                            id: "Description",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="Icon"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
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
                            value={subSystemSetting?.icon}
                            readOnly
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="Icon"
                            placeholder={intl.formatMessage({ id: "Icon" })}
                          />
                          <div
                            style={{
                              top: "50%",
                              left: intl.locale == "ar" ? "15px" : "",
                              right: intl.locale == "en" ? "15px" : "",
                            }}
                            className="position-absolute translate-middle-y"
                          >
                            <i className="fa-solid fa-link fs-5 text-muted"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="Color"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "Color" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-palette special"></i>
                          </span>
                        </div>
                        <select
                          defaultValue={subSystemSetting?.color}
                          id="Color"
                          className="form-select form-select-solid px-4 py-0 m-0"
                          data-placeholder="اختر"
                          tabIndex={-1}
                          disabled
                        >
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
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardLink"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "SystemLink" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-link"></i>
                          </span>
                        </div>
                        <input
                          value={subSystemSetting?.url}
                          readOnly
                          type="text"
                          className="form-control"
                          id="CardLink"
                          placeholder={intl.formatMessage({ id: "SystemLink" })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="ShowSystemAtWorkspace"
                        className="mb-2 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "ShowSystemAtWorkspace" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            style={{ height: "48px" }}
                          >
                            <i className="fad fa-eye fs-3"></i>
                          </span>
                        </div>
                        <select
                          defaultValue={
                            subSystemSetting?.isVisiable ? "yes" : "no"
                          }
                          id="ShowSystemAtWorkspace"
                          className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                          data-placeholder="اختر"
                          tabIndex={-1}
                          disabled
                        >
                          <option disabled value="">
                            {intl.formatMessage({
                              id: "ShowSystemAtWorkspace",
                            })}
                          </option>

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
                        <div className="input-group-prepend ">
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
                            <div className="form-control p-0 border-0">
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
                                isDisabled={true}
                                value={selectedCategory}
                                noOptionsMessage={() =>
                                  intl.formatMessage({
                                    id: "NotAvailable",
                                  })
                                }
                              />
                            </div>
                          )}
                        />
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
                            disabled
                            checked={subSystemSetting?.subsystemIsVisiable}
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
                            disabled
                            checked={!subSystemSetting?.subsystemIsVisiable}
                          />
                        </div>
                        <label className="form-check-label ms-3" htmlFor="Hide">
                          {intl.formatMessage({ id: "HideSystem" })}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "SystemType" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                          >
                            <i className="fas fa-sign-in-alt fs-3"></i>
                          </span>
                        </div>
                        <select
                          className="form-select form-select-solid px-4 py-0 m-0"
                          id="selectOption"
                          name="systemType"
                          defaultValue={
                            subSystemSetting?.isExternal
                              ? "external"
                              : "internal"
                          }
                          disabled
                        >
                          <option value="internal">
                            {intl.formatMessage({ id: "Internal1" })}
                          </option>
                          <option value="external">
                            {intl.formatMessage({ id: "External1" })}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {subSystemSetting?.isExternal && (
                    <>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label className="form-label px-2  fs-6 text-gray-700 required">
                            {intl.formatMessage({ id: "SingleSignOnSystem" })}
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
                              id="SingleSignOn"
                              name="signOn"
                              defaultValue={
                                subSystemSetting?.isSinglSignOn ? "yes" : "no"
                              }
                              disabled
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

                      {subSystemSetting?.isSinglSignOn && (
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
                                  name="identityProvider"
                                  readOnly
                                  value={subSystemSetting?.identityProvider}
                                />
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
                                  name="clientId"
                                  readOnly
                                  value={subSystemSetting?.clientId}
                                />
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
                                {language === "ar" ? (
                                  <> (Client Secret)</>
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
                                  id="ClientSecret"
                                  placeholder={intl.formatMessage({
                                    id: "ClientSecret",
                                  })}
                                  name="clientSecret"
                                  readOnly
                                  value={subSystemSetting?.clientSecret}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
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
                          name="SystemStatus"
                          defaultValue={subSystemSetting?.subsytemMainLookupId}
                          disabled
                        >
                          <option value="" disabled>
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
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" id="Rega_modal_viewallcards_hierarchy">
          <EmployeeHierarchyPopup
            show={modalHShow}
            handleClose={() => setModalHShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export { ViewSystemContent };

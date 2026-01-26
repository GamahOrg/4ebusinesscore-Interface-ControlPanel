import { useIntl } from "react-intl";
import { FC, useEffect } from "react";
import {
  addRoleProps,
  addRoleSchema,
} from "../../../validation/add-role-validation";
import { RootState } from "../../../features/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { editRoleAsync } from "../../../features/role/rolesSlice";
import { fetchCategoryRoles } from "../../../features/roleCategory/roles-category-Slice";
import { role } from "../../../models/role/role-model";
import { edittRoleModel } from "../../../models/role/edit-role";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type EditUserRolePopupProps = {
  cancelFun: () => void;
  initlData: role;
};

export const EditUserRolePopup: FC<EditUserRolePopupProps> = ({
  cancelFun,
  initlData,
}) => {
  const intl = useIntl();
  let rolesCategory = useSelector((state: RootState) => {
    return state?.rolesCategory;
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<addRoleProps>({
    resolver: yupResolver(addRoleSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const defaultValues = {
    nameAr: initlData.nameAr,
    nameEn: initlData.nameEn,
    details: initlData.details,
    roleCategoryId: initlData.roleCategoryId,
    roleCategoryNameEn: initlData.roleCategoryNameEn,
    roleCategoryNameAr: initlData.roleCategoryNameAr,
    id: initlData.id,
  };

  const roleSubmit = async (formValues: addRoleProps) => {
    const data: edittRoleModel = {
      nameAr: formValues.nameAr,
      nameEn: formValues.nameEn,
      details: formValues.details,
      roleCategoryId: formValues.roleCategoryId
        ? formValues.roleCategoryId
        : "",
      id: defaultValues.id,
    };
    let response = await dispatch(editRoleAsync(data) as any);
    if (response.payload.statusEnum === 1) {
      showSuccessAlert(true, "roleUpdatedSuccessfully", intl);
    }
    cancelFun();
  };

  useEffect(() => {
    dispatch(fetchCategoryRoles() as any);
  }, []);

  useEffect(() => {
    if (rolesCategory?.data?.length > 0) {
      setValue("roleCategoryId", initlData?.roleCategoryId);
      trigger("roleCategoryId");
    }
  }, [initlData, rolesCategory]);
  return (
    <>
      <div
        className="modal  fade creatForm show"
        role="dialog"
        style={{ paddingRight: "10px", display: "block" }}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered"
          style={{ width: "80%" }}
        >
          <div className="modal-content rounded">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
              >
                <span className="svg-icon svg-icon-1"></span>
              </div>
            </div>
            <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15 mb-7">
              <div className="fw-bolder  pb-8 border-bottom border-gray-300">
                <h1 className="mb-3 text-center ">
                  {intl.formatMessage({ id: "EditRole" })}
                </h1>
                <h3 className="mt-5 ">
                  {intl.formatMessage({ id: "RoleData" })}
                </h3>
                <div className="text-muted fw-bolder fs-6">
                  {intl.formatMessage({ id: "PleaseEnterTheData" })}
                </div>
              </div>
              <form
                noValidate
                className="form outputForm"
                onSubmit={handleSubmit(roleSubmit)}
              >
                <div className="row">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="RoleName"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "RoleNameAr" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fas fa-user-tag"></i>
                          </span>
                        </div>
                        <input
                          id="RoleNameAr"
                          className="form-control"
                          defaultValue={defaultValues.nameAr}
                          placeholder={intl.formatMessage({
                            id: "RoleNameAr",
                          })}
                          {...register("nameAr")}
                        />
                        {DisplayErrorMessage(
                          errors?.nameAr?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="RoleNameEn"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "RoleNameEn" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fas fa-user-tag"></i>
                          </span>
                        </div>
                        <input
                          id="RoleNameEn"
                          className="form-control"
                          defaultValue={defaultValues.nameEn}
                          placeholder={intl.formatMessage({
                            id: "RoleNameEn",
                          })}
                          {...register("nameEn")}
                        />
                        {DisplayErrorMessage(
                          errors?.nameEn?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="RoleClassification"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "RoleClassification" })}
                      </label>
                      <select
                        id="RoleClassification"
                        className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                        {...register("roleCategoryId", { required: true })}
                        defaultValue=""
                      >
                        <option disabled value="">
                          {intl.formatMessage({ id: "Choose" })}
                        </option>
                        {rolesCategory.data.map((role) => (
                          <option key={role.id} value={role.id}>
                            {intl?.locale.toLowerCase() == "ar"
                              ? role.nameAr
                              : role.nameEn}
                          </option>
                        ))}
                      </select>
                      {DisplayErrorMessage(
                        errors?.roleCategoryId?.type === "required"
                          ? intl.formatMessage({
                              id: "RoleCategoryMustBeRequired",
                            })
                          : errors?.roleCategoryId?.message,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="RoleDetails"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "RoleDetails" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text h-100">
                            <i className="special bi bi-ui-checks"></i>
                          </span>
                        </div>
                        <textarea
                          className="form-control"
                          rows={3}
                          id="RoleDetails"
                          data-kt-element="input"
                          defaultValue={defaultValues.details}
                          placeholder={intl.formatMessage({
                            id: "RoleDetails",
                          })}
                          {...register("details")}
                        ></textarea>
                        {DisplayErrorMessage(
                          errors?.details?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="reset"
                    onClick={cancelFun}
                    className="btn btn-secondary px-15 me-5"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button type="submit" className="btn btn-primary px-15 ms-5">
                    {intl.formatMessage({ id: "Edit" })}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserRolePopup;

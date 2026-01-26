import { useIntl } from "react-intl";
import {
  addRoleProps,
  addRoleSchema,
} from "../../../validation/add-role-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { fetchCategoryRoles } from "../../../features/roleCategory/roles-category-Slice";
import { useEffect } from "react";
import { postRole } from "../../../models/role/post-role";
import { AddRoleAsync } from "../../../features/role/rolesSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type Iprop = {
  cancelFun: () => void;
};

const AddUserRolePopup: React.FC<Iprop> = ({ cancelFun }) => {
  const intl = useIntl();
  let rolesCategory = useSelector((state: RootState) => {
    return state?.rolesCategory;
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addRoleProps>({
    resolver: yupResolver(addRoleSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const roleSubmit = (formValues: addRoleProps) => {
    const data: postRole = {
      nameAr: formValues.nameAr,
      nameEn: formValues.nameEn,
      details: formValues.details,
      roleCategoryId: formValues.roleCategoryId
        ? formValues.roleCategoryId
        : "",
    };
    dispatch(AddRoleAsync(data) as any)
      .then((result: any) => {
        if (result.payload.statusEnum === 1) {
          showSuccessAlert(true, "RoleAddedSuccessfully", intl, () => {
            cancelFun();
            // if (result.isConfirmed) {
            //   cancelFun();
            // }
          });
        } else if (
          JSON.parse(result.payload.message).join(",") ===
          "NameArAlreadyExists,NameEnAlreadyExists"
        ) {
          showSuccessAlert(true, "NameArAndEnAlreadyExists", intl);
        } else {
          showSuccessAlert(true, JSON.parse(result.payload.message), intl);
        }
      })
      .catch((err: any) => {});
  };
  useEffect(() => {
    dispatch(fetchCategoryRoles() as any);
  }, []);
  return (
    <div
      className="modal  fade creatForm show"
      role="dialog"
      style={{ paddingRight: "10px", display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
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
                {intl.formatMessage({ id: "AddRole" })}
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
                      id="domain"
                      className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                      {...register("roleCategoryId", { required: true })}
                    >
                      <option disabled selected value="">
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {rolesCategory?.data.map((role) => (
                        <option key={role?.id} value={role?.id}>
                          {intl?.locale.toLowerCase() == "ar"
                            ? role?.nameAr
                            : role?.nameEn}
                        </option>
                      ))}
                    </select>
                    {DisplayErrorMessage(
                      errors?.roleCategoryId?.message as string,
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
                <button type="submit" className="btn btn-success px-15 ms-5">
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserRolePopup;

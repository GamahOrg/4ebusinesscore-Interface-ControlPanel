import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { OrgProps, OrgSchema } from "../validation/add-org-validation";
import { RootState } from "../features/store";
import { editOrg } from "../features/orghierarchies-slice/edit-orgSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { OrgHierarchyModel } from "../models/org-model";
import { ResponseStatus } from "../models/response-status";
import { fetchOrgs } from "../features/orghierarchies-slice/orgSlice";
import { getAllLookUps } from "../features/orghierarchies-slice/look-upSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type EditPopupProps = {
  showEdit?: any;
  handleCloseEdit?: any;
  orgId: string;
};
const EditItemPopup: React.FC<EditPopupProps> = ({
  showEdit,
  handleCloseEdit,
  orgId,
}) => {
  const intl = useIntl();
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<OrgProps>({
    resolver: yupResolver(OrgSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let formValues = watch();

  const findOrgById = (
    orgList: OrgHierarchyModel[],
    targetId: string
  ): OrgHierarchyModel | undefined => {
    for (const org of orgList) {
      if (org.id === targetId) {
        return org;
      } else if (org.children && org.children.length > 0) {
        const childResult = findOrgById(org.children, targetId);
        if (childResult) {
          return childResult;
        }
      }
    }

    return undefined;
  };

  let currentOrg = useSelector((state: RootState) =>
    findOrgById(state?.orghierarchies.data, orgId)
  );

  let [org, setOrg] = useState<any>("");

useEffect(() => {
  setOrg(currentOrg);
}, [currentOrg]);

  useEffect(() => {
  if (org) {
    reset({
      nameAr: org.nameAr || "",
      nameEn: org.nameEn || "",
      description: org.description || "",
      categoryId: org.categoryId || "",
    });
  }
}, [orgId, org,currentOrg, reset,showEdit]);

  useEffect(() => {
    if (isEdited) {
      dispatch(fetchOrgs({}) as any);
      setIsEdited(false);
    }
  }, [isEdited]);

  const handleEditSubmit = async (data: any) => {
    try {
      data.id = orgId;
      data.parentId = currentOrg?.parentId != null ? currentOrg.parentId : null;
      let updatedData = { id: orgId, body: data };
      dispatch(editOrg(updatedData) as any).then((res: any) => {
        if (res?.payload?.statusEnum == ResponseStatus.SavedSuccessfully) {
          showSuccessAlert(true, "AddedSaveSuccessfully", intl);
          setIsEdited(true);
        } else if (
          JSON.parse(res?.payload?.message)[0] ==
            "NameAr or NameEn is already in use." &&
          res?.payload?.statusEnum == 2
        ) {
          showSuccessAlert(false, JSON.parse(res?.payload?.message)[0], intl);
        } else showSuccessAlert(false, "UserDoesNotHaveEditPermission", intl);
        setTimeout(() => {
          handleCloseEdit();
        }, 200);
        // reset();
      });
    } catch (err: any) {}
  };

  useEffect(() => {
    dispatch(getAllLookUps() as any);
  }, [dispatch]);

  const lookUps = useSelector((state: RootState) => state?.lookUp?.allLookUps);

  return (
    <>
      <div className="modal fade" aria-hidden="true">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showEdit}
          onHide={handleCloseEdit}
        >
          <div className="card">
            <div className="mx-5"></div>
            <Modal.Header
              closeButton
              // style={{
              //   alignItems: intl.locale == "ar" ? "flex-start" : "center",
              //   flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              // }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0">
                <Modal.Title className="align-self-center">
                  <h3 className="card-title flex-column align-items-center ">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "EditMainItem" })}/
                      {intl.formatMessage({ id: "Secondary" })}
                    </span>

                    <span className="mt-1 fw-semibold fs-5 text-muted">
                      {intl.formatMessage({
                        id: "ChooseDataClassification",
                      })}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "NameInArabic" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-vector-square special"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.nameAr ? "is-invalid" : ""
                          }`}
                          placeholder={intl.formatMessage({
                            id: "NameInArabic",
                          })}
                          {...register("nameAr")}
                        />
                      </div>
                      {DisplayErrorMessage(
                        errors?.nameAr?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "NameInEnglish" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-vector-square special"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.nameEn ? "is-invalid" : ""
                          }`}
                          placeholder={intl.formatMessage({
                            id: "OrgNameEnMustBeInEnglish",
                          })}
                          {...register("nameEn")}
                        />
                      </div>
                      {DisplayErrorMessage(
                        errors?.nameEn?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700">
                        {intl.formatMessage({ id: "Description" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-vector-square special"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.description ? "is-invalid" : ""
                          }`}
                          placeholder={intl.formatMessage({
                            id: "Description",
                          })}
                          {...register("description")}
                        />
                      </div>
                      {DisplayErrorMessage(
                        errors?.description?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "DepartmentClassification",
                        })}
                      </label>
                      <div className="input-group">
                        <select
                          className={`form-control form-control-solid ${
                            errors?.categoryId ? "is-invalid" : ""
                          }`}
                          {...register("categoryId")}
                        >
                          <option value=" ">
                            {intl.formatMessage({ id: "SelectCategory" })}
                          </option>
                          {lookUps &&
                            lookUps.map((lookUp) => (
                              <option
                                key={lookUp.id}
                                value={lookUp.id}
                                style={{ color: lookUp.color }}
                              >
                                {lookUp.nameAr}
                              </option>
                            ))}
                        </select>
                      </div>
                      {DisplayErrorMessage(
                        errors?.categoryId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                </div>
                <Modal.Footer className="justify-content-center py-2">
                  <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                    <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                      <div className="d-flex justify-content-center align-items-center w-50">
                        <div
                          data-bs-dismiss="modal"
                          className="btn btn-secondary mx-1 text-center w-100"
                          onClick={handleCloseEdit}
                        >
                          {intl.formatMessage({ id: "Cancel" })}
                        </div>
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditSubmit(formValues);
                          }}
                          className="btn btn-success mx-1 text-center w-100"
                          style={{ border: "none" }}
                        >
                          {intl.formatMessage({ id: "Agree" })}
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EditItemPopup;

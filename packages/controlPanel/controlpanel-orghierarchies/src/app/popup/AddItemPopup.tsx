import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { OrgProps, OrgSchema } from "../validation/add-org-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { addOrgAsync } from "../features/orghierarchies-slice/add-orgSlice";
import { fetchOrgs } from "../features/orghierarchies-slice/orgSlice";
import { ResponseStatus } from "../models/response-status";
import { getAllLookUps } from "../features/orghierarchies-slice/look-upSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type AddPopupProps = {
  show?: any;
  handleClose?: any;
  parentId?: string | null;
};

const AddItemPopup: React.FC<AddPopupProps> = ({
  show,
  handleClose,
  parentId,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<OrgProps>({
    resolver: yupResolver(OrgSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let formValues = watch();

  useEffect(() => {
    if (isAdded) {
      dispatch(fetchOrgs({}) as any);
      setIsAdded(false);
    }
  }, [isAdded]);

  const addItemHandler = (data: any) => {
    if (parentId != null) data.parentId = parentId;
    dispatch(addOrgAsync(data) as any).then((res: any) => {
      if (
        res?.payload?.message == "orgAddedSuccessfully" &&
        res?.payload?.statusEnum == ResponseStatus.SavedSuccessfully
      ) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        setTimeout(() => {
          handleClose();
        }, 200);
        reset();
        setIsAdded(true);
      } else if (
        res?.payload?.message == '["NameAr or NameEn is already in use."]'
      ) {
        showSuccessAlert(false, "NameArorNameEnisalreadyinuse", intl);
      }
    });
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
          show={show}
          onHide={handleClose}
        >
          <div className="card">
            <Modal.Header
              closeButton
              // style={{
              //   alignItems: intl.locale == "ar" ? "flex-start" : "center",
              //   flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              // }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 ">
                <Modal.Title className="align-self-center">
                  <h3 className="card-title flex-column align-items-center ">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "AddMainItem" })}/
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
            <form>
              <Modal.Body>
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
                            id: "OrgNameArMustBeInArabic",
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
                          {lookUps.map((lookUp) => (
                            <option key={lookUp.id} value={lookUp.id}>
                              {intl.locale === "ar"
                                ? lookUp.nameAr
                                : lookUp.nameEn}
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
              </Modal.Body>
              <Modal.Footer className="justify-content-center py-2">
                <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-50">
                      <button
                        type="reset"
                        className="btn btn-secondary mx-1 text-center w-100"
                        onClick={handleClose}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          trigger()?.then((isValid) => {
                            if (isValid) {
                              addItemHandler(formValues);
                            }
                          });
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
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddItemPopup;

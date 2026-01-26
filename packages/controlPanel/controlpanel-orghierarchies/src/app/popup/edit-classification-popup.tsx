import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  ClassificationSchema,
  ClassificationProps,
} from "../validation/add-classification-validation";
import React, { useEffect } from "react";
import {
  editLookUpById,
  getAllLookUps,
  getLookUps,
} from "../features/orghierarchies-slice/look-upSlice";
import { RootState } from "../features/store";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { fetchOrgs } from "../features/orghierarchies-slice/orgSlice";

type EditClassificationPopupProps = {
  show?: any;
  handleClose?: any;
  id: string;
  lookUpNameAr?: string;
  lookUpNameEn?: string;
  lookUpColor?: string;
};

const EditClassificationPopup: React.FC<EditClassificationPopupProps> = ({
  show,
  handleClose,
  id,
  lookUpNameAr,
  lookUpNameEn,
  lookUpColor,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClassificationProps>({
    resolver: yupResolver(ClassificationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setValue("nameAr", lookUpNameAr || "");
    setValue("nameEn", lookUpNameEn || "");
    setValue("color", lookUpColor || "");
  }, [lookUpNameAr, lookUpNameEn, lookUpColor, setValue]);
  let formValues = watch();
  let pagination = useSelector((state: RootState) => {
    return state?.lookUp?.pagination;
  });
  const editLookUpHandler = () => {
    let data = {
      nameAr: formValues.nameAr,
      nameEn: formValues.nameEn,
      color: formValues.color,
    };
    dispatch(
      editLookUpById({
        id: id,
        body: data,
      }) as any
    ).then((res: any) => {
      if (
        res?.payload?.message === "lookupUpdatedSuccessfully" &&
        res?.payload?.statusEnum === 1
      ) {
        showSuccessAlert(true, "AddedSaveSuccessfully", intl);
        handleClose();
        reset();
        dispatch(fetchOrgs({}) as any);
        dispatch(
          getLookUps({
            PageNumber: pagination?.pageIndex,
            PageSize: pagination?.pageSize,
          }) as any
        );
        dispatch(getAllLookUps() as any);
      } else if (
        JSON.parse(res?.payload?.message)[0] == "NameInArabicAlreadyExists" &&
        res?.payload?.statusEnum == 2
      ) {
        showSuccessAlert(false, JSON.parse(res?.payload?.message)[0], intl);
      } else if (
        JSON.parse(res?.payload?.message)[0] == "NameInEnglishAlreadyExists" &&
        res?.payload?.statusEnum == 2
      ) {
        showSuccessAlert(false, JSON.parse(res?.payload?.message)[0], intl);
      } else {
        showSuccessAlert(false, res?.payload?.message, intl);
      }
    });
  };

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
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <h3 className="card-title flex-column align-items-center ">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "EditCategory" })}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>
            <form onSubmit={handleSubmit(editLookUpHandler)}>
              <Modal.Body>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "NameInArabic" })}
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.nameAr ? "is-invalid" : ""
                          }`}
                          placeholder={intl.formatMessage({
                            id: "ClassificationNameArMustBeInArabic",
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
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.nameEn ? "is-invalid" : ""
                          }`}
                          placeholder={intl.formatMessage({
                            id: "ClassificationNameEnMustBeInEnglish",
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
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "Color" })}
                      </label>
                      <div className="input-group">
                        <input
                          type="color"
                          className={`form-control ${
                            errors?.color ? "is-invalid" : ""
                          }`}
                          placeholder={intl.formatMessage({
                            id: "Color",
                          })}
                          {...register("color")}
                        />
                      </div>
                      {DisplayErrorMessage(
                        errors?.color?.message as string,
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

export default EditClassificationPopup;

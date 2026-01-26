import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  ClassificationSchema,
  ClassificationProps,
} from "../validation/add-classification-validation";
import {
  addLookUp,
  getAllLookUps,
} from "../features/orghierarchies-slice/look-upSlice";
import { RootState } from "../features/store";
import { getLookUps } from "../features/orghierarchies-slice/look-upSlice";
import { LookUpActions } from "../components/org-main-cards/lookup-actions";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type AddClassificationPopupProps = {
  show?: any;
  handleClose?: any;
};

const AddClassificationPopup: React.FC<AddClassificationPopupProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassificationProps>({
    resolver: yupResolver(ClassificationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  let pagination = useSelector((state: RootState) => {
    return state?.lookUp?.pagination;
  });
  let formValues = watch();
  let lookUps = useSelector((state: RootState) => {
    return state?.lookUp?.lookups;
  });
  useEffect(() => {
    dispatch(
      getLookUps({
        PageNumber: currentPage,
        PageSize: pageSize,
      }) as any
    );
  }, [currentPage, pageSize]);
  const addLookUpHandler = (data: any) => {
    dispatch(addLookUp(data) as any).then((res: any) => {
      if (
        res?.payload?.message == "lookupAddedSuccessfully" &&
        res?.payload?.statusEnum == 1
      ) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        handleClose();
        reset();
        dispatch(
          getLookUps({
            PageNumber: currentPage,
            PageSize: pageSize,
          }) as any
        );
        dispatch(getAllLookUps() as any);
      } else if (
        res?.payload?.message == "ThereAlreadyCatagoryWithSameName" &&
        res?.payload?.statusEnum == 5
      ) {
        showSuccessAlert(false, res?.payload?.message, intl);
      } else {
        showSuccessAlert(
          false,
          "YouMustEnterTheClassificationItemsFirst",
          intl
        );
      }
    });
  };
  let language = intl.locale;

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
          <div
            className="card"
            style={{ overflowY: "auto", maxHeight: "80vh" }}
          >
            <Modal.Header
              closeButton
              // style={{
              //   alignItems: intl.locale == "ar" ? "flex-start" : "center",
              //   flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              // }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 ">
                <Modal.Title className="align-self-center ">
                  <h3 className="card-title flex-column align-items-center ">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "AddCategory" })}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body>
              {/* Wrap your form content in a form element */}
              <form onSubmit={handleSubmit(addLookUpHandler)}>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "NameInArabic" })}
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control`}
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
                          className={`form-control `}
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

                {/* Move the buttons inside the form */}
                <Modal.Footer className="justify-content-center py-2">
                  <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                    <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                      <div className="d-flex justify-content-center align-items-center w-50">
                        <button
                          type="button" // Changed to "button" to prevent form submission
                          className="btn btn-secondary mx-1 text-center w-100"
                          onClick={handleClose}
                        >
                          {intl.formatMessage({ id: "Cancel" })}
                        </button>
                        <button
                          type="submit" // This will trigger form validation
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

            {lookUps && lookUps.length > 0 ? (
              <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                      {intl.formatMessage({ id: "ClassificationName" })}
                    </th>
                    <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                      {intl.formatMessage({ id: "DepartmentsNumber" })}
                    </th>
                    <th className="px-2 pb-3 min-w-50px max-w-350px text-muted text-center">
                      {intl.formatMessage({ id: "Actions" })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lookUps?.map((lookup, index) => (
                    <tr key={index} className="align-middle">
                      <th className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                        <span
                          className=""
                          style={{ color: `${lookup?.color}` }}
                        >
                          {language === "ar" ? lookup?.nameAr : lookup?.nameEn}
                        </span>
                      </th>
                      <td>
                        <span>{lookup?.orgCount}</span>
                      </td>
                      <td>
                        <LookUpActions
                          id={lookup?.id}
                          lookUpNameAr={lookup?.nameAr}
                          lookUpNameEn={lookup?.nameEn}
                          lookUpColor={lookup?.color}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-dark">
                {intl.formatMessage({ id: "NoAvailableCategories" })}
              </div>
            )}
            {lookUps && lookUps.length > 0 && (
              <div className="px-4 py-4 mx-8 my-8">
                <SystemPagination
                  totalItems={pagination?.totalItems}
                  totalPages={pagination?.totalPages}
                  pageIndex={currentPage}
                  pageSize={pageSize}
                  setPageIndex={setCurrentPage}
                  setPageSize={setPageSize}
                />
              </div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddClassificationPopup;

import { FC } from "react";
import { useIntl } from "react-intl";
import { Row, Modal } from "react-bootstrap";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useForm } from "react-hook-form";
import {
  ValidationSecurityFormSchema,
  ValidationSecurityFormsProps,
} from "../validations/ValidationSecurityForms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  addSSOSecuritySetting,
  getAllSSOSecuritySetting,
} from "../slices/ssoSecuritySettingSlice";

type AddSecuritySettingProps = {
  showAdd?: any;
  handleCloseAdd?: any;
};

export const AddSecuritySetting: FC<AddSecuritySettingProps> = ({
  showAdd,
  handleCloseAdd,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSecurityFormsProps>({
    resolver: yupResolver(ValidationSecurityFormSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const AddSecurity = async (formValues: ValidationSecurityFormsProps) => {
    let params = {
      name: formValues.name,
      body: formValues.body,
      type: formValues.type,
      url: formValues.url,
    };

    try {
      const result = await dispatch(addSSOSecuritySetting({ params }) as any);
      if (
        result?.payload.statusEnum === 1 ||
        result?.payload.message === "SSOSecuritySettingAddedSuccessfully"
      ) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        dispatch(getAllSSOSecuritySetting({}) as any);
        reset()
        handleCloseAdd()
      } else showSuccessAlert(false, "AnErrorOccured", intl);
    } catch (error) {
      console.error("Error during add:", error);
    }
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered">
        <Modal centered show={showAdd} onHide={handleCloseAdd} size="lg">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <Modal.Title></Modal.Title>
            <Row className="justify-content-center mt-10">
              <div className="text-center">
                <h3> {intl.formatMessage({ id: "AddSecuritySetting" })} </h3>
              </div>
            </Row>
          </Modal.Header>
          <form onSubmit={handleSubmit(AddSecurity)}>
            <Modal.Body>
              <div className="row gy-5 p-3" style={{ textAlign: "start" }}>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label htmlFor="secName" className="mb-2 mx-3 required">
                      {intl.formatMessage({ id: "Name" })}
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
                        id="secName"
                        placeholder={intl.formatMessage({ id: "Name" })}
                        {...register("name")}
                      />
                      {DisplayErrorMessage(
                        errors?.name?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label htmlFor="secbody" className="mb-2 mx-3 required">
                      {intl.formatMessage({ id: "Content" })}
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
                        id="secbody"
                        placeholder={intl.formatMessage({ id: "Content" })}
                        {...register("body")}
                      />
                      {DisplayErrorMessage(
                        errors?.body?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label htmlFor="secLink" className="mb-2 mx-3 required">
                      {intl.formatMessage({ id: "Link" })}
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
                        id="secLink"
                        placeholder={intl.formatMessage({ id: "Link" })}
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
                    <label htmlFor="type" className="mb-2 mx-3 required">
                      {intl.formatMessage({ id: "Type" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-palette special"></i>
                        </span>
                      </div>
                      <select
                        id="type"
                        className="form-select form-select-solid px-4 py-0 m-0"
                        data-placeholder={intl.formatMessage({ id: "Type" })}
                        tabIndex={-1}
                        {...register("type")}
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "Type" })}
                        </option>
                        <option value={0}>
                          {intl.formatMessage({ id: "0" })}
                        </option>
                        <option value={1}>
                          {intl.formatMessage({ id: "1" })}
                        </option>
                        <option value={2}>
                          {intl.formatMessage({ id: "2" })}
                        </option>
                        <option value={3}>
                          {intl.formatMessage({ id: "3" })}
                        </option>
                        <option value={4}>
                          {intl.formatMessage({ id: "4" })}
                        </option>
                      </select>
                    </div>
                    {DisplayErrorMessage(
                      errors?.type?.message as string,
                      intl,
                      intl.locale
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="row">
                <div className="col-12 col-lg-7 mx-auto mb-10 mt-5">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <button
                        type="reset"
                        className="btn btn-secondary me-3 w-100"
                        onClick={handleCloseAdd}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>

                      <button
                        type="submit"
                        className="  btn btn-success me-5 w-100 "
                      >
                        <span className="indicator-label">
                          {intl.formatMessage({ id: "Add" })}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
};

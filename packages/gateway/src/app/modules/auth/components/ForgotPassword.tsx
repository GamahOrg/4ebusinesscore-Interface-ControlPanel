import { useIntl } from "react-intl";
import AuthFooter from "./AuthFooter";
import LoginLogoSide from "./LoginLogoSide";
 function ForgotPassword() {
  let intl = useIntl();
  return (
    <>
      <div className="row">
      <div className="col-lg-5 col-md-6 col-sm-12 align-items-center">
        <div className="bg-body d-flex flex-column flex-center rounded-4 w-100 p-7">
          <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-100 px-0 px-lg-15 px-md-10">
            <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                <form
                  className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                  noValidate={true}
                  id="kt_password_reset_form"
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="text-center mb-10">
                    <h1 className="text-dark fw-bolder mb-3">
                      {intl.formatMessage({ id: "ForgotPassword" })}
                    </h1>

                    <div className="text-gray-500 fw-semibold fs-7">
                      {intl.formatMessage({
                        id: "EnterYourEmailToResetYourPassword",
                      })}
                    </div>
                  </div>

                  <div className="fv-row mb-8 fv-plugins-icon-container">
                    <input
                      type="text"
                      placeholder={intl.formatMessage({ id: "Email" })}
                      name="email"
                      autoComplete="off"
                      className="form-control bg-light"
                     
                    />

                    <div className="fv-plugins-message-container invalid-feedback"></div>
                  </div>

                  <div
                    className="d-flex flex-wrap justify-content-center pb-lg-0"
                   
                  >
                    <a className="btn btn-light mx-4" href="/auth/login">
                      {intl.formatMessage({ id: "Cancel" })}
                    </a>
                    <button
                      type="button"
                      id="kt_password_reset_submit"
                      className="btn btn-primary me-4"
                    >
                      <span className="indicator-label">
                        {intl.formatMessage({ id: "Submit" })}
                      </span>

                      <span className="indicator-progress">
                        {intl.formatMessage({ id: "PleaseWait" })}
                        ...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <AuthFooter />
          </div>
        </div>
        <div className="col-lg-7 col-md-6 col-sm-12 p-3 d-flex flex-center flex-column align-items-center align-items-center">
          <LoginLogoSide/>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;

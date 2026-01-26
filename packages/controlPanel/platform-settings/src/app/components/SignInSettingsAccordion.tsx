import { ChangeEvent, FC } from "react";
import { SignInMode } from "../enums/enums-platform-settings";
import { IntlShape } from "react-intl";

interface SignInSettingsAccordionProps {
  intl: IntlShape;
  webCoverLogin: any;
  webCoverLoginFile: File | null;
  logoSystemLogin: any;
  logoSystemLoginFile: File | null;
  logoWebCoverLogin: any;
  logoWebCoverLoginFile: File | null;
  isSelected: string;
  duration: number;
  setWebCoverLoginFile: React.Dispatch<React.SetStateAction<File | null>>;
  setWebCoverLogin: any;
  setLogoSystemLoginFile: React.Dispatch<React.SetStateAction<File | null>>;
  setLogoSystemLogin: any;
  setLogoWebCoverLoginFile: React.Dispatch<React.SetStateAction<File | null>>;
  setLogoWebCoverLogin: any;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  setDuration: any;
}

const SignInSettingsAccordion: FC<SignInSettingsAccordionProps> = ({
  intl,
  webCoverLogin,
  webCoverLoginFile,
  logoSystemLogin,
  logoSystemLoginFile,
  logoWebCoverLogin,
  logoWebCoverLoginFile,
  isSelected,
  duration,
  setWebCoverLoginFile,
  setWebCoverLogin,
  setLogoSystemLoginFile,
  setLogoSystemLogin,
  setLogoWebCoverLoginFile,
  setLogoWebCoverLogin,
  setIsSelected,
  setDuration,
}) => {
  const handleImageChangeSystemLogoLogin = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoSystemLoginFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file as any);
      reader.onload = () => {
        setLogoSystemLogin(URL.createObjectURL(file));
      };
    }
  };

  const handleImageChangeWebCoverLogin = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setWebCoverLoginFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setWebCoverLogin(URL.createObjectURL(file));
      };
    }
  };

  const handleImageChangeWebCoverLogoLogin = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoWebCoverLoginFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file as any);
      reader.onload = () => {
        setLogoWebCoverLogin(URL.createObjectURL(file));
      };
    }
  };

  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    setIsSelected(selectedOption);
  };

  const handleDurationChange = (e: any) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);
  };
  let theme = localStorage.getItem("Theme");

  return (
    <>
      <div className="d-flex flex-md-row flex-column gap-20 mt-5 align-items-center">
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <p
            className={`fw-bolder ms-20 text-${
              theme == "dark" ? "white" : "black"
            } fs-4 mb-5 d-flex justify-content-center align-items-center`}
          >
            {intl.formatMessage({ id: "MainTheme" })} (
            {intl.formatMessage({ id: "SignIn" })})
          </p>
          <div className="col-12  mb-4 d-flex flex-column align-items-center justify-content-center mx-auto">
            <label htmlFor="LoginLogo" className="fw-semibold fs-6 mb-2">
              {intl.formatMessage({ id: "SignInImg" })}
            </label>
            <div
              className="image-input image-input-outline bg-body-secondary w-100"
              data-kt-image-input="true"
            >
              <div
                className="image-input-wrapper  h-150px bg-body-secondary"
                style={{
                  backgroundImage: `url(${webCoverLogin})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                  width: "100%",
                  height: "150px",
                }}
              ></div>
              <label
                className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                data-bs-dismiss="click"
                title="Change avatar"
              >
                <i className="fas fa-edit">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChangeWebCoverLogin}
                />
                {webCoverLoginFile && <input type="hidden" />}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div className="d-flex flex-md-row flex-column gap-20 mt-5 align-items-center">
          <div className="col-12 col-md-6 mb-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                className="image-input image-input-outline"
                data-kt-image-input="true"
              >
                <div
                  className="image-input-wrapper w-125px h-125px"
                  style={{
                    backgroundImage: `url(${logoSystemLogin} )`,
                  }}
                ></div>
                <label
                  className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  data-bs-dismiss="click"
                  title="Change SignIn logo"
                >
                  <i className="fas fa-edit">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <input
                    type="file"
                    name="SignInLogo"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageChangeSystemLogoLogin}
                  />
                  {logoSystemLoginFile && (
                    <input type="hidden" name="avatar_remove" />
                  )}
                </label>
              </div>
              <label htmlFor="LoginLogo" className="fw-semibold fs-6 mt-2">
                {intl.formatMessage({ id: "Logo2" })} (
                {intl.formatMessage({ id: "System" })})
              </label>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                className="image-input image-input-outline"
                data-kt-image-input="true"
              >
                <div
                  className="image-input-wrapper w-125px h-125px"
                  style={{
                    backgroundImage: `url(${logoWebCoverLogin} )`,
                  }}
                ></div>
                <label
                  className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  data-bs-dismiss="click"
                  title="Change footer logo"
                >
                  <i className="fas fa-edit">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <input
                    type="file"
                    name="FooterLogo"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageChangeWebCoverLogoLogin}
                  />
                  {logoWebCoverLoginFile && (
                    <input type="hidden" name="avatar_remove" />
                  )}
                </label>
              </div>
              <label htmlFor="LoginLogo" className="fw-semibold fs-6 mt-2">
                {intl.formatMessage({ id: "Logo2" })} (
                {intl.formatMessage({
                  id: "Institution",
                })}
                )
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div className="row mt-10 pb-5">
          <div className="col-6">
            <label htmlFor="DurationSppinner" className="fw-semibold fs-6">
              {intl.formatMessage({
                id: "DurationSppinner",
              })}{" "}
              (
              {intl.formatMessage({
                id: "PerSecond",
              })}
              )
            </label>
            <div className="d-flex">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-clock fs-3 fa-fw"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                onChange={handleDurationChange}
                value={duration}
                name="DurationSppinner"
                id="DurationSppinner"
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="SignInMode" className="fw-semibold fs-6">
              {intl.formatMessage({
                id: "isSignInDynamic",
              })}
            </label>
            <div className="d-flex">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fad fa-eye fs-3"></i>
                  </span>
                </div>
                <select
                  className="form-select form-select-solid px-4 py-0 m-0"
                  id="SignInMode"
                  value={isSelected}
                  onChange={handleSelectChange}
                  defaultValue={SignInMode.Dynamic.toString()}
                >
                  <option value={SignInMode.Standard.toString()}>
                    {intl.formatMessage({ id: "Standard" })}
                  </option>
                  <option value={SignInMode.Dynamic.toString()}>
                    {intl.formatMessage({ id: "Dynamic" })}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInSettingsAccordion;

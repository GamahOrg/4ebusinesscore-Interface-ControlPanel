import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatform } from "../redux/platfromslice";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { editSignInSettings } from "../redux/edit-signin-settings";
import { SignInMode } from "../enums/enums-platform-settings";
import SignInSettingsAccordion from "./SignInSettingsAccordion";
import AnimatedSettingsAccordion from "./AnimatedSettingsAccordion";

function SignInSettings() {
  let intl = useIntl();
  const dispatch = useDispatch();

  let [aboutData, setAboutData] = useState<any>([
    {
      id: 1,
      title: "SignIn",
      expanded: true,
      img: "fas fa-sign-in-alt",
      theme: "warning",
    },
    {
      id: 2,
      title: "AnimatedDisplaySettings",
      expanded: false,
      img: "fa-solid fa-eye",
      theme: "warning",
    },
  ]);

  // Entity Logo
  const [logoWebCoverLoginFile, setLogoWebCoverLoginFile] = useState<any>();
  const [logoWebCoverLogin, setLogoWebCoverLogin] = useState<string | null>("");
  // Sys Logo
  const [logoSystemLoginFile, setLogoSystemLoginFile] = useState<any>();
  const [logoSystemLogin, setLogoSystemLogin] = useState<string | null>("");
  // Main Cover
  const [webCoverLoginFile, setWebCoverLoginFile] = useState<any>();
  const [webCoverLogin, setWebCoverLogin] = useState<string | null>("");

  const [filesArray, setFilesArray] = useState<any>([]);

  const [isSelected, setIsSelected] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const [signInImgSwiper, setSignInImgSwiper] = useState([
    {
      id: "00000000-0000-0000-0000-000000000000",
      descriptionAr: "",
      descriptionEn: "",
      image: "",
      imageFile: null,
      fileName: "",
      idx: "0",
      subSystemId: "",
      fieldId: uuidv4(),
    },
  ]);
  const [systemSelected, setSystemSelected] = useState<string>("");

  const toggleAccordion = (id: number) => {
    setAboutData((prev: any) =>
      prev.map((data: any) => {
        if (data.id === id) return { ...data, expanded: !data.expanded };
        else return data;
      })
    );
  };

  let [signInPlatformSchema, setSignInPlatformSchema] = useState<any>({});

  const {
    handleSubmit,
    setValue,
    unregister,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInPlatformSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setSignInPlatformSchema(
      Yup.object().shape(
        signInImgSwiper?.reduce((schema: any, field) => {
          // EN
          schema[`${field?.fieldId}_descriptionEn`] = Yup.string()
            .notRequired()
            .nullable()
            // 1) First: reject digits or forbidden characters => "TheInputIsIncorrect"
            .test({
              name: `${field?.fieldId}_descriptionEn_invalidChars`,
              message: "TheInputIsIncorrect",
              test: function (value: any) {
                if (!value) return true;
                // if value contains any digit or any of @ - + =  -> invalid
                return !/[@\-+=\d]/.test(value);
              },
            })
            // 2) Second: ensure only english letters + allowed punctuation/spaces => language error
            .test({
              name: `${field?.fieldId}_descriptionEn_language`,
              message: "DescriptionMustBeInEnglishLetters",
              test: function (value: any) {
                if (!value) return true;
                // allow A-Z, a-z, whitespace and common punctuation (no digits, no non-English letters)
                return /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(
                  value
                );
              },
            });

          // AR
          schema[`${field?.fieldId}_descriptionAr`] = Yup.string()
            .notRequired()
            .nullable()
            // 1) First: reject digits or forbidden characters => "TheInputIsIncorrect"
            .test({
              name: `${field?.fieldId}_descriptionAr_invalidChars`,
              message: "TheInputIsIncorrect",
              test: function (value: any) {
                if (!value) return true;
                return !/[@\-+=\d]/.test(value);
              },
            })
            // 2) Second: ensure only Arabic letters + spaces => language error
            .test({
              name: `${field?.fieldId}_descriptionAr_language`,
              message: "DescriptionMustBeInArabicLetters",
              test: function (value: any) {
                if (!value) return true;
                return /^[\u0600-\u06FF\s]*$/.test(value);
              },
            });

          return schema;
        }, {})
      )
    );
  }, [signInImgSwiper]);

  let platforms = useSelector((state: RootState) => {
    return state?.fetchPlatform?.data;
  });

  // useEffect(() => {
  //   let params = {
  //     subSystemId: systemSelected,
  //   };

  //   dispatch(fetchPlatform(systemSelected ? params : {}) as any);
  //   setSignInImgSwiper((prev: any) =>
  //     prev.map((item: any) => ({
  //       ...item,
  //       subSystemId: systemSelected,
  //     }))
  //   );
  // }, [systemSelected, dispatch]);

  const handleEditPlatform = async () => {
    const emptyImageFields = signInImgSwiper?.find(
      (img: any) =>
        (!img.image || img.image.trim() === "") && img.fileName === ""
    );

    if (emptyImageFields) {
      showSuccessAlert(false, "PleaseFillSignInData", intl);
      return;
    }
    let formData = new FormData();

    formData.append("MainSettingId", platforms?.id as any);
    webCoverLoginFile?.type
      ? formData.append("WebCoverLoginFile", webCoverLoginFile as any)
      : formData.append(
          "WebCoverLogin",
          webCoverLogin?.replace(/.*wwwroot/, "wwwroot") as any
        );
    logoWebCoverLoginFile?.type
      ? formData.append("LogoWebCoverLoginFile", logoWebCoverLoginFile as any)
      : formData.append(
          "LogoWebCoverLogin",
          logoWebCoverLogin?.replace(/.*wwwroot/, "wwwroot") as any
        );
    logoSystemLoginFile?.type
      ? formData.append("LogoSystemLoginFile", logoSystemLoginFile as any)
      : formData.append(
          "LogoSystemLogin",
          logoSystemLogin?.replace(/.*wwwroot/, "wwwroot") as any
        );

    formData.append(
      "DeurationSppinner",
      duration == null ? 0 : (duration as any)
    );

    const mode =
      isSelected === SignInMode.Dynamic.toString()
        ? SignInMode.Dynamic.toString()
        : SignInMode.Standard.toString();
    formData.append("SignInMode", mode);

    const mainSettingLoginsArray =
      signInImgSwiper?.map(({ idx, fieldId, ...rest }) => ({
        ...rest,
        subSystemId: "", // Sending empty subSystemId as per the requirement for all systems
      })) || [];
    formData.append("jsonString", JSON.stringify(mainSettingLoginsArray));

    filesArray.forEach((fileObj: any) => {
      if (fileObj && fileObj.file) {
        formData.append("files", fileObj.file);
      }
    });

    let response = await dispatch(editSignInSettings(formData) as any);

    if (
      response.payload.statusEnum == 1 ||
      response.payload.message === "MainSettingsUpdatedSuccessfully"
    ) {
      showSuccessAlert(true, "EditedSuccessfully", intl, () => {
        dispatch(fetchPlatform({}) as any);
      });
    } else {
      showSuccessAlert(false, "AnErrorOccured", intl);
    }
    // .then(() => {
    //   window.location.reload();
    // });
  };

  // useEffect(() => {
  //   dispatch(fetchPlatform() as any);
  // }, [dispatch]);

  useEffect(() => {
    if (platforms) {
      setWebCoverLogin((PlatformRootUrl + platforms?.webCoverLogin) as string);
      setLogoSystemLogin(
        (PlatformRootUrl + platforms?.logoSystemLogin) as string
      );
      setLogoWebCoverLogin(
        (PlatformRootUrl + platforms?.logoWebCoverLogin) as string
      );

      setDuration(platforms?.deurationSppinner);

      const mode = platforms?.signInMode
        ? SignInMode.Dynamic
        : SignInMode.Standard;
      setIsSelected(mode.toString());

      if (platforms?.mainSettingLogins?.length > 0) {
        // setSystemSelected(platforms?.mainSettingLogins[0]?.subSystemId);
        const copiedSignInArr = platforms?.mainSettingLogins?.map(
          (signInArr: any) => ({
            ...signInArr,
            fieldId: uuidv4(),
          })
        );

        setSignInImgSwiper(copiedSignInArr);
      } else
        setSignInImgSwiper([
          {
            id: "00000000-0000-0000-0000-000000000000",
            descriptionAr: "",
            descriptionEn: "",
            image: "",
            imageFile: null,
            fileName: "",
            subSystemId: "",
            idx: "0",
            fieldId: uuidv4(),
          },
        ]);
    }
  }, [platforms, setValue]);
  let theme = localStorage.getItem("Theme");

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleEditPlatform)}>
        <div className="row mb-3 d-flex align-items-center">
          <div className="col-12 mb-5">
            {aboutData?.map((data: any, index: number) => (
              <div
                className="accordion w-100"
                id={`accordionExample${data.id}`}
                key={data.id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={`headingThree${data.id}`}
                  >
                    <button
                      className={`accordion-button bg-light-primary`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseThree${data.id}`}
                      aria-expanded={data.expanded ? "true" : "false"}
                      aria-controls={`collapseThree${data.id}`}
                      onClick={() => {
                        toggleAccordion(data.id);
                      }}
                    >
                      <div className="fw-bolder d-flex align-items-center w-100 flex-wrap">
                        <i className={`${data.img} fs-1 text-primary me-3`}></i>
                        <div className="mx-2 flex-grow-1">
                          <p className="mb-2 d-flex justify-content-start fs-5 fs-md-3 text-black ">
                            {intl.formatMessage({ id: data.title })}
                          </p>
                        </div>
                        <div className="text-success mx-2 ms-auto">
                          <span className="accordion-arrow">
                            <i
                              className={`bi bi-chevron-${
                                data.expanded ? "up" : "down"
                              } text-black fs-1`}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapseThree${data.id}`}
                    className={`accordion-collapse collapse ${
                      data.expanded ? "show" : ""
                    }`}
                    aria-labelledby={`headingThree${data.id}`}
                    data-bs-parent={`#accordionExample${data.id}`}
                  >
                    <div className="accordion-body">
                      <div
                        className="p-2 p-md-5 fs-6 fs-md-5"
                        style={{ lineHeight: "2.5", fontWeight: "800" }}
                      >
                        {data.id === 1 ? (
                          <SignInSettingsAccordion
                            intl={intl}
                            webCoverLogin={webCoverLogin}
                            webCoverLoginFile={webCoverLoginFile}
                            logoSystemLogin={logoSystemLogin}
                            logoSystemLoginFile={logoSystemLoginFile}
                            logoWebCoverLogin={logoWebCoverLogin}
                            logoWebCoverLoginFile={logoWebCoverLoginFile}
                            isSelected={isSelected}
                            duration={duration}
                            setWebCoverLoginFile={setWebCoverLoginFile}
                            setWebCoverLogin={setWebCoverLogin}
                            setLogoSystemLoginFile={setLogoSystemLoginFile}
                            setLogoSystemLogin={setLogoSystemLogin}
                            setLogoWebCoverLoginFile={setLogoWebCoverLoginFile}
                            setLogoWebCoverLogin={setLogoWebCoverLogin}
                            setIsSelected={setIsSelected}
                            setDuration={setDuration}
                          />
                        ) : data.id === 2 ? (
                          <AnimatedSettingsAccordion
                            intl={intl}
                            signInImgSwiper={signInImgSwiper}
                            errors={errors}
                            filesArray={filesArray}
                            setValue={setValue}
                            trigger={trigger}
                            setSignInImgSwiper={setSignInImgSwiper}
                            setFilesArray={setFilesArray}
                            unregister={unregister}
                            systemSelected={systemSelected}
                            setSystemSelected={setSystemSelected}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-center align-items-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-md w-100 w-md-auto"
            >
              <i className="bi bi-pencil-square fs-2"></i>
              <span className="mx-3">{intl.formatMessage({ id: "Edit" })}</span>
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default SignInSettings;

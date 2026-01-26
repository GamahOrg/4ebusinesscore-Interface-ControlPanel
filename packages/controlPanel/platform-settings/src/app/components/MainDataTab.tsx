import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import {
  platformProps,
  platformSchema,
  platformThemeSchema,
} from "../validation/platform-validation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatform } from "../redux/platfromslice";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";
import { EditPlatformMainSettings } from "../redux/add-platformsettings-slice";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";
import moment from "moment";
import { editMainSettingsHeader } from "../redux/main-settings-header";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { InputType } from "../model/input-type";
import LogoBannerAccordion from "./LogoBannerAccordion";
import BackgroundBannerAccordion from "./BackgroundBannerAccordion";
import WebsiteDescriptonAccordion from "./WebsiteDescriptonAccordion";
import FooterSettingsAccordion from "./FooterSettingsAccordion";
import ChatbotSettingsAccordion from "./ChatbotSettingsAccordion";
import NewsEventsSettingsAccordion from "./NewsEventsSettingsAccordion";
import NavbarSettingsAccordion from "./NavbarSettingsAccordion";
import HomeTemplatesTab from "./HomeTemplates";
import { Button, Spinner } from "react-bootstrap";
import base64ToFile from "@4eplatform/shared/functions/base64ToFile";

function BasicDataTab({
  file,
  setImageFile,
  image,
  setImage,
  scrollCoverFile,
  setScrollCoverImageFile,
  scrollImage,
  setScrollCoverImage,
  webCoverFile,
  setWebCoverFile,
  tempfile,
  setTempImageFile,
  tempImage,
  setTempImage,
  valDate,
  setValDate,
  webCoverFileimage,
  setWebCoverFileImage,
  webCoverLoginFile,
  webCoverLogin,
  setWebCoverLogin,
  logoWebCoverLoginFile,
  setLogoWebCoverLoginFile,
  logoWebCoverLogin,
  setLogoWebCoverLogin,
  logoSystemLoginFile,
  setLogoSystemLogin,
  footerImageFile,
  setFooterImageFile,
  footerImage,
  setFooterImage,
  logoSystemLogin,
  setLogoSystemLoginFile,
  setWebCoverLoginFile,
  iconTitleFile,
  setIconTitleFile,
  iconTitle,
  setIconTitle,
  fileDarkMode,
  setImageFileDarkMode,
  imageDarkMode,
  setImageDarkMode,
  scrollCoverFileDarkMode,
  setScrollCoverImageFileDarkMode,
  scrollImageDarkMode,
  setScrollCoverImageDarkMode,
  webCoverFileDarkMode,
  setWebCoverFileDarkMode,
  webCoverFileimageDarkMode,
  setWebCoverFileImageDarkMode,
  tempfileDarkMode,
  setTempImageFileDarkMode,
  tempImageDarkMode,
  setTempImageDarkMode,
  footerImageFileDarkMode,
  setFooterImageFileDarkMode,
  footerImageDarkMode,
  setFooterImageDarkMode,
  inputs,
  setInputs,
  formValues,
  setFormValues,
  isSelected,
  setIsSelected,
  showDelete,
  setShowDelete,
  clickedId,
  setClickedId,
  isTemplateSelected,
  setIsTemplateSelected,
}: any) {
  let intl = useIntl();
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let [aboutData, setAboutData] = useState<any>([
    {
      id: 1,
      title: "MainMenus",
      expanded: true,
      img: "fas fa-sticky-note",
      theme: "danger",
    },
    {
      id: 2,
      title: "WebsiteDescription",
      expanded: false,
      img: "fas fa-text-width",
      theme: "warning",
    },
    {
      id: 3,
      title: "WebsiteImage",
      expanded: false,
      img: "fas fa-sticky-note",
      theme: "danger",
    },
    {
      id: 4,
      title: "MainTheme",
      expanded: false,
      img: "fas fa-image",
      theme: "warning",
    },
    {
      id: 5,
      title: "TemporaryTheme",
      expanded: false,
      img: "fas fa-eye",
      theme: "warning",
    },
    {
      id: 6,
      title: "FooterLogo",
      expanded: false,
      img: "fas fa-align-center",
      theme: "warning",
    },
    {
      id: 7,
      title: "ChatbotSettings",
      expanded: false,
      img: "fas fa-robot",
      theme: "warning",
    },
    {
      id: 8,
      title: "NewsEventsSettings",
      expanded: false,
      img: "bi bi-newspaper",
      theme: "warning",
    },
    {
      id: 9,
      title: "HomeTemplates",
      expanded: false,
      img: "fas fa-eye",
      theme: "warning",
    },
  ]);

  let platforms = useSelector((state: RootState) => {
    return state?.fetchPlatform?.data;
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(platformSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const {
    register: registerForTheme,
    handleSubmit: handleSubmitForTheme,
    trigger: triggerForTheme,
    setValue: setValueForTheme,
    watch: watchForTheme,
    formState: { errors: errorsForTheme },
  } = useForm({
    resolver: yupResolver(platformThemeSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (platforms) {
      const startDate = platforms?.startDate
        ? platforms.startDate.split("T")[0]
        : "";
      const endDate = platforms?.endDate ? platforms.endDate.split("T")[0] : "";

      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const formattedNextDay = platforms?.startDate
        ? nextDay.toISOString().split("T")[0]
        : "";

      setValueForTheme("startDate", startDate);
      triggerForTheme("startDate");
      setValueForTheme("endDate", endDate);
      triggerForTheme("endDate");
      setValDate(formattedNextDay);
      setValue("websiteUrl", platforms?.webUrl || "");
      setValue("websiteDescription", platforms?.webDescription || "");
      setValue("footerDescriptionAr", platforms?.footerDescriptionAr || "");
      setValue("footerDescriptionEn", platforms?.footerDescriptionEn || "");
      setValue("platformTitle", platforms?.webTitle || "");
      setValue("chatBotName", platforms?.chatBotName || "");
      setValue("eventsTitleAr", platforms?.titleEvents || "");
      setValue("eventsTitleEn", platforms?.titleEventsEn || "");
      setValue("newsTitleAr", platforms?.titleNews || "");
      setValue("newsTitleEn", platforms?.titleNewsEn || "");
      setIsSelected(platforms?.chatBotIsVisible ? "yes" : "no");
      setIsTemplateSelected(platforms?.themMode || "");
      if (platforms?.temporaryWebCover !== "null") {
        setTempImage(PlatformRootUrl + platforms?.temporaryWebCover);
        setTempImageFile(PlatformRootUrl + platforms?.temporaryWebCover);
      } else {
        setTempImage(null);
        setTempImageFile(null);
      }
      if (platforms?.temporaryWebCoverDarkMode !== "null") {
        setTempImageDarkMode(
          PlatformRootUrl + platforms?.temporaryWebCoverDarkMode,
        );
        setTempImageFileDarkMode(
          PlatformRootUrl + platforms?.temporaryWebCoverDarkMode,
        );
      } else {
        setTempImageDarkMode(null);
        setTempImageFileDarkMode(null);
      }

      setImage(PlatformRootUrl + platforms?.webLogo);
      setImageFile((PlatformRootUrl + platforms?.webLogo) as string);
      setWebCoverFileImage(PlatformRootUrl + platforms?.webCover);
      setWebCoverFile(PlatformRootUrl + platforms?.webCover);
      setWebCoverFileImageDarkMode(
        PlatformRootUrl + platforms?.webCoverDarkMode,
      );
      setWebCoverFileDarkMode(PlatformRootUrl + platforms?.webCoverDarkMode);
      setScrollCoverImageFile(PlatformRootUrl + platforms?.headerCover);
      setScrollCoverImage(PlatformRootUrl + platforms?.headerCover);
      setImageDarkMode(PlatformRootUrl + platforms?.webLogoDarkMode);
      setImageFileDarkMode(
        (PlatformRootUrl + platforms?.webLogoDarkMode) as string,
      );
      setScrollCoverImageFileDarkMode(
        PlatformRootUrl + platforms?.headerCoverDarkMode,
      );
      setScrollCoverImageDarkMode(
        PlatformRootUrl + platforms?.headerCoverDarkMode,
      );
      setFooterImage(PlatformRootUrl + platforms?.footerLogo);
      setFooterImageFile((PlatformRootUrl + platforms?.footerLogo) as string);
      setFooterImageDarkMode(PlatformRootUrl + platforms?.footerLogoDarkMode);
      setFooterImageFileDarkMode(
        (PlatformRootUrl + platforms?.footerLogoDarkMode) as string,
      );
      setWebCoverLogin((PlatformRootUrl + platforms?.webCoverLogin) as string);
      setWebCoverLoginFile(
        (PlatformRootUrl + platforms?.webCoverLogin) as string,
      );
      setLogoWebCoverLogin(
        (PlatformRootUrl + platforms?.logoWebCoverLogin) as string,
      );
      setLogoWebCoverLoginFile(
        (PlatformRootUrl + platforms?.logoWebCoverLogin) as string,
      );
      setLogoSystemLogin(
        (PlatformRootUrl + platforms?.logoSystemLogin) as string,
      );
      setLogoSystemLoginFile(
        (PlatformRootUrl + platforms?.logoSystemLogin) as string,
      );

      if (platforms?.iconTitle !== "null") {
        setIconTitle(PlatformRootUrl + platforms?.iconTitle);
        setIconTitleFile(
          (PlatformRootUrl + platforms?.iconTitleFile) as string,
        );
      } else {
        setIconTitle(null);
        setIconTitleFile(null);
      }
      if (platforms?.mainSettingHeaders?.length > 0) {
        const copiedHeaders = platforms.mainSettingHeaders.map(
          (header: InputType) => ({
            ...header,
          }),
        );
        setInputs(copiedHeaders);
      } else
        setInputs([
          {
            id: "00000000-0000-0000-0000-000000000000",
            nameAr: "",
            nameEn: "",
            isDropdown: false,
            isHide: true,
            url: "",
            workspaceKey: null,
            canDelete: true,
          },
        ]);
    }
  }, [platforms, setValueForTheme, triggerForTheme, setValue, trigger]);
  let formValuesForTheme = watchForTheme();

  const handleEditPlatform = async (formvalues: platformProps) => {
    if (!(await trigger())) {
      return;
    }

    const emptyInputsFields =
      Array.isArray(inputs) &&
      inputs?.find(
        (input: any) =>
          input?.nameAr === "" ||
          input?.nameEn === "" ||
          (input?.canDelete && input?.url === ""),
      );

    if (emptyInputsFields) {
      showSuccessAlert(false, "PleaseFillMainMenuData", intl);
      return;
    }
    setLoading(true);
    let formData = new FormData();
    formData.append("id", platforms?.id as any);
    // formData.append("webTitle", formvalues.websiteTitle);
    formData.append("webUrl", formvalues.websiteUrl || "");
    formData.append("webDescription", formvalues.websiteDescription);
    formData.append("WebTitle", formvalues.platformTitle);
    file?.type
      ? formData.append("webLogoFile", file as any)
      : formData.append(
          "webLogo",
          file?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    iconTitleFile?.type
      ? formData.append(
          "iconTitleFile",
          iconTitleFile == undefined ? null : (iconTitleFile as any),
        )
      : formData.append(
          "iconTitle",
          iconTitle == undefined
            ? null
            : (iconTitle?.replace(/.*wwwroot/, "wwwroot") as any),
        );

    scrollCoverFile?.type
      ? formData.append("headerCoverFile", scrollCoverFile)
      : formData.append(
          "headerCover",
          scrollCoverFile?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    fileDarkMode?.type
      ? formData.append("WebLogoDarkModeFile", fileDarkMode as any)
      : formData.append(
          "webLogoDarkMode",
          fileDarkMode?.replace(/.*wwwroot/, "wwwroot") as any,
        );
    scrollCoverFileDarkMode?.type
      ? formData.append("headerCoverDarkModeFile", scrollCoverFileDarkMode)
      : formData.append(
          "headerCoverDarkMode",
          scrollCoverFileDarkMode?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    tempfile?.type
      ? formData.append(
          "temporaryWebCoverFile",
          tempfile == undefined ? null : (tempfile as any),
        )
      : formData.append(
          "temporaryWebCover",
          tempfile == undefined
            ? null
            : (tempfile?.replace(/.*wwwroot/, "wwwroot") as any),
        );
    webCoverFile?.type
      ? formData.append("webCoverFile", webCoverFile as any)
      : formData.append(
          "webCover",
          webCoverFile?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    tempfileDarkMode?.type
      ? formData.append(
          "temporaryWebCoverDarkModeFile",
          tempfileDarkMode == undefined ? null : (tempfileDarkMode as any),
        )
      : formData.append(
          "temporaryWebCoverDarkMode",
          tempfileDarkMode == undefined
            ? null
            : (tempfileDarkMode?.replace(/.*wwwroot/, "wwwroot") as any),
        );
    webCoverFileDarkMode?.type
      ? formData.append("webCoverDarkModeFile", webCoverFileDarkMode as any)
      : formData.append(
          "webCoverDarkMode",
          webCoverFileDarkMode?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    webCoverLoginFile?.type
      ? formData.append("WebCoverLoginFile", webCoverLoginFile as any)
      : formData.append(
          "WebCoverLogin",
          webCoverLogin?.replace(/.*wwwroot/, "wwwroot") as any,
        );
    logoWebCoverLoginFile?.type
      ? formData.append("LogoWebCoverLoginFile", logoWebCoverLoginFile as any)
      : formData.append(
          "LogoWebCoverLogin",
          logoWebCoverLogin?.replace(/.*wwwroot/, "wwwroot") as any,
        );
    logoSystemLoginFile?.type
      ? formData.append("LogoSystemLoginFile", logoSystemLoginFile as any)
      : formData.append(
          "logoSystemLogin",
          logoSystemLogin?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    footerImageFile?.type
      ? formData.append("footerLogoFile", footerImageFile as any)
      : formData.append(
          "footerLogo",
          footerImageFile?.replace(/.*wwwroot/, "wwwroot") as any,
        );
    footerImageFileDarkMode?.type
      ? formData.append(
          "footerLogoDarkModeFile",
          footerImageFileDarkMode as any,
        )
      : formData.append(
          "footerLogoDarkMode",
          footerImageFileDarkMode?.replace(/.*wwwroot/, "wwwroot") as any,
        );

    const coverFile = tempImage?.includes("/wwwroot")
      ? null
      : base64ToFile(tempImage);

    if (tempImage) {
      formData.append(
        "temporaryWebCoverAttachment",
        coverFile ?? tempImage.replace(/.*wwwroot/, "wwwroot"),
      );
    }

    const darkCoverFile = tempImageDarkMode?.includes("/wwwroot")
      ? null
      : base64ToFile(tempImageDarkMode);

    if (tempImageDarkMode) {
      formData.append(
        "temporaryWebCoverAttachmentDarkMode",
        darkCoverFile ?? tempImageDarkMode.replace(/.*wwwroot/, "wwwroot"),
      );
    }

    formData.append("startDate", formValuesForTheme.startDate);
    formData.append("endDate", formValuesForTheme.endDate);
    if (formvalues.footerDescriptionAr)
      formData.append("footerDescriptionAr", formvalues.footerDescriptionAr);
    if (formvalues.footerDescriptionEn)
      formData.append("footerDescriptionEn", formvalues.footerDescriptionEn);
    if (formvalues.chatBotName)
      formData.append("chatBotName", formvalues.chatBotName);
    formData.append("chatBotIsVisible", isSelected == "yes" ? "true" : "false");
    formData.append("ThemMode", isTemplateSelected);
    if (formvalues?.eventsTitleAr) {
      formData.append("titleEvents", formvalues?.eventsTitleAr);
    }
    if (formvalues?.eventsTitleEn) {
      formData.append("titleEventsEn", formvalues?.eventsTitleEn);
    }
    if (formvalues?.newsTitleAr) {
      formData.append("titleNews", formvalues?.newsTitleAr);
    }
    if (formvalues?.newsTitleEn) {
      formData.append("titleNewsEn", formvalues?.newsTitleEn);
    }
    //MainSettingsHeader Edit
    // let formDataHeader = new FormData();
    let HeaderBody = {
      MainSettingId: platforms?.id,
      mainSettingHeaders: inputs,
    };
    let response1 = await dispatch(EditPlatformMainSettings(formData) as any);
    let response2 = await dispatch(editMainSettingsHeader(HeaderBody) as any);
    if (
      response1.payload.statusEnum == 1 &&
      response2.payload.statusEnum == 1
    ) {
      showSuccessAlert(true, "EditedSuccessfully", intl, () => {
        dispatch(fetchPlatform({}) as any)
          .then((res: any) => {
            localStorage.setItem(
              "websiteTitle",
              `${res?.payload?.result?.webTitle}`,
            );
            localStorage.setItem(
              "websiteUrl",
              `${res?.payload?.result?.webUrl}`,
            );
            localStorage.setItem(
              "websiteLogo",
              `${res?.payload?.result?.webLogo}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCover}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCoverDarkMode}`,
            );
            localStorage.setItem(
              "websiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.webCover}`,
            );
            localStorage.setItem(
              "websiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.webCoverDarkMode}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverStartDate",
              moment(res?.payload?.result?.startDate).toISOString(),
            );
            localStorage.setItem(
              "temporaryWebsiteCoverEndDate",
              moment(res?.payload?.result?.endDate).toISOString(),
            );
            localStorage.setItem("changedTemporary", "false");
            localStorage.setItem(
              "chatBotIsVisible",
              res?.payload?.result?.chatBotIsVisible,
            );
            localStorage.setItem(
              "themModeTemplate",
              res?.payload?.result?.themMode,
            );
            return res;
          })
          .then(() => {
            window.location.reload();
          });
      });
    } else if (response2.payload.message == "Not Hide Solution And Services") {
      showSuccessAlert(false, "AnErrorOccured", intl, () => {
        dispatch(fetchPlatform({}) as any)
          .then((res: any) => {
            localStorage.setItem(
              "websiteTitle",
              `${res?.payload?.result?.webTitle}`,
            );
            localStorage.setItem(
              "websiteUrl",
              `${res?.payload?.result?.webUrl}`,
            );
            localStorage.setItem(
              "websiteLogo",
              `${res?.payload?.result?.webLogo}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCover}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCoverDarkMode}`,
            );
            localStorage.setItem(
              "websiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.webCover}`,
            );
            localStorage.setItem(
              "websiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.webCoverDarkMode}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverStartDate",
              moment(res?.payload?.result?.startDate).toISOString(),
            );
            localStorage.setItem(
              "temporaryWebsiteCoverEndDate",
              moment(res?.payload?.result?.endDate).toISOString(),
            );
            localStorage.setItem("changedTemporary", "false");
            localStorage.setItem(
              "chatBotIsVisible",
              res?.payload?.result?.chatBotIsVisible,
            );
            localStorage.setItem(
              "themModeTemplate",
              res?.payload?.result?.themMode,
            );
            return res;
          })
          .then(() => {
            window.location.reload();
          });
      });
    } else if (response2.payload.message == " Is Exits Name") {
      showSuccessAlert(false, "IsExistsName", intl, () => {
        dispatch(fetchPlatform({}) as any)
          .then((res: any) => {
            localStorage.setItem(
              "websiteTitle",
              `${res?.payload?.result?.webTitle}`,
            );
            localStorage.setItem(
              "websiteUrl",
              `${res?.payload?.result?.webUrl}`,
            );
            localStorage.setItem(
              "websiteLogo",
              `${res?.payload?.result?.webLogo}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCover}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCoverDarkMode}`,
            );
            localStorage.setItem(
              "websiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.webCover}`,
            );
            localStorage.setItem(
              "websiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.webCoverDarkMode}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverStartDate",
              moment(res?.payload?.result?.startDate).toISOString(),
            );
            localStorage.setItem(
              "temporaryWebsiteCoverEndDate",
              moment(res?.payload?.result?.endDate).toISOString(),
            );
            localStorage.setItem("changedTemporary", "false");
            localStorage.setItem(
              "chatBotIsVisible",
              res?.payload?.result?.chatBotIsVisible,
            );
            localStorage.setItem(
              "themModeTemplate",
              res?.payload?.result?.themMode,
            );
            return res;
          })
          .then(() => {
            window.location.reload();
          });
      });
    } else
      showSuccessAlert(false, "AnErrorOccured", intl, () => {
        dispatch(fetchPlatform({}) as any)
          .then((res: any) => {
            localStorage.setItem(
              "websiteTitle",
              `${res?.payload?.result?.webTitle}`,
            );
            localStorage.setItem(
              "websiteUrl",
              `${res?.payload?.result?.webUrl}`,
            );
            localStorage.setItem(
              "websiteLogo",
              `${res?.payload?.result?.webLogo}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCover}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.temporaryWebCoverDarkMode}`,
            );
            localStorage.setItem(
              "websiteCover",
              `${PlatformRootUrl}${res?.payload?.result?.webCover}`,
            );
            localStorage.setItem(
              "websiteCoverDarkMode",
              `${PlatformRootUrl}${res?.payload?.result?.webCoverDarkMode}`,
            );
            localStorage.setItem(
              "temporaryWebsiteCoverStartDate",
              moment(res?.payload?.result?.startDate).toISOString(),
            );
            localStorage.setItem(
              "temporaryWebsiteCoverEndDate",
              moment(res?.payload?.result?.endDate).toISOString(),
            );
            localStorage.setItem("changedTemporary", "false");
            localStorage.setItem(
              "chatBotIsVisible",
              res?.payload?.result?.chatBotIsVisible,
            );
            localStorage.setItem(
              "themModeTemplate",
              res?.payload?.result?.themMode,
            );
            return res;
          })
          .then(() => {
            window.location.reload();
          });
      });
    setLoading(false);
  };

  const toggleAccordion = (id: number) => {
    setAboutData((prev: any) =>
      prev.map((data: any) => {
        if (data.id === id) return { ...data, expanded: !data.expanded };
        else return data;
      }),
    );
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInputs: any = [...inputs];

    const { name, value, type, checked, id } = event.target;

    if (index == 1 || index == 2) {
      if (index == 1 && checked === true && newInputs?.[2]?.isHide == true) {
        newInputs[2]["isHide"] = false;
      }
      if (index == 2 && checked === true && newInputs?.[1]?.isHide == true) {
        newInputs[1]["isHide"] = false;
      }
    }

    if (type === "radio") {
      newInputs[index]["isDropdown"] = false;
      if (id === `Hide-${index}`) {
        newInputs[index]["isHide"] = true;
      } else if (id === `Show-${index}`) {
        newInputs[index]["isHide"] = false;
      }
    } else {
      newInputs[index][name] = value;
    }

    setInputs(newInputs);
  };

  const handleAdd = () => {
    setFormValues([...formValues, ...inputs]);

    const isValid = inputs.every((input: any) => {
      const isUrlRequired = input.id === "00000000-0000-0000-0000-000000000000";
      const isUrlValid = isUrlRequired ? input.url.trim() !== "" : true;

      return (
        input.nameAr.trim() !== "" && input.nameEn.trim() !== "" && isUrlValid
      );
    });

    if (!isValid) {
      showSuccessAlert(false, "PleaseFillOutAllTheFieldsBeforeAdding", intl);
      return;
    }

    setInputs([
      ...inputs,
      {
        id: "00000000-0000-0000-0000-000000000000",
        nameAr: "",
        nameEn: "",
        isDropdown: false,
        isHide: true,
        url: "",
        workspaceKey: null,
        canDelete: true,
      },
    ]);
  };
  let theme = localStorage.getItem("Theme");

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleEditPlatform)}>
        <div className="row mb-3 d-flex align-items-center">
          <div className="col-12 mb-5">
            {aboutData?.map((data: any, index: number) => (
              <div
                className="accordion"
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
                      <div className="fw-bolder d-flex align-items-center">
                        <i className={`${data.img} fs-1 text-primary`}></i>
                        <div className="mx-5">
                          <p
                            className={`mb-2 d-flex justify-content-start fs-3 text-${
                              theme == "dark" ? "white" : "black"
                            } `}
                          >
                            {intl.formatMessage({ id: data.title })}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1 text-success mx-2">
                        <span className="accordion-arrow">
                          <i
                            className={`bi bi-chevron-${
                              data.expanded ? "up" : "down"
                            } text-${theme == "dark" ? "white" : "black"} fs-1`}
                          ></i>
                        </span>
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
                        className="p-5 fs-5"
                        style={{ lineHeight: "2.5", fontWeight: "800" }}
                      >
                        {data.id === 1 ? (
                          <NavbarSettingsAccordion
                            intl={intl}
                            inputs={inputs}
                            showDelete={showDelete}
                            setShowDelete={setShowDelete}
                            clickedId={clickedId}
                            setClickedId={setClickedId}
                            handleInputChange={handleInputChange}
                            handleAdd={handleAdd}
                          />
                        ) : data.id === 2 ? (
                          <WebsiteDescriptonAccordion
                            intl={intl}
                            register={register}
                            errors={errors}
                            iconTitle={iconTitle}
                            file={file}
                            setIconTitle={setIconTitle}
                            setIconTitleFile={setIconTitleFile}
                          />
                        ) : data.id === 3 ? (
                          <LogoBannerAccordion
                            image={image}
                            file={file}
                            scrollImage={scrollImage}
                            setImage={setImage}
                            setImageFile={setImageFile}
                            setScrollCoverImageFile={setScrollCoverImageFile}
                            setScrollCoverImage={setScrollCoverImage}
                            setImageDarkMode={setImageDarkMode}
                            setImageFileDarkMode={setImageFileDarkMode}
                            imageDarkMode={imageDarkMode}
                            scrollImageDarkMode={scrollImageDarkMode}
                            fileDarkMode={fileDarkMode}
                            setScrollCoverImageFileDarkMode={
                              setScrollCoverImageFileDarkMode
                            }
                            setScrollCoverImageDarkMode={
                              setScrollCoverImageDarkMode
                            }
                            intl={intl}
                          />
                        ) : data.id === 4 || data.id === 5 ? (
                          <BackgroundBannerAccordion
                            id={data?.id}
                            intl={intl}
                            setWebCoverFile={setWebCoverFile}
                            setWebCoverFileImage={setWebCoverFileImage}
                            webCoverFile={webCoverFile}
                            webCoverFileimage={webCoverFileimage}
                            setWebCoverFileDarkMode={setWebCoverFileDarkMode}
                            setWebCoverFileImageDarkMode={
                              setWebCoverFileImageDarkMode
                            }
                            webCoverFileDarkMode={webCoverFileDarkMode}
                            webCoverFileimageDarkMode={
                              webCoverFileimageDarkMode
                            }
                            setTempImage={setTempImage}
                            setTempImageFile={setTempImageFile}
                            tempImage={tempImage}
                            tempImageDarkMode={tempImageDarkMode}
                            setTempImageDarkMode={setTempImageDarkMode}
                            setTempImageFileDarkMode={setTempImageFileDarkMode}
                            registerForTheme={registerForTheme}
                            valDate={valDate}
                            setValDate={setValDate}
                          />
                        ) : data.id === 6 ? (
                          <FooterSettingsAccordion
                            intl={intl}
                            register={register}
                            errors={errors}
                            footerImage={footerImage}
                            footerImageFile={footerImageFile}
                            footerImageDarkMode={footerImageDarkMode}
                            footerImageFileDarkMode={footerImageFileDarkMode}
                            setFooterImageFile={setFooterImageFile}
                            setFooterImage={setFooterImage}
                            setFooterImageDarkMode={setFooterImageDarkMode}
                            setFooterImageFileDarkMode={
                              setFooterImageFileDarkMode
                            }
                          />
                        ) : data.id === 7 ? (
                          <ChatbotSettingsAccordion
                            intl={intl}
                            register={register}
                            isSelected={isSelected}
                            setIsSelected={setIsSelected}
                          />
                        ) : data.id === 8 ? (
                          <NewsEventsSettingsAccordion
                            intl={intl}
                            register={register}
                            errors={errors}
                          />
                        ) : data.id === 9 ? (
                          <HomeTemplatesTab
                            intl={intl}
                            isTemplateSelected={isTemplateSelected}
                            setIsTemplateSelected={setIsTemplateSelected}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center my-5">
          {loading ? (
            <Button variant="success" disabled className="px-15 w-30">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-2"
              />
              <span>{intl.formatMessage({ id: "Editing" })}</span>
            </Button>
          ) : (
            <button type="submit" className="btn btn-primary btn-md">
              <i className="bi bi-pencil-square fs-2"></i>
              <span className="mx-3">
                {" "}
                {intl.formatMessage({
                  id: "Edit",
                })}
              </span>
            </button>
          )}
        </div>
      </form>
    </Fragment>
  );
}

export default BasicDataTab;

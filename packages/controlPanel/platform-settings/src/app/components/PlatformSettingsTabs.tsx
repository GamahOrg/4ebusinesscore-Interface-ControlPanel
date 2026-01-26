import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap/";
import { useIntl } from "react-intl";
import MainDataTab from "./MainDataTab";
import { InputType } from "../model/input-type";
import { fetchPlatform } from "../redux/platfromslice";
import { useDispatch } from "react-redux";
import SignInSettings from "./SignInSettings";

function PlatformSettingsTabs() {
  let intl = useIntl();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlatform({}) as any);
  }, [dispatch]);
  const [activeTab, setActiveTab] = useState<any>("");
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [clickedId, setClickedId] = useState<string>("");
  //   main settings tab states
  // Light Mode
  const [file, setImageFile] = useState<any>();
  const [image, setImage] = useState<string | null>("");
  const [scrollCoverFile, setScrollCoverImageFile] = useState<any>();
  const [scrollImage, setScrollCoverImage] = useState<string | null>("");

  const [webCoverFile, setWebCoverFile] = useState<any>();
  const [webCoverFileimage, setWebCoverFileImage] = useState<string | null>("");

  const [tempfile, setTempImageFile] = useState<any>();
  const [tempImage, setTempImage] = useState<string | null>("");

  const [valDate, setValDate] = useState("");

  const [webCoverLoginFile, setWebCoverLoginFile] = useState<any>();
  const [webCoverLogin, setWebCoverLogin] = useState<string | null>("");

  const [logoWebCoverLoginFile, setLogoWebCoverLoginFile] = useState<any>();
  const [logoWebCoverLogin, setLogoWebCoverLogin] = useState<string | null>("");

  const [logoSystemLoginFile, setLogoSystemLoginFile] = useState<any>();
  const [logoSystemLogin, setLogoSystemLogin] = useState<string | null>("");

  const [footerImageFile, setFooterImageFile] = useState<any>();
  const [footerImage, setFooterImage] = useState<string | null>("");

  const [iconTitleFile, setIconTitleFile] = useState<any>();
  const [iconTitle, setIconTitle] = useState<string | null>("");
  //   End light mode
  // Dark Mode
  const [fileDarkMode, setImageFileDarkMode] = useState<any>();
  const [imageDarkMode, setImageDarkMode] = useState<string | null>("");
  const [scrollCoverFileDarkMode, setScrollCoverImageFileDarkMode] =
    useState<any>();
  const [scrollImageDarkMode, setScrollCoverImageDarkMode] = useState<
    string | null
  >("");

  const [webCoverFileDarkMode, setWebCoverFileDarkMode] = useState<any>();
  const [webCoverFileimageDarkMode, setWebCoverFileImageDarkMode] = useState<
    string | null
  >("");

  const [tempfileDarkMode, setTempImageFileDarkMode] = useState<any>();
  const [tempImageDarkMode, setTempImageDarkMode] = useState<string | null>("");

  const [footerImageFileDarkMode, setFooterImageFileDarkMode] = useState<any>();
  const [footerImageDarkMode, setFooterImageDarkMode] = useState<string | null>(
    ""
  );
  const [inputs, setInputs] = useState<InputType[]>([
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
  const [formValues, setFormValues] = useState<InputType[]>([]);

  const [isSelected, setIsSelected] = useState<string>("");
  const [isTemplateSelected, setIsTemplateSelected] = useState<string>("");

  //   login settings tab states
  return (
    <div>
      <div className="row gx-5 gx-xl-8 mb-5 mb-xl-8 mt-5 mt-xl-0">
        <div className="col-xl-12">
          <div className="card card-xxl-stretch-50">
            <div className="card-body pt-5">
              {" "}
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={"mainSettings"}
                onSelect={(key) => setActiveTab(key)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <Nav variant="underline" className="standard">
                    <Nav.Item>
                      <Nav.Link
                        eventKey={"mainSettings"}
                        className="fw-bolder fs-5"
                      >
                        {intl.formatMessage({ id: "MainSettings" })}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey={"loginSettings"}
                        className="fw-bolder fs-5"
                      >
                        {intl.formatMessage({ id: "LoginSettings" })}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>

                <Tab.Content className="mt-4">
                  <Tab.Pane eventKey={"mainSettings"}>
                    <MainDataTab
                      {...{
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
                      }}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey={"loginSettings"}>
                    <SignInSettings />
                    <></>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformSettingsTabs;

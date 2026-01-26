import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { UserSummary } from "./UserSummary";
import { UserProtection } from "./UserProtection";
import { UserRolesTab } from "./UserRolesTab";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/users-slice/userSlice";
import { RootState } from "../../features/store";
import moment from "moment";
import { fetchRoles } from "../../features/role/rolesSlice";
import { ChangeUserPicturePopup } from "./popups/ChangeUserPicturePopup";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import UserDelegationsTab from "./UserDelegationsTab";

type ButtonTypes = {
  id: number;
  name: string;
};

export const AdminPanelUserDetails: FC = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(id as string) as any);
  }, [id]);
  let user = useSelector((state: RootState) => {
    return state?.user?.data;
  });
  let [showImgPopup, setShowImgPopup] = useState(false);

  const intl = useIntl();
  let language = intl.locale;

  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    setUserInfo({
      name: user?.userName,

      role: language == "ar" ? user?.jobNameAr : user?.jobNameEn,
      avatar: user?.imageUrl ? `${UserManagmentRootUrl}${user?.imageUrl}` : "",
      details: [
        {
          title: intl.formatMessage({ id: "AccountID" }),
          value: user?.nationalId,
        },
        {
          title: intl.formatMessage({ id: "Email" }),
          value: user?.email,
        },
        {
          title: intl.formatMessage({ id: "Address" }),
          value: user?.address,
        },
        {
          title: intl.formatMessage({ id: "Language" }),
          value: intl.locale == "ar" ? "العربيه" : "English",
        },
        {
          title: intl.formatMessage({ id: "LastSignIn" }),
          value: user?.lastLoginTime
            ? moment(user?.lastLoginTime).format("YYYY-MM-DD HH:mm:ss")
            : intl.formatMessage({ id: "NotExist" }),
        },
      ],
    });
  }, [user]);
  const buttons: ButtonTypes[] = [
    {
      id: 1,
      name: intl.formatMessage({
        id: "Summary",
      }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Protection" }),
    },
    {
      id: 4,
      name: intl.formatMessage({
        id: "Roles",
      }),
    },
    {
      id: 5,
      name: intl.formatMessage({
        id: "Delegation",
      }),
    },
  ];

  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return <UserSummary />;
      case 2:
        return <UserProtection />;
      case 4:
        return <UserRolesTab />;
      case 5:
        return <UserDelegationsTab />;
    }
  };
  useEffect(() => {
    dispatch(fetchRoles({ pageSize: 1000, pageNumber: 1 }) as any);
  }, []);

  let location = useLocation();

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/admin-panel-users-workspace/admin-panel-users/users",
      defaultName: "Users",
      name: cardName || serviceName,
    },
    { path: "", defaultName: "UserDetails", name: "" },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="UserDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="d-flex flex-column flex-lg-row gap-5">
            <div className="flex-column flex-lg-row-auto w-lg-350px w-100 mb-10 mb-lg-0">
              <div className="card card-xl-stretch mb-xl-3">
                <div className="card-body scroll-y mh-600px">
                  <div
                    onClick={() => {
                      setShowImgPopup(true);
                    }}
                  >
                    <i
                      style={{ textAlign: language == "ar" ? "left" : "right" }}
                      className="bi bi-pencil-square d-block fs-2x"
                      role="button"
                    ></i>

                    <div className="d-flex flex-column align-items-center mt-5">
                      <img
                        alt="user avatar"
                        className="w-100px h-100px symbol position-relative symbol-circle"
                        src={
                          userInfo?.avatar ||
                          toAbsoluteUrl("/media/avatars/300-3.jpg")
                        }
                        onError={(e: any) =>
                          (e.target.src = `${toAbsoluteUrl(
                            "/media/avatars/300-3.jpg"
                          )}`)
                        }
                      />
                      <span className="fw-bolder">{userInfo?.name}</span>
                      <span className="text-primary text-center">
                        {userInfo?.role}
                      </span>
                    </div>
                    <div
                      style={{ textAlign: language == "ar" ? "right" : "left" }}
                    >
                      {userInfo?.details?.map((item: any, index: number) => (
                        <div key={index} className="my-4">
                          <p className="fw-bolder mb-1">{item?.title}</p>
                          <span className="text-muted">
                            {item?.value ?? "--"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mb-xl-0 pb-4 w-100 w-lg-850px ms-lg-7 ms-0 position-relative">
            </div> */}
            <div className="flex-grow-1 card card-xl-stretch mb-xl-0 pb-4">
              <div className="mb-5 p-4 mx-lg-4 mx-md-4 mx-sm-4 mx-0 ">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6  fw-bolder  border border-bottom border-white border-2 ${
                      activeButton.id === button.id ? "text-dark active" : ""
                    } px-5`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.name}
                  </button>
                ))}
              </div>
              {ActivatedUserDetailsTab()}
            </div>
          </div>
        </div>
      </div>
      {showImgPopup && (
        <>
          <div className="modal fade" aria-hidden="true">
            <ChangeUserPicturePopup
              showChangeUserPicturePopup={showImgPopup}
              handleCloseChangeUserPicturePopup={() => {
                setShowImgPopup(false);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

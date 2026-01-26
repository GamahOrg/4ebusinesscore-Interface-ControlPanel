/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { useLang } from "../../i18n/Metronici18n";
import { fetchPlatform } from "../../features/platform-settings/platformSettings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmSignup from "./components/ConfirmSignup";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  const lang = useLang();

  useEffect(() => {
    if (lang === "ar") {
      require("../../assets/sass/core/layout/ar/_base_ar.scss");
      require("../../assets/sass/core/layout/Theme/_theme_style.scss");
    } else if (lang === "en") {
      require("../../assets/sass/core/layout/Theme/_theme_style.scss");
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPlatform({
        subSystemId: "7e6d5c43-95ac-48d2-a19c-ee5ed39597b9",
      }) as any
    );
  }, [dispatch]);

  let platforms = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });

  return (
    <div className="auth-bg bgi-size-cover h-100 bgi-attachment-fixed bgi-position-center">
      {/* begin::Content */}
      <div
        className={`flex-column flex-column-fluid ${
          (platforms?.signInMode === 0 ||
            platforms?.signInMode == null ||
            platforms?.signInMode == undefined) &&
          "w-100 h-100 "
        } login-page`}
      >
        {/* begin::Wrapper */}
        <div
          className={`rounded ${
            (platforms?.signInMode === 0 ||
              platforms?.signInMode == null ||
              platforms?.signInMode == undefined) &&
            "w-100 h-100 "
          } `}
        >
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
    </div>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      {/* <Route path="registration" element={<Registration />} /> */}
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="ConfirmSignup" element={<ConfirmSignup />} />
      <Route index element={<Login />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>
  </Routes>
);

export default AuthPage;

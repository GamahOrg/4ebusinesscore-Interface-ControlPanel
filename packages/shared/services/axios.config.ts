import { getToken, getWorkspaceKey } from "@4eplatform/shared/index";
import axios from "axios";
import Swal from "sweetalert2";
import { SystemLang } from "@4eplatform/shared/assets/Lang";
import autoLogout from "./../services/LogoutTimer";

// Persistent flag to prevent recursive session handling
const SESSION_EXPIRED_KEY = "session_handling_in_progress";
const App_Key = "SECRET-FRONT-15251-KEY-HEADER";

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Accept-Language": SystemLang() === "en" ? "en-us" : "ar",
      "X-APP-KEY": App_Key,
    },
    // ✅ Custom serializer (no qs) — repeated keys for arrays
    paramsSerializer: (params: Record<string, any>) => {
      const searchParams = new URLSearchParams();
      Object.keys(params || {}).forEach((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          value
            .filter((v) => v !== undefined && v !== null)
            .forEach((v) => searchParams.append(key, String(v)));
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  });

  // ── Request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (!config.headers) config.headers = {};
      // ensure header value is a string
      (config.headers as any)["workspaceKey"] = String(getWorkspaceKey() ?? 0);
      autoLogout(28800); // 8 hours
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ── Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error?.response?.status;
      const isLangArabic = SystemLang() === "ar";

      if (statusCode === 401) {
        const isHandling = localStorage.getItem(SESSION_EXPIRED_KEY);

        if (!isHandling) {
          localStorage.setItem(SESSION_EXPIRED_KEY, "true");

          Swal.fire({
            title: isLangArabic ? "لقد انتهت صلاحيه الدخول" : "Session Expired",
            text: isLangArabic ? "من فضلك أعد تسجبل الدخول" : "Please Relogin",
            icon: "warning",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });

          localStorage.setItem("user", "");
          localStorage.removeItem("userId");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("token");
          localStorage.removeItem("changedTemporary");

          setTimeout(() => {
            const isDev = (window as any)._env_?.NODE_ENV !== "production";
            const loginUrl = isDev
              ? "/controlpanel/auth/login"
              : (window as any)._env_?.REACT_APP_Base_Url ?? "/";

            if (!window.location.href.includes("auth/login")) {
              window.location.href = loginUrl;
            }
          }, 2000);
        }

        // Resolve with a safe response to stop rejection chains
        return Promise.resolve({
          data: null,
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: error.config,
        });
      }

      if (statusCode === 403 && !localStorage.getItem(SESSION_EXPIRED_KEY)) {
        Swal.fire({
          title: isLangArabic
            ? "ليس لديك صلاحيه وصول للصفحه الحاليه"
            : "You Have No Permission For Current Page",
          icon: "warning",
          showConfirmButton: false,
        });
      }

      if (statusCode === 413 && !localStorage.getItem(SESSION_EXPIRED_KEY)) {
        Swal.fire({
          title: isLangArabic
            ? "حجم البيانات المرسله كبير جدا"
            : "Data Size Is Too Large",
          icon: "error",
          showConfirmButton: false,
        });
      }

      return Promise.resolve(error.response);
    }
  );

  return instance;
};

export default createAxiosInstance;

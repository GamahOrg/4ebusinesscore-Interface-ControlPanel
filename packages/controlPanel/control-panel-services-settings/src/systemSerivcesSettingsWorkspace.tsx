import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchSystemSettingsParts } from "./slices/systemSettingsPartsSlice";
import { RootState } from "./store/workspaceStore";
import { getCurrentSystemLanguage } from "./functions/language";

export const SystemSerivcesSettingsWorkspace: FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();
  let language = intl.locale;
  let id = location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  let parts = useSelector((state: RootState) => {
    return state?.systemSettingsParts.data;
  });

  useEffect(() => {
    dispatch(fetchSystemSettingsParts(id) as any);
  }, [id]);

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "Cards",
      name: cardName || serviceName,
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="Cards"
        extraTitle={cardName || serviceName}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />

      <div
        className="flex-lg-row-fluid"
        data-select2-id="select2-data-129-tmo1"
      >
        <div className="tab-content">
          <div
            id="kt_project_users_table_pane"
            className="tab-pane fade active show"
          >
            <div className="card card-flush">
              <div className="card-body pt-0">
                <div className="table-responsive">
                  <table
                    id="kt_project_users_table"
                    className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder dark-table-head"
                  >
                    <thead className="fs-7 text-gray-400 text-uppercase">
                      <tr>
                        <th
                          className="min-w-150px"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                          }}
                        >
                          {intl.formatMessage({
                            id: "Servicename",
                          })}
                        </th>
                        <th
                          className="min-w-90px"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                          }}
                        >
                          {intl.formatMessage({
                            id: "LastUpdate",
                          })}
                        </th>
                        <th
                          className="min-w-90px"
                          style={{
                            textAlign: language == "ar" ? "right" : "left",
                          }}
                        >
                          {intl.formatMessage({ id: "LastLogin" })}
                        </th>
                        <th className="min-w-50px text-end px-8">
                          {intl.formatMessage({ id: "Details" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="fs-6 LargeIconSize">
                      {parts?.map((part: any, index: any) => (
                        <>
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className={` ${language == "ar" ? "ms-5" : "me-5"
                                    } position-relative`}
                                >
                                  <div className="symbol symbol-50px">
                                    <span
                                      className={
                                        "symbol-label " +
                                        (part?.color?.toString() == "0"
                                          ? "bg-light-danger"
                                          : part?.color?.toString() == "1"
                                            ? "bg-light-success"
                                            : part?.color?.toString() === "2"
                                              ? "bg-light-warning"
                                              : "bg-light-info")
                                      }
                                    >
                                      <span
                                        className={
                                          "svg-icon svg-icon-3x " +
                                          (part?.color?.toString() === "0"
                                            ? "svg-icon-danger"
                                            : part?.color?.toString() === "1"
                                              ? "svg-icon-success"
                                              : part?.color?.toString() === "2"
                                                ? "svg-icon-warning"
                                                : part?.color?.toString() ===
                                                "svg-icon-info")
                                        }
                                        dangerouslySetInnerHTML={{
                                          __html: part.icon as string,
                                        }}
                                      ></span>
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <Link
                                    to={part.url}
                                    state={{
                                      cardId: id,
                                      cardTitle: cardName || serviceName,
                                      partTitle:
                                        getCurrentSystemLanguage() == "ar"
                                          ? part.noteNameAr || ""
                                          : part?.noteNameEn || "",
                                    }}
                                    className="mb-1 text-gray-800 text-hover-info"
                                    style={{
                                      textAlign:
                                        language == "ar" ? "right" : "left",
                                    }}
                                  >
                                    {getCurrentSystemLanguage() == "ar"
                                      ? part.noteNameAr || ""
                                      : part?.noteNameEn || ""}
                                  </Link>
                                  <div className="fw-bold fs-6 text-gray-400">
                                    {part?.description || ""}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td
                              style={{
                                textAlign: language == "ar" ? "right" : "left",
                              }}
                            >
                              {part?.lastUpdate ? moment(part?.lastUpdate).format("YYYY-MM-DD ") : "-"}
                            </td>
                            <td
                              style={{
                                textAlign: language == "ar" ? "right" : "left",
                              }}
                            >
                              {part?.visitDate ? moment(part?.visitDate).format("YYYY-MM-DD") : ""}
                            </td>
                            <td className="text-end">
                              <Link
                                to={part.url}
                                state={{
                                  cardId: id,
                                  cardTitle: cardName || serviceName,
                                  partTitle:
                                    getCurrentSystemLanguage() == "ar"
                                      ? part.noteNameAr || ""
                                      : part?.noteNameEn || "",
                                }}
                                className="btn btn-light btn-sm me-2"
                              >
                                {intl.formatMessage({ id: "Show" })}
                              </Link>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { UserManagementTable } from "./UserManagementTable";
import { fetchParts } from "../features/users-slice/userManagementPartsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";

export const AdminPanelUsersWorkspace: FC = (props) => {
  const intl = useIntl();
  let language = intl.locale;

  const dispatch = useDispatch();
  let parts = useSelector((state: RootState) => {
    return state?.parts.data;
  });

  const location = useLocation();
  if (location?.state) {
    var { cardId } = location?.state;
  }

  useEffect(() => {
    dispatch(fetchParts(cardId) as any);
  }, [cardId]);

  // useEffect(() => {
  //    if (parts?.length) {
  //    //    const valuesArray = Object.values(parts);
  //    //   const updatedCardsList = getCardsList.map((card,index) => ({
  //    //     ...card,
  //    //     count: valuesArray[index]|| 0 ,
  //    //   }));

  //      setCardsList(parts);
  //    }
  //  }, [parts]);
  const breadcrumbItems = [
    { path: "", defaultName: "UsersManagement", name: "" },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="UsersManagement"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
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
                          className="min-w-250px"
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
                            id: "Management",
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
                        <th className="min-w-50px text-end">
                          {intl.formatMessage({ id: "Details" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="fs-6 LargeIconSize">
                      {parts?.map((table, index) => (
                        <UserManagementTable
                          key={index}
                          name={
                            getCurrentSystemLanguage() == "ar"
                              ? table?.parentNoteNameAr
                              : table?.parentNoteNameEn
                          }
                          dept={
                            getCurrentSystemLanguage() == "ar"
                              ? table.orgNameAr
                              : table.orgNameEn
                          }
                          title={
                            getCurrentSystemLanguage() == "ar"
                              ? table.noteNameAr
                              : table?.noteNameEn
                          }
                          icon={table.icon as any}
                          // count={table.count}
                          lastUpdate={table.lastUpdate}
                          lastLogin={table.visitDate}
                          link={table.url}
                          color={table?.color?.toString()}
                          // background={table.background}
                          isShow={table.isActive}
                          hasMoreActions={false}
                          index={index}
                        />
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

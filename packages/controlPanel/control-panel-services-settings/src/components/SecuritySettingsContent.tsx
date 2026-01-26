import { ChangeEvent, FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { RootState, useAppSelector } from "../store/workspaceStore";
import { useDispatch } from "react-redux";
import { getAllSSOSecuritySetting } from "../slices/ssoSecuritySettingSlice";
import { AddSecuritySetting } from "../partials/AddSecuritySetting";
import { SecuritySettingsActions } from "./SecuritySettingsActions";

type SecurityProps = {
  setModalShow: any;
  modalShow: boolean;
};

export const SecuritySettingsContent: FC<SecurityProps> = ({
  setModalShow,
  modalShow,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  let securitySettings = useAppSelector((state: RootState) => {
    return state?.ssoSecuritySetting?.items;
  });

  useEffect(() => {
    const params = {};
    dispatch(getAllSSOSecuritySetting(params) as any);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSettings =
    Array.isArray(securitySettings) &&
    securitySettings?.filter(
      (item: any) =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.body?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="d-flex flex-column-fluid align-items-start mt-4">
      <div className="content flex-row-fluid">
        <div className="row g-5 g-xl-8">
          <div className="col-xl-12">
            <div className="card card-xl-stretch mb-xl-8 card-body">
              <div className="card-header border-0 pt-3 pb-2 mb-2">
                <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-start align-items-md-center w-100">
                  <div className="w-lg-50 w-md-50 w-sm-50 w-100 mb-3 mb-md-0">
                    <div className="w-100 position-relative">
                      <input
                        type="text"
                        name="search"
                        className="form-control form-control-solid ps-12 pr-12"
                        placeholder={intl.formatMessage({ id: "Search" })}
                        value={searchTerm}
                        onChange={handleChange}
                      />
                      <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-5 taskLogs">
                <div className="table-responsive">
                  <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head">
                    <thead>
                      <tr className="fw-bolder text-muted">
                        <th className="w-25 text-center">
                          {intl.formatMessage({ id: "SystemName" })}
                        </th>
                        <th className="min-w-100px text-center">
                          {intl.formatMessage({ id: "Content" })}
                        </th>
                        <th className="min-w-100px text-center">
                          {intl.formatMessage({ id: "Type" })}
                        </th>
                        <th className="min-w-100px text-center">
                          {intl.formatMessage({ id: "Link" })}
                        </th>
                        <th className="min-w-100px text-center">
                          {intl.formatMessage({ id: "TheProcedures" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filteredSettings) &&
                        filteredSettings?.map((item: any) => (
                          <tr key={item.id}>
                            <td className="DefaultIconSize">
                              <div className="d-flex justify-content-center mx-10">
                                <div className="d-flex flex-column mx-3 justify-content-center align-items-center">
                                  <span>{item?.name}</span>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">{item?.body}</td>
                            <td className="text-center">{item?.type}</td>
                            <td className="text-center">{item?.url}</td>
                            <td className="text-center">
                              <SecuritySettingsActions
                                id={item.id}
                                item={item}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_viewallcards_hierarchy">
        <AddSecuritySetting
          showAdd={modalShow}
          handleCloseAdd={() => {
            setModalShow(false);
          }}
        />
      </div>
    </div>
  );
};

import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { OrgHierarchyModel } from "../models/org-model";
import { useDispatch, useSelector } from "react-redux";
import { postOrgManagerAsync } from "../features/orghierarchies-slice/post-org-managerSlice";
import { RootState } from "../features/store";
import { ResponseStatus } from "../models/response-status";
import { fetchOrgManager } from "../features/orghierarchies-slice/org-manager-slice";
import { fetchOrgMembers } from "../features/orghierarchies-slice/org-membersSlice";
import { MemberModel } from "../models/member-model";
import { ManagerModel } from "../models/manager-model";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type PopupProps = {
  show: boolean;
  handleClose: any;
  org: OrgHierarchyModel | undefined;
  manager: ManagerModel | undefined;
};
export const EmployeeHierarchyPopup: FC<PopupProps> = ({
  show,
  handleClose,
  org,
  manager,
}) => {
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch();

  const [selectId, setSelectedId] = useState<string | undefined>(
    manager?.managerId
  );

  let orgMembers = useSelector((state: RootState) => {
    return state?.orgMembers.data;
  });
  let language = intl.locale;

  useEffect(() => {
    let myparams = {
      pageSize: 1000,
      pageNumber: 1,
    };
    dispatch(fetchOrgMembers({ id: org?.id as string, myparams }) as any);
  }, [org, org?.id]);

const handleSubmit = () => {
  if (selectId === "") {
    showSuccessAlert(false, "YouShouldSelectEmployeeAtFirst", intl);
  } else {
    dispatch(
      postOrgManagerAsync({ orgId: org?.id, managerId: selectId }) as any
    ).then((res: any) => {
      const payload = res?.payload;

      if (res?.error?.message === "Request failed with status code 403") {
        showSuccessAlert(false, "UserDoesNotHaveEditPermission", intl);
      } 
      else if (payload?.message?.trim() === "this Members not found") {
        showSuccessAlert(false, "membersNotFound", intl);
      } 
      else if (payload?.statusEnum === ResponseStatus.SavedSuccessfully) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        dispatch(fetchOrgManager(org?.id) as any);
        setSelectedId("");
        handleClose();
      } else {
        showSuccessAlert(false, payload?.message || "AnErrorOccured", intl);
      }
    });
  }
};

  let selectedLang: any = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang).selectedLang;
  } catch (err) {}

  const filteredOrgMembers = orgMembers?.filter((member) =>
    member.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 d-flex justify-content-center w-100">
                    {intl.formatMessage({
                      id: "DepartmentManager",
                    })}
                    {language == "ar" ? org?.nameAr : org?.nameEn}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({
                      id: "YouCanSeeTheEmployeesAndManagersInTheOrganization",
                    })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>

          <Modal.Body className="pb-0 mx-4">
            <div className="d-flex justify-content-center align-items-center">
              <form
                className="w-400px position-relative mb-5"
                autoComplete="off"
              >
                <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y">
                  <KTSVG
                    path="/media/icons/duotune/general/gen114_search.svg"
                    className="pe-5"
                  />
                </span>
                <input
                  type="text"
                  className="form-control form-control-solid px-15"
                  name="search2"
                  value={searchQuery}
                  placeholder={intl.formatMessage({
                    id: "SearchWithEmployeeName",
                  })}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
            <div className="row my-4">
              <div className="col-12">
                <div className="mb-2 pt-2 pb-3 custom_tree">
                  <div className="tree_main mb-5" key={org?.id}>
                    <ul id="tree1" className="tree list-unstyled">
                      <div className="px-8 mx-4">
                        <li
                          className="basic-branch branch accordion-collapse show"
                          id={`flush-main-tree${org?.id}`}
                          aria-labelledby={`flush-main-tree${org?.id}`}
                          data-bs-parent={`#accordionFlushMainTree${org?.id}`}
                        >
                          <ul className="list-unstyled">
                            {filteredOrgMembers?.map((member: MemberModel) => (
                              <li
                                className="branch mb-3"
                                key={member?.memberId}
                              >
                                <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                  <input
                                    className="form-check-input widget-9-radio xRadioBg"
                                    type="radio"
                                    id="1"
                                    name="children"
                                    checked={selectId === member?.memberId}
                                    onChange={() => {
                                      setSelectedId(member?.memberId);
                                    }}
                                  />
                                </div>
                                <label className="collapsed" htmlFor="2">
                                  {member?.memberName}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-50">
                  <div
                    onClick={handleClose}
                    className="btn btn-secondary mx-1 text-center w-100"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <button
                    className="btn btn-success mx-1 text-center w-100"
                    style={{ border: "none" }}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

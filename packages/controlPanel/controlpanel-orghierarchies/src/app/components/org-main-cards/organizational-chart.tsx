import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import CheckBoxDropDown from "./CheckBoxDropDown";
import { Button } from "react-bootstrap";
import AddItemPopup from "../../popup/AddItemPopup";
import { useDispatch, useSelector } from "react-redux";
import { ManagerCard } from "./manager-card";
import { OrgUsers } from "./org-members-card";
import OrgTree from "./OrgTree";
import { RootState } from "../../features/store";
import { fetchOrgs } from "../../features/orghierarchies-slice/orgSlice";
import { OrgHierarchyModel } from "../../models/org-model";
import { fetchOrgsCategory } from "../../features/orghierarchies-slice/org-categorySlice";
import { OrgCategoryModel } from "../../models/org-category";
import { fetchUsers } from "../../features/orghierarchies-slice/users-slice";
import AddClassificationPopup from "../../popup/add-classification-popup";
import { getAllLookUps } from "../../features/orghierarchies-slice/look-upSlice";

const OrganizationalChart: FC = () => {
  const intl = useIntl();

  const dispatch = useDispatch();

  const [showAddPopup, setAddPopup] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [currentOrg, setCurrentOrg] = useState<OrgHierarchyModel>();
  let allOrgs = useSelector((state: RootState) => {
    return state?.orghierarchies;
  });

  const [selectedCategories, setSelectedCategories] = useState<
    OrgCategoryModel[]
  >([]);

  useEffect(() => {
    const queryParams = {
      ...(name ? { name } : {}),
      CategoriesId: selectedCategories.map((c) => c.id),
    };

    dispatch(fetchOrgs(queryParams) as any);
    dispatch(fetchOrgsCategory() as any);
  }, [selectedCategories, name]);

  useEffect(() => {
    dispatch(fetchOrgs({}) as any);
    dispatch(fetchOrgsCategory() as any);
    dispatch(fetchUsers({ pageSize: 1000, pageNumber: 1 }) as any);
  }, []);

  const [showClassificationPopup, setShowClassificationPopup] =
    useState<boolean>(false);
  useEffect(() => {
    dispatch(getAllLookUps() as any);
  }, [dispatch]);
  const lookUps = useSelector((state: RootState) => state?.lookUp?.allLookUps);

  return (
    <>
      <div className="card card-xl-stretch mb-xl-0">
        <div className="card-header px-3 pt-3 pb-2 mb-3  d-flex justify-content-between">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fs-4 my-5 ">
              {" "}
              {intl.formatMessage({ id: "OrganizationalChart" })}{" "}
            </span>
            <span className="mt-1 fw-semibold fs-6 text-muted my-5">
              {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}{" "}
            </span>
          </h3>
        </div>
        <div className="card-body py-3 px-3">
          <div className="tab-content">
            <div className="row h-100 w-100">
              <div className="col-md-6">
                <div className="h-100 border border-end-0 border-start-1 border-bottom-0 border-top-0 border-secondary ps-5 custom-scroll">
                  <div className="d-flex flex-stack flex-wrap px-0 border-0 pb-2 mb-4 ">
                    <h3 className="card-title align-items-start d-flex justify-content-between w-100 mb-4">
                      <p className="fw-bolder fs-4 mb-7 text-primary">
                        {intl.formatMessage({
                          id: "DepartmentsClassification",
                        })}{" "}
                      </p>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={() => {
                            setShowClassificationPopup(true);
                          }}
                          variant="success"
                          className="d-flex mx-2 align-items-center rounded-10 px-4 py-2 justify-content-between"
                          style={{ borderRadius: "50" }}
                        >
                          <span className="fs-4">
                            {intl.formatMessage({
                              id: "DepartmentClassification1",
                            })}{" "}
                          </span>
                          <i className="bi bi-plus-lg fs-1 "></i>
                        </Button>
                      </div>
                    </h3>
                    <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center w-100">
                      <div className="card-toolbar card-diff-toolbar mx-md-5 mx-2 flex-grow-1">
                        <div className="mx-auto mt-1 w-100">
                          <input
                            type="text"
                            name="search"
                            className="form-control form-control-solid ps-10 pr-2 w-100"
                            placeholder={intl.formatMessage({ id: "Search" })}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="card-toolbar card-diff-toolbar mx-md-5 mx-2 flex-grow-1">
                        <div className="mx-auto mt-1 w-100">
                          <CheckBoxDropDown
                            selectedOptions={selectedCategories}
                            setSelectedOptions={setSelectedCategories}
                            options={lookUps}
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setAddPopup(true);
                        }}
                        variant="success"
                        className="d-flex mx-2 align-items-center rounded-10 px-2 py-0"
                        style={{ borderRadius: "50" }}
                      >
                        <i className="bi bi-plus-lg fs-1 mx-1"></i>
                      </Button>
                    </div>
                  </div>

                  {allOrgs?.data?.map((org: OrgHierarchyModel) => (
                    <OrgTree
                      key={org.id}
                      org={org}
                      setCurrentOrg={setCurrentOrg}
                    />
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <div className="h-50 pt-0 p-4 pt-0  ">
                  <ManagerCard org={currentOrg} />

                  <OrgUsers org={currentOrg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddPopup && (
        <AddItemPopup
          parentId={null}
          handleClose={() => setAddPopup(false)}
          show={true}
        />
      )}
      {showClassificationPopup && (
        <AddClassificationPopup
          handleClose={() => setShowClassificationPopup(false)}
          show={true}
        />
      )}
    </>
  );
};

export { OrganizationalChart };

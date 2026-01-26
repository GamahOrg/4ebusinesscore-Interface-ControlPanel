import { Fragment, useState } from "react";
import { OrgActions } from "./org-actions";
import { OrgHierarchyModel } from "../../models/org-model";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";

interface props {
  org: OrgHierarchyModel;
  setCurrentOrg: any;
}
const OrgTree: React.FC<props> = ({ org, setCurrentOrg }) => {
  const [showHierarchy, setShowHierarchy] = useState<boolean>(false);

  const toggleHierarchy = () => {
    setShowHierarchy((prevState: boolean) => !prevState);
    setOpen((prev) => !prev);
    setCurrentOrg(org);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      {org?.parentId ? (
        <li
          className="branch fs-5 mb-7 no-bullet"
          id={`tree${org?.id}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <label className="bg-light w-100 px-2 position-relative d-flex justify-content-between align-items-center mb-5">
            <div
              onClick={(e) => {
                e.preventDefault();
                toggleHierarchy();
              }}
            >
              <a
                className={`basic-item ${
                  org?.children.length === 0
                    ? "theme-text-primary"
                    : "cursor-pointer"
                }`}
                style={{
                  color: org?.categoryColor ? org.categoryColor : undefined,
                }}
              >
                {getCurrentSystemLanguage() == "ar" ? org?.nameAr : org?.nameEn}{" "}
                {org?.children.length ? (
                  open ? (
                    <i className="fa-solid fa-angle-up"></i>
                  ) : (
                    <i className="fa-solid fa-angle-down"></i>
                  )
                ) : null}
              </a>
            </div>
            <OrgActions id={org?.id} parentId={org?.parentId} />
          </label>

          {showHierarchy && org?.children.length > 0 && (
            <ul className="list-unstyled">
              {org?.children.map((subOrg) => (
                <OrgTree
                  key={subOrg?.id}
                  org={subOrg}
                  setCurrentOrg={setCurrentOrg}
                />
              ))}
            </ul>
          )}
        </li>
      ) : (
        <div className="tree_main mb-5">
          <ul id={`tree${org?.id}`} className="tree tree3 list-unstyled">
            <div className="bg-light fs-5 mx-2 mb-7 d-flex justify-content-between align-items-center">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleHierarchy();
                }}
              >
                <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                <a
                  className="basic-item"
                  role="button"
                  style={{
                    color: org?.categoryColor ? org.categoryColor : undefined,
                  }}
                >
                  {getCurrentSystemLanguage() == "ar"
                    ? org?.nameAr
                    : org?.nameEn}{" "}
                  {org?.children.length ? (
                    open ? (
                      <i className="fa-solid fa-angle-up"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down"></i>
                    )
                  ) : null}
                </a>
              </div>
              {/* Assuming OrgActions requires an 'id' prop */}
              <OrgActions id={org?.id} parentId={org?.parentId} />
            </div>
            {showHierarchy && org?.children.length > 0 && (
              <li className="basic-branch">
                <div
                  className="tree_main mb-5"
                  style={{ maxHeight: "600px", overflow: "none" }}
                >
                  <ul
                    className="list-unstyled custom-scroll"
                    style={{ maxHeight: "200px" }}
                  >
                    {org?.children.map((subOrg) => (
                      <Fragment key={subOrg?.id}>
                        <OrgTree
                          key={subOrg?.id}
                          org={subOrg}
                          setCurrentOrg={setCurrentOrg}
                        />
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
export default OrgTree;

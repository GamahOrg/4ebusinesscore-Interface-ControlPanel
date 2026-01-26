import { ChangeEvent, FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { RootState } from "../../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  AddGroupToRole,
  fetchGroupNotRole,
} from "../../../features/role-group/roleGroup";
import { RoleNotGroup } from "../../../models/role-group/group-not-in-role-mode";
import { AddGroupsToRoleModel } from "../../../models/role-group/add-group-to-role-model";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type AddGroupToRolePopupProps = {
  handleClose: () => void;
  id: string;
};

const AddGroupToRolePopup: FC<AddGroupToRolePopupProps> = ({
  handleClose,
  id,
}) => {
  const intl = useIntl();

  const [recordsTableData, setRecordsTableData] = useState<RoleNotGroup[]>([]);
  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);
  function handleSelectRecord(input: RoleNotGroup) {
    const newCheckedUserIds = checkedUserIds.includes(input.groupId)
      ? checkedUserIds.filter((id) => id !== input.groupId)
      : [...checkedUserIds, input.groupId];

    setCheckedUserIds(newCheckedUserIds);
  }

  let GroupNOInRole = useSelector((state: RootState) => {
    return state?.groupRole;
  });
  let totalPages = useSelector((state: any) => {
    return state?.groupRole?.data?.totalPages;
  });

  let totalItems = useSelector((state: any) => {
    return state?.groupRole?.data?.totalItems;
  });

  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchText("");
  };
  const handleReset = () => {
    handleResetSearch();
    setRecordsTableData([]);
    setCheckedUserIds([]);
  };
  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    let isChecked = e.target.checked;
    let items: RoleNotGroup[] = recordsTableData.map(
      (item: RoleNotGroup): RoleNotGroup => {
        item.isChecked = isChecked;
        return item;
      }
    );
    setRecordsTableData(items);
  }
  const submit = () => {
    var result = recordsTableData?.filter((x) => x.isChecked == true);
    var groupIds = result.map((group) => group.groupId);
    if (groupIds?.length > 0) {
      let data: AddGroupsToRoleModel = {
        roleId: id,
        groupsIds: groupIds,
      };
      dispatch(AddGroupToRole(data) as any)
        .then((result: any) => {
          if (result.payload.statusEnum === 1) {
            handleClose();
            showSuccessAlert(true, "GroupAddedSuccessfully", intl, () => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          } else {
            showSuccessAlert(false, result.payload.message, intl);
          }
        })
        .catch((err: any) => {});
    } else {
      showSuccessAlert(false, "MustChooseGroup", intl);
    }
  };
  useEffect(() => {
    let params: any = {
      pageSize: pageSize,
      pageNumber: pageIndex,
      search: searchText,
    };
    dispatch(fetchGroupNotRole({ id, params }) as any);
  }, [searchText, pageSize, pageIndex, dispatch]);
  const deepEqual = (obj1: any, obj2: any) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    const updatedRecords = recordsTableData.map((user) => ({
      ...user,
      isChecked: checkedUserIds.includes(user.groupId),
    }));
    if (!deepEqual(updatedRecords, recordsTableData)) {
      setRecordsTableData(updatedRecords);
    }
  }, [checkedUserIds]);

  useEffect(() => {
    setRecordsTableData(GroupNOInRole.GroupNotInRole.data);
  }, [GroupNOInRole]);

  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      handleReset();
    };
  }, []);

  return (
    <div
      className="modal  fade  show"
      role="dialog"
      style={{ paddingRight: "10px", display: "block" }}
    >
      <div className="modal-dialog modal-xl" style={{ width: "80%" }}>
        <Modal
          centered
          show
          onHide={() => {
            handleClose();
            handleResetSearch();
          }}
          size="xl"
        >
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <Modal.Title></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="fw-bolder  pb-8">
              <h1 className="mb-3 text-center ">
                {intl.formatMessage({ id: "AddGroup" })}
              </h1>
            </div>

            <div className="mb-10">
              <div className="py-3">
                <div className="position-relative w-100 ms-md-0">
                  <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"></span>
                  <input
                    type="text"
                    className="form-control form-control-solid ps-10"
                    name="search"
                    onChange={handleSearchChange}
                    placeholder={intl.formatMessage({
                      id: "TypeYourSearchHere",
                    })}
                  />
                </div>
              </div>
              <div className="table-responsive fs-6 ">
                <table className="table table-borderless align-middle">
                  <thead className="p-2 text-center fw-bolder border">
                    <tr>
                      <td className="p-2">
                        <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="checkbox"
                            defaultValue={0}
                            onChange={selectAllRecord}
                          />
                        </div>
                      </td>
                      <td className="p-5">
                        {intl.formatMessage({
                          id: "Name",
                        })}
                      </td>
                    </tr>
                  </thead>
                  <tbody className="p-4  text-center border">
                    {recordsTableData
                      .filter((group) =>
                        group.groupName
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((group, index: number) => (
                        <tr
                          key={group.groupId}
                          className="text-center fw-lighter"
                        >
                          <td className="p-2">
                            <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                              <input
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                defaultValue={0}
                                name={group.groupName}
                                checked={group?.isChecked}
                                onClick={() => handleSelectRecord(group)}
                              />
                            </div>
                          </td>
                          <td className="d-flex  py-4">
                            <div className="d-flex">
                              <div className="symbol symbol-45px symbol-circle ms-2">
                                <img
                                  alt="Pic"
                                  src={
                                    group?.imageUrl
                                      ? `${UserManagmentRootUrl}${group?.imageUrl}`
                                      : `/media/avatars/300-3.jpg`
                                  }
                                  onError={(e: any) =>
                                    (e.target.src = `/media/avatars/300-3.jpg`)
                                  }
                                />
                              </div>
                              <div>
                                <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                                  {group?.groupName}
                                </div>
                                <div className="fw-bold text-muted">
                                  {group?.description}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <SystemPagination
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  setPageIndex={setPageIndex}
                  setPageSize={setPageSize}
                />
                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="reset"
                    onClick={() => {
                      handleClose();
                    }}
                    aria-hidden="true"
                    className="btn btn-secondary px-15 me-5"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    disabled={recordsTableData?.length === 0}
                    onClick={() => {
                      submit();
                    }}
                    className="btn btn-success px-15 ms-5"
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddGroupToRolePopup;

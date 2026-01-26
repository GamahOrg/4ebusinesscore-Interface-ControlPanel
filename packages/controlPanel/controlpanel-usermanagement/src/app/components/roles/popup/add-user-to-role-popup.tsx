import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { RootState } from "../../../features/store";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUsersToRole,
  fetchUserNoInRoles,
} from "../../../features/role-user/roleUserSlice";
import { UsersNotInRoleModel } from "../../../models/role-user/users-not-in-role-model";
import { AddUsersToRoleModel } from "../../../models/role-user/add-user-to-role-model";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type AddUserToRolePopupProps = {
  handleClose: () => void;
  id: string;
};

const AddUserToRolePopup: FC<AddUserToRolePopupProps> = ({
  handleClose,
  id,
}) => {
  const intl = useIntl();

  const [recordsTableData, setRecordsTableData] = useState<
    UsersNotInRoleModel[]
  >([]);
  const [allRecordsTableData, setAllRecordsTableData] = useState<any>([]);

  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);

  let UserNOInRole = useSelector((state: RootState) => {
    return state?.roleUser;
  });

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleReset = () => {
    setRecordsTableData([]);
    setAllRecordsTableData([]);
    setCheckedUserIds([]);
  };

  function handleSelectRecord(input: UsersNotInRoleModel) {
    const newCheckedUserIds = checkedUserIds.includes(input.id)
      ? checkedUserIds.filter((id) => id !== input.id)
      : [...checkedUserIds, input.id];
    setCheckedUserIds(newCheckedUserIds);
  }

  const submit = () => {
    // var result = recordsTableData?.filter((x: any) => x.isChecked == true);
    var removeDuplicate = allRecordsTableData.filter(
      (item: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.id === item.id)
    );
    var result = removeDuplicate?.filter((x: any) => x.isChecked == true);
    var userIds = result.map((user: any) => user.id);

    if (userIds?.length > 0) {
      let data: AddUsersToRoleModel = {
        roleId: id,
        userIDs: userIds,
      };
      //message ===  "roleAddedSuccessfully"
      dispatch(AddUsersToRole(data) as any)
        .then((result: any) => {
          if (result.payload.statusEnum === 1) {
            showSuccessAlert(true, "UserAddedSuccessfully", intl, () => {
              handleClose();
            });
          }
        })
        .catch((err: any) => {});
    } else {
      showSuccessAlert(false, "MustChooseUsers", intl);
    }
  };

  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  useEffect(() => {
    let params: any = {
      pageSize: pageSize,
      pageNumber: pageIndex,
      Search: searchText,
    };
    dispatch(fetchUserNoInRoles({ id, params }) as any).then((res: any) => {
      if (res?.payload?.result?.length === 0) {
        let params: any = {
          pageSize: pageSize,
          pageNumber: 1,
          Search: searchText,
        };
        dispatch(fetchUserNoInRoles({ id, params }) as any);
      }
    });
  }, [pageIndex, pageSize, searchText, dispatch]);

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
      isChecked: checkedUserIds.includes(user.id),
    }));
    const updatedAllRecords = allRecordsTableData.map((user: any) => ({
      ...user,
      isChecked: checkedUserIds.includes(user.id),
    }));

    if (!deepEqual(updatedRecords, recordsTableData)) {
      setRecordsTableData(updatedRecords);
      setAllRecordsTableData(updatedAllRecords);
    }
  }, [checkedUserIds, recordsTableData]);

  useEffect(() => {
    if (recordsTableData?.length > 0) {
      setAllRecordsTableData([
        ...recordsTableData,
        ...UserNOInRole.UserNoInRoles.data,
      ]);
    } else {
      setAllRecordsTableData(UserNOInRole.UserNoInRoles.data);
    }

    setRecordsTableData(UserNOInRole.UserNoInRoles.data);
  }, [UserNOInRole]);

  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  return (
    <div
      className="modal"
      role="dialog"
      style={{ paddingRight: "10px", display: "block" }}
    >
      <div className="modal-dialog modal-xl" style={{ width: "80%" }}>
        <Modal
          centered
          show
          onHide={() => {
            handleClose();
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
                {intl.formatMessage({ id: "AddUser" })}
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
                      <td className="p-2"></td>
                      <td className="p-5">
                        {intl.formatMessage({
                          id: "Name",
                        })}
                      </td>
                    </tr>
                  </thead>
                  <tbody className="p-4  text-center border">
                    {recordsTableData
                      // ?.filter((user) =>
                      //   user.name
                      //     .toLowerCase()
                      //     .includes(searchText.toLowerCase())
                      // )
                      .map((user, index: number) => (
                        <tr key={user.id} className="text-center fw-lighter">
                          <td className="p-2">
                            <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                              <input
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                defaultValue={0}
                                name={user.name}
                                checked={user?.isChecked}
                                onClick={() => handleSelectRecord(user)}
                              />
                            </div>
                          </td>
                          <td className="d-flex  py-4">
                            <div className="d-flex">
                              <div className="symbol symbol-45px symbol-circle ms-2">
                                <img
                                  alt="Pic"
                                  src={
                                    user?.imageUrl
                                      ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                      : `/media/avatars/300-3.jpg`
                                  }
                                  onError={(e: any) =>
                                    (e.target.src = `/media/avatars/300-3.jpg`)
                                  }
                                />
                              </div>
                              <div>
                                <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                                  {`${user.firstName ?? ""} ${
                                    user.secondName ?? ""
                                  } ${user.thirdName ?? ""} ${
                                    user.forthName ?? ""
                                  }`.trim() || user.name}
                                </div>
                                <div className="fw-bold text-muted">
                                  {user?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {UserNOInRole?.UserNoInRoles?.data ? (
                  <SystemPagination
                    totalItems={UserNOInRole?.UserNoInRoles?.totalItems}
                    totalPages={UserNOInRole?.UserNoInRoles?.totalPages}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                  />
                ) : (
                  <div className="d-flex fw-bolder justify-content-center align-items-center">
                    {intl.formatMessage({ id: "No_data_yet" })}
                  </div>
                )}
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

export default AddUserToRolePopup;

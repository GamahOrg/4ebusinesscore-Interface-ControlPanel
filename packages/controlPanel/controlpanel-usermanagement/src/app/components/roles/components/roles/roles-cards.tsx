import { FC, useEffect, useState } from "react";
import UserRoleCard from "./role-card";
import { useIntl } from "react-intl";
import AddUserRolePopup from "../../popup/add-user-role-popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../features/store";
import { fetchRoles } from "../../../../features/role/rolesSlice";
import { role } from "../../../../models/role/role-model";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

const UserRoles: FC = () => {
  const [isShowAdd, setShowAdd] = useState<boolean>(false);
  const intl = useIntl();

  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const dispatch = useDispatch();

  let roles = useSelector((state: RootState) => {
    return state?.roles?.data;
  });

  let rolesPagination = useSelector((state: RootState) => {
    return state?.roles?.pagination;
  });

  const [role, setRole] = useState<any>([]);

  useEffect(() => {
    setRole(roles?.data);
  }, [roles?.data]);

  useEffect(() => {
    let params: any = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(fetchRoles(params) as any);
  }, [pageIndex, pageSize]);

  return (
    <div className="row g-10">
      {role?.map((item: role, index: any) => (
        <div className="col-lg-4" key={index}>
          <UserRoleCard role={item} />
        </div>
      ))}
      <div
        className="col-lg-4"
        onClick={() => {
          setShowAdd(true);
        }}
      >
        <div className="card shadow-sm p-4 rounded pb-1 cursor-pointer h-100 cursor-pointer">
          <div className="card-body d-flex justify-content-center flex-column align-items-center h-100">
            <i className="fa-solid fa-plus icon-size-lg text-muted "></i>
            <p className="text-muted fs-5 fw-bolder">
              {intl.formatMessage({ id: "AddNewRole" })}
            </p>
          </div>
        </div>
      </div>
      {isShowAdd && (
        <AddUserRolePopup
          cancelFun={() => {
            setShowAdd(false);
          }}
        />
      )}
      {role?.length ? (
        <SystemPagination
          totalItems={rolesPagination?.totalItems}
          totalPages={rolesPagination?.totalPages}
          pageIndex={rolesPagination?.pageIndex}
          pageSize={rolesPagination?.pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      ) : (
        <div className="d-flex fw-bolder justify-content-center align-items-center">
          {intl.formatMessage({ id: "No_data_yet" })}
        </div>
      )}
    </div>
  );
};

export default UserRoles;

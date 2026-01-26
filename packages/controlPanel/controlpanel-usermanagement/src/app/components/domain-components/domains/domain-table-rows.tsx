import { FC, useEffect } from "react";
import { DomainsTableRow } from "./domain-table-row";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../../features/store";
import { fetchDomains } from "../../../features/domains-slice/domainsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DomainsModel } from "../../../models/domain/domain-model";

export const DomainsTableRows: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let domains = useSelector((state: RootState) => {
    return state?.domains;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    let params: any = {
      pageSize: searchParams.get("pageSize"),
      pageNumber: searchParams.get("pageNumber"),
    };
    dispatch(fetchDomains(params) as any);
  }, [searchParams.get("pageSize"), searchParams.get("pageNumber")]);
  return (
    <tbody>
      {domains?.data?.map((item: DomainsModel) => (
        <DomainsTableRow domain={item} />
      ))}
    </tbody>
  );
};

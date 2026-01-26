import { FC, useState } from "react";
import { useIntl } from "react-intl";

type TableHeadersTypes = {
  name: string;
  className: string;
};
export const DomainsTableHeader: FC = () => {
  const intl = useIntl();

  const usersTableHeader: TableHeadersTypes[] = [
    {
      name: "Source",
      className: `min-w-150px  ${intl.locale == "ar" ? "text-start" : "text-end"}`,
    },
    {
      name: "Creator",
      className: `ps-4 min-w-150px ${intl.locale == "ar" ? "text-start" : "text-end"}`,
    },
    {
      name: "Status",
      className: "min-w-150px",
    },
    {
      name: "UpdateDate",
      className: "min-w-150px",
    },
    {
      name: "Actions",
      className: "min-w-50px",
    },
  ];

  const [headers, setHeaders] = useState<TableHeadersTypes[]>(usersTableHeader);
  return (
    <thead>
      <tr className="fw-bolder text-muted">
        {headers.map((item, index) => (
          <th key={index} className={item.className}>
            {intl.formatMessage({
              id: item.name,
            })}
          </th>
        ))}
      </tr>
    </thead>
  );
};

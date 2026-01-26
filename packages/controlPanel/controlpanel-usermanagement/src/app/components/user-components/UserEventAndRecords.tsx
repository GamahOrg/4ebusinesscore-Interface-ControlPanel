import { ChangeEvent, FC, useState } from "react";
import { useIntl } from "react-intl";

type TableHeaderType = {
  id: number;
  title: string;
};

type TableDataType = {
  id: number;
  location: string;
  device: string;
  ipAddress: string;
  time: string;
  action: string;
};

type RecordsTableDataType = {
  id: number;
  name: string;
  isChecked: boolean;
  isDisable: boolean;
  address: string;
  date: string;
  onChange: (input: RecordsTableDataType) => void;
};

export const UserEventsAndRecords: FC = () => {
  const intl = useIntl();

  const [showDownloadReport, setShowDownloadReport] = useState(false);
  const handleShowDownloadReport = () => setShowDownloadReport(true);

  const tableHeaders: TableHeaderType[] = [
    {
      id: 1,
      title: intl.formatMessage({ id: "Location" }),
    },
    {
      id: 2,
      title: intl.formatMessage({ id: "Device" }),
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "IPAddress" }),
    },
    {
      id: 4,
      title: intl.formatMessage({ id: "Time" }),
    },
    {
      id: 5,
      title: intl.formatMessage({ id: "Actions" }),
    },
  ];
  const tableData: TableDataType[] = [
    {
      id: 1,
      location: "السعودية",
      device: "كروم - ويندوز",
      ipAddress: "207.32.12.53",
      time: "12:00 AM",
      action: "الجلسة الحالية",
    },
    {
      id: 2,
      location: "السعودية",
      device: "كروم - ويندوز",
      ipAddress: "207.32.12.53",
      time: "12:00 AM",
      action: "الجلسة الحالية",
    },
    {
      id: 3,
      location: "السعودية",
      device: "كروم - ويندوز",
      ipAddress: "207.32.12.53",
      time: "12:00 AM",
      action: "تسجيل خروج",
    },
  ];

  const [recordsTableData, setRecordsTableData] = useState<
    RecordsTableDataType[]
  >([
    {
      id: 1,
      isChecked: false,
      isDisable: true,
      name: "1",
      address: "POST /v1/invoices/in_3766_994/payment",
      date: "2021-08-12 12:00:00",
      onChange: handleSelectRecord,
    },
    {
      id: 2,
      isChecked: false,
      isDisable: false,
      name: "2",
      address: "POST /v1/invoices/in_3766_994/payment",
      date: "2021-08-12 12:00:00",
      onChange: handleSelectRecord,
    },
    {
      id: 3,
      isChecked: false,
      isDisable: true,
      name: "3",
      address: "POST /v1/invoices/in_3766_994/payment",
      date: "2021-08-12 12:00:00",
      onChange: handleSelectRecord,
    },
  ]);

  const eventsData = [
    {
      id: 1,
      text: ["قامت كريمة علي بالدفع الي:", "#XRS-45670"],
      textClassName: ["text-muted", "text-bolder"],
      date: "2021-08-12 12:00:00",
    },
    {
      id: 2,
      text: ["الفاتورة", "رقم LOP-45670", "تم رفضها"],
      textClassName: ["text-muted", "text-bolder", "text-danger"],
      date: "2021-08-12 12:00:00",
    },
    {
      id: 3,
      text: [
        "تم تغير حالة الفاتورة",
        "رقم DER-45645#",
        "من مرحلة",
        "التقديم",
        "الي",
        "المرحلة الانتقالية",
      ],
      textClassName: [
        "text-muted",
        "text-bolder",
        "text-muted",
        "text-primary",
        "text-muted",
        "text-primary",
      ],
      date: "2021-08-12 12:00:00",
    },
    {
      id: 4,
      text: ["قامت كريمة علي بالدفع الي:", "#XRS-45670"],
      textClassName: ["text-muted", "text-bolder"],
      date: "2021-08-12 12:00:00",
    },
  ];

  function handleSelectRecord(input: RecordsTableDataType) {
    input.isChecked = !input.isChecked;
    setRecordsTableData([...recordsTableData]);
  }

  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    let isChecked = e.target.checked;
    let items: RecordsTableDataType[] = recordsTableData.map(
      (item: RecordsTableDataType): RecordsTableDataType => {
        item.isChecked = isChecked;
        return item;
      }
    );
    setRecordsTableData(items);
  }

  return (
    <>
      <div className="mb-10">
        <div className="card card-xl-stretch mb-xl-0 pb-4 pt-15">
          <div className="d-flex justify-content-between p-4 align-items-center"></div>
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h3>
                    {intl.formatMessage({
                      id: "SessionsLogin",
                    })}
                  </h3>
                  <button className="btn btn-primary ">
                    {intl.formatMessage({
                      id: "LogoutFromAllSessions",
                    })}
                  </button>
                </div>
              </div>

              <div className="table-responsive fs-6 ">
                <table className="table table-borderless align-middle mt-5">
                  <thead className="p-4 text-center fw-bolder border">
                    {tableHeaders.map((header) => (
                      <td key={header.id} className="p-5">
                        <bdi>{header.title}</bdi>
                      </td>
                    ))}
                  </thead>
                  <tbody className="text-center border">
                    {tableData.map((data) => (
                      <tr key={data.id} className="text-center fw-lighter">
                        <td className="p-5">{data.location}</td>
                        <td className="p-5">{data.device}</td>
                        <td className="p-5">{data.ipAddress}</td>
                        <td className="p-5">{data.time}</td>
                        <td className="p-5">{data.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <div className="card card-xl-stretch mb-xl-0 py-4">
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h3>
                    {intl.formatMessage({
                      id: "Records",
                    })}
                  </h3>
                  <button
                    className="btn btn-primary "
                    onClick={handleShowDownloadReport}
                  >
                    {intl.formatMessage({
                      id: "DownloadReports",
                    })}
                  </button>
                </div>
                <div className="table-responsive fs-6 ">
                  <table className="table table-borderless align-middle mt-5">
                    <thead className="p-4 text-center fw-bolder border">
                      <tr>
                        <td className="p-5">
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
                            id: "Address",
                          })}
                        </td>
                        <td className="p-5">
                          {intl.formatMessage({
                            id: "Date",
                          })}
                        </td>
                      </tr>
                    </thead>
                    <tbody className="p-4  text-center border">
                      {recordsTableData.map((data) => (
                        <tr key={data.id} className="text-center fw-lighter">
                          <td className="p-5">
                            <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                              <input
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                defaultValue={0}
                                name={data.name}
                                checked={data.isChecked}
                                onChange={() => data.onChange(data)}
                              />
                            </div>
                          </td>
                          <td className="p-5">{data.address}</td>
                          <td className="p-5">{data.date}</td>
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

      <div className="my-10">
        <div className="card card-xl-stretch mb-xl-0 py-4">
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h3>
                    {intl.formatMessage({
                      id: "Events",
                    })}
                  </h3>
                  <button
                    className="btn btn-primary "
                    onClick={handleShowDownloadReport}
                  >
                    {intl.formatMessage({
                      id: "DownloadReports",
                    })}
                  </button>
                </div>
                <div className="mt-5">
                  {eventsData.map((event, index) => (
                    <div
                      key={event.id}
                      className={`${
                        index != eventsData.length - 1 ? "border-bottom " : ""
                      } py-6 d-flex justify-content-between align-items-center`}
                    >
                      <div>
                        {event.text.map((t, index) => (
                          <span
                            key={index}
                            className={`${event.textClassName[index]} fw-bolder`}
                          >
                            <bdi>{t} </bdi>
                          </span>
                        ))}
                      </div>
                      <span className="text-muted fw-bolder">{event.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

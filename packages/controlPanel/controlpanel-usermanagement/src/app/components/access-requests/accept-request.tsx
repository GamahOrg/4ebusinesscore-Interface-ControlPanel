import AddNewUserRequest from "./components/add-new-user";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const AcceptRequest = () => {
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/admin-panel-users-workspace/admin-panel-users/access-requests",
      defaultName: "AccessRequests",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "AddUser",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle={"AddUser"}
        extraTitle={serviceName || cardName}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />

      <AddNewUserRequest />
    </>
  );
};

export default AcceptRequest;

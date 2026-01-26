import SettingsHome from "./components/Settings";
import { Provider } from "react-redux";
import store from "./redux/store";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
function PlatformSettings() {
  let location = useLocation();
  let cardId = location?.state?.cardId;
  let serviceName = location?.state?.serviceName;
  let cardName = location?.state?.cardTitle;
  const breadcrumbItems = [
    {
      path: "",
      defaultName: "WebsiteGeneralSettings",
      name: serviceName || cardName,
    },
  ];
  return (
    <Provider store={store}>
      <DynamicToolbar
        defaultTitle="WebsiteGeneralSettings"
        extraTitle={serviceName || cardName}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={cardId}
      />
      <SettingsHome />
    </Provider>
  );
}

export default PlatformSettings;

import "./App.css";
import CpanelRoutes from "./Routes/CpanelRoutes";
import { Provider } from "react-redux";
import store from "./store/workspaceStore";
import { Route, Routes } from "react-router-dom";
import ToolbarProvider from "@4eplatform/gateway/src/app/layout/core/ToolbarProvider";
import { DynamicWorkSpace } from "@npm-react/react-redux-routing";

function ControlPanelServicesSettings() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<DynamicWorkSpace />} />
        <Route
          path="systems-services-settings/*"
          element={
            <ToolbarProvider>
              <CpanelRoutes />
            </ToolbarProvider>
          }
        />
      </Routes>
    </Provider>
  );
}

export default ControlPanelServicesSettings;

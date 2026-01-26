import "./App.css";
import store from "./app/features/store";
import { Provider } from "react-redux";
import { AdminPanelHierararchy } from "./app/admin-panel-hierararchy";
import { Route, Routes } from "react-router-dom";
import ToolbarProvider from "@4eplatform/gateway/src/app/layout/core/ToolbarProvider";

function App() {
  return (
    <Routes>
      <Route
        path="admin-panel-hierararchy/*"
        element={
          <Provider store={store}>
            <ToolbarProvider>
              <AdminPanelHierararchy />
            </ToolbarProvider>
          </Provider>
        }
      />
    </Routes>
  );
}

export default App;

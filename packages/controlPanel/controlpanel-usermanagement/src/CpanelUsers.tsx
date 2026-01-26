import "./App.css";
import CpanelUsersRoutes from "./CpanelUsersRoutes";
import { Provider } from "react-redux";
import store from "./app/features/store";
import { Route, Routes } from "react-router-dom";
function CpanelUsers() {
  return (
    <Routes>
      <Route
        path="admin-panel-users-workspace/*"
        element={
          <Provider store={store}>
            <CpanelUsersRoutes />
          </Provider>
        }
      />
    </Routes>
  );
}

export default CpanelUsers;

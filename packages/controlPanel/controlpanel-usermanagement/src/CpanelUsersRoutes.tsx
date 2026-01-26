import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AdminPanelUsersWorkspace } from "./app/components/admin-panel-users-workspace";
import { AdminPanelDomainsDetails } from "./app/components/domain-components/admin-panel-domains-details";
import { AdminPanelUsersDetails } from "./app/components/user-components/admin-panel-users-details";
import { AdminPanelAddUser } from "./app/components/user-components/admin-panel-add-user";
import { AdminPanelUserDetails } from "./app/components/user-components/admin-panel-user-details";
import { AdminPanelEditUser } from "./app/components/user-components/admin-panel-edit-user";
import { AdminPanelGroupsDetails } from "./app/components/group-components/admin-panel-groups-details";
import { AdminPanelAddGroup } from "./app/components/group-components/admin-panel-add-group";
import { AdminPanelEditGroup } from "./app/components/group-components/admin-panel-edit-group";
import { AdminPanelRolesDetails } from "./app/components/roles/components/roles/admin-panel-roles";
import { AdmimPanelRoleDetails } from "./app/components/roles/toolbar/admin-panel-role-details";
import { AdminPanelPermissionsDetails } from "./app/components/permissions/toolbar/admin-panel-permissions-details";
import AccessRequests from "./app/components/access-requests/access-requests";
import AcceptRequest from "./app/components/access-requests/accept-request";

function CpanelUsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminPanelUsersWorkspace />} />
      <Route
        path="/admin-panel-users/details/:id"
        element={<AdminPanelUserDetails />}
      />
      <Route
        path="/admin-panel-users/users"
        element={<AdminPanelUsersDetails />}
      />
      <Route
        path="/admin-panel-users/domains"
        element={<AdminPanelDomainsDetails />}
      />
      <Route path="/admin-panel-users/add" element={<AdminPanelAddUser />} />
      <Route path="/admin-panel-users/edit" element={<AdminPanelEditUser />} />
      <Route
        path="/admin-panel-users/roles/details/:id"
        element={<AdmimPanelRoleDetails />}
      />
      <Route
        path="/admin-panel-users/groups"
        element={<AdminPanelGroupsDetails />}
      />
      <Route
        path="/admin-panel-users/groups/add"
        element={<AdminPanelAddGroup />}
      />
      <Route
        path="/admin-panel-users/groups/edit/:id"
        element={<AdminPanelEditGroup />}
      />
      <Route
        path="/admin-panel-users/roles"
        element={<AdminPanelRolesDetails />}
      />
      <Route
        path="/admin-panel-users/permissions"
        element={<AdminPanelPermissionsDetails />}
      />
      <Route
        path="/admin-panel-users/access-requests"
        element={<AccessRequests />}
      />
      <Route
        path="/admin-panel-users/access-requests/accept-request/:id"
        element={<AcceptRequest />}
      />
    </Routes>
  );
}

export default CpanelUsersRoutes;

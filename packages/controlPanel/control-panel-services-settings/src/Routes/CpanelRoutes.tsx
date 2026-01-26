import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPanelViewallcardsCardDetails } from "../carddetails";
import { AdminPanelViewallcardsEditCard } from "../editcard";
import { SystemAndSerivcesSettings } from "../systemAndSerivcesSettings";
import { AdminPanelViewallcardsAddCard } from "../addcard";
import { SystemsAndServicesEditSystem } from "../systemsAndServicesEditSystem";
import { SystemsAndServicesAddSystem } from "../systemsAndServicesAddSystem";
import { SystemsAndServicesViewSystem } from "../systemsAndServicesViewSystem";
import { AdminPanelViewallcards } from "../viewallcards";
import { DynamicWorkSpace } from "../components/dynamic-workspace/work-space/dynamic-workspace";
import { SystemsClassifications } from "../systemsClassifications";
import { AddSystemClassifications } from "../addSystemClassifications";
import { EditSystemsClassifications } from "../editSystemsClassifications";
import { SystemsAndServicesAddExternalSystem } from "../systemsAndServicesAddExternalSystem";
import { DigitalServicesSettings } from "../components/DigitalServicesSettings";
import { SystemSerivcesSettingsWorkspace } from "./../systemSerivcesSettingsWorkspace";
import { ViewSystemsClassifications } from "../ViewSystemsClassifications";
import { SecuritySettings } from "../SecuritySettings";
import { SystemsAndServicesEditClassifications } from "../systemsAndServicesEditClassifications";

const CpanelRoutes: React.FC = () => {
  // throw new Error('Intentional error thrown');
  return (
    <div className="cpanel">
      <Routes>
        <Route
          path="/systems-settings"
          element={<SystemAndSerivcesSettings />}
        />
        <Route
          path="/systems-settings/external-systems"
          element={<SystemAndSerivcesSettings />}
        />
        <Route
          path="/systems-settings/external-components"
          element={<SystemAndSerivcesSettings />}
        />
        <Route
          path="/systems-settings/sso-systems"
          element={<SystemAndSerivcesSettings />}
        />

        <Route path="/add-card" element={<AdminPanelViewallcardsAddCard />} />
        <Route
          path="/add-card/external-components"
          element={<AdminPanelViewallcardsAddCard />}
        />
        <Route
          path="/admin-panel-viewallcards/card-details/:id"
          element={<AdminPanelViewallcardsCardDetails />}
        />
        <Route
          path="/admin-panel-viewallcards/card-details/external-systems/:id"
          element={<AdminPanelViewallcardsCardDetails />}
        />
        <Route
          path="/admin-panel-viewallcards/card-details/external-components/:id"
          element={<AdminPanelViewallcardsCardDetails />}
        />
        <Route
          path="/admin-panel-viewallcards/card-details/sso-systems/:id"
          element={<AdminPanelViewallcardsCardDetails />}
        />

        <Route
          path="/edit-card/:id"
          element={<AdminPanelViewallcardsEditCard />}
        />
        <Route
          path="/systems-classifications/edit-card/:id"
          element={<AdminPanelViewallcardsEditCard />}
        />
        <Route
          path="/edit-card/external-systems/:id"
          element={<AdminPanelViewallcardsEditCard />}
        />
        <Route
          path="/edit-card/external-components/:id"
          element={<AdminPanelViewallcardsEditCard />}
        />
        <Route
          path="/edit-card/sso-systems/:id"
          element={<AdminPanelViewallcardsEditCard />}
        />

        <Route
          path="/external-system/security-settings"
          element={<SecuritySettings />}
        />
        <Route
          path="/sso-system/security-settings"
          element={<SecuritySettings />}
        />

        <Route path="/add-system" element={<SystemsAndServicesAddSystem />} />
        <Route
          path="/add-external-system"
          element={<SystemsAndServicesAddExternalSystem />}
        />
        <Route
          path="/add-external-component"
          element={<SystemsAndServicesAddExternalSystem />}
        />
        <Route
          path="/add-sso-system"
          element={<SystemsAndServicesAddExternalSystem />}
        />

        <Route
          path="/edit-system/:id"
          element={<SystemsAndServicesEditSystem />}
        />
        <Route
          path="/edit-mainclassification/:id"
          element={<SystemsAndServicesEditClassifications />}
        />
        <Route
          path="/edit-external-system/:id"
          element={<SystemsAndServicesEditSystem />}
        />
        <Route
          path="/edit-external-component/:id"
          element={<SystemsAndServicesEditSystem />}
        />
        <Route
          path="/edit-sso-system/:id"
          element={<SystemsAndServicesEditSystem />}
        />

        <Route
          path="/systems-classifications"
          element={<SystemsClassifications />}
        />
        <Route
          path="/systems-classifications/add-system"
          element={<AddSystemClassifications />}
        />
        <Route
          path="/systems-classifications/edit-system/:id"
          element={<EditSystemsClassifications />}
        />
        <Route
          path="/systems-classifications/view-system/:id"
          element={<ViewSystemsClassifications />}
        />
        <Route
          path="/digital-services-settings"
          element={<DigitalServicesSettings />}
        />
        <Route
          path="/admin-panel-viewallcards/:id"
          element={<AdminPanelViewallcards />}
        />
        <Route
          path="/admin-panel-viewallcards/external-systems/:id"
          element={<AdminPanelViewallcards />}
        />
        <Route
          path="/admin-panel-viewallcards/external-components/:id"
          element={<AdminPanelViewallcards />}
        />
        <Route
          path="/admin-panel-viewallcards/sso-systems/:id"
          element={<AdminPanelViewallcards />}
        />

        <Route
          path="/view-system/:id"
          element={<SystemsAndServicesViewSystem />}
        />
        <Route
          path="/view-system/external-systems/:id"
          element={<SystemsAndServicesViewSystem />}
        />
        <Route
          path="/view-system/external-components/:id"
          element={<SystemsAndServicesViewSystem />}
        />
        <Route
          path="/view-system/sso-systems/:id"
          element={<SystemsAndServicesViewSystem />}
        />

        <Route path="/dynamic-workspace" element={<DynamicWorkSpace />} />
      </Routes>
    </div>
  );
};

export default CpanelRoutes;

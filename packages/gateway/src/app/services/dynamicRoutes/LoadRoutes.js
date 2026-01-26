export const ControlPanelLoadRoutes = async () => {
  let components = [];
  try {
    let { AppShared } = await import("@4eplatform/shared");
    components.push(AppShared);
  } catch (error) {
    console.error("Error loading shared:", error);
  }


  try {
    let { Orghierarchies } = await import(
      "@4eplatform/controlpanel-orghierarchies"
    );
    components.push(Orghierarchies);
  } catch (error) {
    console.error("Error loading Orghierarchies:", error);
  }

  try {
    let { ControlPanelServicesSettings } = await import(
      "@4eplatform/control-panel-services-settings"
    );
    components.push(ControlPanelServicesSettings);
  } catch (error) {
    console.error("Error loading ControlPanelServicesSettings:", error);
  }

  try {
    let { CpanelUsers } = await import(
      "@4eplatform/controlpanel-usermanagement"
    );
    components.push(CpanelUsers);
  } catch (error) {
    console.error("Error loading CpanelUsers:", error);
  }

  try {
    let { Settings } = await import("@4eplatform/platform-settings");
    components.push(Settings);
  } catch (error) {
    console.error("Error loading Settings:", error);
  }

  try {
    let { Connect } = await import("@4eplatform/connect");
    components.push(Connect);
  } catch (error) {
    console.error("Error loading connect:", error);
  }

  return components;
};

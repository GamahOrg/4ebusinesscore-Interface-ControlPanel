import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import PlatformSlice from "./platfromslice";
import EditPlatformMainSettings from "./add-platformsettings-slice";
import AddPlatformSitesSlice from "./add-platformsites-slice";
import PlatformSliceTab2 from "./platformslicetab2";
import EditMainSettingsIsThemeSlice from "./edit-main-settings-theme";
import MainSettingsHeaderSlice from "./main-settings-header";
import EditSignInSettingsSlice from "./edit-signin-settings";
import SubsystemDropdownListSlice from "@4eplatform/control-panel-services-settings/src/slices/getAllSubsystemSlice";

const store = storeRegistry.createStore({
  editPlatformMainSettings: EditPlatformMainSettings,
  fetchPlatform: PlatformSlice,
  addPlatformSites: AddPlatformSitesSlice,
  fetchSites: PlatformSliceTab2,
  addPlatformDepartment: PlatformSliceTab2,
  addPlatformIcon: PlatformSliceTab2,
  fetchPlatformSites: PlatformSlice,
  addSites: PlatformSlice,
  deleteSites: PlatformSlice,
  editSignInSettings: EditSignInSettingsSlice,
  editMainSettingsIsTheme: EditMainSettingsIsThemeSlice,
  mainSettingsHeader: MainSettingsHeaderSlice,
  subsystemDropdownList: SubsystemDropdownListSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

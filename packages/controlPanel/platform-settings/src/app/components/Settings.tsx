import { Route, Routes } from "react-router-dom";
import PlatformSettingsTabs from "./PlatformSettingsTabs";

function Settings() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PlatformSettingsTabs />}>
        </Route>
      </Routes>
    </>
  );
}

export default Settings;

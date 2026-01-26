import { Route, Routes } from "react-router-dom";
import PlatformSettings from "./app/PlatformSettings";

const App = () => {
  return (
    <Routes>
      <Route path="platform-settings/*" element={<PlatformSettings />} />
    </Routes>
  );
};

export default App;

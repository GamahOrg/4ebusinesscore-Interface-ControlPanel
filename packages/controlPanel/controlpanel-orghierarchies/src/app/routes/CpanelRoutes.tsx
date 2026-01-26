import React from "react";
import { Route, Routes } from "react-router-dom";
import "./style.css";
import { AdminPanelHierararchy } from "../admin-panel-hierararchy";

const CpanelRoutes: React.FC = () => {
  // throw new Error('Intentional error thrown');
  return (
    <div className="cpanel">
      <Routes>
        <Route path="/" element={<AdminPanelHierararchy />} />
      </Routes>
    </div>
  );
};

export default CpanelRoutes;

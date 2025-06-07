// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import StaffRoutes from "./StaffRoutes";
import NotFound from "../common/Nofound";
import { HomePage } from "../layouts/client/pages/HomePage";
import { OrderStatusPage } from "../layouts/staff/pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/staff/*" element={<StaffRoutes />} />

      <Route path="/orders/:orderId" element={<OrderStatusPage />} />

      <Route path="/*" element={<ClientRoutes />} />
      {/* Si no se encuentra ninguna ruta válida */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

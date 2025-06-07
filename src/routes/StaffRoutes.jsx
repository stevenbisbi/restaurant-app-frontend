// src/routes/StaffRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { SignUpFromStaff } from "../layouts/staff/forms/SignUpFromStaff";
import { DashboardStaff } from "../layouts/staff/pages/DashboardStaff";
import { OrderStatusPage } from "../layouts/staff/pages/OrderStatusPage";
import { TableStaffPage } from "../layouts/staff/pages/TableStaffPage";
import { ReservationStaffPage } from "../layouts/staff/pages/ReservationStaffPage";
import { PaymentStaffPage } from "../layouts/staff/pages/PaymentStaffPage";
import NotFound from "../common/Nofound";

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="SignUp" element={<SignUpFromStaff />} />
      <Route path="dashboard" element={<DashboardStaff />} />
      <Route path="orders" element={<OrderStatusPage />} />
      <Route path="table" element={<TableStaffPage />} />
      <Route path="reservation" element={<ReservationStaffPage />} />
      <Route path="payment" element={<PaymentStaffPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StaffRoutes;

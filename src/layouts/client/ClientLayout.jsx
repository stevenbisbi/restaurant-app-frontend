// src/layouts/client/ClientLayout.jsx
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation";
const ClientLayout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

export default ClientLayout;

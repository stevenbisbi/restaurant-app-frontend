import { Outlet } from "react-router-dom";
import { Aside } from "./components/Aside";
const AdminLayout = () => (
  <>
    <div className="d-flex">
      <Aside />
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  </>
);

export default AdminLayout;

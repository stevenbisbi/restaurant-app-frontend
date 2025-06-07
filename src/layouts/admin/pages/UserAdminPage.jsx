import { HeaderAdmin } from "./HeaderAdmin";

export function UserAdminPage() {
  return (
    <div>
      <HeaderAdmin
        title="User Management"
        btnTitle="Registrar Colaborador"
        endPoint="/admin/user/create"
      />
      <div className="container">
        <p>
          This page will display the user management interface for
          administrators.
        </p>
        {/* Add your user management components or tables here */}
      </div>
    </div>
  );
}

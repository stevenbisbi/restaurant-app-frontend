import { OrderIcon } from "./icons/OrderIcon";
import { TableIcon } from "./icons/TableIcon";
import { ProductIcon } from "./icons/ProductIcon";
import { PaymentIcon } from "./icons/PaymentIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { UserIcon } from "./icons/UserIcon";
import "../../../styles/AdminAside.css";

export function Aside() {
  return (
    <>
      <div className="aside">
        <a
          href="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4 text-dark">Admin Panel</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item ">
            <a
              href="/admin/items"
              className="nav-link text-dark"
              aria-current="page"
            >
              <ProductIcon /> Productos
            </a>
          </li>
          <li>
            <a href="/admin/tables" className="nav-link text-dark">
              <TableIcon className="me-2" />
              Mesas
            </a>
          </li>
          <li>
            <a href="/admin/orders" className="nav-link text-dark">
              <OrderIcon className="me-2" />
              Pedidos
            </a>
          </li>
          <li>
            <a href="/admin/history-payments" className="nav-link text-dark">
              <PaymentIcon className="me-2" />
              Historial de pagos
            </a>
          </li>
          <li>
            <a href="/admin/menu" className="nav-link text-dark">
              <MenuIcon className="me-2" />
              Menu
            </a>
          </li>
          <li>
            <a href="/admin/users" className="nav-link text-dark">
              <UserIcon className="me-2" />
              Usuarios
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

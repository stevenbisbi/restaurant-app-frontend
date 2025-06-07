import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DashboardStaff() {
  return (
    <>
      <Navbar
        expand="md"
        bg="light"
        variant="light"
        fixed="top"
        className="shadow-sm"
      >
        <Navbar.Brand as={Link} to="/staff/dashboard" className="mx-5 fs-5">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle
          className="mx-5 w-100"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex justify-content-between align-items-center">
            <Nav.Link href="/staff/orders" className="mx-5 fs-5">
              Pedidos
            </Nav.Link>
            <Nav.Link href="/staff/payment" className="mx-5 fs-5">
              Reservas
            </Nav.Link>
            <Nav.Link href="/staff/settings" className="mx-5 fs-5">
              Pagos
            </Nav.Link>
          </Nav>
          <Button variant="outline-danger" className="mx-5">
            Salir
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-5 pt-5">
        <h1>Welcome to the Staff Dashboard</h1>
      </div>
    </>
  );
}

import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { Avatar } from "../components/OffCanvas/Avatar";
import { OffCanvas } from "./OffCanvas/OffCanvas";
import fondo from "../../../assets/img/fondo-comida.avif";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, selectCartItems } from "../../../redux/cartSlice";
import { Link } from "react-router-dom";
import "../../../styles/Navigation.css";

export function Navigation() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.firstName);
  const cart = useSelector(selectCartItems);
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);
  const removeFromCart = (item) => {
    dispatch(removeItemFromCart({ itemId: item.id }));
  };

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
        <Container fluid className="px-3 px-md-5">
          <Navbar.Brand as={Link} to="/" className="fs-5">
            Parcha2
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto d-flex flex-wrap" style={{ gap: "1.5rem" }}>
              <Nav.Link
                as={Link}
                to="/salchipapa"
                className="navigation-link fs-5"
              >
                Salchipapa
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/hamburguesa"
                className="navigation-link fs-5"
              >
                Hamburguesa
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/emparedados"
                className="navigation-link fs-5"
              >
                Emparedado
              </Nav.Link>
              <Nav.Link as={Link} to="/perros" className="navigation-link fs-5">
                Perros
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/bebidas"
                className="navigation-link fs-5"
              >
                Bebidas
              </Nav.Link>
            </Nav>
            <Nav className="d-flex flex-wrap">
              <Nav.Link
                as={Link}
                to={token ? "/reservar" : "/login"}
                className="text-warning fs-5"
              >
                Reservar
              </Nav.Link>
              {token ? (
                <Button variant="light" onClick={handleShow}>
                  <Avatar name={name || "Usuario"} />
                </Button>
              ) : (
                <Nav.Link as={Link} to="/login" className="text-danger fs-5">
                  Inicia sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {token && (
        <OffCanvas
          show={showCart}
          handleClose={handleClose}
          cart={cart}
          name={name}
          removeFromCart={removeFromCart}
        />
      )}

      <img
        src={fondo}
        alt="Logo del restaurante"
        className="img-fluid w-100"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
    </>
  );
}

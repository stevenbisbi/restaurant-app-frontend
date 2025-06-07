import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const TablesPage = () => {
  return (
    <Container fluid className="p-0 vh-100">
      <Row className="g-0 h-100">
        {/* Columna izquierda con imagen y texto */}
        <Col md={6} className="d-flex flex-column position-relative">
          <div className="bg-danger text-white h-100 d-flex flex-column">
            <div className="p-4 p-md-5 mt-4">
              <div className="bg-warning text-danger rounded-pill d-inline-block px-3 py-1 mb-4">
                <strong>¡Fresco todos los días!</strong>
              </div>
              <h1 className="display-4 fw-bold mb-3">Ingredientes Premium</h1>
              <p className="fs-5">
                Ingredientes frescos de granja en cada plato que servimos
              </p>

              <div className="d-flex mt-5 mb-5">
                <div
                  className="bg-white rounded-pill mx-2"
                  style={{ width: "30px", height: "3px" }}
                ></div>
                <div
                  className="bg-white opacity-50 rounded-pill mx-2"
                  style={{ width: "30px", height: "3px" }}
                ></div>
                <div
                  className="bg-white opacity-50 rounded-pill mx-2"
                  style={{ width: "30px", height: "3px" }}
                ></div>
              </div>
            </div>

            <div
              className="mt-auto position-relative"
              style={{ height: "40%" }}
            >
              {/* Fondo amarillo */}
              <div
                className="bg-warning position-absolute bottom-0"
                style={{ width: "100%", height: "60%", left: 0, zIndex: 1 }}
              ></div>
              {/* Imagen de fondo */}
              <div
                className="position-absolute bottom-0 w-100 h-100"
                style={{
                  backgroundImage: `url("/api/placeholder/600/500")`,
                  backgroundPosition: "center bottom",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  zIndex: 2,
                }}
              ></div>
            </div>
          </div>
        </Col>

        {/* Columna derecha con formulario de login - CORREGIDA */}
        <Col md={6} className="d-flex align-items-center">
          <div className="w-100 px-5 py-4">
            <div className="mb-5 text-end">
              <h2 className="text-danger fw-bold">Pizznek</h2>
            </div>

            <div className="px-lg-5">
              <h1 className="fw-bold mb-2">¡Bienvenido de nuevo!</h1>
              <p className="text-secondary mb-4">Por favor ingresa tus datos</p>

              <Form className="w-100">
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="py-2"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    id="remember-me"
                    label="Recordarme"
                  />
                  <a
                    href="#"
                    className="text-decoration-none fw-semibold text-danger"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button
                  variant="danger"
                  type="submit"
                  className="w-100 py-2 fw-semibold"
                >
                  Iniciar sesión
                </Button>

                <div className="text-center mt-4">
                  <p className="text-secondary">
                    ¿No tienes una cuenta?{" "}
                    <a
                      href="#"
                      className="text-decoration-none fw-semibold text-danger"
                    >
                      Regístrate
                    </a>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

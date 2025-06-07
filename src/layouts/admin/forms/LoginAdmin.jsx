import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../../api/users/user.api";

import "bootstrap/dist/css/bootstrap.min.css";

const fondo = ("/src/assets/img/loginAdmin.jpg");

export const LoginAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { username, password, rememberMe } = data;

    try {
      const response = await loginUser({ username, password });
      if (response.status === 200) {
        const { token } = response.data;

        // Guardar el usuario en el almacenamiento adecuado
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("token", token);
        }

        // Mostrar mensaje de bienvenida
        toast.success(`¡Bienvenido ${username}!`);

        // Redirigir después de mostrar el mensaje
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error("Error en el inicio de sesión");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          `${error.response.data.message || "Usuario o contraseña incorrectos"}`
        );
      } else {
        toast.error("Error en el registro");
      }
    }
  });

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Container fluid className="p-0 vh-100">
      <Row className="g-0 h-100">
        {/* Columna izquierda */}
        <Col md={7} className="position-relative p-0">
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundImage: `url(${fondo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="overlay"></div>

          <div className="position-relative h-100 d-flex flex-column justify-content-between p-5 text-white content">
            <div>
              <div className="bg-warning text-danger rounded-pill d-inline-block px-4 py-2 mb-4">
                <strong>¡Fresco todos los días!</strong>
              </div>
              <h1 className="display-4 fw-bold mb-3">Ingredientes Premium</h1>
              <p className="fs-5">
                Ingredientes frescos de granja en cada plato que servimos.
              </p>
            </div>
          </div>
        </Col>

        {/* Formulario */}
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center bg-white"
        >
          <div className="w-100 p-5" style={{ maxWidth: "500px" }}>
            <h2 className="text-primary fw-bold text-center mb-5">Parcha2</h2>

            <h1 className="display-6 fw-bold mb-3">¡Bienvenido de nuevo!</h1>
            <p className="text-secondary mb-4">Por favor ingresa tus datos</p>

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu usuario"
                  {...register("username", { required: true })}
                  isInvalid={!!errors.username}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  {...register("password", { required: true })}
                  isInvalid={!!errors.password}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  label="Recordarme"
                  {...register("rememberMe")}
                />
                <Link to="/recover" className="text-primary fw-bold">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="w-100 py-2 fw-bold"
              >
                Iniciar sesión
              </Button>

              <p className="text-center mt-4 text-secondary">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-primary fw-bold">
                  Regístrate
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

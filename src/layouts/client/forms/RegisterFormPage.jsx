import { useForm } from "react-hook-form";
import {
  createUser,
  updateUser,
  getUser,
  loginUser,
} from "../../../api/users/user.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Container, Spinner, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/authSlice";
import fondo from "../../../assets/img/hamburgesa7.jpg";

export function RegisterFormPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const { email, first_name, last_name, phone_number, password } = data;

    try {
      if (params.id) {
        await updateUser(params.id, {
          email,
          first_name,
          last_name,
          phone_number,
        });
        toast.success("Usuario actualizado exitosamente");
        navigate("/admin/users");
      } else {
        // Crear nuevo usuario
        const response = await createUser({
          email,
          first_name,
          last_name,
          phone_number,
          password,
        });

        toast.success("Usuario registrado exitosamente");

        // Login automático después del registro
        try {
          const loginResponse = await loginUser({ email, password });
          if (loginResponse.status === 200) {
            const { token, user } = loginResponse.data;

            dispatch(
              setCredentials({
                token,
                user: {
                  id: user.id,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  role: user.role,
                },
              })
            );

            sessionStorage.setItem("token", token);
            sessionStorage.setItem("username", user.first_name);

            navigate("/home");
          } else {
            throw new Error("Login fallido");
          }
        } catch (loginError) {
          console.error(
            "Login error:",
            loginError.response?.data || loginError
          );
          toast.error("Error al iniciar sesión automáticamente");
        }
      }
    } catch (error) {
      toast.error("Error al procesar el formulario");
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getUser(params.id);
          setValue("email", res.data.email);
          setValue("first_name", res.data.first_name);
          setValue("last_name", res.data.last_name);
          setValue("phone_number", res.data.phone_number || "");
        } catch (error) {
          toast.error("Error cargando datos del usuario", error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadUser();
  }, [params.id, setValue]);

  return (
    <Container fluid className="p-0 vh-100">
      <Row className="g-0 h-100">
        {/* Columna izquierda con imagen */}
        <Col
          md={6}
          className="position-relative d-none d-md-block"
          style={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" />
          <div className="position-relative h-100 d-flex flex-column justify-content-between p-5 text-white">
            <div>
              <div className="bg-warning text-danger rounded-pill d-inline-block px-4 py-2 mb-4">
                <strong>¡Fresco todos los días!</strong>
              </div>
              <h1 className="display-4 fw-bold mb-3">Trato Especial</h1>
              <p className="fs-5">
                Pide y paga en el restaurante, ¡sin esperas!
                <br />
                <strong>¡Parcha2!</strong>
              </p>
            </div>
          </div>
        </Col>

        {/* Columna derecha con formulario */}
        <Col
          md={{ span: params.id ? 12 : 6 }}
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <div className="w-100 p-4" style={{ maxWidth: "500px" }}>
            <h2 className="text-danger mb-4">
              {params.id ? "Editar Usuario" : "Registro en Parcha2"}
            </h2>

            <Form onSubmit={onSubmit}>
              {/* Información Personal */}
              <div className="mb-4">
                <h5 className="text-secondary mb-3">
                  {params.id
                    ? "Información del Usuario"
                    : "Información Personal"}
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.first_name}
                    {...register("first_name", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Mínimo 2 caracteres",
                      },
                    })}
                    onBlur={() => trigger("first_name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.first_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.last_name}
                    {...register("last_name", {
                      required: "El apellido es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Mínimo 2 caracteres",
                      },
                    })}
                    onBlur={() => trigger("last_name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.last_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Teléfono:</Form.Label>
                  <Form.Control
                    type="tel"
                    isInvalid={!!errors.phone_number}
                    {...register("phone_number", {
                      pattern: {
                        value: /^[0-9+\-\s()]{7,15}$/,
                        message: "Formato de teléfono inválido",
                      },
                    })}
                    placeholder="Opcional"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone_number?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Información de Cuenta */}
                <h5 className="text-secondary mb-3 mt-4">
                  Información de Cuenta
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    isInvalid={!!errors.email}
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        message: "Ingresa un correo válido",
                      },
                    })}
                    onBlur={() => trigger("email")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {!params.id && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña:</Form.Label>
                      <Form.Control
                        type="password"
                        autoComplete="new-password"
                        isInvalid={!!errors.password}
                        {...register("password", {
                          required: "La contraseña es obligatoria",
                        })}
                        onBlur={() => trigger("password")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                      <Form.Text muted>
                        Mínimo 8 caracteres con mayúsculas, minúsculas y números
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Contraseña:</Form.Label>
                      <Form.Control
                        type="password"
                        autoComplete="new-password"
                        isInvalid={!!errors.confirmPassword}
                        {...register("confirmPassword", {
                          required: "Confirma la contraseña",
                          validate: (value) =>
                            value === password ||
                            "Las contraseñas no coinciden",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}
              </div>

              <Button
                variant="danger"
                type="submit"
                className="w-100 py-2 fw-bold text-white"
                disabled={loading || (!params.id && !isValid)}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : params.id ? (
                  "Actualizar Usuario"
                ) : (
                  "Crear Cuenta"
                )}
              </Button>

              {!params.id && (
                <div className="text-center mt-3">
                  <p className="text-secondary">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                      to="/login"
                      className="text-danger text-decoration-none"
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </div>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

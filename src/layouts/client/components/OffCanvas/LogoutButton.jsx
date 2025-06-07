import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/authSlice"; // Asegúrate de que esta ruta sea correcta

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // ✅ Limpia Redux y el almacenamiento
    toast.success("Sesión cerrada con éxito");
    navigate("/"); // Redirige al home o login
  };

  return (
    <Button
      variant="outline-danger"
      onClick={handleLogout}
      className="logout-button"
    >
      Cerrar sesión
    </Button>
  );
};

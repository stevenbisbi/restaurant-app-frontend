import { useSelector } from "react-redux";
import { selectCartItems } from "../../../../redux/cartSlice";

export function Avatar({ name }) {
  // Obtiene los items del carrito desde el estado global
  const cart = useSelector(selectCartItems);
  return (
    <>
      {/* Puedes mostrar un badge con cantidad de items */}
      {cart.length > 0 && (
        <span className="position-absolute top-1 translate-middle-x badge rounded-pill bg-danger d-flex align-items-center">
          {cart.length}
        </span>
      )}
      <img
        src={`https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&size=40`}
        alt="User Avatar"
        style={{ borderRadius: "50%" }} // Asegura que la imagen sea redonda
      />
    </>
  );
}

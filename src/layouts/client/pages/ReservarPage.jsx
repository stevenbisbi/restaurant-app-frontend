import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReservaModal } from "../components/ReservaModal"; // 👈 nuevo
import "../../../styles/Reservar.css";
import {
  getAllTables,
  getRestaurantHours,
  createReservation,
} from "../../../api/reservationApi";
import toast from "react-hot-toast";
import {
  deleteReservation,
  updateReservation,
} from "../../../api/reservationApi";

export function ReservarPage() {
  const token = useSelector((state) => state.auth.token);
  const customerId = useSelector((state) => state.auth.customer?.id);
  const [mesas, setMesas] = useState([]);
  const [horarios, setHorarios] = useState({ open: "", close: "" });

  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllTables().then((res) => setMesas(res.data || res));
    getRestaurantHours().then((res) =>
      setHorarios({
        open: res.data?.open_time || res.open_time,
        close: res.data?.close_time || res.close_time,
      })
    );
  }, []);

  if (!token) return <Navigate to="/login" />;

  const handleMesaClick = (mesa) => {
    if (!mesa.is_reserved) {
      setMesaSeleccionada(mesa);
      setShowModal(true);
    }
  };

  const realizarReserva = async (peopleCount) => {
    if (!peopleCount || !mesaSeleccionada || !customerId) {
      toast.error("Faltan datos para la reserva");
      return;
    }

    // Validar capacidad máxima
    if (peopleCount > mesaSeleccionada.capacity) {
      toast.error(
        `Esta mesa solo tiene capacidad para ${mesaSeleccionada.capacity} personas`
      );
      return;
    }

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(":").slice(0, 2).join(":");
    const reservation_date = `${dateStr}T${timeStr}:00`;

    try {
      // 1. Actualización optimista
      setMesas((prev) =>
        prev.map((m) =>
          m.id === mesaSeleccionada.id
            ? {
                ...m,
                is_reserved: true,
                status: "Reserved",
              }
            : m
        )
      );

      // 2. Crear reserva en backend
      const response = await createReservation({
        customer: customerId,
        table: mesaSeleccionada.id,
        reservation_date,
        duration: 60,
        group_size: parseInt(peopleCount),
        special_requests: "",
        status: "33c7bd16-ff5b-467b-a548-bdd0397b1caa",
      });

      toast.success("Mesa reservada exitosamente");
      setShowModal(false);
      setMesaSeleccionada(null);

      // 3. Actualizar solo la mesa afectada en lugar de todas
      setMesas((prev) =>
        prev.map((m) =>
          m.id === mesaSeleccionada.id
            ? {
                ...m,
                is_reserved: true,
                status: "Reserved",
                // Añade cualquier otro campo que devuelva el backend
                ...(response.data?.table || {}),
              }
            : m
        )
      );
    } catch (error) {
      // Revertir en caso de error
      setMesas((prev) =>
        prev.map((m) =>
          m.id === mesaSeleccionada.id
            ? {
                ...m,
                is_reserved: false,
                status: "Available",
              }
            : m
        )
      );
      toast.error("Error al reservar mesa");
      console.error("Error detallado:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
    }
  };

  const cancelarReserva = async (reservationId, mesaId) => {
    try {
      await deleteReservation(reservationId);
      toast.success("Reserva cancelada");

      setMesas((prev) =>
        prev.map((m) => (m.id === mesaId ? { ...m, is_reserved: false } : m))
      );
    } catch (error) {
      toast.error("Error al cancelar la reserva");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Selecciona tu mesa</h2>
        <div className="mesas-container">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className={`mesa-cuadro ${
                mesa.is_reserved ? "mesa-reservada" : "mesa-libre"
              }`}
              onClick={() => handleMesaClick(mesa)}
            >
              <div>T-{mesa.number}</div>
              <div style={{ fontSize: "0.75rem" }}>
                {mesa.is_reserved ? "Reservada" : "Disponible"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <ReservaModal
          mesa={mesaSeleccionada}
          onClose={() => setShowModal(false)}
          onReservar={realizarReserva}
        />
      )}
    </>
  );
}

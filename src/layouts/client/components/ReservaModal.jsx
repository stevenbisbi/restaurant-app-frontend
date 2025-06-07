import "../../../styles/ReservaModal.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ReservaModal({ mesa, onClose, onReservar }) {
  const [people, setPeople] = useState(1);
  const [reservationDate, setReservationDate] = useState(new Date());
  
  // Capacidad por defecto 2 (según tu requerimiento) o la capacidad de la mesa
  const maxCapacity = mesa?.capacity || 2;

  if (!mesa) return null;

  const handleReservar = () => {
    if (people > maxCapacity) {
      alert(`Esta mesa solo tiene capacidad para ${maxCapacity} personas`);
      return;
    }
    onReservar(people);
  };

  // Genera botones de selección de personas según capacidad máxima
  const renderPeopleButtons = () => {
    const buttons = [];
    for (let i = 1; i <= maxCapacity; i++) {
      buttons.push(
        <button
          key={i}
          className={`people-btn ${people === i ? 'active' : ''}`}
          onClick={() => setPeople(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">Nueva Reserva</h2>
        <p className="modal-subtitle">
          Mesa: T-{mesa.number} (Capacidad: {maxCapacity} personas)
        </p>

        <div className="datetime-section">
          <h3 className="section-title">Fecha y Hora:</h3>
          <div className="datetime-display">
            {reservationDate.toLocaleString('es-CO', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </div>
        </div>

        <div className="calendar-container">
          <DatePicker
            selected={reservationDate}
            onChange={(date) => setReservationDate(date)}
            inline
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
          />
        </div>

        <div className="people-section">
          <h3 className="section-title">Total de Personas (Máx: {maxCapacity})</h3>
          <div className="people-buttons">
            {renderPeopleButtons()}
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="reserve-btn" onClick={handleReservar}>
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRestaurants } from "../../../api/restaurantsApi";
import { createTable, updateTable, getTable } from "../../../api/tablesApi";

export function TableAdminForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    restaurant: "",
    number: "",
    capacity: "",
    location: "",
    status: "Available", // estado por defecto
    qr_code_url: "",
  });

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then((res) => setRestaurants(res.data));
    console.log("Restaurants:", restaurants);
    if (isEdit) {
      getTable(id).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateTable(id, formData);
    } else {
      await createTable(formData);
    }
    navigate("/admin/tables");
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">
            {isEdit ? "Editar Mesa" : "Crear Mesa"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="restaurant" className="form-label">
                Restaurante:
              </label>
              <select
                id="restaurant"
                className="form-select"
                name="restaurant"
                value={formData.restaurant}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona un restaurante --</option>
                {restaurants.map((rest) => (
                  <option key={rest.id} value={rest.id}>
                    {rest.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Número de Mesa:
              </label>
              <input
                id="number"
                className="form-control"
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                min={1}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                Capacidad:
              </label>
              <input
                id="capacity"
                className="form-control"
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min={1}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                URL Código QR (opcional):
              </label>
              <select
                id="location"
                className="form-select"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Selecciona una ubicacion"
              >
                <option value="Primer piso">Primer piso</option>
                <option value="Segundo piso">Segundo piso</option>
                <option value="Terraza">Terraza</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Estado:
              </label>
              <select
                id="status"
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Available">Disponible</option>
                <option value="Occupied">Ocupada</option>
                <option value="Reserved">Reservada</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="qr_code_url" className="form-label">
                Código QR:
              </label>
              <input
                id="qr_code_url"
                className="form-control"
                type="text"
                name="qr_code_url"
                value={formData.qr_code_url}
                onChange={handleChange}
                placeholder="Ej. https://example.com/qr-code"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                {isEdit ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

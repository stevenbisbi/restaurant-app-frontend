import { useState, useEffect } from "react";
import { createMenu, updateMenu, getMenu } from "../../../api/menu/menuApi";
import { getAllRestaurants } from "../../../api/restaurantsApi";
import { useNavigate, useParams } from "react-router-dom";

export function MenuAdminForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: false,
    restaurant: "", // Ajusta esto según cómo asignes restaurantes
  });

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then((res) => setRestaurants(res.data));
    console.log("Restaurants:", restaurants);
    if (isEdit) {
      getMenu(id).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("Form Data:", formData);
    e.preventDefault();
    if (isEdit) {
      await updateMenu(id, formData);
    } else {
      await createMenu(formData);
    }
    navigate("/admin/menu");
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">
            {isEdit ? "Editar Menú" : "Crear Menú"}
          </h2>{" "}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre del menú:
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Menú desayuno"
                required
              />
            </div>

            <textarea
              className="form-control mb-3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
            />
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

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_active"
                id="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_active">
                Activo
              </label>
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

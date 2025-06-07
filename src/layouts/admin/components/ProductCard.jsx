import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm">
        {/* Imagen del producto */}
        <img
          src={product.image_url || "/placeholder-food.jpg"}
          className="card-img-top object-fit-cover"
          alt={product.name}
          style={{ height: "200px" }}
        />

        <div className="card-body d-flex flex-column">
          {/* Badges de estado */}
          <div className="d-flex gap-2 mb-2 flex-wrap">
            <span
              className={`badge ${
                product.is_available ? "bg-success" : "bg-danger"
              }`}
            >
              {product.is_available ? "Disponible" : "Agotado"}
            </span>
            {product.is_vegetarian && (
              <span className="badge bg-success">🌱 Vegetariano</span>
            )}
            {product.is_featured && (
              <span className="badge bg-warning text-dark">⭐ Destacado</span>
            )}
            {product.is_promotion && (
              <span className="badge bg-danger">🔥 En promoción</span>
            )}
          </div>

          {/* Información principal */}
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>

          {/* Descripción */}
          <p className="card-text flex-grow-1" style={{ minHeight: "60px" }}>
            {product.description?.slice(0, 80)}
            {product.description?.length > 80 && "..."}
          </p>

          {/* Precio y acciones */}
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 text-primary">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <div className="btn-group">
              <Link
                to={`/admin/products/edit/${product.id}`}
                className="btn btn-sm btn-outline-primary"
              >
                Editar
              </Link>
              <button
                className="btn btn-sm btn-outline-danger"
                /*  onClick={() => /* Tu función de eliminación */
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Fecha de creación */}
        <div className="card-footer bg-transparent">
          <small className="text-muted">
            Creado: {new Date(product.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
  );
}

import { Spinner, Alert } from "react-bootstrap";
import { MenuCard } from "../components/menu/MenuCard";
import { ModalMenuCard } from "../components/menu/ModalMenuCard";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";
import { Navigation } from "../components/Navigation";

export function EmparedadosPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  const { data, loading, error } = useFetch(getAllMenuItems);
  if (loading) {
    return (
      <div className="text-center  m-5">
        <Spinner
          animation="grow"
          role="status"
          variant="warning"
          style={{ width: 80, height: 80 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{error}</Alert>;
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">
          <i>¡Un bocado y te enamoras! 🥪❤️</i>
        </h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {data.map((item) => {
            if (!item.is_available) return null;
            if (item.category !== "Emparedados") return null; // Filter for Salchipapa category
            return (
              <MenuCard
                key={item.iditem}
                item={item}
                onSelect={setSelectedItem}
              />
            );
          })}
        </div>

        <ModalMenuCard
          item={selectedItem}
          show={!!selectedItem}
          onHide={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}

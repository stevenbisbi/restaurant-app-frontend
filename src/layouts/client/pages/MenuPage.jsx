import { Spinner, Alert, Col, Row } from "react-bootstrap";
import { MenuCard } from "../components/menu/MenuCard";
import { ModalMenuCard } from "../components/menu/ModalMenuCard";
import { useFetch } from "../../../hooks/useFetch";
import { useState } from "react";
import { getAllMenuItems } from "../../../api/menu/menuItemApi";

export function MenuPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const menuFetch = useFetch(getAllMenuItems);
  if (menuFetch.loading) {
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

  if (menuFetch.error) {
    return (
      <div className="text-center m-5">
        <Alert variant="danger">{menuFetch.error}</Alert>;
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">
          <i>Lo Mejor Aquí</i>
        </h1>
        <Row className="g-4">
          {menuFetch.data.map((item) => {
            if (!item.is_available) return null;
            return (
              <Col xs={12} sm={6} md={4} key={item.id}>
                <MenuCard item={item} onSelect={menuFetch.setSelectedDataId} />
              </Col>
            );
          })}
        </Row>

        <ModalMenuCard
          item={menuFetch.selectedDataId}
          show={!!menuFetch.selectedDataId}
          onHide={() => menuFetch.setSelectedDataId(null)}
          onAddToCart={addToCart}
        />
      </div>
    </>
  );
}

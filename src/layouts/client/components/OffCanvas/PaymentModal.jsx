import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../redux/cartSlice";
import { createOrder } from "../../../../api/orderApi";

export function PaymentModal({
  show,
  handleClose,
  cartItems,
  onPaymentSuccess,
}) {
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleCreateOrder = async () => {
    const id = toast.loading("Procesando orden...");
    try {
      const orderData = {
        customer: null, // ⚠️ Reemplazar por el ID real
        table: null, // ⚠️ Reemplazar por el ID real
        staff: null, // Si no hay staff asignado
        special_instructions: "Sin sal",
        subtotal: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        total: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        items: cartItems.map((item) => ({
          product: item.id, // ⚠️ Asegúrate de que sea el ID del producto, no del OrderItem
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await createOrder(orderData);
      const createdOrder = response.data;

      console.log(createdOrder.id);

      toast.success("Orden creada con éxito", { id });
      dispatch(clearCart());
      handleClose();
      // Aquí envías el ID al componente padre
      onPaymentSuccess?.(createdOrder.id);
    } catch (error) {
      toast.error("Error al crear la orden", { id });
    }
  };

  const handlePayFizical = () => {
    handleCreateOrder("Recibo físico");
  };

  const handlePay = () => {
    if (!selectedMethod) {
      toast.error("Por favor selecciona un método de pago.");
      return;
    }
    handleCreateOrder(selectedMethod);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Método de pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Selecciona tu método de pago preferido para continuar con tu orden:
        </p>
        <Form>
          <Form.Check
            type="radio"
            label="PSE (Pagos seguros en línea)"
            name="paymentMethod"
            value="PSE"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Tarjeta de crédito o débito"
            name="paymentMethod"
            value="Tarjeta"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Nequi"
            name="paymentMethod"
            value="Nequi"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Daviplata"
            name="paymentMethod"
            value="Daviplata"
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => {
            handlePayFizical();
          }}
        >
          Pagar con recibo
        </Button>
        <Button variant="success" onClick={handlePay}>
          Confirmar y pagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

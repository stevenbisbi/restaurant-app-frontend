import { Modal, Button } from "react-bootstrap";

export function ModalDelete({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        ¿Deseas eliminar este elemento?
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={onConfirm}>
          Sí
        </Button>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

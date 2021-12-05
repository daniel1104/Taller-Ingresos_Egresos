import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const MovementModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const [movementModal, setmovementModal] = useState({
    modalTitle: "",
    modalBody: "",
  });

  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => ({
    showMessageModal(title, body) {
      setmovementModal({ modalTitle: title, modalBody: body });
      setShow(true);
    },
  }));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movementModal.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{movementModal.modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default MovementModal;

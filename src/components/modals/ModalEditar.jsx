import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import MovementForm from "../Forms/MovementForm";

const ModalEditar = ({ balance, movement, editmovement }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const hideModal = () => {
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <MdEdit />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MovementForm
            balance={balance}
            editmovement={editmovement}
            editedmovement={movement}
            hideModal={hideModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditar;

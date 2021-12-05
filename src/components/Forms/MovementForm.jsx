import React, { useState, useRef } from "react";
import {
  Form,
  Col,
  Row,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import MovementModal from "../modals/MovementModal";
import { v4 as uuidv4 } from "uuid";
import {BiDollarCircle} from "react-icons/bi";
import {AiFillFile} from "react-icons/ai";

const MovementForm = ({ balance, addMovement, editmovement, editedmovement, hideModal }) => {
  const childRef = useRef();

  const [movement, setmovement] = useState({
    id: editedmovement?.id ?? "",
    typemovement: editedmovement?.typemovement ?? "Ingreso",
    name: editedmovement?.name ?? "",
    movementValue: editedmovement?.movementValue ?? 0,
  });


  const handleInputChange = (e) => {
    setmovement({ ...movement, [e.target.name]: e.target.value });
  };

  const handleInputmovementValueChange = (e) => {
    setmovement({ ...movement, movementValue: parseFloat(e.target.value) });
  };


  const handleCancelClick = (e) => {
    setmovement({ ...movement, typemovement: "Ingreso", name: "", movementValue: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = "";

    if (!movement.name.trim()) {
      validationErrors += "El nombre es obligatorio.";
    }

    if (movement.movementValue <= 0) {
      validationErrors += "La cantidad debe ser mayor que cero.";
    } else if (isNaN(movement.movementValue)) {
      validationErrors += "Debes ingresar un valor";
    }

    if (
      movement.typemovement === "Gasto" &&
      parseFloat(movement.movementValue) > parseFloat(balance.finalBalance)
    ) {
      validationErrors +=
        "No cuenta con el suficiente saldo para realizar este movimiento.";
    }

    if (validationErrors.trim() !== "") {
      childRef.current.showMessageModal("Error", validationErrors);
    } else {
      if (editedmovement) {
        editmovement(movement);
        hideModal();
      } else {
        addMovement({ ...movement, id: uuidv4() });
      }

      setmovement({ ...movement, typemovement: "Ingreso", name: "", movementValue: 0 });

      childRef.current.showMessageModal(
        "Exito",
        "Registro guardado correctamente."
      );
    }
  };

  return (
    <Card>
      <Card.Header>Registro</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="5">
              Tipo de Movimiento:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                as="select"
                name="typemovement"
                onChange={handleInputChange}
                value={movement.typemovement}
              >
                <option>Ingreso</option>
                <option>Gasto</option>
              </Form.Control>
            </Col>

            <Form.Label column sm="5" className="mt-4">
              Nombre:
            </Form.Label>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="mt-4">
                    <AiFillFile />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  sm="5"
                  className="mt-4"
                  aria-label="Amount (to the nearest dollar)"
                  name="name"
                  value={movement.name}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>

            <Form.Label column sm="5" className="mt-4">
              Cantidad:
            </Form.Label>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="mt-4">
                    <BiDollarCircle/>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  sm="5"
                  className="mt-4"
                  aria-label="Amount (to the nearest dollar)"
                  type="number"
                  name="movementValue"
                  value={movement.movementValue}
                  onChange={handleInputmovementValueChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
          <Button
            className="ml-5"
            variant="light"
            onClick={handleCancelClick}
          >
            Cancelar
          </Button>
          <MovementModal ref={childRef} />
          <Button className="ml-5" variant="primary" type="submit">
            {editedmovement ? "Editar Movimiento" : "Agregar Movimiento"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MovementForm;

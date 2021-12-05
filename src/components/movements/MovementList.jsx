import React from "react";
import {
  Badge,
  Col,
  Form,
  Container,
  FormControl,
  InputGroup,
  Card,
  Table,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";


import MovementItem from "./MovementItem";

const MovementList = ({
  balance,
  movements,
  establishSearchFilter,
  establishTypemovementFilter,
  removemovement,
  editmovement,
}) => {
  const handleSearchInputChange = (e) => {
    establishSearchFilter(e.target.value);
  };

  const handleCheckboxesClick = (e) => {
    establishTypemovementFilter(e.target.value);
  };

  return (
    <Card>
      <Card.Header>
        Listado Movimientos
        <div className="float-right">
          <Badge variant="primary">{movements.length}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Username
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <AiOutlineSearch/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroup"
                placeholder="Buscar"
                onChange={handleSearchInputChange}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Check
              inline
              label="Todos"
              value="Todos"
              type="radio"
              name="movementType"
              onClick={handleCheckboxesClick}
              defaultChecked
            />
            <Form.Check
              inline
              label="Ingreso"
              value="Ingreso"
              type="radio"
              name="movementType"
              onClick={handleCheckboxesClick}
            />
            <Form.Check
              inline
              label="Gasto"
              value="Gasto"
              type="radio"
              name="movementType"
              onClick={handleCheckboxesClick}
            />
          </Col>
        </Form.Row>
      </Card.Body>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Nombre Movimiento</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <MovementItem
                key={movement.id}
                balance={balance}
                movement={movement}
                removemovement={removemovement}
                editmovement={editmovement}
              ></MovementItem>
            ))}
          </tbody>
        </Table>
      </Container>
    </Card>
  );
};

export default MovementList;

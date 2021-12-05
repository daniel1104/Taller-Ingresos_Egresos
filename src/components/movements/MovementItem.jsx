import React from "react";
import { Button} from "react-bootstrap";
import { BsFillXSquareFill } from "react-icons/bs";

import ModalEditar from "../modals/ModalEditar";

const MovementItem = ({ balance, movement, removemovement, editmovement }) => {
  const handleRemoveClick = () => {
    removemovement(movement.id);
  };

  return (
    <tr>
      <td Style="width: 115px">
        {" "}
        <Button className={"alert-danger"} type="button" onClick={handleRemoveClick}>
          <BsFillXSquareFill />
        </Button>{" "}
        <ModalEditar balance={balance} movement={movement} editmovement={editmovement} />
      </td>
      <td>{movement.name}</td>
      <td
        className={movement.typemovement === "Ingreso" ? "table-success" : "table-danger"}
      >
        {movement.movementValue}
      </td>
    </tr>
  );
};

export default MovementItem;

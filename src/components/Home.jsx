import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import MovementList from "./movements/MovementList";
import MovementForm from "./Forms/MovementForm";

const Home = () => {
    const [movement, setMovement] = useState([]);
    const [title, setTitle] = useState("INGRESOS Y EGRESOS");

    const [movementFiltered, setMovementFiltered] = useState([]);

    let _searchFilter = "";
    let _typeMovementFilter = "Todos";


    const [balance, setBalance] = useState({
        initialBalance: 0.0,
        totalMovements: 0.0,
        finalBalance: 0.0,
    });

    useEffect(() => {
        const total = movement.reduce(
            (total, movement) =>
                (total =
                    movement.typemovement === "Ingreso"
                        ? parseFloat(total) + parseFloat(movement.movementValue)
                        : parseFloat(total) - parseFloat(movement.movementValue)),
            0
        );
        setBalance({
            ...balance,
            totalmovements: total,
            finalBalance: parseFloat(balance.initialBalance) + parseFloat(total),
        });

        refreshList();
    }, [movement]);

    const updateInitialBalance = (initialBalance) => {
        setBalance({
            ...balance,
            initialBalance: parseFloat(initialBalance),
            finalBalance: parseFloat(initialBalance) + parseFloat(balance.totalMovements),
        });
    };

    const establishSearchFilter = (searchFilter) => {
        _searchFilter = searchFilter;
        refreshList();
    };

    const establishTypemovementFilter = (typemovementFilter) => {
        _typeMovementFilter = typemovementFilter;
        refreshList();
    };

    const refreshList = () => {
        let filter = movement.filter(
            (movement) =>
                movement.name.toLowerCase().includes(_searchFilter.toLowerCase()) &&
                (_typeMovementFilter === "Todos" || movement.typemovement === _typeMovementFilter)
        );

        setMovementFiltered(filter);
    };


    const addMovement = (newMovement) => {
        setMovement([...movement, newMovement]);
    };


    const removeMovement = (id) => {
        setMovement(movement.filter((movementToDelete) => movementToDelete.id !== id));
    };


    const editmovement = (movementEdited) => {
        setMovement(
            movement.map((movementToEdit) => {
                if (movementToEdit.id === movementEdited.id) {
                    return {
                        ...movementToEdit,
                        typemovement: movementEdited.typemovement,
                        name: movementEdited.name,
                        movementValue: movementEdited.movementValue,
                    };
                }
                return movementToEdit;
            })
        );
    };

    return (
        <Container fluid={true}>
            <Header
                title={title}
                balance={balance}
                updateInitialBalance={updateInitialBalance}
            />
            <Row>
                <Col xs={6}>
                    <MovementForm balance={balance} addMovement={addMovement} />
                </Col>
                <Col xs={6}>
                    <MovementList
                        balance={balance}
                        movements={movementFiltered}
                        establishSearchFilter={establishSearchFilter}
                        establishTypemovementFilter={establishTypemovementFilter}
                        removemovement={removeMovement}
                        editmovement={editmovement}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;




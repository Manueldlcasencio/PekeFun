import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Child_Selection_Modal = ({ show, onHide, childList }) => {
  const { store, actions } = useContext(Context);

  const handleChildCheckboxChange = (child, checked) => {
    if (checked) {
      actions.setSelectedChildren([...store.selectedChildren, child]);
    } else {
      actions.setSelectedChildren(store.selectedChildren.filter(c => c.id !== child.id));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Inscribir niños</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
  {childList && childList.map(child => (
    <Form.Check
      key={child.id}
      id={`child-${child.id}`}
      label={`${child.name} ${child.lastname}`}
      defaultChecked
      onChange={e => handleChildCheckboxChange(child, e.target.checked)}
    />
  ))}
</Form>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={actions.handleChildSelectionSubmit}>Inscribir niños seleccionados</Button>
      </Modal.Footer>
    </Modal>
  );
};

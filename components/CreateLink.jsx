import React from "react";
import { Modal, Progress } from "rsuite";
const { Line } = Progress;

export default function CreateLink({ modal, setModal, survey }) {
  const close = () => {
    setModal(false);
  };
  return (
    <Modal
      show={modal}
      onHide={close}
      style={{
        maxWidth: "90vw",
        maxHeight: "100vh",
      }}
    >
      <Modal.Header></Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

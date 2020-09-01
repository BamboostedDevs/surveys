import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Icon,
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from "rsuite";
import styled from "styled-components";

const _Box = ({ className, select, children, id, width }) => {
  return (
    <div className={className}>
      <div id={id} className="dimm" onClick={select} />
      {children}
    </div>
  );
};

const Box = styled(_Box)`
  transition: border-color 0.25s;
  margin: 16px 0 16px 0;
  cursor: pointer;
  position: relative;
  width: ${({ width }) => width || "auto"};

  ${({ selected }) =>
    selected
      ? "border-radius: 6px; border-style: solid; border-width: 1px; border-color: #1675e0;"
      : "border-radius: 6px; border-style: solid; border-width: 1px; border-color: rgba(0,0,0,0);"};

  .dimm {
    cursor: pointer;
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
`;

export default function InputChoice({ modal, setModal, addInput }) {
  const [selected, select] = useState(false);
  const close = () => {
    setModal(false);
    select(false);
  };
  const handleSelect = (e) => {
    selected !== Number(e.target.id)
      ? select(Number(e.target.id))
      : select(false);
  };
  const handleSubmit = () => {
    const cases = [
      {
        type: "text",
      },
      {
        type: "textArea",
      },
      {
        type: "number",
      },
      {
        type: "date",
      },
      {
        type: "multipleChoice",
      },
      {
        type: "choice",
      },
    ];
    addInput(cases[selected]);
    close();
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
      <Modal.Header>
        <Modal.Title>Choose an input type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box id={0} selected={selected === 0} select={handleSelect}>
          <Input placeholder="Text" />
        </Box>
        <Box id={1} selected={selected === 1} select={handleSelect}>
          <Input placeholder="Text area" componentClass="textarea" />
        </Box>
        <Box id={2} selected={selected === 2} select={handleSelect}>
          <InputNumber placeholder="Number" />
        </Box>
        <Box
          id={3}
          selected={selected === 3}
          select={handleSelect}
          width="fit-content"
        >
          <DatePicker />
        </Box>
        <Box
          id={4}
          selected={selected === 4}
          select={handleSelect}
          width="fit-content"
        >
          <CheckboxGroup style={{ paddingRight: "8px" }}>
            {[<Checkbox key="0">Multiple choice</Checkbox>]}
          </CheckboxGroup>
        </Box>
        <Box
          id={5}
          selected={selected === 5}
          select={handleSelect}
          width="fit-content"
        >
          <RadioGroup style={{ paddingRight: "8px" }}>
            {[<Radio key="0">Choose one</Radio>]}
          </RadioGroup>
        </Box>
      </Modal.Body>
      {selected !== false && (
        <IconButton
          style={{ position: "absolute", bottom: 16, right: 16 }}
          appearance="ghost"
          icon={<Icon icon="check" />}
          circle
          size="lg"
          onClick={handleSubmit}
        />
      )}
    </Modal>
  );
}

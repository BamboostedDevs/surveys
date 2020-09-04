import React from "react";
import { Input, InputNumber, FormGroup, ControlLabel } from "rsuite";
import Dropdown from "./Dropdown";
import { capitalize } from "../../utils";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const StyledInput = styled(TextareaAutosize)`
  min-width: 2em;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  border: none;
  background: transparent;
  margin-bottom: 8px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const Number = ({ survey, idx, update }) => {
  const updatePlaceholder = (value) => {
    var payload = { ...survey };
    payload.form[idx].placeholder = value;
    update(payload);
  };
  const updateQuestion = (event) => {
    event.persist();
    const value = event.target.value;
    var payload = { ...survey };
    payload.form[idx].question = value;
    update(payload);
  };
  const remove = () => {
    var payload = { ...survey };
    payload.form.splice(idx, 1);
    update(payload);
  };
  return (
    <FormGroup>
      <Dropdown
        remove={remove}
        input={
          <StyledInput
            value={survey.form[idx].question || ""}
            onChange={updateQuestion}
            placeholder="Question missing"
          />
        }
      >
        <FormGroup>
          <ControlLabel>Placeholder</ControlLabel>
          <Input
            size={"sm"}
            placeholder={"Placeholder"}
            value={survey.form[idx].placeholder || ""}
            onChange={updatePlaceholder}
          />
        </FormGroup>
      </Dropdown>
      <InputNumber
        placeholder={
          survey.form[idx].placeholder
            ? capitalize(survey.form[idx].placeholder)
            : "Number"
        }
      />
    </FormGroup>
  );
};

export default Number;

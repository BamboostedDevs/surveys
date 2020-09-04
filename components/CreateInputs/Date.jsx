import React from "react";
import { DatePicker, FormGroup } from "rsuite";
import Dropdown from "./Dropdown";
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

const Date = ({ survey, idx, update }) => {
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
        date
        remove={remove}
        input={
          <StyledInput
            value={survey.form[idx].question || ""}
            onChange={updateQuestion}
            placeholder="Question missing"
          />
        }
      />
      <DatePicker />
    </FormGroup>
  );
};

export default Date;

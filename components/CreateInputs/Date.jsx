import React from "react";
import { DatePicker, FormGroup } from "rsuite";
import Dropdown from "./Dropdown";
import styled from "styled-components";

const StyledInput = styled.input`
  min-width: 2em;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  border: none;
  background: transparent;
  margin-bottom: 8px;

  &:focus {
    outline: none;
  }
`;

const Date = ({ survey, idx, update }) => {
  const updateTitle = (event) => {
    event.persist();
    var payload = { ...survey };
    payload.form[idx].title = event.target.value;
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
            placeholder="Dodaj pytanie"
            value={survey.form[idx].title || ""}
            onChange={updateTitle}
          />
        }
      />
      <DatePicker />
    </FormGroup>
  );
};

export default Date;

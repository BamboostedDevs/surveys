import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
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

const Text = ({ survey, idx, update, long }) => {
  const updateDescription = (value) => {
    var payload = { ...survey };
    payload.form[idx].description = value;
    update(payload);
  };
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
        remove={remove}
        input={
          <StyledInput
            placeholder="Dodaj pytanie"
            value={survey.form[idx].title || ""}
            onChange={updateTitle}
          />
        }
      >
        <FormGroup>
          <ControlLabel>Placeholder</ControlLabel>
          <Input
            size={"sm"}
            placeholder={"Placeholder"}
            value={survey.form[idx].description || ""}
            onChange={updateDescription}
          />
        </FormGroup>
      </Dropdown>

      <Input
        size={"md"}
        placeholder={
          survey.form[idx].description
            ? capitalize(survey.form[idx].description)
            : "Tekst"
        }
        componentClass={long && "textarea"}
      />
    </FormGroup>
  );
};

export default Text;

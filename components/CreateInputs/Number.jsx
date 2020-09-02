import React from "react";
import {
  Input,
  InputNumber,
  FormGroup,
  ControlLabel,
  Toggle,
  Icon,
} from "rsuite";
import Dropdown from "./Dropdown";
import { capitalize } from "../../utils";
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

const Number = ({ survey, idx, update }) => {
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
  const calculate = (toggle) => {
    var payload = { ...survey };
    payload.form[idx].count = toggle;
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
        <FormGroup>
          <ControlLabel>
            Dodać do kalkulacji?
            <Toggle
              onChange={(e) => calculate(e)}
              style={{ marginLeft: "8px" }}
              checkedChildren={<Icon icon="check" />}
              unCheckedChildren={<Icon icon="close" />}
            />
          </ControlLabel>
        </FormGroup>
      </Dropdown>
      <InputNumber
        placeholder={
          survey.form[idx].description
            ? capitalize(survey.form[idx].description)
            : "Numer"
        }
      />
    </FormGroup>
  );
};

export default Number;

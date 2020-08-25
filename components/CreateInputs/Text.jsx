import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
import Dropdown from "./Dropdown";
import { capitalize } from "../../utils";

const Text = ({ survey, idx, update }) => {
  const updatePlaceholder = (value) => {
    var payload = { ...survey };
    payload.form[idx].placeholder = value;
    update(payload);
  };
  const updateQuestion = (value) => {
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
      <Dropdown question={survey.form[idx].question} remove={remove}>
        <FormGroup>
          <ControlLabel>Question</ControlLabel>
          <Input
            size={"sm"}
            placeholder={"Question"}
            value={survey.form[idx].question || ""}
            onChange={updateQuestion}
          />
        </FormGroup>
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
      <Input
        size={"md"}
        placeholder={
          survey.form[idx].placeholder
            ? capitalize(survey.form[idx].placeholder)
            : "Text"
        }
        componentClass={survey.form[idx].long && "textarea"}
      />
    </FormGroup>
  );
};

export default Text;

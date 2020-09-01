import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
import Dropdown from "./Dropdown";
import { capitalize } from "../../utils";

const Text = ({ survey, idx, update, long }) => {
  const updateDescription = (value) => {
    var payload = { ...survey };
    payload.form[idx].description = value;
    update(payload);
  };
  const updateTitle = (value) => {
    var payload = { ...survey };
    payload.form[idx].title = value;
    update(payload);
  };
  const remove = () => {
    var payload = { ...survey };
    payload.form.splice(idx, 1);
    update(payload);
  };
  return (
    <FormGroup>
      <Dropdown question={survey.form[idx].title} remove={remove}>
        <FormGroup>
          <ControlLabel>Question</ControlLabel>
          <Input
            size={"sm"}
            placeholder={"Question"}
            value={survey.form[idx].title || ""}
            onChange={updateTitle}
          />
        </FormGroup>
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
            : "Text"
        }
        componentClass={long && "textarea"}
      />
    </FormGroup>
  );
};

export default Text;

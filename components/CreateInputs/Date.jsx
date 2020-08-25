import React from "react";
import { Input, DatePicker, FormGroup, ControlLabel } from "rsuite";
import Dropdown from "./Dropdown";

const Date = ({ survey, idx, update }) => {
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
      </Dropdown>
      <DatePicker />
    </FormGroup>
  );
};

export default Date;

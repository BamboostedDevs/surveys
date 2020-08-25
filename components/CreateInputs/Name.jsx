import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
import Dropdown from "./Dropdown";

const Name = ({ survey, update }) => {
  const updateName = (value) => {
    var _survey = { ...survey };
    _survey.title = value;
    update(_survey);
  };
  return (
    <FormGroup>
      <Dropdown question={survey.title} name>
        <FormGroup>
          <ControlLabel>Name of the survey</ControlLabel>
          <Input
            size={"lg"}
            placeholder={"Name"}
            value={survey.title || ""}
            onChange={updateName}
          />
        </FormGroup>
      </Dropdown>
    </FormGroup>
  );
};

export default Name;

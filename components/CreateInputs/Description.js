import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
import Dropdown from "./Dropdown";

const Description = ({ survey, update }) => {
  const updateDescription = (value) => {
    var _survey = { ...survey };
    _survey.description = value;
    update(_survey);
  };
  const styles = { marginBottom: "24px" };
  return (
    <FormGroup style={styles}>
      <ControlLabel>Opis ankiety</ControlLabel>
      <Input
        size={"lg"}
        placeholder={"Opis"}
        value={survey.description || ""}
        onChange={updateDescription}
        componentClass="textarea"
      />
    </FormGroup>
  );
};

export default Description;

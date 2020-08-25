import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
import { capitalize } from "../../utils";

const Text = ({ props, idx, value, setValue, size }) => {
  const handleChange = (value) => {
    setValue(idx, value);
  };
  return (
    <FormGroup>
      <ControlLabel>{props.question || "Question missing"}</ControlLabel>
      <Input
        size={size || "md"}
        value={value}
        placeholder={props.placeholder ? capitalize(props.placeholder) : "Text"}
        onChange={handleChange}
        componentClass={props.long && "textarea"}
      />
    </FormGroup>
  );
};

export default Text;

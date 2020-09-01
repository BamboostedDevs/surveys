import React from "react";
import { Input, FormGroup, ControlLabel } from "rsuite";
import { capitalize } from "../../utils";

const Text = ({ props, idx, value, setValue, size, long }) => {
  const handleChange = (value) => {
    setValue(idx, value);
  };
  return (
    <FormGroup>
      <ControlLabel>{props.title || "Question missing"}</ControlLabel>
      <Input
        size={size || "md"}
        value={value}
        placeholder={props.description ? capitalize(props.description) : "Text"}
        onChange={handleChange}
        componentClass={long && "textarea"}
      />
    </FormGroup>
  );
};

export default Text;

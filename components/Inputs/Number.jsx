import React from "react";
import { InputNumber, FormGroup, ControlLabel } from "rsuite";

const Number = ({ props, idx, value, setValue }) => {
  const handleChange = (value) => {
    setValue(idx, value);
  };
  return (
    <FormGroup>
      <ControlLabel>{props.title || "Question missing"}</ControlLabel>
      <InputNumber value={value} onChange={handleChange} />
    </FormGroup>
  );
};

export default Number;

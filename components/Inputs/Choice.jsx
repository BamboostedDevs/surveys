import React from "react";
import {
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
  FormGroup,
  ControlLabel,
} from "rsuite";

const Choice = ({ props, idx, value, setValue, multiple }) => {
  const handleChange = (value) => {
    setValue(idx, value);
  };
  return (
    <FormGroup>
      <ControlLabel>{props.title || "Dodaj pytanie"}</ControlLabel>
      {multiple ? (
        <CheckboxGroup onChange={handleChange}>
          {props.options
            ? props.options.map((val, idx) => (
                <Checkbox key={idx} value={val}>
                  {val}
                </Checkbox>
              ))
            : [<p key="0">Brak wyborów</p>]}
        </CheckboxGroup>
      ) : (
        <RadioGroup onChange={handleChange}>
          {props.options
            ? props.options.map((val, idx) => (
                <Radio key={idx} value={val}>
                  {val}
                </Radio>
              ))
            : [<p key="0">Brak wyborów</p>]}
        </RadioGroup>
      )}
    </FormGroup>
  );
};

export default Choice;

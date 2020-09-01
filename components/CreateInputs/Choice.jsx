import React from "react";
import {
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
  FormGroup,
  ControlLabel,
  Input,
  TagPicker,
} from "rsuite";
import Dropdown from "./Dropdown";

const Choice = ({ survey, idx, update, multiple }) => {
  const updateTitle = (value) => {
    var payload = { ...survey };
    payload.form[idx].title = value;
    update(payload);
  };
  const updateOptions = (value) => {
    var payload = { ...survey };
    payload.form[idx].options = value;
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
          <ControlLabel>Options</ControlLabel>
          <TagPicker
            size={"sm"}
            style={{ width: "100%" }}
            creatable
            onChange={updateOptions}
            defaultValue={
              survey.form[idx].options ? survey.form[idx].options : []
            }
            data={
              survey.form[idx].options
                ? survey.form[idx].options.map((val) => {
                    return { label: val, value: val };
                  })
                : []
            }
          />
        </FormGroup>
      </Dropdown>
      {multiple ? (
        <CheckboxGroup>
          {survey.form[idx].options
            ? survey.form[idx].options.map((val, idx) => (
                <Checkbox key={idx} value={val}>
                  {val}
                </Checkbox>
              ))
            : [<p key="0">No choices</p>]}
        </CheckboxGroup>
      ) : (
        <RadioGroup>
          {survey.form[idx].options
            ? survey.form[idx].options.map((val, idx) => (
                <Radio key={idx} value={val}>
                  {val}
                </Radio>
              ))
            : [<p key="0">No choices</p>]}
        </RadioGroup>
      )}
    </FormGroup>
  );
};

export default Choice;

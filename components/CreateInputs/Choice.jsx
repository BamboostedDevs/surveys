import React from "react";
import {
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
  FormGroup,
  ControlLabel,
  TagPicker,
  Toggle,
  Icon,
} from "rsuite";
import Dropdown from "./Dropdown";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const StyledInput = styled(TextareaAutosize)`
  min-width: 2em;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  border: none;
  background: transparent;
  margin-bottom: 8px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const Choice = ({ survey, idx, update, multiple }) => {
  const updateTitle = (event) => {
    event.persist();
    var payload = { ...survey };
    payload.form[idx].title = event.target.value;
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
  const calculate = (toggle) => {
    var payload = { ...survey };
    payload.form[idx].count = toggle;
    update(payload);
  };
  return (
    <FormGroup>
      <Dropdown
        remove={remove}
        input={
          <StyledInput
            placeholder="Dodaj pytanie"
            value={survey.form[idx].title || ""}
            onChange={updateTitle}
          />
        }
      >
        <FormGroup>
          <ControlLabel style={{ fontSize: "0.8rem" }}>Opcje</ControlLabel>
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
        {!multiple && (
          <FormGroup>
            <ControlLabel>
              Dodać do kalkulacji?
              <Toggle
                onChange={(e) => calculate(e)}
                checked={survey.form[idx].count || false}
                style={{ marginLeft: "8px" }}
                checkedChildren={<Icon icon="check" />}
                unCheckedChildren={<Icon icon="close" />}
              />
            </ControlLabel>
          </FormGroup>
        )}
      </Dropdown>
      {multiple ? (
        <CheckboxGroup>
          {survey.form[idx].options
            ? survey.form[idx].options.map((val, idx) => (
                <Checkbox key={idx} value={val}>
                  {val}
                </Checkbox>
              ))
            : [<p key="0">Brak wyborów</p>]}
        </CheckboxGroup>
      ) : (
        <RadioGroup>
          {survey.form[idx].options
            ? survey.form[idx].options.map((val, idx) => (
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

import React from "react";
import { Text, Number, Date, Choice } from "./Inputs";
import { Form } from "rsuite";
import Title from "./Title";
import Scroll from "./Scroll";

const generateSurvey = (val, idx, state, updateInput) => {
  const types = {
    text: (
      <Text
        key={idx}
        idx={idx}
        props={val}
        value={state.form[idx].answer || ""}
        setValue={updateInput}
      />
    ),
    textArea: (
      <Text
        key={idx}
        idx={idx}
        props={val}
        long={true}
        value={state.form[idx].answer || ""}
        setValue={updateInput}
      />
    ),
    number: (
      <Number
        key={idx}
        idx={idx}
        props={val}
        value={state.form[idx].answer || ""}
        setValue={updateInput}
      />
    ),
    date: (
      <Date
        key={idx}
        idx={idx}
        props={val}
        value={state.form[idx].answer}
        setValue={updateInput}
      />
    ),
    choice: (
      <Choice
        key={idx}
        idx={idx}
        props={val}
        value={state.form[idx].answer}
        setValue={updateInput}
      />
    ),
    multipleChoice: (
      <Choice
        key={idx}
        idx={idx}
        props={val}
        value={state.form[idx].answer}
        setValue={updateInput}
        multiple={true}
      />
    ),
  };
  return types[val.type] || <h3>Error</h3>;
};

/*
 *
 * @param {string} surveyHash
 *
 */
const Survey = ({ state, updateInput }) => {
  return (
    <>
      <Title>{state.title || "Brak nazwy"}</Title>
      <Scroll>
        <Form fluid>
          {state.form.length > 0
            ? state.form.map((val, idx) =>
                generateSurvey(val, idx, state, updateInput)
              )
            : "Brak pytań"}
        </Form>
      </Scroll>
    </>
  );
};

export default Survey;

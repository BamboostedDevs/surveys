import React from "react";
import { Text, Number, Date, Choice } from "./Inputs";
import { Form } from "rsuite";

const generateSurvey = (val, idx, state, updateInput) => {
  const types = [
    <Text
      key={idx}
      idx={idx}
      props={val}
      value={state.form[idx].answer || ""}
      setValue={updateInput}
    />,
    <Number
      key={idx}
      idx={idx}
      props={val}
      value={state.form[idx].answer || ""}
      setValue={updateInput}
    />,
    <Date
      key={idx}
      idx={idx}
      props={val}
      value={state.form[idx].answer}
      setValue={updateInput}
    />,
    <Choice
      key={idx}
      idx={idx}
      props={val}
      value={state.form[idx].answer}
      setValue={updateInput}
    />,
  ];
  return types[val.type];
};

/*
 *
 * @param {string} surveyHash
 *
 */
const Survey = ({ state, updateInput }) => {
  return (
    <>
      <h1 style={{ marginBottom: "5vh" }}>{state.title || "No name"}</h1>
      <Form fluid>
        {state.form.length > 0
          ? state.form.map((val, idx) =>
              generateSurvey(val, idx, state, updateInput)
            )
          : "No questions"}
      </Form>
    </>
  );
};

export default Survey;

import React, { useState } from "react";
import { Text, Number, Date, Choice } from "./Inputs";
import { Form } from "rsuite";
import { decrypt, example } from "../utils";
import dynamic from "next/dynamic";
import Submit from "./Submit";
const Layout = dynamic(() => import("./Layout"), {
  ssr: false,
});

function useSurveyData(survey) {
  const [state, setState] = useState(survey);

  function updateInput(idx, value) {
    var newState = { ...state };
    newState.form[idx].answer = value;
    setState(newState);
  }

  return [state, updateInput];
}

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
const Survey = ({ surveyHash }) => {
  const [state, updateInput] = useSurveyData(() => {
    // here make a request to backend to get "json_data" of a specified survey
    if (surveyHash === "example") {
      return example;
    } else if (surveyHash) {
      try {
        const survey = JSON.parse(decrypt(surveyHash, "password"));
        console.log(survey);
        return survey;
      } catch {
        return false;
      }
    }
  });

  const submit = () => console.log(state);

  return state ? (
    <Layout submit={<Submit onClick={submit}>Submit</Submit>}>
      <h1 style={{ marginBottom: "5vh" }}>{state.title || "No name"}</h1>
      <Form fluid>
        {state.form.length > 0
          ? state.form.map((val, idx) =>
              generateSurvey(val, idx, state, updateInput)
            )
          : "No questions"}
      </Form>
    </Layout>
  ) : state === false ? (
    <>No such survey</>
  ) : (
    <>Loading...</>
  );
};

export default Survey;

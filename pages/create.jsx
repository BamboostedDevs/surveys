import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Form, Icon, Progress } from "rsuite";
const { Line } = Progress;
import InputChoice from "../components/InputChoice";
import { Text, Name, Number, Date, Choice } from "../components/CreateInputs";
import { copy, validateEmail } from "../utils";
import Submit from "../components/Submit";
import AddEmail from "../components/AddEmail";
import Layout from "../components/Layout";

const Add = styled.div`
  transition: color 0.25s, background-color 0.5s;
  height: 5vh;
  border-radius: 16px;
  border-style: dashed;
  border-width: 1px;
  border-color: #666666;
  text-align: center;
  line-height: 5vh;
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  > :nth-child(1) {
    margin-right: 8px;
  }

  :hover {
    background-color: #575757;
    color: #ffffff;
  }

  :active {
    transition: color 0.25s, background-color 0.25s;
    background-color: #1a1d24;
    color: #ffffff;
  }
`;

const Link = styled.div`
  transition: color 0.25s;
  margin-bottom: 5vh;
  word-break: break-all;
  cursor: pointer;
  overflow-y: scroll;
  font-size: 1.25em;
  max-height: 25vh;

  :hover {
    color: #1675e0;
  }

  :active {
    transition: color 0.25s;
    color: #000000;
  }
`;

export default function Create() {
  const [modal, setModal] = useState(false);
  const [survey, updateSurvey] = useState({ title: "", form: [] });
  const [email, setEmail] = useState("");
  const [part, changePart] = useState(0);

  useEffect(() => console.log(survey), [survey]);

  const addInput = (input) => {
    var _survey = { ...survey };
    _survey.form.push(input);
    updateSurvey(_survey);
  };

  const hanldeNext = () => {
    part < 2 && changePart(part + 1);
  };

  const handlePrevious = () => {
    part > 0 && changePart(part - 1);
  };

  const generateSurvey = (val, idx) => {
    const types = [
      <Text key={idx} idx={idx} survey={survey} update={updateSurvey} />,
      <Number key={idx} idx={idx} survey={survey} update={updateSurvey} />,
      <Date key={idx} idx={idx} survey={survey} update={updateSurvey} />,
      <Choice key={idx} idx={idx} survey={survey} update={updateSurvey} />,
    ];
    return types[val.type];
  };

  const parts = [
    <>
      <Name survey={survey} update={updateSurvey} />
      {survey.form.map((val, idx) => generateSurvey(val, idx, survey.form))}
      <Add onClick={() => setModal(true)}>
        <Icon icon="plus-square-o" />
        <span>Add a field</span>
      </Add>
    </>,
    <>
      <h3 style={{ marginBottom: "1vh" }}>Your survey has been sent!</h3>
      {JSON.stringify(survey)}
    </>,
  ];

  return (
    <Layout
      submit={
        part !== 1 && (
          <Submit onClick={hanldeNext} next>
            Finish
          </Submit>
        )
      }
      previous={
        part !== 0 && (
          <Submit onClick={handlePrevious} previous>
            Previous
          </Submit>
        )
      }
      profile={{
        id: survey.id,
        fullName: survey.fullName,
        image: survey.image,
        email: survey.email,
      }}
    >
      <Form fluid>
        <h1 style={{ marginBottom: "1vh" }}>
          {part === 2 ? "Finished!" : "Survey Creator"}
        </h1>
        <Line
          style={{
            marginBottom: "3vh",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
          percent={
            !part
              ? 5 +
                (survey.title.length > 1 && 30) +
                (survey.form.length >= 1 && 30) +
                (survey.form.length >= 5 && 30)
              : 100
          }
          status={part === 1 ? "success" : "active"}
          showInfo={part === 1}
        />
        {parts[part]}
        <InputChoice modal={modal} setModal={setModal} addInput={addInput} />
      </Form>
    </Layout>
  );
}

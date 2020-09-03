import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Alert, AutoComplete, Form, Icon, Progress, TagGroup } from "rsuite";
const { Line } = Progress;
import InputChoice from "../components/InputChoice";
import { Text, Name, Number, Date, Choice } from "../components/CreateInputs";
import Submit from "../components/Submit";
import Layout from "../components/Layout";
import Description from "../components/CreateInputs/Description";
import Scroll from "../components/Scroll";
import Axios from "axios";
import Equation from "../components/Equation";

const Add = styled.div`
  margin-bottom: 8px;
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

export default function Create({ appContext }) {
  const [modal, setModal] = useState(false);
  const [equation, setEquation] = useState([]);
  const [count, setCount] = useState([]);
  const [error, setError] = useState(false);
  const [survey, updateSurvey] = useState({
    title: "",
    description: "",
    form: [],
  });
  const [part, changePart] = useState(0);

  useEffect(() => {
    survey.form.map(
      (val) =>
        val.count &&
        setCount([
          ...count,
          {
            label: val.title || "Brak pytania",
            value: val.title || "Brak pytania",
          },
        ])
    );
  }, [survey]);

  const addInput = (input) => {
    var _survey = { ...survey };
    _survey.form.push(input);
    updateSurvey(_survey);
  };

  const hanldeNext = async (finish) => {
    if (part + 1 === 2 || finish === true) {
      changePart(2);
      console.log({
        ...survey,
        equation,
      });
      await Axios.post("http://c53a8449e299.ngrok.io/surveys/create", {
        ...survey,
        equation,
      })
        .then((resp) => {
          Alert.success("Stworzono ankietę");
          setError(false);
        })
        .catch((e) => {
          Alert.error("Błąd");
          setError(true);
        });
    } else if (count.length > 0) {
      changePart(part + 1);
    } else {
      hanldeNext(true);
    }
  };

  const handlePrevious = () => {
    part > 0 && count.length > 0 ? changePart(part - 1) : changePart(0);
    setError(false);
  };

  const generateSurvey = (val, idx) => {
    const types = {
      text: <Text key={idx} idx={idx} survey={survey} update={updateSurvey} />,
      textArea: (
        <Text
          key={idx}
          idx={idx}
          survey={survey}
          update={updateSurvey}
          long={true}
        />
      ),
      number: (
        <Number key={idx} idx={idx} survey={survey} update={updateSurvey} />
      ),
      date: <Date key={idx} idx={idx} survey={survey} update={updateSurvey} />,
      choice: (
        <Choice key={idx} idx={idx} survey={survey} update={updateSurvey} />
      ),
      multipleChoice: (
        <Choice
          key={idx}
          idx={idx}
          survey={survey}
          update={updateSurvey}
          multiple={true}
        />
      ),
    };
    return types[val.type] || <h3>Error</h3>;
  };

  const parts = [
    <>
      <Scroll size="calc(100vh - 124px - 26px - 3vh - 5vh - 8px - 48px - 48px)">
        <Name survey={survey} update={updateSurvey} />
        <Description survey={survey} update={updateSurvey} />
        {survey.form.map((val, idx) => generateSurvey(val, idx, survey.form))}
      </Scroll>
      <Add onClick={() => setModal(true)}>
        <Icon icon="plus-square-o" />
        <span>Dodaj pole</span>
      </Add>
    </>,
    <Equation {...{ equation, setEquation, count }} />,
    <>
      <h3 style={{ marginBottom: "1vh" }}>Twoja ankieta została wysłana!</h3>
    </>,
  ];

  return (
    <Layout
      submit={
        part !== 2 && (
          <Submit onClick={hanldeNext} next>
            {(count.length < 1) | (part === 1) ? "Zakończ" : "Dalej"}
          </Submit>
        )
      }
      previous={
        part !== 0 && (
          <Submit onClick={handlePrevious} previous>
            Poprzedni
          </Submit>
        )
      }
      profile={{
        id: survey.id,
        fullName: survey.fullName,
        image: survey.image,
        email: survey.email,
      }}
      appContext={appContext}
      title="Stwórz ankietę"
    >
      <Form fluid>
        <h1 style={{ marginBottom: "1vh" }}>
          {error
            ? "Błąd"
            : part === 2
            ? "Zakończono!"
            : part
            ? "Tworzenie równania"
            : "Kreator ankiet"}
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
                (survey.form.length >= 5 && 20)
              : part === 2
              ? 100
              : 85
          }
          status={error ? "fail" : part === 2 ? "success" : "active"}
          showInfo={part === 2}
        />
        {!error ? parts[part] : <h3>Proszę wrócić do poprzedniego kroku</h3>}
        <InputChoice modal={modal} setModal={setModal} addInput={addInput} />
      </Form>
    </Layout>
  );
}

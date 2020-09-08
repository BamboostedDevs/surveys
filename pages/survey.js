import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Survey from "../components/Survey";
import Layout from "../components/Layout";
import Submit from "../components/Submit";
import { useEffect, useState } from "react";
import { Alert } from "rsuite";
import Login from "../components/Login";
import Axios from "axios";

function useSurveyData(survey) {
  const [state, setState] = useState(survey);

  function updateInput(idx, value) {
    var newState = { ...state };
    newState.form[idx].answer = value;
    setState(newState);
  }

  return [state, setState, updateInput];
}

function Display({ appContext }) {
  const router = useRouter();
  const { hash } = router.query;
  const [state, setState, updateInput] = useSurveyData(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    appContext.surveys.map((val, idx) => {
      if (val.title === hash) setState(val);
    });
  }, []);

  const submit = () => {
    if (appContext.session) {
      finish();
    } else {
      Alert.info("Wymagany jest adres email.");
      setLogin(true);
    }
  };

  const finish = async (email) => {
    var inputs = {};
    state.form.map((val) => {
      if (val.answer) inputs[val.title] = val.answer;
    });
    const payload = {
      id: state.id,
      email: email || appContext.email || undefined,
      inputs,
    };
    await Axios.post(
      "http://5b2fa7e471e3.ngrok.io/surveys/answer",
      payload,
      appContext.session && {
        headers: { authorization: appContext.session },
      }
    )
      .then((resp) => {
        if (resp.data.created) {
          Alert.success("Wysłano!");
          Alert.info("Twój wynik to: " + resp.data.equationResult, 7000);
        } else Alert.error("Błąd");
      })
      .catch((e) => Alert.error("Błąd"));
    router.push("/");
  };

  return (
    <Layout
      submit={<Submit onClick={submit}>Zatwierdź</Submit>}
      appContext={appContext}
      title={state ? "Ankieta - " + state.title : "Ankieta"}
    >
      {login ? (
        <Login
          appContext={appContext}
          callback={() => {
            setLogin(false);
            finish();
          }}
          anonymous={(email) => {
            setLogin(false);
            finish(email);
          }}
        />
      ) : state ? (
        <Survey state={state} updateInput={updateInput} />
      ) : (
        <h3>Ankieta nie istnieje</h3>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Display), {
  ssr: false,
});

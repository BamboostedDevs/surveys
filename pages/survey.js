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
    appContext.surveys.map((val) => {
      if (val.title === hash) setState(val);
    });
  }, []);

  const submit = () => {
    if (appContext.session) {
      finish();
    } else {
      Alert.info("Login first");
      setLogin(true);
    }
  };

  const finish = async () => {
    Alert.success("Submitted");
    router.push("/");
  };

  return (
    <Layout
      submit={<Submit onClick={submit}>Submit</Submit>}
      appContext={appContext}
    >
      {login ? (
        <Login
          appContext={appContext}
          fallback={() => {
            setLogin(false);
            finish();
          }}
        />
      ) : state ? (
        <Survey state={state} updateInput={updateInput} />
      ) : state === null ? (
        <div>Survey does not exist</div>
      ) : (
        <div></div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Display), {
  ssr: false,
});

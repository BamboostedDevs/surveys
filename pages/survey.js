import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Survey from "../components/Survey";
import Layout from "../components/Layout";
import Submit from "../components/Submit";
import { useEffect, useState } from "react";
import { example } from "../utils";

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

  // pull data
  useEffect(() => {
    hash === "Example survey" ? setState(example) : setState(null);
  }, []);

  // submit answer
  const submit = () => console.log(state);

  return (
    <Layout
      submit={<Submit onClick={submit}>Submit</Submit>}
      setTheme={appContext.setTheme}
    >
      {state ? (
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

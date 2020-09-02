import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";
import SurveyListing from "../components/SurveyListing";
import Scroll from "../components/Scroll";
import Axios from "axios";
import { Alert } from "rsuite";

export default function index({ appContext }) {
  useEffect(() => {
    (async () => {
      await Axios.get("http://3e8801cc2549.ngrok.io/surveys/available")
        .then((resp) => {
          if (resp.data) appContext.setSurveys(resp.data);
          else Alert.error("Błąd");
          console.log(resp.data);
        })
        .catch((e) => {
          Alert.error("Błąd");
        });
    })();
  }, []);

  return (
    <Layout appContext={appContext} title="Lista ankiet">
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Title>Dostępne ankiety:</Title>
        <Scroll>
          {appContext.surveys.map((val, idx) => (
            <SurveyListing theme={appContext.theme} val={val} key={idx} />
          ))}
        </Scroll>
      </div>
    </Layout>
  );
}

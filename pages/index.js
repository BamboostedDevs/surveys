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
      await Axios.get("http://b15ce041cdae.ngrok.io/surveys/available")
        .then((resp) => {
          if (resp.data) appContext.setSurveys(resp.data);
          else Alert.error("Error");
          console.log(resp.data);
        })
        .catch((e) => {
          Alert.error("Error");
        });
    })();
  }, []);

  return (
    <Layout appContext={appContext} title="All surveys">
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Title>Available surveys:</Title>
        <Scroll>
          {appContext.surveys.map((val, idx) => (
            <SurveyListing theme={appContext.theme} val={val} key={idx} />
          ))}
        </Scroll>
      </div>
    </Layout>
  );
}

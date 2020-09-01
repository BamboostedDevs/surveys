import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";
import SurveyListing from "../components/SurveyListing";
import { example } from "../utils";
import Scroll from "../components/Scroll";
import Axios from "axios";
import { Alert } from "rsuite";

export default function index({ appContext }) {
  useEffect(() => {
    (async () => {
      await Axios.get("http://922c6f4d90e6.ngrok.io/surveys/available")
        .then((resp) => {
          if (resp.data) appContext.setSurveys([...resp.data, ...[example]]);
          else Alert.error("Error");
        })
        .catch((e) => {
          Alert.error("Error");
        });
    })();
  }, []);

  return (
    <Layout appContext={appContext}>
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

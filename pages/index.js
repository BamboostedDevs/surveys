import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";
import SurveyListing from "../components/SurveyListing";
import Scroll from "../components/Scroll";
import Axios from "axios";
import { Alert } from "rsuite";

export default function index({ appContext }) {
  const [answered, setAnswered] = useState({});
  useEffect(() => {
    (async () => {
      await Axios.get(
        "http://7a55f9bc1d92.ngrok.io/surveys/available",
        appContext.role && {
          headers: { authorization: appContext.session },
        }
      )
        .then((resp) => {
          if (resp.data) appContext.setSurveys(resp.data.reverse());
          else Alert.error("Błąd");
        })
        .catch((e) => {
          Alert.error("Błąd");
        });
    })();
  }, []);

  useEffect(() => {
    appContext.session &&
      appContext.role !== 1 &&
      (async () => {
        await Axios.get("http://7a55f9bc1d92.ngrok.io/surveys/answered", {
          headers: { authorization: appContext.session },
        })
          .then((resp) => {
            if (resp.data) {
              var newAnswered = {};
              resp.data.map((val) => {
                newAnswered[val.title] = val.answerTimestamp;
              });
              setAnswered(newAnswered);
            } else Alert.error("Błąd");
          })
          .catch((e) => {
            Alert.error("Błąd");
          });
      })();
  }, [appContext.session]);

  return (
    <Layout appContext={appContext} title="Lista ankiet">
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Title>Dostępne ankiety:</Title>
        <Scroll>
          {appContext.surveys.map((val, idx) => (
            <SurveyListing
              theme={appContext.theme}
              val={val}
              key={idx}
              sent={answered[val.title]}
              appContext={appContext}
            />
          ))}
        </Scroll>
      </div>
    </Layout>
  );
}

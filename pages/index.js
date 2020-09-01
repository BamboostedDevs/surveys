import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";
import SurveyListing from "../components/SurveyListing";
import { example } from "../utils";
import Scroll from "../components/Scroll";

export default function index({ appContext }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    setSurveys([
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
      example,
    ]);
  }, []);

  return (
    <Layout setTheme={appContext.setTheme}>
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Title>Available surveys:</Title>
        <Scroll>
          {surveys.map((val, idx) => (
            <SurveyListing theme={appContext.theme} val={val} idx={idx} />
          ))}
        </Scroll>
      </div>
    </Layout>
  );
}

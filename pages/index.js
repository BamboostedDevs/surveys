import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";

export default function index() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    setSurveys(["example"]);
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Title>Available surveys:</Title>
        {surveys.map((val, idx) => (
          <Link key={idx} href={{ pathname: "/survey", query: { hash: val } }}>
            <a>{val}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function index() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    setSurveys(["example"]);
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Link href="/create">
          <a>Create survey</a>
        </Link>
        {surveys.map((val, idx) => (
          <Link key={idx} href={{ pathname: "/survey", query: { hash: val } }}>
            <a>{val}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

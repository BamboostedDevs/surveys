import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});

export default function index() {
  return (
    <Layout>
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <Link href="/survey/example">
          <a>Go to an example survey</a>
        </Link>
        <Link href="/create">
          <a>Create survey</a>
        </Link>
      </div>
    </Layout>
  );
}

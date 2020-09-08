import React, { useEffect } from "react";
import { Row, Col, Toggle, Icon } from "rsuite";
import dynamic from "next/dynamic";
import Nav from "./Nav";
import styled from "styled-components";
import Head from "next/head";

const _Layout = ({
  className,
  submit,
  previous,
  children,
  appContext,
  title,
}) => {
  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") {
      document
        .getElementById("pagestyle")
        .setAttribute("href", "/rsuite-dark.css");
      appContext.setTheme("dark");
    } else appContext.setTheme("default");
  }, []);

  return (
    <>
      <Head>
        <title>{title || "Ankiety"}</title>
      </Head>
      <Row className={className}>
        <Toggle
          defaultChecked={window.localStorage.getItem("theme") === "dark"}
          onChange={(e) => {
            if (e) {
              document
                .getElementById("pagestyle")
                .setAttribute("href", "/rsuite-dark.css");
              window.localStorage.setItem("theme", "dark");
              appContext.setTheme("dark");
            } else {
              document
                .getElementById("pagestyle")
                .setAttribute("href", "/rsuite-default.css");
              window.localStorage.setItem("theme", "default");
              appContext.setTheme("default");
            }
          }}
          checkedChildren={<Icon icon="sun-o" />}
          unCheckedChildren={<Icon icon="moon-o" />}
        />
        <Nav
          session={appContext.session}
          setSession={appContext.setSession}
          role={appContext.role}
        />
        {submit && submit}
        {previous && previous}
        <Col xs={24} sm={24} md={8} lg={6} />
        <Col xs={24} sm={12} md={8} lg={12}>
          {children}
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} />
      </Row>
    </>
  );
};

const Layout = styled(_Layout)`
  position: absolute;
  height: 100vh;
  width: 100vw;
  padding: 48px;

  > :nth-child(1) {
    position: absolute;
    right: 24px;
    top: 24px;
    z-index: 999;
  }
`;

export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});

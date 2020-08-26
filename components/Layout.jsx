import React, { useEffect, useState } from "react";
import { Row, Col, Toggle, Icon } from "rsuite";
import dynamic from "next/dynamic";

const Layout = (props) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") {
      document
        .getElementById("pagestyle")
        .setAttribute("href", "/rsuite-dark.css");
      setDark(true);
    }
  }, []);

  return (
    <Row
      style={{
        maxWidth: "100vw",
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 48,
        marginTop: 16,
      }}
    >
      <Toggle
        defaultChecked={dark}
        style={{ position: "absolute", right: "2vh", top: "2vh", zIndex: 999 }}
        onChange={(e) => {
          if (e) {
            document
              .getElementById("pagestyle")
              .setAttribute("href", "/rsuite-dark.css");
            window.localStorage.setItem("theme", "dark");
          } else {
            document
              .getElementById("pagestyle")
              .setAttribute("href", "/rsuite-default.css");
            window.localStorage.setItem("theme", "default");
          }
        }}
        checkedChildren={<Icon icon="sun-o" />}
        unCheckedChildren={<Icon icon="moon-o" />}
      />
      {props.submit && props.submit}
      {props.previous && props.previous}
      <Col xs={24} sm={24} md={8} lg={6} />
      <Col xs={24} sm={12} md={8} lg={12}>
        {props.children}
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} />
    </Row>
  );
};

export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});

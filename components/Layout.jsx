import React from "react";
import { Row, Col, Toggle, Icon } from "rsuite";
import dynamic from "next/dynamic";

const Layout = (props) => (
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
      value={
        document.getElementById("pagestyle").href.substr(-15) ===
        "rsuite-dark.css"
      }
      style={{ position: "absolute", right: "2vh", top: "2vh", zIndex: 999 }}
      onChange={(e) =>
        e
          ? document
              .getElementById("pagestyle")
              .setAttribute("href", "/rsuite-dark.css")
          : document
              .getElementById("pagestyle")
              .setAttribute("href", "/rsuite-default.css")
      }
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

export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});

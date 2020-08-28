import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Title, { MinorTitle } from "../components/Title";
import { Button, Input } from "rsuite";
import styled from "styled-components";
import { validateEmail } from "../utils";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 30vh;
  justify-content: space-around;
  align-items: center;
  padding-top: 5vh;

  > div {
    min-width: 30vw;
  }
`;

const loginStyle = { width: "30vw", marginTop: "5%" };

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <Title>Login/Register</Title>
      <Container>
        <div>
          <MinorTitle>Email</MinorTitle>
          <Input
            size={"md"}
            value={email}
            placeholder={"Email"}
            onChange={setEmail}
            type="email"
            style={
              email && !validateEmail(email)
                ? { borderColor: "red" }
                : undefined
            }
          />
        </div>
        <div>
          <MinorTitle>Password</MinorTitle>
          <Input
            size={"md"}
            value={password}
            placeholder={"Password"}
            onChange={setPassword}
            type="password"
            style={
              password && password.length < 8
                ? { borderColor: "red" }
                : undefined
            }
          />
        </div>
        <Button
          disabled={!(validateEmail(email) && password.length > 7)}
          style={loginStyle}
          size="lg"
          appearance="ghost"
        >
          Login
        </Button>
      </Container>
    </Layout>
  );
}

export default Login;

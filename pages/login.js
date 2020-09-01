import Layout from "../components/Layout";
import { useState } from "react";
import Title, { MinorTitle } from "../components/Title";
import { Button, Input } from "rsuite";
import styled from "styled-components";
import { validateEmail } from "../utils";
import Axios from "axios";

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

  > :nth-child(3) {
    margin-top: 5%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    > :nth-child(1) {
      margin-right: 3vw;
    }
  }
`;

function Login({ appContext }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await Axios("http://f92fbc6ee3fe.ngrok.io/users​/signup", {
      email,
      password,
    });
    console.log(response);
  };

  return (
    <Layout setTheme={appContext.setTheme}>
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
        <div>
          <Button
            disabled={!(validateEmail(email) && password.length > 7)}
            size="lg"
            appearance="ghost"
            color="cyan"
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button
            disabled={!(validateEmail(email) && password.length > 7)}
            size="lg"
            appearance="ghost"
          >
            Login
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export default Login;

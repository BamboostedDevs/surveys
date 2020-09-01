import React from "react";
import { useState } from "react";
import Title, { MinorTitle } from "../components/Title";
import { Button, ButtonGroup, Input } from "rsuite";
import styled from "styled-components";
import { validateEmail } from "../utils";
import Axios from "axios";
import { Alert } from "rsuite";

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
    max-width: 30vw;
    @media only screen and (max-width: 768px) {
      max-width: 42vw;
    }
  }
`;

export default function Login({ fallback, appContext }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await Axios.post("http://922c6f4d90e6.ngrok.io/users/signup/", {
      email,
      password,
    })
      .then((resp) => {
        if (resp.data) {
          Alert.success("Registered, confirm Your email");
          fallback && fallback();
        } else {
          Alert.error("Error");
        }
      })
      .catch((e) => Alert.error("Could not create an account"));
  };

  const handleLogin = async () => {
    await Axios.post("http://922c6f4d90e6.ngrok.io/users/signin/", {
      email,
      password,
    })
      .then((resp) => {
        if (resp.data && resp.data.token) {
          Alert.success("Logged In");
          appContext.setSession(resp.data.token);
          fallback && fallback();
        } else {
          Alert.error("Error");
        }
      })
      .catch((e) => Alert.error("Wrong credentials"));
  };

  return (
    <>
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
        <ButtonGroup justified>
          <Button
            disabled={!(validateEmail(email) && password.length > 7)}
            appearance="ghost"
            color="cyan"
            onClick={() => handleRegister(email, password)}
          >
            Register
          </Button>
          <Button
            disabled={!(validateEmail(email) && password.length > 7)}
            appearance="ghost"
            onClick={() => handleLogin(email, password)}
          >
            Login
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

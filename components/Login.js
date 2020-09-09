import React from "react";
import { useState } from "react";
import Title, { MinorTitle } from "../components/Title";
import { Button, ButtonGroup, Input, Tooltip, Whisper } from "rsuite";
import styled from "styled-components";
import { validateEmail } from "../utils";
import Axios from "axios";
import { Alert } from "rsuite";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: ${({ anonymous }) => (anonymous ? 35 : 30)}vh;
  justify-content: space-around;
  align-items: center;
  padding-top: 5vh;

  > div {
    min-width: 30vw;
  }

  > :nth-child(3),
  > :nth-child(4) {
    margin-top: 5%;
    max-width: 30vw;
    @media only screen and (max-width: 768px) {
      max-width: 46vw;
    }
  }
`;

function Login({ callback, appContext, anonymous }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await Axios.post(apiBaseUrl + "/users/signup/", {
      email,
      password,
    })
      .then((resp) => {
        if (resp.data) {
          Alert.success("Zarejestrowano, potwierdź swój email");
          callback && callback();
        } else {
          Alert.error("Błąd");
        }
      })
      .catch((e) => Alert.error("Stworzenie konta nieudane"));
  };

  const handleLogin = async () => {
    await Axios.post(apiBaseUrl + "/users/signin/", {
      email,
      password,
    })
      .then((resp) => {
        if (resp.data && resp.data.token) {
          Alert.success("Zalogowano");
          appContext.setEmail(email);
          appContext.setSession(resp.data.token);
          callback && callback(email, resp.data.token);
        } else {
          Alert.error("Błąd");
        }
      })
      .catch((e) => Alert.error("Błędne dane uwierzytelniające"));
  };

  const handleAnonymously = () => anonymous(email);

  return (
    <>
      <Title>Login / Rejestracja</Title>
      <Container anonymous={anonymous} onSubmit={() => console.log("aaaa")}>
        <div>
          <MinorTitle>Email</MinorTitle>
          <Input
            size={"md"}
            value={email}
            placeholder={"Email"}
            onChange={setEmail}
            type="email"
            style={
              anonymous
                ? !validateEmail(email)
                  ? { borderColor: "red" }
                  : undefined
                : email && !validateEmail(email)
                ? { borderColor: "red" }
                : undefined
            }
          />
        </div>
        <div>
          <MinorTitle>Hasło</MinorTitle>
          <Input
            size={"md"}
            value={password}
            placeholder={"Hasło"}
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
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button
            disabled={!(validateEmail(email) && password.length > 7)}
            appearance="ghost"
            onClick={handleLogin}
          >
            Login
          </Button>
        </ButtonGroup>
        {anonymous && (
          <Whisper
            placement="bottom"
            trigger="hover"
            speaker={
              <Tooltip>
                Wymagany <i>email</i> aby wysłać ankietę. Trzeba go potwierdzić.
              </Tooltip>
            }
          >
            <Button
              block
              disabled={!validateEmail(email)}
              appearance="link"
              style={{ marginTop: "8px" }}
              onClick={handleAnonymously}
            >
              Kontynuuj bez rejestracji
            </Button>
          </Whisper>
        )}
      </Container>
    </>
  );
}

export default Login;

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
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

function confirmation({ appContext }) {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    (async () => {
      await Axios.get(
        "http://922c6f4d90e6.ngrok.io/users/confirm-signup/" + code
      )
        .then((resp) => {
          if (resp.data && resp.data.token) {
            Alert.success("Confirmed account");
            Alert.success("Logged In");
            appContext.setSession(resp.data.token);
            router.push("/");
          } else {
            Alert.error("Error");
          }
          router.push("/");
        })
        .catch((e) => {
          router.push("/");
          Alert.error("Confirmation failed");
        });
    })();
  }, []);

  return (
    <Layout appContext={appContext}>
      <h1 style={{ marginTop: "10vh" }}>Confirming...</h1>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(confirmation), {
  ssr: false,
});

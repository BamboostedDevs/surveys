import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Axios from "axios";
import { Alert } from "rsuite";

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
    <Layout appContext={appContext} title="Confirm account">
      <h1 style={{ marginTop: "10vh" }}>Confirming...</h1>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(confirmation), {
  ssr: false,
});

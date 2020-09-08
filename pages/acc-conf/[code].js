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
        "http://7a55f9bc1d92.ngrok.io/users/confirm-signup/" + code
      )
        .then((resp) => {
          if (resp.data && resp.data.token) {
            Alert.success("Potwierdzono konto!");
            Alert.success("Zalogowano");
            appContext.setSession(resp.data.token);
            router.push("/");
          } else {
            Alert.error("Błąd");
          }
          router.push("/");
        })
        .catch((e) => {
          router.push("/");
          Alert.error("Konfirmacja nieudana");
        });
    })();
  }, []);

  return (
    <Layout appContext={appContext} title="Potwierdź konto">
      <h1 style={{ marginTop: "10vh" }}>Potwierdzanie w toku...</h1>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(confirmation), {
  ssr: false,
});

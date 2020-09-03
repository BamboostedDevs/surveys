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
        "http://c53a8449e299.ngrok.io/surveys/confirm-answer/" + code
      )
        .then((resp) => {
          if (resp.data && resp.data.created) {
            Alert.success("Potwierdzono ankietę!");
            Alert.info("Przekierowanie za 3s");
            setTimeout(() => router.push("/"), 3000);
          } else {
            Alert.error("Błąd");
            router.push("/");
          }
        })
        .catch((e) => {
          router.push("/");
          Alert.error("Konfirmacja nieudana");
        });
    })();
  }, []);

  return (
    <Layout appContext={appContext} title="Potwierdź odpowiedź">
      <h1 style={{ marginTop: "10vh" }}>Dziękujemy!</h1>
      <h5 style={{ marginTop: "16px" }}>Ankieta została wysłana.</h5>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(confirmation), {
  ssr: false,
});

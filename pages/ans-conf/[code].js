import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Axios from "axios";
import { Alert } from "rsuite";

function confirmation({ appContext }) {
  const router = useRouter();
  const { code } = router.query;
  const [result, setResult] = useState(false);

  useEffect(() => {
    (async () => {
      await Axios.get(
        "http://5b2fa7e471e3.ngrok.io/surveys/confirm-answer/" + code
      )
        .then((resp) => {
          if (resp.data && resp.data.created) {
            setResult(resp.data.equationResult || false);
            Alert.success("Potwierdzono ankietę!");
            Alert.info("Przekierowanie za 5s");
            setTimeout(() => router.push("/"), 5000);
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
      {reslut && (
        <h5 style={{ marginTop: "8px" }}>Wynik twojego równania: {result}</h5>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(confirmation), {
  ssr: false,
});

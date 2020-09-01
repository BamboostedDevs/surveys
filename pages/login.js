import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Login from "../components/Login";

function login({ appContext }) {
  const router = useRouter();

  return (
    <Layout appContext={appContext} title="Login/Register">
      <Login fallback={() => router.push("/")} appContext={appContext} />
    </Layout>
  );
}

export default login;

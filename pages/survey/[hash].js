import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Survey from "../../components/Survey";

const Display = () => {
  const router = useRouter();
  const { hash } = router.query;

  return <Survey surveyHash={hash} />;
};

export default dynamic(() => Promise.resolve(Display), {
  ssr: false,
});

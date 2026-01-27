import { clientOnly } from "@solidjs/start";

const CriteriaTabs = clientOnly(() => import("../components/CriteriaTabs"));
const RoundCarousel = clientOnly(() => import("../components/RoundCarousel"));

export default function Home() {
  const rounds = [
    {
      id: "r1",
      title: "Round 1",
      subtitle: "Observe MOBI and propose failures and explanations",
      text:
        "You will watch two videos of MOBI performing tasks in different environmental settings. Based on your observations, we ask you to proposed potential failure modes that you think MOBI might encounter in similar situations, as well as the explanations that MOBI should provide to the users in case of such failures.",
    },
    {
      id: "r2",
      title: "Round 2",
      subtitle: "Rate each failure mode",
      text:
        "During this round, you will be presented with the refined failure mode list from Round 1. You will then be asked to rate each failure mode based on its (1) severity, (2) occurence frequency and (3) detectability difficulty.",
    },
  ];
  return (
    <main class="text-left mx-auto text-gray-700 p-4 w-[90%] items-center max-w-4xl">
      <h1 class="font-bold text-2xl pb-2">Expert Consensus Study</h1>
      <p>
        The purpose of this study to discover and rank the most important failure modes and explanation needs for
        the barista robot called MOBI.
      </p>

      <p>The study consists of three rounds:</p>

      <div class="mt-3">
        <RoundCarousel rounds={rounds} />
      </div>

      <p class="mt-6">
        The rating data, definitions, examples and explanations will be used to prioritize the failure modes and
        explanation needs for MOBI, and to guide the development of explainability model and features for the robot.
      </p>
    </main>
  );
}

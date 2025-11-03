export default function Home() {
  return (
    <main class="text-left mx-auto text-gray-700 p-4">
      <h1 class="font-bold text-2xl">Expert Consensus Study</h1>
      <p>
        The purpose of this study to discover and rank the most important failure modes and explanation needs for
        the barista robot called MOBI.
      </p>
      <p>The study consists of three rounds:</p>
      <ul class="list-disc ml-[20px]">
        <li>
          <b>Round 0:</b> We will ask you to fill out some personal (yet unidentifiying) information about yourself.
          Later, you will be introduced to the topic of the study, will watch short clips of MOBI in action
          and differnet environmental settings. You will then be asked to list potential failured modes, definitions
          and example situations.
        </li>
        <li>
          <b>Round 1:</b> The goal here is to assess every entered item based on the four defined criteria - <i>Severity (S), Occurence Frequency (O), 
            Detectability Difficulty (DD) and Explanation Criticality (C)</i> - and capture uncertainty with confidence terms. 
            You get to see what others have proposed, in randomized order and rate it, as well as provide a feedback about why you think one item should be above the other. 
            You are also allowed to propose to change the definitions if you do not agree with the with the statement of the failure.
        </li>
        <li>
          <b>Round 2:</b> During this round, you will be presented with the preliminary results from Round 1. You will be able to see how your ratings 
          compare to the group, and you will have the opportunity to adjust the ratings of the "high-impact wide disagreement" or "low confidence" items.
          The goal is to <i>stabilize</i> the ratings and reach a consensus among the experts. 
        </li>
      </ul>
      <p>
        The rating data, definitions, examples and explanations will be used to prioritize the failure modes and explanation needs for MOBI,
        and to guide the development of explainability model and features for the robot.
      </p>
    </main>
  );
}

# Two-Round Delphi + DFMEA Protocol (with Z‑fuzzy confidence) for the Barista Robot

**Purpose**  
Run a short, practical study to find and rank the most important failure modes and explanation needs for the barista robot.  
Round 1 collects and defines candidate items.  
Round 2 scores each item on Severity, Occurrence, Detectability, and Explanation criticality, with confidence to support Z‑fuzzy handling.

---

## Global settings

- **Panel size**: aim for 12 to 25 experts, at least 10 responses per round.
- **Randomization**: in Round 2 randomize the item order independently for each participant. Keep that person’s order stable in any follow-up round.
- **Criteria shown everywhere**:  
  - **S** Severity: how bad the effect is if it happens.  
  - **O** Occurrence: how often it is likely to happen.  
  - **D** Detectability: treat D as detectability difficulty, the higher - the worse.  
  - **E** Explanation criticality: how important an explanation is for safety, trust, compliance.
- **Rating terms**: Very low, Low, Medium, High, Very high.  
- **Confidence terms**: Very low, Low, Medium, High, Very high.
- **Timing**: Round 1 about 15 to 20 minutes. Round 2 about 25 to 40 minutes.
- **Privacy**: show only group summaries in feedback. Keep comments anonymous.

---

## Round 0 - Introduction to setup and definitions

**Purpose**  
The goal of this round is to introduce the topic to panelists, through first showing short clips of the robot and its operation both in controlled environment and in the wild. Later on, explain the research objectives and question (e.g., why do we think it is important to create a mental model about the robot's operation and explain the errors). 

Explain what will happen in the following rounds: what is expected from them, how much time should they spend on each round, how will their answers help us, etc. Define the terminology (Severity, Occurancy, Detectability and Explanation Criticality), rating terms, confidence terms, privacy and consent.

Participants will the fill in a short demographic questionnaire, and receive an identification number (PID) to preserve anonimity within our database and from other panelists (if necessary). This way we can refer to participants and avoid re-collecting and re-matching the same demographic data in each round. 

**What participants see**  
- One page study overview  
- Definitions of S, O, D, E  
- A small example item

**Message to panel**  
> We will run two rounds. Round 1 collects items and definitions. Round 2 scores items on S, O, D, E with simple terms and confidence. D is lack of detectability, so higher is worse. Confidence lets us model uncertainty.

---

## Round 1 - Delphi item generation and definition

**Purpose**  
The goal is to get experts from different domains (technical and not) to come up with a list of potential failure modes anticipated, based on the introductory videos of the robot's operation. 
* It is important to note that, although people from non-technical background are not familiar with the details of the robot hardware and underlying models and controls, their expertise in human-human interaction (taking orders, fixing/replacing the glass, adjusting other environmental settings, pouring liquid, etc.) can help uncover the potential underwater stones expecting the robot once its is fully deployed into an uncontrolled environment.


**What participants see**  
A simple form with 8 to 15 blank rows.

**Exact questions**  
1) **Item name**  
   > Write a short, specific title. Example: “Cup misalignment under glare”.

2) **Definition**  
   > Define what you mean. Example: “Robot misreads cup pose due to reflective glare and pours off center”.

3) **Short example or symptom**  
   > Give a concrete case or symptom.

4) **At which stage on the robot operation chart does it appear?**
   > Choose one: the operation chart TBD

5) **Mitigation idea (policies)** (e.g., robot should recover itself, call for help from the user, etc.)  
   > One action that may reduce risk or improve explanation.

**Researcher actions after Round 1**  
- Merge duplicates, harmonize wording, keep meaning.  
- Assign short IDs like E07, F03.  
- Return the merged list for quick confirmation: “agree as written” or “needs change” plus comments.

**Round 1 outputs to send back**  
- Final master list with IDs, names, one line definitions.  
- Count of raw items and merge rules.  
- Note about randomization to be used in Round 2.

---

## Round 2 - DFMEA scoring on S, O, D, E with confidence

**Purpose**  
The goal here is to assess every entered item based on the four defined criteria - S, O, D, E - and capture uncertainty with confidence terms. Participants get to see what others have proposed, in randomized order and rate it, as well as provide a feedback about why they think one item should be above the other. They are also allowed to propose to change the definitions if they do not agree with the with the statement of the failure.

**Randomization**  
- Randomize item order per participant in this round.  
- Keep the same per-participant order in any follow-up round.

**What participants see**  
- Paged list of items, for example 10 per page.  
- Each item shows ID, name, definition.  
- For each of S, O, D, E: a rating selector and a confidence selector.

**Opening text**  
> Rate each item on S, O, D, E using the terms below. Then rate your confidence in each answer. D is lack of detectability, so higher is worse. Use the whole scale when it makes sense. There are no correct answers.

**Anchors to display**

- **Severity (S)**  
  Very low: negligible effect.  
  Low: minor service disruption, no harm.  
  Medium: task fails or needs rework.  
  High: risk of minor injury or serious service failure.  
  Very high: major safety hazard or severe impact.

- **Occurrence (O)**  
  Very low: extremely rare.  
  Low: rare.  
  Medium: occasional.  
  High: frequent.  
  Very high: very frequent or daily.

- **Detectability (D as lack of detectability)**  
  Very low: easy to detect well before harm.  
  Low: usually detected before harm.  
  Medium: 50-50 chance.  
  High: often not detected in time.  
  Very high: almost never detected before harm.

- **Explanation criticality (E)**  
  Very low: explanation adds little value.  
  Low: nice to have.  
  Medium: helps understanding and acceptance.  
  High: needed to avoid misuse and errors.  
  Very high: essential for safety, trust, or compliance.

**Response format per item**  
- S rating + S confidence  
- O rating + O confidence  
- D rating + D confidence  
- E rating + E confidence

**Optional follow-ups**  
- Choose two items that should be explained on screen during pouring.  
- Choose two items that need an on-robot cue like light, sound, or motion.  
- Any wording that was unclear.

**Researcher actions after Round 2**  
- Map ratings to fuzzy numbers and apply confidence as Z‑reliability, or defuzzify to crisp values for Excel.  
- Normalize criteria so higher means worse. Keep D as lack of detectability if you want consistent direction.  
- Compute composite ranking with VIKOR or a weighted RPN-style score.  
- If you plan a follow-up refinement, keep each participant’s item order stable.

**Round 2 outputs to send back**  
- Number of raters and completion rate.  
- Current top 10 by composite score.  
- Per item averages: S, O, D, E and percent of ratings in the top half.  
- Short anonymous comments explaining disagreements or shifts.

---

<!-- ## Optional Round 2b - Get weights for S, O, D, E

**Purpose**  
Estimate weights for S, O, D, E. Use a mini DEMATEL task or direct weights.

**Option A - DEMATEL mini matrix**  
**Question**  
> For each ordered pair among S, O, D, E, how much does the row influence the column? Rate with Very low to Very high and give confidence.

Ask these pairs: S→O, S→D, S→E, O→S, O→D, O→E, D→S, D→O, D→E, E→S, E→O, E→D.

**Option B - Direct weights**  
**Question**  
> Divide 100 points across S, O, D, E to reflect importance for prioritization. Also give your confidence.

**Researcher actions**  
- Compute weights from DEMATEL or average direct weights.  
- Report wS, wO, wD, wE and a short interpretation.  
- Run sensitivity checks.

--- -->

## Round 3 - Optional re-rate with targeted feedback

**Purpose**  
Let experts refine only the items that were high-impact but had wide disagreement or low confidence. The comments and clarification in definitions based on the participant's open-ended inputs. The top of the list should be stabilized after this stage.
##### - High impact items are the items with high RPN, but they are controversial since they have low confidence and/or there is a spread in S/O/D/E >= 1

**What participants see**  
- The small subset with widest spread.  
- Their own prior ratings, group medians, and 2 to 3 short comments per item.

**Question**  
> You may keep or adjust your ratings for the items shown. If you change a rating, update your confidence too.

**Researcher actions**  
- Recompute scores and check if top items stabilized.  
- Report stability by stating how many of the top 10 items moved by more than 2 ranks.
- Here we can also compute the scores of two groups: technical vs non-technical panelists

---

## Z‑fuzzy scale tables and mapping

**Rating terms to base triangular fuzzy numbers (used for S, O, D, E)**

| Term | TFN |
|---|---|
| Very low | (0, 0, 1) |
| Low | (0, 1, 2) |
| Medium | (1, 2, 3) |
| High | (2, 3, 4) |
| Very high | (3, 4, 4) |

**Confidence terms to fuzzy reliability TFNs**

| Term | TFN |
|---|---|
| Very low | (0, 0, 0.3) |
| Low | (0.1, 0.3, 0.5) |
| Medium | (0.3, 0.5, 0.7) |
| High | (0.5, 0.7, 0.9) |
| Very high | (0.7, 1, 1) |

**Z‑weighting step**  
- Convert confidence TFN to a single reliability alpha, for example by area or centroid.  
- Weight the base TFN by sqrt(alpha): new TFN = (sqrt(alpha)·l, sqrt(alpha)·m, sqrt(alpha)·u).  
- Aggregate experts by componentwise mean.  
- If you prefer Excel, defuzzify with the centroid: score = (l + m + u) / 3.

---

## Calculation options

### Inputs and scales

Ratings -> TFNs (triangular fuzzy numbers)

| Term | TFN |
|---|---|
| Very low | (0, 0, 1) |
| Low | (0, 1, 2) |
| Medium | (1, 2, 3) |
| High | (2, 3, 4) |
| Very high | (3, 4, 4) |

**Confidence terms to fuzzy reliability TFNs**

| Term | TFN |
|---|---|
| Very low | (0, 0, 0.3) |
| Low | (0.1, 0.3, 0.5) |
| Medium | (0.3, 0.5, 0.7) |
| High | (0.5, 0.7, 0.9) |
| Very high | (0.7, 1, 1) |


**TFN centroid (defuzzification)**

For any TFN $A = (l, m, u)$:
    
$$
centroid(A) = \frac{l + m + u}{3}
$$

So the <b>rating centroids</b> are *VL = 0.33...*, *L = 1.00*, *M = 2.00*, *H=3.00*, *VH = 3.67*

The <b>confidence centroid</b> gives a reliability number ∈ [0, 1]: *VL = 0.10*, *L = 0.30*, *M = 0.50*, *H = 0.70*, *VH = 0.90*

**Confidence weight**

Use $w_k = \sqrt{\alpha_k}$. This down-weighs low-confidence inputs without deleting them.
> Treat D as "detectability difficulty" so larger D means worse detectability, which matches classic DFMEA.

### Step 1 - Per-expert crisp ratings from TFNs
For expert $k$ on criterion j ∈ {S, O, D}
1. Map the rating term to its TFN $R_{kj}$ = ($l, m, u$) 
2. Convert to a crisp rating $c_{kj} = \frac{l + m + u}{3}$ on 0-4
3. Map the confidence term to $\alpha_k$ via centroid and set $w_k$ = $\sqrt{\alpha_k}$

### Step 2 - Aggregate across experts (confidence-weighted)
For each item and each criterion $j$:
$$
C_j = \frac{\sum{w_k c_{kj}}}{\sum{w_k}} ∈ [0,4]
$$
---
Result: one <b>S, O, D</b> per item on the original 0-4 scale, already confidence-weighted.

### Step 3 - Map DFMEA's 1-10 scale
Normalize to 0-1: $C_j' = \frac{C_j}{4}$
Then map to 1-10 (standard DFMEA):
$$
C_{j,10} = 1 + 9  C_j' = 1 + 9\frac{C_j}{4}
$$

Do this for $j = S, O, D$.
You now have $S_{10}, O_{10}, D_{10}$.

### Step 4 - Compute the RPN
Classic DFMEA product:
$$ 
RPN = S_{10} \times O_{10} \times D_{10} ∈ [1, 1000] 
$$ 

> If you later want to include $E$ as well, report Risk $RPN = S \times O \times D $ and keep $E$ as a separate "explainability priority". If you must combine do it transparently (for example a parallel index, not multiplying all four which inflates the scale to 10,000).

### Example

**Expert input**
|Experts| Severity (S) | Detectability (D) | Occurency (O) | $c_s$|$c_d$|$c_o$|$\alpha_s$|$\alpha_s$|$\alpha_s$|$w_s$|$w_d$|$w_o$|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Expert A | High (2, 3, 4) | High (2, 3, 4) | Medium (1, 2, 3)|3.00|2.00|3.00|0.7|0.5|0.3|0.837|0.707|0.548|
| Expert B | Very High (3, 4, 4)| Medium (1, 2, 3)| High (2, 3, 4) |3.67|3.00|2.00|0.9|0.7|0.5|0.949|0.548|0.837|
| Expert C | Medium (1, 2, 3)| High (2, 3, 4)| High (2, 3, 4)|2.00|3.00|3.00|0.5|0.7|0.7|0.707|0.837|0.707|

**Aggregate $S, O, D$**
- Severity S (0-4):
$$
weights(0.837, 0.949, 0.707) => \sum{w} = 2.493
\\
\sum{w c_{kS}} = 0.837 \times 3.00 + 0.949 \times 3.667 + 0.707 \times 2.00 = 7.404
\\ S = \frac{7.404}{2.493} = 2.97
$$

- Occurence O (0-4):
$$
weights(0.548, 0.837, 0.707) => \sum{w} = 2.092
\\
\sum{w c_{kO}} = 0.548 \times 3.000 + 0.837 \times 2.000 + 0.707 \times 3.000 = 5.439
\\ O = \frac{5.439}{2.092} = 2.60
$$

- Detectability S (0-4):
$$
weights(0.707, 0.548, 0.837) => \sum{w} = 2.092
\\
\sum{w c_{kD}} = 0.837 \times 3.00 + 0.949 \times 3.667 + 0.707 \times 2.00 = 5.569
\\ D = \frac{5.569}{2.092} = 2.66
$$

**Map to 1-10 and compute RPN**
Normalize and map:
$$
S_{10} ​​= 1+9\frac{2.97}{4} ​= 7.68 \\
O_{10} = 1+9\frac{2.60}{4} = 6.85 \\
D_{10} = 1+9\frac{2.66}{4} = 6.99 \\
RPN_{1000} = 7.68 \times 6.85 \times 6.99 = 368 -> RPN_{\%} = \frac{368}{1000}=36.8\%
$$



## Reporting checklist

- Panel description and response rates per round.  
- Round 1: number of raw items, merge rules, final list size.  
- Round 2: scales and anchors, randomization policy, completion metrics.  
- Weighting method and final weights.  
- Ranking method and parameters.  
- Sensitivity results.  
- Final action table with owners and due dates.

---

## Email and survey text

**Invite email**  
Subject: Join a two round expert study on barista robot risks  
Body:  
Hello,  
We will run two short rounds to prioritize failure modes and explanation needs for a barista robot. Round 1 collects items and definitions. Round 2 scores items on Severity, Occurrence, Detectability, and Explanation criticality with confidence levels. Each round takes less than 40 minutes. Your input will shape our safety and explainability roadmap.  
If you agree, we will send Round 1 today and Round 2 next week.  
Thank you.

**Round 1 opening text**  
> Add items that matter most. Use one sentence to define each. Examples help. You can add up to 15 items.

**Round 2 opening text**  
> Rate each item on S, O, D, E. Then give your confidence for each rating. D means lack of detectability, so higher is worse. Use the whole scale when it makes sense.

**Round 2 closing text**  
> Thank you. We will send a short summary with the current top items and next steps.

**Round 2b opening text**  
> Please rate how much each factor influences the others, or allocate weights that sum to 100. Also rate your confidence.

---

## Quick survey fields

**Rating scale**  
Very low, Low, Medium, High, Very high.

**Confidence scale**  
Very low, Low, Medium, High, Very high.

**Where it appears**  
Planning, Perception, Control, Human-robot interaction, UI, Maintenance, Other.

---

## Action table template

| Rank | Item ID | Item name | Why it ranks high | Primary lever | Owner | Due |
|---:|---|---|---|---|---|---|
| 1 | E07 | Explain anomaly causes on robot | High S, high E, medium D | Add on robot cue and short reason | HRI lead | 30 days |
| 2 | F03 | Cup misalignment in glare | High O, high D | Data collection, re train, calibration SOP | Perception lead | 60 days |

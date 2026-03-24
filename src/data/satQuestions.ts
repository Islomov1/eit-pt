import { SatQuestion } from "@/types/test";

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH SECTION  (30 questions: 10 foundation · 10 sat · 10 advanced)
// All questions are passage-based or context-rich, mirroring real SAT style.
// ─────────────────────────────────────────────────────────────────────────────

export const satQuestions: SatQuestion[] = [

  // ── ENGLISH · FOUNDATION (E1–E10) ─────────────────────────────────────────
  // Focus: subject-verb agreement, pronoun reference, transitions, word choice,
  //        sentence clarity — in short contextual passages.

  {
    id: 101,
    section: "english",
    stage: "foundation",
    text: `Read the sentence and choose the best version of the underlined portion.
"The committee have reached their decision after three hours of discussion."`,
    options: [
      "committee have reached their decision",
      "committee has reached its decision",
      "committee have reached its decision",
      "committee has reached their decision",
    ],
    correctAnswer: "committee has reached its decision",
  },
  {
    id: 102,
    section: "english",
    stage: "foundation",
    text: `Choose the word that best fills the blank.
"The scientist's findings were ___; they overturned decades of accepted theory."`,
    options: ["predictable", "irrelevant", "groundbreaking", "repetitive"],
    correctAnswer: "groundbreaking",
  },
  {
    id: 103,
    section: "english",
    stage: "foundation",
    text: `Which transition best connects these two sentences?
"Solar panels are becoming cheaper to produce. ___, more households are installing them."`,
    options: ["Nevertheless", "As a result", "In contrast", "For instance"],
    correctAnswer: "As a result",
  },
  {
    id: 104,
    section: "english",
    stage: "foundation",
    text: `Choose the grammatically correct sentence.`,
    options: [
      "Neither the manager nor the employees was informed of the change.",
      "Neither the manager nor the employees were informed of the change.",
      "Neither the manager nor the employees has been informed of the change.",
      "Neither the manager nor the employees are having been informed of the change.",
    ],
    correctAnswer: "Neither the manager nor the employees were informed of the change.",
  },
  {
    id: 105,
    section: "english",
    stage: "foundation",
    text: `Read the passage and answer the question.
"Although the new policy was designed to reduce costs, it actually increased them. The administration, however, defended the policy by citing long-term projections."
What is the relationship between the two sentences?`,
    options: [
      "The second sentence contradicts the first.",
      "The second sentence repeats the first in different words.",
      "The second sentence explains why the policy succeeded.",
      "The second sentence provides a contrasting response to the outcome in the first.",
    ],
    correctAnswer: "The second sentence provides a contrasting response to the outcome in the first.",
  },
  {
    id: 106,
    section: "english",
    stage: "foundation",
    text: `Choose the most concise and clear version.`,
    options: [
      "Due to the fact that it was raining, the game was cancelled.",
      "Because it was raining, the game was cancelled.",
      "On account of rain occurring, cancellation of the game happened.",
      "The game was cancelled due to the reason of rain.",
    ],
    correctAnswer: "Because it was raining, the game was cancelled.",
  },
  {
    id: 107,
    section: "english",
    stage: "foundation",
    text: `Which word is closest in meaning to "meticulous" as used in formal writing?`,
    options: ["careless", "thorough", "rapid", "generous"],
    correctAnswer: "thorough",
  },
  {
    id: 108,
    section: "english",
    stage: "foundation",
    text: `Choose the sentence with correct comma usage.`,
    options: [
      "After the lecture ended students asked several questions.",
      "After the lecture ended, students asked several questions.",
      "After the lecture, ended students asked several questions.",
      "After the lecture ended students, asked several questions.",
    ],
    correctAnswer: "After the lecture ended, students asked several questions.",
  },
  {
    id: 109,
    section: "english",
    stage: "foundation",
    text: `Read the sentence. Choose the option that fixes the error.
"Running through the park, a bee stung Maria."`,
    options: [
      "Running through the park, Maria was stung by a bee.",
      "A bee stung Maria, running through the park.",
      "Maria, a bee stung her running through the park.",
      "The sentence is already correct.",
    ],
    correctAnswer: "Running through the park, Maria was stung by a bee.",
  },
  {
    id: 110,
    section: "english",
    stage: "foundation",
    text: `Which sentence uses the semicolon correctly?`,
    options: [
      "She studied all night; and passed the exam.",
      "She studied all night, she passed the exam.",
      "She studied all night; she passed the exam.",
      "She studied all night: she passed the exam.",
    ],
    correctAnswer: "She studied all night; she passed the exam.",
  },

  // ── ENGLISH · SAT (E11–E20) ───────────────────────────────────────────────
  // Focus: rhetorical purpose, evidence-based inference, tone/style, complex
  //        grammar (parallel structure, modifiers), passage interpretation.

  {
    id: 111,
    section: "english",
    stage: "sat",
    text: `Read the passage and answer the question.
"Proponents of universal basic income argue that it would eliminate poverty and stimulate consumer spending. Critics, however, contend that it would reduce the incentive to work and place an unsustainable burden on government budgets."
The author's primary purpose in this passage is to:`,
    options: [
      "argue in favour of universal basic income",
      "present opposing perspectives on a policy proposal",
      "prove that universal basic income has failed",
      "recommend a compromise between the two positions",
    ],
    correctAnswer: "present opposing perspectives on a policy proposal",
  },
  {
    id: 112,
    section: "english",
    stage: "sat",
    text: `Choose the version that best maintains parallel structure.`,
    options: [
      "The programme aims to reduce costs, to improve efficiency, and increasing output.",
      "The programme aims to reduce costs, improve efficiency, and increase output.",
      "The programme aims at reducing costs, to improve efficiency, and increase output.",
      "The programme aims to reduce costs, improving efficiency, and to increase output.",
    ],
    correctAnswer: "The programme aims to reduce costs, improve efficiency, and increase output.",
  },
  {
    id: 113,
    section: "english",
    stage: "sat",
    text: `Read the sentence and choose the best replacement for the underlined word.
"The mayor's speech was so nebulous that few listeners could identify a clear policy direction."
Which word could replace "nebulous" without changing the meaning?`,
    options: ["inspiring", "vague", "aggressive", "detailed"],
    correctAnswer: "vague",
  },
  {
    id: 114,
    section: "english",
    stage: "sat",
    text: `Read the passage and answer the question.
"The study found that students who slept fewer than six hours performed significantly worse on memory tests. The researchers controlled for diet, exercise, and screen time."
What is the most reasonable inference from this passage?`,
    options: [
      "Screen time is the primary factor affecting memory.",
      "Sleep deprivation likely contributes to poorer memory performance.",
      "Diet has no effect on academic results.",
      "The study proves that sleeping more always improves grades.",
    ],
    correctAnswer: "Sleep deprivation likely contributes to poorer memory performance.",
  },
  {
    id: 115,
    section: "english",
    stage: "sat",
    text: `Which sentence best strengthens the argument that public libraries are essential to communities?`,
    options: [
      "Libraries contain a large number of books.",
      "Some people prefer digital resources over physical books.",
      "Libraries provide free access to information, internet, and educational programmes for people of all income levels.",
      "Library buildings are often historic and architecturally interesting.",
    ],
    correctAnswer: "Libraries provide free access to information, internet, and educational programmes for people of all income levels.",
  },
  {
    id: 116,
    section: "english",
    stage: "sat",
    text: `Choose the option that best improves the underlined portion.
"The report, which was written by the committee, it concluded that further research was needed."`,
    options: [
      "committee, it concluded",
      "committee, concluded",
      "committee and it concluded",
      "committee which concluded",
    ],
    correctAnswer: "committee, concluded",
  },
  {
    id: 117,
    section: "english",
    stage: "sat",
    text: `Read the passage and answer the question.
"Despite extensive media coverage, voter turnout in the election fell to a record low. Political analysts attributed this to widespread disillusionment with both major candidates."
Which choice best describes the logical structure of the passage?`,
    options: [
      "A problem is identified, then a cause is proposed.",
      "A solution is offered, then evaluated.",
      "Two contradictory facts are presented without explanation.",
      "A prediction is made and then confirmed.",
    ],
    correctAnswer: "A problem is identified, then a cause is proposed.",
  },
  {
    id: 118,
    section: "english",
    stage: "sat",
    text: `Which version of the sentence is most precise and formal?`,
    options: [
      "The company's profits went up a lot last year.",
      "The company did really well in terms of money last year.",
      "The company reported a 34% increase in net profit during the fiscal year.",
      "Last year was pretty good for the company's finances.",
    ],
    correctAnswer: "The company reported a 34% increase in net profit during the fiscal year.",
  },
  {
    id: 119,
    section: "english",
    stage: "sat",
    text: `Choose the sentence that uses the apostrophe correctly.`,
    options: [
      "The childrens' toys were scattered across the floor.",
      "The children's toys were scattered across the floor.",
      "The childrens toys' were scattered across the floor.",
      "The childrens toy's were scattered across the floor.",
    ],
    correctAnswer: "The children's toys were scattered across the floor.",
  },
  {
    id: 120,
    section: "english",
    stage: "sat",
    text: `Read the passage and choose the best concluding sentence.
"Urban green spaces have been shown to reduce stress, improve air quality, and encourage physical activity. Cities that invest in parks and green corridors see measurable improvements in public health outcomes."`,
    options: [
      "Some people, however, prefer indoor activities.",
      "These benefits suggest that expanding urban green spaces is a sound investment in community wellbeing.",
      "Parks can be expensive to maintain.",
      "Not all cities have enough land to build parks.",
    ],
    correctAnswer: "These benefits suggest that expanding urban green spaces is a sound investment in community wellbeing.",
  },

  // ── ENGLISH · ADVANCED (E21–E30) ─────────────────────────────────────────
  // Focus: complex inference, author's rhetorical strategy, nuanced word choice,
  //        data-supported claims, multi-sentence passage analysis.

  {
    id: 121,
    section: "english",
    stage: "advanced",
    text: `Read the passage and answer the question.
"The historian argued that the revolution was not caused by ideology alone but by a convergence of economic hardship, institutional failure, and demographic pressure. She dismissed single-cause explanations as intellectually convenient but historically misleading."
The historian's stance is best described as:`,
    options: [
      "supportive of ideological explanations",
      "skeptical of overly simplified historical analysis",
      "dismissive of economic factors in historical events",
      "uncertain about the causes of the revolution",
    ],
    correctAnswer: "skeptical of overly simplified historical analysis",
  },
  {
    id: 122,
    section: "english",
    stage: "advanced",
    text: `Read the passage. Which choice best completes it?
"The novelist deliberately avoided resolution in the final chapter. Readers expecting closure were instead left with ambiguity, a choice that divided critics. Supporters argued the open ending ___."`,
    options: [
      "proved the author had not planned the story carefully",
      "reflected the novel's central theme that life rarely offers neat conclusions",
      "showed the author's inexperience with long-form fiction",
      "was inserted to prepare for a sequel",
    ],
    correctAnswer: "reflected the novel's central theme that life rarely offers neat conclusions",
  },
  {
    id: 123,
    section: "english",
    stage: "advanced",
    text: `Choose the option that best revises the following sentence for clarity and concision.
"There are many researchers who are of the opinion that the findings of the study, which was conducted over a period of ten years, do not support the conclusions that were originally put forward by the team."`,
    options: [
      "Many researchers believe the ten-year study's findings do not support the team's original conclusions.",
      "Many researchers are thinking that the study's findings, being ten years old, are not supporting original conclusions.",
      "The findings, according to many, do not support what the team originally said after ten years.",
      "Researchers, many of them, feel that the findings do not support original conclusions from the ten-year study.",
    ],
    correctAnswer: "Many researchers believe the ten-year study's findings do not support the team's original conclusions.",
  },
  {
    id: 124,
    section: "english",
    stage: "advanced",
    text: `Read the passage and answer the question.
"While satellite imagery has revolutionised environmental monitoring, it is not without limitations. Cloud cover, sensor resolution, and temporal gaps can all introduce error. Researchers must therefore triangulate satellite data with ground-level measurements to ensure accuracy."
The word 'triangulate' is used here to mean:`,
    options: [
      "divide into three equal parts",
      "cross-verify using multiple sources",
      "convert data into geometric form",
      "eliminate outliers from a dataset",
    ],
    correctAnswer: "cross-verify using multiple sources",
  },
  {
    id: 125,
    section: "english",
    stage: "advanced",
    text: `Read the argument and identify its logical weakness.
"This supplement must be effective. Thousands of people use it and report feeling better after taking it."`,
    options: [
      "The claim relies on expert scientific consensus.",
      "The argument confuses correlation with causation and overlooks placebo effects.",
      "The argument presents verified clinical trial data.",
      "The sample size of thousands makes the claim statistically reliable.",
    ],
    correctAnswer: "The argument confuses correlation with causation and overlooks placebo effects.",
  },
  {
    id: 126,
    section: "english",
    stage: "advanced",
    text: `Read the passage and choose the best transition.
"Early studies suggested that moderate coffee consumption reduced the risk of certain diseases. ___, more recent meta-analyses have produced mixed results, prompting researchers to call for larger controlled trials."`,
    options: [
      "As a result",
      "In other words",
      "Subsequently",
      "Nevertheless",
    ],
    correctAnswer: "Nevertheless",
  },
  {
    id: 127,
    section: "english",
    stage: "advanced",
    text: `Which sentence most effectively integrates evidence into an argument?`,
    options: [
      "Studies show things, which means the policy is good.",
      "There is evidence that suggests maybe the policy could work.",
      "A 2023 OECD report found that countries implementing the policy saw a 12% reduction in youth unemployment within two years.",
      "The policy has been implemented and people seem to think it works.",
    ],
    correctAnswer: "A 2023 OECD report found that countries implementing the policy saw a 12% reduction in youth unemployment within two years.",
  },
  {
    id: 128,
    section: "english",
    stage: "advanced",
    text: `Read the passage and answer the question.
"The author opens with a striking statistic, then systematically dismantles the common assumption that economic growth alone reduces inequality. She marshals evidence from four continents before proposing a redistributive framework."
The phrase 'marshals evidence' most nearly means:`,
    options: [
      "questions the validity of evidence",
      "organises and deploys evidence strategically",
      "collects evidence from unreliable sources",
      "presents evidence without analysis",
    ],
    correctAnswer: "organises and deploys evidence strategically",
  },
  {
    id: 129,
    section: "english",
    stage: "advanced",
    text: `Choose the option that correctly uses a dash for emphasis or interruption.`,
    options: [
      "The results — were, unexpected — and alarming.",
      "The results were unexpected — and deeply alarming.",
      "The results — were unexpected, and — alarming.",
      "The — results were unexpected and alarming.",
    ],
    correctAnswer: "The results were unexpected — and deeply alarming.",
  },
  {
    id: 130,
    section: "english",
    stage: "advanced",
    text: `Read the passage and answer the question.
"Critics of the urban renewal project contended that demolishing historic neighbourhoods in favour of commercial development served corporate interests at the expense of long-term residents. Proponents countered that the project would generate employment and tax revenue that would ultimately benefit all citizens."
Which statement best evaluates the strength of the proponents' argument?`,
    options: [
      "It is strong because it appeals to emotion.",
      "It is weak because it ignores the immediate displacement of residents while emphasising uncertain future benefits.",
      "It is strong because employment and tax revenue are always positive outcomes.",
      "It is weak because critics are more credible than proponents.",
    ],
    correctAnswer: "It is weak because it ignores the immediate displacement of residents while emphasising uncertain future benefits.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MATH SECTION  (30 questions: 10 foundation · 10 sat · 10 advanced)
  // Topics: Algebra & linear equations, Quadratics & functions,
  //         Statistics & data analysis, Geometry & trigonometry
  // ─────────────────────────────────────────────────────────────────────────────

  // ── MATH · FOUNDATION (M1–M10) ───────────────────────────────────────────
  // Focus: linear equations, ratios, percentages, basic geometry,
  //        reading simple graphs — SAT-style context problems.

  {
    id: 201,
    section: "math",
    stage: "foundation",
    text: `A car travels at a constant speed of 60 km/h. How far does it travel in 2 hours 30 minutes?`,
    options: ["120 km", "140 km", "150 km", "160 km"],
    correctAnswer: "150 km",
  },
  {
    id: 202,
    section: "math",
    stage: "foundation",
    text: `Solve for x: 3x − 8 = 2x + 5`,
    options: ["x = 3", "x = 7", "x = 11", "x = 13"],
    correctAnswer: "x = 13",
  },
  {
    id: 203,
    section: "math",
    stage: "foundation",
    text: `A jacket originally costs $120. It is on sale for 35% off. What is the sale price?`,
    options: ["$42", "$68", "$78", "$85"],
    correctAnswer: "$78",
  },
  {
    id: 204,
    section: "math",
    stage: "foundation",
    text: `If the ratio of red to blue marbles is 4:7 and there are 44 red marbles, how many blue marbles are there?`,
    options: ["63", "70", "77", "84"],
    correctAnswer: "77",
  },
  {
    id: 205,
    section: "math",
    stage: "foundation",
    text: `A line passes through the points (0, 3) and (4, 11). What is the slope of the line?`,
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    id: 206,
    section: "math",
    stage: "foundation",
    text: `The mean of five numbers is 14. Four of the numbers are 10, 12, 16, and 18. What is the fifth number?`,
    options: ["12", "14", "16", "18"],
    correctAnswer: "14",
  },
  {
    id: 207,
    section: "math",
    stage: "foundation",
    text: `A rectangle has a perimeter of 54 cm. Its length is twice its width. What is the width?`,
    options: ["6 cm", "7 cm", "9 cm", "12 cm"],
    correctAnswer: "9 cm",
  },
  {
    id: 208,
    section: "math",
    stage: "foundation",
    text: `If f(x) = 3x + 4, what is f(−2)?`,
    options: ["−10", "−2", "2", "10"],
    correctAnswer: "−2",
  },
  {
    id: 209,
    section: "math",
    stage: "foundation",
    text: `In a class of 30 students, 18 passed a test. What percentage of students passed?`,
    options: ["50%", "55%", "60%", "65%"],
    correctAnswer: "60%",
  },
  {
    id: 210,
    section: "math",
    stage: "foundation",
    text: `Two angles of a triangle are 47° and 68°. What is the third angle?`,
    options: ["55°", "60°", "65°", "75°"],
    correctAnswer: "65°",
  },

  // ── MATH · SAT (M11–M20) ─────────────────────────────────────────────────
  // Focus: systems of equations, quadratics, linear models in context,
  //        statistics (median, range, spread), circle/triangle geometry.

  {
    id: 211,
    section: "math",
    stage: "sat",
    text: `Solve the system of equations:
2x + 3y = 12
4x − y = 10`,
    options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
    correctAnswer: "x = 3, y = 2",
  },
  {
    id: 212,
    section: "math",
    stage: "sat",
    text: `A quadratic equation is given as y = x² − 6x + 8. What are the x-intercepts?`,
    options: ["x = 2 and x = 4", "x = −2 and x = −4", "x = 1 and x = 8", "x = 3 and x = 5"],
    correctAnswer: "x = 2 and x = 4",
  },
  {
    id: 213,
    section: "math",
    stage: "sat",
    text: `A store's daily revenue R (in dollars) is modelled by R = 150n − 200, where n is the number of customers. How many customers are needed for the store to break even (R = 0)?`,
    options: [
      "Fewer than 1 customer",
      "Approximately 1.3 customers",
      "Exactly 2 customers",
      "More than 2 customers",
    ],
    correctAnswer: "Approximately 1.3 customers",
  },
  {
    id: 214,
    section: "math",
    stage: "sat",
    text: `The data set {4, 7, 7, 9, 11, 13, 15} has a new value of 25 added. Which measure changes the most?`,
    options: ["Median", "Mode", "Mean", "Range"],
    correctAnswer: "Mean",
  },
  {
    id: 215,
    section: "math",
    stage: "sat",
    text: `What is the vertex of the parabola y = 2(x − 3)² + 5?`,
    options: ["(3, 5)", "(−3, 5)", "(3, −5)", "(5, 3)"],
    correctAnswer: "(3, 5)",
  },
  {
    id: 216,
    section: "math",
    stage: "sat",
    text: `A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?`,
    options: ["13", "14", "15", "16"],
    correctAnswer: "15",
  },
  {
    id: 217,
    section: "math",
    stage: "sat",
    text: `If 2^(2x) = 64, what is x?`,
    options: ["2", "3", "4", "6"],
    correctAnswer: "3",
  },
  {
    id: 218,
    section: "math",
    stage: "sat",
    text: `A circle has a radius of 7. What is the area of the circle? (Use π ≈ 3.14)`,
    options: ["43.96", "49", "153.86", "169"],
    correctAnswer: "153.86",
  },
  {
    id: 219,
    section: "math",
    stage: "sat",
    text: `The table below shows scores for 5 students: 72, 85, 91, 68, 79. 
A sixth student scores 100. Which statement is true?`,
    options: [
      "The median increases by more than 5 points.",
      "The mean increases, and the range increases.",
      "The mode becomes 100.",
      "The median stays the same.",
    ],
    correctAnswer: "The mean increases, and the range increases.",
  },
  {
    id: 220,
    section: "math",
    stage: "sat",
    text: `If x² − 5x − 14 = 0, what are the solutions?`,
    options: ["x = 7 and x = −2", "x = −7 and x = 2", "x = 7 and x = 2", "x = −7 and x = −2"],
    correctAnswer: "x = 7 and x = −2",
  },

  // ── MATH · ADVANCED (M21–M30) ────────────────────────────────────────────
  // Focus: complex systems, function transformations, probability,
  //        trigonometry, advanced data interpretation, multi-step word problems.

  {
    id: 221,
    section: "math",
    stage: "advanced",
    text: `A function is defined as f(x) = x² − 4x + 3. For what values of x is f(x) < 0?`,
    options: [
      "x < 1 or x > 3",
      "1 < x < 3",
      "x < −1 or x > −3",
      "−3 < x < −1",
    ],
    correctAnswer: "1 < x < 3",
  },
  {
    id: 222,
    section: "math",
    stage: "advanced",
    text: `A survey of 200 people found that 60% prefer tea over coffee. Of those who prefer tea, 40% also drink herbal tea. How many people in the survey both prefer tea and drink herbal tea?`,
    options: ["40", "48", "52", "60"],
    correctAnswer: "48",
  },
  {
    id: 223,
    section: "math",
    stage: "advanced",
    text: `The graph of y = f(x) is shifted 3 units to the right and 2 units down. Which equation represents the new graph?`,
    options: [
      "y = f(x + 3) − 2",
      "y = f(x − 3) − 2",
      "y = f(x − 3) + 2",
      "y = f(x + 3) + 2",
    ],
    correctAnswer: "y = f(x − 3) − 2",
  },
  {
    id: 224,
    section: "math",
    stage: "advanced",
    text: `In triangle ABC, angle A = 30° and the hypotenuse BC = 20. What is the length of side AC opposite angle A? (sin 30° = 0.5)`,
    options: ["5", "8", "10", "12"],
    correctAnswer: "10",
  },
  {
    id: 225,
    section: "math",
    stage: "advanced",
    text: `A line has equation 4x − 2y = 10. A second line is perpendicular to it and passes through (2, 1). What is the equation of the second line?`,
    options: [
      "y = −(1/2)x + 2",
      "y = 2x − 3",
      "y = (1/2)x − 3",
      "y = −2x + 5",
    ],
    correctAnswer: "y = −(1/2)x + 2",
  },
  {
    id: 226,
    section: "math",
    stage: "advanced",
    text: `A data set has mean 50 and standard deviation 8. A value of 66 falls how many standard deviations above the mean?`,
    options: ["1.5", "2", "2.5", "3"],
    correctAnswer: "2",
  },
  {
    id: 227,
    section: "math",
    stage: "advanced",
    text: `Solve for x: (x² − 9) / (x − 3) = 5, given x ≠ 3.`,
    options: ["x = 2", "x = 5", "x = 8", "x = 11"],
    correctAnswer: "x = 8",
  },
  {
    id: 228,
    section: "math",
    stage: "advanced",
    text: `A bag contains 4 red, 5 blue, and 3 green balls. Two balls are drawn without replacement. What is the probability that both are blue?`,
    options: ["5/33", "5/22", "2/11", "25/144"],
    correctAnswer: "5/33",
  },
  {
    id: 229,
    section: "math",
    stage: "advanced",
    text: `A company's profit P (in thousands) is modelled by P(t) = −2t² + 12t − 10, where t is years since launch. In which year does profit reach its maximum?`,
    options: ["t = 2", "t = 3", "t = 4", "t = 6"],
    correctAnswer: "t = 3",
  },
  {
    id: 230,
    section: "math",
    stage: "advanced",
    text: `If log₂(x) + log₂(x − 6) = 4, what is x?`,
    options: ["x = 8", "x = 10", "x = 12", "x = 16"],
    correctAnswer: "x = 8",
  },
];
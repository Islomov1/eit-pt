import { EnglishQuestion, LevelGroup } from "@/types/test";

export const englishQuestions: EnglishQuestion[] = [
  // ─── A1 (Questions 1–11) ───────────────────────────────────────────────────
  // Core grammar: be/have, there is/are, can, present simple, possessives, basic negation
  {
    id: 1,
    cefrLevel: "A1",
    text: "I like ice cream, but it ___ my favourite food.",
    options: ["aren't", "isn't", "am not"],
    correctAnswer: "isn't",
  },
  {
    id: 2,
    cefrLevel: "A1",
    text: "My best ___ name is Kate.",
    options: ["friend's", "friend", "friends"],
    correctAnswer: "friend's",
  },
  {
    id: 3,
    cefrLevel: "A1",
    text: "___ a nice café next to the park.",
    options: ["There", "There is", "There are"],
    correctAnswer: "There is",
  },
  {
    id: 4,
    cefrLevel: "A1",
    text: "There aren't ___ tall buildings in my town.",
    options: ["any", "some", "a"],
    correctAnswer: "any",
  },
  {
    id: 5,
    cefrLevel: "A1",
    text: "My dad ___ my music.",
    options: ["doesn't like", "don't like", "isn't like"],
    correctAnswer: "doesn't like",
  },
  {
    id: 6,
    cefrLevel: "A1",
    text: "I haven't got ___ to do my homework.",
    options: ["times", "a time", "time"],
    correctAnswer: "time",
  },
  {
    id: 7,
    cefrLevel: "A1",
    text: "Maria ___ play volleyball – she isn't good at it.",
    options: ["can", "can't", "no can"],
    correctAnswer: "can't",
  },
  {
    id: 8,
    cefrLevel: "A1",
    text: "My brother ___ to music with his headphones – he can't hear you.",
    options: ["is listening", "listening", "is listen"],
    correctAnswer: "is listening",
  },
  {
    id: 9,
    cefrLevel: "A1",
    text: "You ___ forget to buy a birthday present for Paula today.",
    options: ["mustn't", "must", "don't must"],
    correctAnswer: "mustn't",
  },
  {
    id: 10,
    cefrLevel: "A1",
    text: "At Lucy's party last night, 40 people.",
    options: ["there are", "there was", "there were"],
    correctAnswer: "there were",
  },
  {
    id: 11,
    cefrLevel: "A1",
    text: "Mark ___ a big burger for dinner yesterday.",
    options: ["eat", "ate", "is eating"],
    correctAnswer: "ate",
  },

  // ─── A2 (Questions 12–22) ──────────────────────────────────────────────────
  // Comparatives, gerunds, adverb placement, present continuous vs simple,
  // pronouns, past simple, modal obligations
  {
    id: 12,
    cefrLevel: "A2",
    text: "Trains are usually ___ buses.",
    options: ["expensiver than", "expensive than", "more expensive than"],
    correctAnswer: "more expensive than",
  },
  {
    id: 13,
    cefrLevel: "A2",
    text: "I enjoy ___ on my own.",
    options: ["being", "be", "to be"],
    correctAnswer: "being",
  },
  {
    id: 14,
    cefrLevel: "A2",
    text: "I ___ late for school.",
    options: ["occasionally", "occasionally am", "am occasionally"],
    correctAnswer: "am occasionally",
  },
  {
    id: 15,
    cefrLevel: "A2",
    text: "My father usually works in an office, but today, he ___ at home.",
    options: ["is working", "works", "is work"],
    correctAnswer: "is working",
  },
  {
    id: 16,
    cefrLevel: "A2",
    text: "There aren't ___ biscuits in the kitchen.",
    options: ["a", "any", "some"],
    correctAnswer: "any",
  },
  {
    id: 17,
    cefrLevel: "A2",
    text: "This pen isn't yours, it's ___.",
    options: ["my", "mine", "me"],
    correctAnswer: "mine",
  },
  {
    id: 18,
    cefrLevel: "A2",
    text: "We ___ a very good film last night.",
    options: ["see", "seeing", "saw"],
    correctAnswer: "saw",
  },
  {
    id: 19,
    cefrLevel: "A2",
    text: "I ___ wake up early on Saturday. There is no school.",
    options: ["don't have to", "mustn't", "don't must"],
    correctAnswer: "don't have to",
  },
  {
    id: 20,
    cefrLevel: "A2",
    text: "I ___ between 11pm and 6am yesterday.",
    options: ["was sleeping", "am sleeping", "sleeping"],
    correctAnswer: "was sleeping",
  },
  {
    id: 21,
    cefrLevel: "A2",
    text: "Brazil is ___ country in the world.",
    options: ["the most", "the most interesting", "more interesting"],
    correctAnswer: "the most interesting",
  },
  {
    id: 22,
    cefrLevel: "A2",
    text: "My parents and I ___ a holiday this year.",
    options: ["are not going to have", "are not going", "are not having to"],
    correctAnswer: "are not going to have",
  },

  // ─── B1 (Questions 23–33) ──────────────────────────────────────────────────
  // First conditional, present perfect, for/since, as…as comparisons,
  // adverbs of manner, present perfect continuous, unless, used to
  {
    id: 23,
    cefrLevel: "B1",
    text: "If you don't sleep, you ___ tired tomorrow.",
    options: ["are being", "are", "will be"],
    correctAnswer: "will be",
  },
  {
    id: 24,
    cefrLevel: "B1",
    text: "Have you ___ to London?",
    options: ["ever been", "ever", "been ever"],
    correctAnswer: "ever been",
  },
  {
    id: 25,
    cefrLevel: "B1",
    text: "I haven't done my homework ___.",
    options: ["already", "just", "yet"],
    correctAnswer: "yet",
  },
  {
    id: 26,
    cefrLevel: "B1",
    text: "I've known my best friend ___ three years.",
    options: ["in", "for", "since"],
    correctAnswer: "for",
  },
  {
    id: 27,
    cefrLevel: "B1",
    text: "Cola ___ water.",
    options: ["isn't as healthy as", "isn't healthy as", "isn't as healthy"],
    correctAnswer: "isn't as healthy as",
  },
  {
    id: 28,
    cefrLevel: "B1",
    text: "Please speak ___ – I don't understand you.",
    options: ["more slower", "more slow", "more slowly"],
    correctAnswer: "more slowly",
  },
  {
    id: 29,
    cefrLevel: "B1",
    text: "We ___ here since 2012.",
    options: ["have been living", "are living", "live"],
    correctAnswer: "have been living",
  },
  {
    id: 30,
    cefrLevel: "B1",
    text: "You will be late now ___ .",
    options: ["if you leave", "unless you don't leave", "unless you leave"],
    correctAnswer: "unless you leave",
  },
  {
    id: 31,
    cefrLevel: "B1",
    text: "The plane ___ at 6:40 tomorrow.",
    options: ["leaves", "is leave", "leaving"],
    correctAnswer: "leaves",
  },
  {
    id: 32,
    cefrLevel: "B1",
    text: "___ to watch a lot of TV when you were younger?",
    options: ["Did you used", "Did you use", "Did you"],
    correctAnswer: "Did you use",
  },
  {
    id: 33,
    cefrLevel: "B1",
    text: "If I was ill, I ___ in bed.",
    options: ["would stay", "will stay", "stayed"],
    correctAnswer: "would stay",
  },

  // ─── B2 (Questions 34–44) ──────────────────────────────────────────────────
  // Past perfect, reported speech, 3rd conditional, future continuous,
  // causative have, wish, relative clauses, modal perfects intro
  {
    id: 34,
    cefrLevel: "B2",
    text: "We were tired after we ___ all over the city.",
    options: ["were walking", "had walked", "have walked"],
    correctAnswer: "had walked",
  },
  {
    id: 35,
    cefrLevel: "B2",
    text: "My friend told me that he ___ an amazing holiday in Greece last year.",
    options: ["has", "has had", "had had"],
    correctAnswer: "had had",
  },
  {
    id: 36,
    cefrLevel: "B2",
    text: "I would have been hungry if I ___ a big lunch.",
    options: ["ate", "hadn't eaten", "had eaten"],
    correctAnswer: "hadn't eaten",
  },
  {
    id: 37,
    cefrLevel: "B2",
    text: "I'm sure ___ later, so I'm taking an umbrella.",
    options: ["it will rain", "it's raining", "it rains"],
    correctAnswer: "it will rain",
  },
  {
    id: 38,
    cefrLevel: "B2",
    text: "I ___ like chocolate when I was younger.",
    options: ["wouldn't", "would", "used to"],
    correctAnswer: "used to",
  },
  {
    id: 39,
    cefrLevel: "B2",
    text: "It's late – I ___ go to sleep.",
    options: ["had better", "better had", "have better"],
    correctAnswer: "had better",
  },
  {
    id: 40,
    cefrLevel: "B2",
    text: "I wish Laura ___ the phone.",
    options: ["did answer", "would answer", "will answer"],
    correctAnswer: "would answer",
  },
  {
    id: 41,
    cefrLevel: "B2",
    text: "Stephen Hawking, ___ in Cambridge, is a famous scientist.",
    options: ["where lives", "who lives", "that lives"],
    correctAnswer: "who lives",
  },
  {
    id: 42,
    cefrLevel: "B2",
    text: "I want to have ___ the next time I go to the dentist.",
    options: ["cleaned my teeth", "my teeth clean", "my teeth cleaned"],
    correctAnswer: "my teeth cleaned",
  },
  {
    id: 43,
    cefrLevel: "B2",
    text: "My father ___ my room.",
    options: ["made tidy me", "made me to tidy", "made me tidy"],
    correctAnswer: "made me tidy",
  },
  {
    id: 44,
    cefrLevel: "B2",
    text: "John asked ___ to go to the cinema.",
    options: ["me if I wanted", "me I wanted", "if me I wanted"],
    correctAnswer: "me if I wanted",
  },

  // ─── C1 (Questions 45–55) ──────────────────────────────────────────────────
  // Modal perfects, future perfect, infinitive/gerund distinctions,
  // phrasal verbs, concession connectors, future continuous, 3rd conditional
  {
    id: 45,
    cefrLevel: "C1",
    text: "Mike didn't eat anything – he ___ hungry.",
    options: ["can't have been", "mustn't have been", "can't be"],
    correctAnswer: "can't have been",
  },
  {
    id: 46,
    cefrLevel: "C1",
    text: "I ___ my work by 6pm, so I can go out at 7.",
    options: ["am finishing", "will have finished", "have finished"],
    correctAnswer: "will have finished",
  },
  {
    id: 47,
    cefrLevel: "C1",
    text: "I managed ___ all my exams.",
    options: ["passing", "pass to", "to pass"],
    correctAnswer: "to pass",
  },
  {
    id: 48,
    cefrLevel: "C1",
    text: "We need to look ___.",
    options: ["into", "the problem into", "into the problem"],
    correctAnswer: "into the problem",
  },
  {
    id: 49,
    cefrLevel: "C1",
    text: "I regret ___ with my brother.",
    options: ["fight", "to fight", "fighting"],
    correctAnswer: "fighting",
  },
  {
    id: 50,
    cefrLevel: "C1",
    text: "I'm sorry, I have ___ time at the moment, so I can't meet you.",
    options: ["a few", "hardly any", "not many"],
    correctAnswer: "hardly any",
  },
  {
    id: 51,
    cefrLevel: "C1",
    text: "My father is Spanish, so I'm ___ this language.",
    options: ["used to hearing", "used to hear", "used"],
    correctAnswer: "used to hearing",
  },
  {
    id: 52,
    cefrLevel: "C1",
    text: "I ___ finding someone to fix my computer.",
    options: ["was able to", "managed", "succeeded in"],
    correctAnswer: "succeeded in",
  },
  {
    id: 53,
    cefrLevel: "C1",
    text: "___ the weather was terrible, we had a good time.",
    options: ["Nevertheless", "Even though", "Despite"],
    correctAnswer: "Even though",
  },
  {
    id: 54,
    cefrLevel: "C1",
    text: "This time tomorrow, we ___ on a plane over the Atlantic.",
    options: ["are sitting", "will sit", "will be sitting"],
    correctAnswer: "will be sitting",
  },
  {
    id: 55,
    cefrLevel: "C1",
    text: "I ___ to see that film yesterday if I liked action movies.",
    options: ["would have gone", "would go", "went"],
    correctAnswer: "would have gone",
  },

  // ─── C2 (Questions 56–66) ──────────────────────────────────────────────────
  // Advanced: rather + past subjunctive, complex reported speech, modal deduction,
  // passive reporting verbs, cleft sentences, participle clauses, connectors
  {
    id: 56,
    cefrLevel: "C2",
    text: "Laura doesn't like that café, so she'd rather ___ somewhere else.",
    options: ["we will go", "we went", "we go"],
    correctAnswer: "we went",
  },
  {
    id: 57,
    cefrLevel: "C2",
    text: "My mother asked ___ late home last night.",
    options: ["me why I was", "why I am", "if why I was"],
    correctAnswer: "me why I was",
  },
  {
    id: 58,
    cefrLevel: "C2",
    text: "Emma ___ got lost – she knows this area very well.",
    options: ["can't have", "mustn't have", "is bound to have"],
    correctAnswer: "can't have",
  },
  {
    id: 59,
    cefrLevel: "C2",
    text: "___ heavy rain, parts of the city are flooded.",
    options: ["Consequently", "As a result", "Due to"],
    correctAnswer: "Due to",
  },
  {
    id: 60,
    cefrLevel: "C2",
    text: "Dolphins ___ call each other by 'name'.",
    options: ["are believed", "are believed to", "believed to"],
    correctAnswer: "are believed to",
  },
  {
    id: 61,
    cefrLevel: "C2",
    text: "Richard ___ listen to loud music when he feels upset.",
    options: ["tends", "is always", "will typically"],
    correctAnswer: "will typically",
  },
  {
    id: 62,
    cefrLevel: "C2",
    text: "It's time ___ back to work. It's nearly 2 o'clock.",
    options: ["if we went", "we go", "we went"],
    correctAnswer: "we went",
  },
  {
    id: 63,
    cefrLevel: "C2",
    text: "We'll definitely be able to catch the bus ___ we leave now.",
    options: ["otherwise", "as long as", "unless"],
    correctAnswer: "as long as",
  },
  {
    id: 64,
    cefrLevel: "C2",
    text: "All ___ to do to stay healthy is eat well, and get enough sleep and exercise.",
    options: ["you need", "it is", "what is you need"],
    correctAnswer: "you need",
  },
  {
    id: 65,
    cefrLevel: "C2",
    text: "___ in 2012 with just two people, the company is now a great success, employing more than 200.",
    options: ["Having set up", "Setting up", "Set up"],
    correctAnswer: "Set up",
  },
  {
    id: 66,
    cefrLevel: "C2",
    text: "I've checked everything, so hopefully, there ___ be any more problems.",
    options: ["shouldn't", "mustn't", "can't"],
    correctAnswer: "shouldn't",
  },
];

// ─── Level groups with pass thresholds ────────────────────────────────────────
// Each level has 11 questions. Students need 8/11 (≈73%) to advance.
// If they fail a level, the test stops and that level is their result.
export const englishLevelGroups: LevelGroup[] = [
  {
    level: "A1",
    passmark: 8,
    message:
      "You are at a beginner stage. You can handle very simple language, but you still need stronger control of basic grammar and everyday vocabulary.",
  },
  {
    level: "A2",
    passmark: 8,
    message:
      "You can manage familiar everyday English, but less familiar grammar and longer structures still cause problems.",
  },
  {
    level: "B1",
    passmark: 8,
    message:
      "You can handle common communication and standard grammar reasonably well, but you still need more control with complex forms and accuracy.",
  },
  {
    level: "B2",
    passmark: 8,
    message:
      "You show good control of English and can deal with more demanding grammar and vocabulary, though advanced structures are not always secure.",
  },
  {
    level: "C1",
    passmark: 8,
    message:
      "You show strong command of grammar, structure, and advanced usage, though the most complex forms still need refinement.",
  },
  {
    level: "C2",
    passmark: 0, // No gate — completing C2 means C2 result
    message:
      "You show an exceptional command of English grammar and structure, handling even the most demanding language tasks with confidence and precision.",
  },
];
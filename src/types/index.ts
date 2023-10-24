interface Question {
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  topic: string;
  correct: string;
  quick_explanation: string;
}

type QuestionsData = Question[];

export type {
    Question,
    QuestionsData
};


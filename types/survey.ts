export type QuestionType =
  | 'checkbox'
  | 'radio'
  | 'multiselect'
  | 'singleselect'
  | 'text'
  | 'date'
  | 'rating';

export type QuestionTypeLabel =
  | "Text Input"
  | "Checkbox (Multiple Choice)"
  | "Radio (Single Choice)"
  | "Multi Select"
  | "Single Select"
  | "Date Picker"
  | "Rating"

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  index: number;
  type: QuestionType;
  typeLabel: QuestionTypeLabel;
  text: string;
  options?: Option[];
  required?: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: Answer[];
  submittedAt: string;
}

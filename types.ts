export interface Question {
  Text: string;
  Options: string[];
  CorrectAnswer: string;
  Category: string;
  Difficulty: 'easy' | 'medium' | 'hard';
}

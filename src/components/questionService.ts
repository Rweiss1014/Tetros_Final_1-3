import Papa from 'papaparse';

export interface Question {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: number;  // 0-based
  category: string;
  difficulty: string;
  explanation: string;
}

let cachedQuestions: Question[] | null = null;

export async function getQuestions(): Promise<Question[]> {
  if (cachedQuestions) return cachedQuestions;

  try {
    const response = await fetch('./questions.csv');
    const text = await response.text();

    const parsed = Papa.parse<Question>(text, {
      header: true,
      skipEmptyLines: true
    });

    cachedQuestions = parsed.data.map((row, index) => ({
      id: Number(row.id) || index + 1,
      question: row.question,
      option1: row.option1,
      option2: row.option2,
      option3: row.option3,
      option4: row.option4,
      correctAnswer: parseInt(row.correctAnswer, 10),  // 0-based
      category: row.category,
      difficulty: row.difficulty,
      explanation: row.explanation
    }));

    return cachedQuestions;
  } catch (error) {
    console.warn('CSV failed to load, using fallback data');
    return fallbackQuestions;
  }
}

export async function getQuestionsForLevel(level: number, count: number): Promise<Question[]> {
  const all = await getQuestions();
  return all.filter(q => Number(q.difficulty) === level).slice(0, count);
}

export async function getRandomQuestion(excludeIds: Array<string | number> = []): Promise<Question> {
  const all = await getQuestions();
  const exclusionSet = new Set(excludeIds.map(String));
  const available = all.filter(q => !exclusionSet.has(String(q.id)));
  const pool = available.length > 0 ? available : all;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function calculateQuizBonus(): number {
  return 100;
}

export function calculateQuestionPoints(isCorrect: boolean, timeElapsed: number): number {
  if (!isCorrect) {
    return -50;
  }

  const basePoints = 100;
  const timeLimit = 30;
  const clampedTime = Math.min(Math.max(timeElapsed, 0), timeLimit);

  if (clampedTime <= 5) {
    return basePoints + 200;
  }
  if (clampedTime <= 15) {
    return basePoints + Math.max(100, 150 - ((clampedTime - 5) * 5));
  }
  if (clampedTime <= 25) {
    return basePoints + Math.max(50, 100 - ((clampedTime - 15) * 5));
  }
  return basePoints + Math.max(0, 50 - ((clampedTime - 25) * 10));
}

const fallbackQuestions: Question[] = [
  {
    id: 1,
    question: 'Fallback question?',
    option1: 'A',
    option2: 'B',
    option3: 'C',
    option4: 'D',
    correctAnswer: 0,
    category: 'Fallback',
    difficulty: '1',
    explanation: 'Used if CSV fails'
  }
];

// quizService.ts
//
// Sibling service to dataService.ts. dataService.ts owns chapter-list
// normalization only (unchanged). This file owns question-level
// normalization for the Quiz Screen (Feature 03).
//
// Rationale: the 12 question bank files use inconsistent shapes for
// chapter->question linkage and for option/answer representation.
// Centralizing that logic here (instead of inside QuizScreen.tsx) keeps
// the component focused on rendering and keeps format-detection logic
// in one place, ready for reuse by future features (Result Screen,
// Wrong Questions, Favorites, Shuffle) without touching dataService.ts.

import { groupQuestionsByName } from './chapterGrouping';

export interface QuizOption {
  optionId: string;
  optionText: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  questionId: string | number;
  questionText: string;
  options: QuizOption[];
}

async function fetchRawBank(folder: string, file: string): Promise<any> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/${folder}/${file}`
  );

  if (!response.ok) {
    throw new Error(`Không đọc được ${folder}/${file}`);
  }

  return response.json();
}

function getRawQuestionId(q: any, index: number): string | number {
  return q.question_id ?? q.id ?? q.q_id ?? index + 1;
}

function getQuestionText(q: any): string {
  return (
    q.question_text ??
    q.question_stem ??
    q.question ??
    q.text ??
    q.statement ??
    ''
  );
}

function normalizeOptions(q: any): QuizOption[] {
  const correctAnswer = q.correct_answer;

  // Array-based options
  if (Array.isArray(q.options) && q.options.length > 0) {
    const first = q.options[0];

    // ["Đ", "S"] - plain strings, correct_answer matches the text itself
    if (typeof first === 'string') {
      return q.options.map((text: string, idx: number) => ({
        optionId: String.fromCharCode(65 + idx),
        optionText: text,
        isCorrect: text === correctAnswer,
      }));
    }

    // [{ option_id, option_text, is_correct }]
    if ('is_correct' in first) {
      return q.options.map((o: any) => ({
        optionId: String(o.option_id),
        optionText: o.option_text,
        isCorrect: Boolean(o.is_correct),
      }));
    }

    // [{ option: "A", text: "..." }] or [{ key: "A", text: "..." }]
    return q.options.map((o: any) => {
      const id = String(o.option_id ?? o.option ?? o.key ?? o.id ?? '');
      return {
        optionId: id,
        optionText: o.option_text ?? o.text ?? '',
        isCorrect: id === String(correctAnswer),
      };
    });
  }

  // Dict-based options: { A: "Đúng", B: "Sai" }
  if (q.options && typeof q.options === 'object') {
    return Object.entries(q.options).map(([id, text]) => ({
      optionId: id,
      optionText: String(text),
      isCorrect: id === String(correctAnswer),
    }));
  }

  // Flat fields: option_a / option_b
  const flatKeys = Object.keys(q).filter((k) => /^option_[a-z]$/i.test(k));
  if (flatKeys.length > 0) {
    return flatKeys.map((k) => {
      const id = k.replace('option_', '').toUpperCase();
      return {
        optionId: id,
        optionText: q[k],
        isCorrect: id === String(correctAnswer).toUpperCase(),
      };
    });
  }

  return [];
}

function normalizeQuestion(q: any, index: number): QuizQuestion {
  return {
    questionId: getRawQuestionId(q, index),
    questionText: getQuestionText(q),
    options: normalizeOptions(q),
  };
}

/**
 * Returns the normalized question list for a given chapter.
 *
 * Mirrors dataService.ts's chapter-id assignment logic exactly (including
 * the Format 4 fallback grouping by chapter/section name) so the chapterId
 * passed in here — which came from the chapter list the user already
 * selected — always resolves to the same group of questions.
 */
export async function getQuestionsForChapter(
  folder: string,
  file: string,
  chapterId: string | number
): Promise<QuizQuestion[]> {
  const data = await fetchRawBank(folder, file);
  const targetId = String(chapterId);
  const chapters = Array.isArray(data.chapters) ? data.chapters : [];

  if (chapters.length > 0) {
    const chapterMatch = chapters.find(
      (c: any) => String(c.chapter_id ?? c.id) === targetId
    );

    if (chapterMatch) {
      // Strategy A: chapter object embeds its own questions[]
      if (Array.isArray(chapterMatch.questions)) {
        return chapterMatch.questions.map((q: any, i: number) =>
          normalizeQuestion(q, i)
        );
      }

      // Strategy B: chapter references question_ids against top-level questions[]
      if (
        Array.isArray(chapterMatch.question_ids) &&
        Array.isArray(data.questions)
      ) {
        const idSet = new Set(chapterMatch.question_ids.map(String));
        return data.questions
          .filter((q: any, i: number) =>
            idSet.has(String(getRawQuestionId(q, i)))
          )
          .map((q: any, i: number) => normalizeQuestion(q, i));
      }

      // Strategy C: top-level questions[] carry a matching chapter_id
      if (Array.isArray(data.questions)) {
        const matches = data.questions.filter(
          (q: any) => String(q.chapter_id) === targetId
        );
        if (matches.length > 0) {
          return matches.map((q: any, i: number) => normalizeQuestion(q, i));
        }
      }
    }
  }

  // Strategy D: no usable chapter grouping in the source file — group
  // top-level questions by chapter/section name, in order of first
  // appearance. Uses the SAME shared helper as dataService.ts's Format 4
  // branch, so there is exactly one implementation of this algorithm.
  if (Array.isArray(data.questions)) {
    const groups = groupQuestionsByName(data.questions);

    for (const group of groups.values()) {
      if (String(group.chapterId) === targetId) {
        return group.items.map((q: any, i: number) => normalizeQuestion(q, i));
      }
    }

    return [];
  }

  return [];
}

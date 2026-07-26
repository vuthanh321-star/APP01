import { groupQuestionsByName } from './chapterGrouping';

export async function loadQuestionBank(folder: string, file: string) {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/${folder}/${file}`
  );

  if (!response.ok) {
    throw new Error(`Không đọc được ${folder}/${file}`);
  }

  const data = await response.json();

  // ==========================================
  // FORMAT 1
  // chapters + chapter_name
  // ==========================================
  if (
    data.metadata &&
    Array.isArray(data.chapters) &&
    data.chapters.length > 0 &&
    data.chapters[0].chapter_name
  ) {
    return data;
  }

  // ==========================================
  // FORMAT 2
  // chapters + name
  // ==========================================
  if (
    data.metadata &&
    Array.isArray(data.chapters) &&
    data.chapters.length > 0 &&
    data.chapters[0].name
  ) {
    return {
      metadata: {
        total_questions:
          data.metadata.total_questions ??
          data.metadata.totalQuestions ??
          data.metadata.questions ??
          0,
      },
      chapters: data.chapters.map((c: any) => ({
        chapter_id: c.chapter_id,
        chapter_name: c.name,
      })),
    };
  }

  // ==========================================
  // FORMAT 3
  // chapters + title
  // ==========================================
  if (
    data.metadata &&
    Array.isArray(data.chapters) &&
    data.chapters.length > 0 &&
    data.chapters[0].title
  ) {
    return {
      metadata: {
        total_questions:
          data.metadata.total_questions ??
          data.metadata.questions ??
          0,
      },
      chapters: data.chapters.map((c: any, index: number) => ({
        chapter_id: c.id ?? index + 1,
        chapter_name: c.title,
      })),
    };
  }

  // ==========================================
  // FORMAT 4
  // questions only
  // Grouping algorithm shared with quizService.ts via chapterGrouping.ts
  // so this logic exists in exactly one place.
  // ==========================================
  if (Array.isArray(data.questions)) {
    const groups = groupQuestionsByName(data.questions);

    return {
      metadata: {
        total_questions:
          data.metadata?.total_questions ??
          data.questions.length,
      },
      chapters: Array.from(groups.entries()).map(([name, group]) => ({
        chapter_id: group.chapterId,
        chapter_name: name,
      })),
    };
  }

  return {
    metadata: {
      total_questions: 0,
    },
    chapters: [],
  };
}
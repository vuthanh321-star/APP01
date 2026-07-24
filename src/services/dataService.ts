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
  // ==========================================
  if (Array.isArray(data.questions)) {
    const map = new Map<string, number>();

    data.questions.forEach((q: any) => {
      const name = q.chapter ?? q.section ?? "Chưa phân chương";

      if (!map.has(name)) {
        map.set(name, map.size + 1);
      }
    });

    return {
      metadata: {
        total_questions:
          data.metadata?.total_questions ??
          data.questions.length,
      },
      chapters: Array.from(map.entries()).map(([name, id]) => ({
        chapter_id: id,
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
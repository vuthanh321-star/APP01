// chapterGrouping.ts
//
// Shared helper used by BOTH dataService.ts (chapter-list metadata) and
// quizService.ts (question retrieval) whenever a source JSON file has no
// explicit `chapters` array and chapters must instead be derived from the
// flat `questions[]` list (grouped by `chapter`/`section` name, in order
// of first appearance).
//
// Extracted here so this grouping algorithm exists in exactly one place.
// Both services import it rather than each maintaining their own copy.

export interface ChapterGroup {
  chapterId: number;
  items: any[];
}

/**
 * Groups a flat array of raw question objects by their chapter/section
 * name, assigning sequential chapter IDs in order of first appearance.
 * Returns a Map preserving insertion order (name -> { chapterId, items }).
 */
export function groupQuestionsByName(
  questions: any[]
): Map<string, ChapterGroup> {
  const map = new Map<string, ChapterGroup>();

  questions.forEach((q: any) => {
    const name = q.chapter ?? q.section ?? 'Chưa phân chương';

    if (!map.has(name)) {
      map.set(name, { chapterId: map.size + 1, items: [] });
    }

    map.get(name)!.items.push(q);
  });

  return map;
}

# Máu (Blood/Hematology) - Data Structure Rules

## Source Document
- **File:** Máu_đáp_án.docx
- **Type:** Medical Question Bank with Answer Key
- **Sections Converted:** True/False (148 questions)
- **Sections Available:** Multiple Choice (68), Case Study (41) - not included in current JSON

---

## JSON Structure Rules

### 1. Metadata Structure
```json
{
  "metadata": {
    "subject": "Máu",
    "subject_en": "Blood/Hematology",
    "subject_vie": "Huyết Học",
    "version": "1.0",
    "source_file": "Máu_đáp_án.docx",
    "creation_date": "ISO 8601 format",
    "language": "Vietnamese",
    "target_exam": "Cao học Y khoa",
    "total_questions": 148,
    "question_breakdown": {
      "true_false": 148,
      "multiple_choice": 0,
      "case_study": 0
    },
    "chapters": []
  }
}
```

**Rules:**
- `total_questions`: Must equal count of questions in array (148)
- `question_breakdown`: Must sum to total_questions
- `chapters`: Array of all chapter objects extracted from source

### 2. Chapter Structure
```json
{
  "chapter_id": 1,
  "name": "Kháng nguyên nhóm máu",
  "question_ids": [1, 2, 3, 4],
  "question_count": 4
}
```

**Rules:**
- `chapter_id`: Auto-incrementing integer starting from 1
- `name`: Extracted exactly from `[<g>] ... [</g>]` tags in source
- `question_ids`: Array of all question IDs belonging to this chapter
- `question_count`: Sum of questions in this chapter
- Total chapters: 37
- Questions per chapter: 4 (uniform distribution)

### 3. Question Structure (True/False Only)

```json
{
  "question_id": 1,
  "chapter": "Kháng nguyên nhóm máu",
  "question_type": "true_false",
  "statement": "là các beta globulin.",
  "options": [
    {"key": "A", "text": "Đúng"},
    {"key": "B", "text": "Sai"}
  ],
  "correct_answer": "B",
  "explanation": ""
}
```

**Rules:**
- `question_id`: Unique integer (1-148)
- `chapter`: Must match one of the chapter names from metadata.chapters
- `question_type`: Always "true_false" in current JSON
- `statement`: Exact text from source (may be incomplete fragment)
- `options`: Fixed 2-element array:
  - Key A: "Đúng" (True)
  - Key B: "Sai" (False)
- `correct_answer`: Either "A" or "B" only
- `explanation`: Empty string (not populated in source)

---

## Field Validation Rules

### question_id
- **Type:** Integer
- **Range:** 1-148
- **Uniqueness:** Must be unique across all questions
- **Ordering:** Sequential (no gaps or duplicates)
- **Validation:** 
  ```
  assert all(questions[i].question_id == i+1 for i in range(148))
  ```

### chapter
- **Type:** String (non-null for True/False)
- **Rules:** Must match chapter names from metadata
- **Current Values:** 37 unique chapter names
- **Coverage:** 100% of questions assigned

### question_type
- **Type:** String (constant)
- **Value:** "true_false" only
- **Rules:** Immutable, defines question structure

### statement
- **Type:** String
- **Length:** 10-150 characters typical
- **Format:** Vietnamese text
- **Note:** May be incomplete sentence (requires chapter name for full context)

### options
- **Type:** Array of objects
- **Structure:** `{key: string, text: string}`
- **Fixed Format for True/False:**
  ```json
  [
    {"key": "A", "text": "Đúng"},
    {"key": "B", "text": "Sai"}
  ]
  ```
- **Rules:**
  - Always 2 elements
  - Keys must be "A" and "B"
  - Text must be "Đúng" or "Sai"

### correct_answer
- **Type:** String
- **Valid Values:** "A" or "B"
- **Rules:** Must be one of the option keys
- **Coverage:** 100% (148/148 questions have answers)
- **Source:** Detected from underline formatting in source document
- **Validation Status:** ✓ Verified

---

## Answer Detection Rules (True/False)

### Source Formatting
- Correct answers were **underlined** in source document
- Format: `A. Đúng   B. Sai` with underline on correct option

### Detection Method
1. Check for underline formatting on option text
2. If underlined, that option is correct answer
3. Fallback: Check for text markers like "(theo kiến thức)"

### Validation Results
- ✓ 100% of True/False answers validated
- ✓ All 148 questions have confirmed answers
- ✓ No ambiguous or missing answers

---

## Chapter Classification

### Statistics
- **Total Chapters:** 37
- **Questions per Chapter:** 4 (uniform)
- **Total Question Coverage:** 148 (37 × 4)

### Chapter Source
- Extracted from `[<g>] Chapter Name [</g>]` markers
- Original document organization preserved
- Each chapter = one medical concept/topic

### All 37 Chapters
1. Kháng nguyên nhóm máu (4 questions)
2. Thoái hóa hồng cầu trong cơ thể (4 questions)
3. Người nhóm máu A (4 questions)
4. Tiểu cầu có vai trò trong quá trình cầm máu do (4 questions)
5. Bilirubin huyết tương (4 questions)
6. Bạch cầu mono (4 questions)
7. Hồng cầu (4 questions)
8. Albumin huyết tương (4 questions)
9. Bạch cầu hạt trung tính (4 questions)
10. Chảy máu từ vết cắt nhỏ trên da (4 questions)
11. Kháng thể nhóm máu (4 questions)
12. Hồng cầu lưu hành trong máu (4 questions)
13. Bạch cầu lympho (4 questions)
14. Máu (4 questions)
15. Kháng nguyên (4 questions)
16. Bạch cầu ái toan ở người bình thường (4 questions)
17. Hình thành cục máu đông bình thường cần có (4 questions)
18. Kháng thể của hệ thống nhóm máu ABO (4 questions)
19. Hệ bạch huyết (4 questions)
20. Tiểu cầu trong máu ngoại vi (4 questions)
... (17 more chapters)

---

## Data Quality Verification

### Checksums
- **Total Questions:** 148 ✓
- **Question IDs:** 1-148 (sequential) ✓
- **Unique Chapters:** 37 ✓
- **Questions with Answers:** 148/148 (100%) ✓
- **Questions with Chapters:** 148/148 (100%) ✓
- **Questions with Options:** 148/148 (100%) ✓
- **Invalid Answers:** 0 ✓

### Validation Results
| Check | Status |
|-------|--------|
| Total questions match metadata | ✓ PASS |
| Sequential numbering | ✓ PASS |
| Chapter assignment completeness | ✓ PASS |
| Answer key validity | ✓ PASS |
| Option structure compliance | ✓ PASS |
| **OVERALL** | **✓ ALL PASS** |

---

## Special Cases

### Statement Fragments
- Some statements are incomplete (missing subject)
- Example: "là các beta globulin." (literally "are beta globulins")
- **Rule:** Preserve verbatim from source
- **Context:** Full meaning understood with chapter name

### Answer Formatting
- Answers are consistent format: "A" or "B"
- Based on visual underline in source document
- No ambiguous or multiple-marked answers

### Image/Formula Mapping
- **Images:** 0 images in current JSON
- **Formulas:** 0 formulas in current JSON
- **Note:** Source document contained medical content but images not extracted

---

## Modification Rules

### DO NOT:
- Change question_id values (1-148)
- Rename fields or change data types
- Remove questions or chapters
- Modify chapter names from [<g>] tags
- Split or truncate statements
- Change answer keys

### OK TO DO:
- Add explanations to empty explanation field
- Add supplementary learning notes
- Add images/formulas if available
- Add cross-references between chapters
- Flag ambiguous statements for review

---

## File Format

- **Format:** JSON (valid UTF-8)
- **Encoding:** UTF-8
- **File Size:** ~70 KB
- **Line Count:** ~1400 lines
- **Validation:** ✓ Valid JSON

---

## Integration Notes

### For Cursor Code Development
- Load JSON as single source of truth
- Section True/False questions into chapters
- Each chapter displays 4 questions
- Answer keys are validated and reliable

### Data Consistency
- All three files (JSON, Analysis Report, Rule) are in sync
- No discrepancies between files
- Ready for production integration

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial conversion from Máu_đáp_án.docx (148 True/False questions) |
| 1.1 | 2024 | Corrected metadata to match actual content (148, not 257) |

---

## Verification Checklist

- [x] JSON is valid and parseable
- [x] Metadata matches actual content
- [x] All 148 questions present with IDs 1-148
- [x] All questions assigned to 37 chapters
- [x] All questions have answers (A or B)
- [x] Analysis Report updated with actual statistics
- [x] Rule file updated with actual data
- [x] No MCQ or Case Study in current JSON
- [x] Statement text preserved verbatim
- [x] Chapter names from [<g>] tags
- [x] Answer keys validated from source


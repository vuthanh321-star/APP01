# Đại Cương - Data Structure Rules

## Overview
This document defines the structural and validation rules for the Đại Cương question bank JSON database.

---

## JSON Structure Rules

### Root Level
```
{
  "metadata": {...},
  "chapters": [...],
  "mcq_section": [...],
  "case_studies": [...]
}
```

### Metadata Rules

| Field | Type | Rule |
|---|---|---|
| subject | string | Must exactly match filename without extension |
| language | string | Must be "vi" for Vietnamese |
| version | string | Format: "X.Y" (e.g., "1.0") |
| total_questions | number | Sum of all questions (T/F+MCQ+case): Should be 147 |
| exam_type | string | Descriptive text for exam category |
| created_date | string | ISO 8601 format (YYYY-MM-DD) |
| last_updated | string | ISO 8601 format (YYYY-MM-DD) |
| question_types | array | All question types present in database |
| chapters_count | number | Count of chapters in true/false section |

### Chapter Rules

#### For True/False Chapters
```json
{
  "chapter_id": number,
  "chapter_name": string,
  "section": "true_false",
  "questions": [...]
}
```

**Rules:**
- `chapter_id` must be sequential integer starting from 1
- `chapter_name` must match exactly as written in original document
- `section` must be "true_false" for T/F chapters
- Minimum 4 questions per chapter (if following original pattern)
- Questions must be in order

#### For MCQ and Case Study Sections
- MCQ questions stored in separate `mcq_section` array (NOT in chapters)
- Case studies stored in `case_studies` array (NOT in chapters)

### Question Rules

#### True/False Questions
```json
{
  "question_id": number,
  "question_text": string,
  "question_type": "true_false",
  "options": [
    {
      "option_id": "A" or "B",
      "option_text": "Đúng" or "Sai",
      "is_correct": boolean
    }
  ]
}
```

**Validation Rules:**
- `question_id` must be unique across entire database
- `question_id` must be sequential integer
- `question_text` must preserve original wording exactly
- `question_type` MUST be "true_false" for this section
- EXACTLY 2 options required (A=Đúng, B=Sai)
- EXACTLY one `is_correct: true` per question
- Option order must be consistent (A first, B second)

#### Multiple Choice Questions
```json
{
  "question_id": number,
  "question_text": string,
  "question_type": "multiple_choice",
  "chapter_id": null,
  "options": [
    {
      "option_id": "A" or "B" or "C" or "D",
      "option_text": string,
      "is_correct": boolean
    }
  ]
}
```

**Validation Rules:**
- `question_id` must be sequential continuing from T/F questions
- EXACTLY 4 options required (A, B, C, D)
- EXACTLY one `is_correct: true` per question
- `chapter_id` MUST be null for MCQ questions
- Options must be in order A, B, C, D

#### Case Study Questions
```json
{
  "question_id": string (format: "CXQy"),
  "question_text": string,
  "question_type": "case_study",
  "options": [...]
}
```

**Validation Rules:**
- `question_id` format: "C" + case_number + "Q" + question_number (e.g., "C1Q1", "C3Q4")
- Each case has separate numbering starting with Q1
- EXACTLY 4 options per question (A, B, C, D)
- EXACTLY one `is_correct: true` per question

### Case Study Rules

```json
{
  "case_id": number,
  "case_title": string,
  "case_description": string,
  "questions": [...]
}
```

**Rules:**
- `case_id` must be sequential integer starting from 1
- `case_title` format: "Case Study X: [descriptive title]"
- `case_description` must be complete and contain all relevant clinical information
- Each case contains 1-5 related questions
- Questions within a case share the same case context

---

## Content Rules

### Medical Terminology
- ✅ All Vietnamese medical terms preserved exactly as in source
- ✅ No medical content modified or reinterpreted
- ✅ No summarization or simplification of medical concepts
- ✅ Original punctuation and capitalization maintained

### Question Text Rules
- Questions must be preserved word-for-word from source
- No paraphrasing or rewording allowed
- Parenthetical notes and explanations kept as provided (e.g., "theo sgk", "sai theo sgk")
- Special formatting marks converted to text (e.g., [<g>] → removed, [<br>] → section separator)

### Answer Validation Rules
- ✅ True/False: Always exactly 2 options
- ✅ Multiple Choice: Always exactly 4 options
- ✅ Every question has exactly 1 correct answer
- ✅ Correct answers identified from source formatting (bold/underline markers)
- ✅ No ambiguous or multiple correct answers allowed

---

## Numbering Rules

### Question ID Rules
- **True/False questions:** 1-120 (continuous, no gaps)
- **MCQ questions:** 121-129 (continuing from T/F)
- **Case Study questions:** CxQy format (separate per case)

### Validation Checks
- ✅ No duplicate question IDs
- ✅ No missing numbers in main sequence
- ✅ Case study IDs follow pattern strictly
- ✅ Total count matches metadata declaration

### Chapter/Section Rules
- **Chapter IDs:** 1-30 (for true/false sections only)
- **Case Study IDs:** 1-5
- **MCQ Section:** No chapter ID (chapter_id = null)

---

## Answer Distribution Rules

### True/False Section
- **Total:** 120 questions
- **Correct Answer Distribution:**
  - "Đúng" (A): 80 questions (66.7%)
  - "Sai" (B): 40 questions (33.3%)
- **Rule:** This distribution reflects the pedagogical emphasis on affirmative statements in general physiology teaching

### Multiple Choice Section
- **Total:** 9 questions
- **Answer Distribution:** Should be relatively balanced but may vary by question difficulty
  - A: 2 questions (22%)
  - B: 2 questions (22%)
  - C: 2 questions (22%)
  - D: 3 questions (33%)

### Case Study Questions
- **Total:** 18 questions across 5 cases
- **Distribution:** Varies by case complexity
  - Case 1: 5 questions
  - Case 2: 4 questions
  - Case 3: 4 questions
  - Case 4: 4 questions
  - Case 5: 1 question
  - **Subtotal:** 18 questions

---

## Topic Coverage Rules

### Chapter Organization (True/False)
- **Thermoregulation topics:** Chapters 7-18 (12 chapters = 48 questions)
- **Metabolism topics:** Chapters 19-30 (12 chapters = 48 questions)
- **General physiology:** Chapters 1-6 (6 chapters = 24 questions)

### Topic Consistency Rules
- Each chapter focuses on ONE specific topic
- Questions within a chapter follow a logical progression
- Chapter sequence follows natural learning progression (basic → complex)

---

## Field Validation Rules

### Metadata Fields
```json
"metadata": {
  "subject": "Đại Cương",                    // MUST match filename
  "language": "vi",                         // MUST be "vi"
  "version": "1.0",                         // Format: X.Y
  "total_questions": 129,                   // Must equal actual count
  "exam_type": "Medical School Entrance",   // Descriptive string
  "created_date": "2026-07-19",            // ISO 8601
  "last_updated": "2026-07-19",            // ISO 8601
  "question_types": [...],                  // Array of types present
  "chapters_count": 30                      // Must match chapter count
}
```

### Chapter Fields
```json
"chapters": {
  "chapter_id": (1-30),                    // Sequential
  "chapter_name": string,                  // From source document
  "section": "true_false",                 // MUST be "true_false" for this array
  "questions": array                       // Questions in chapter
}
```

### Question Fields
```json
{
  "question_id": (1-129 or CxQy),         // Unique identifier
  "question_text": string,                 // Word-for-word from source
  "question_type": string,                 // "true_false", "multiple_choice", "case_study"
  "chapter_id": (number or null),         // null for MCQ/case studies
  "options": array                         // Answer options
}
```

### Option Fields
```json
{
  "option_id": ("A" or "B" or "C" or "D"), // Sequential letter
  "option_text": string,                    // Full option text
  "is_correct": boolean                     // Exactly one true per question
}
```

---

## Integrity Checks (Self-Validation)

### Before Export
1. **Count Validation**
   - [ ] Sum of questions = 147 (120 T/F + 9 MCQ + 18 case)
   - [ ] Chapters = 30
   - [ ] T/F questions = 120
   - [ ] MCQ questions = 9
   - [ ] Case study questions = 18

2. **Sequence Validation**
   - [ ] Question IDs 1-129 continuous (no gaps)
   - [ ] Chapter IDs 1-30 sequential
   - [ ] Case IDs 1-5 sequential
   - [ ] Options in correct order (A, B, C, D)

3. **Content Validation**
   - [ ] No question text is empty
   - [ ] No option text is empty
   - [ ] Every question has exactly 1 correct answer
   - [ ] No duplicate question IDs

4. **Structure Validation**
   - [ ] Valid JSON syntax
   - [ ] All required fields present
   - [ ] Correct data types for all fields
   - [ ] No null values except chapter_id in MCQ/case studies

---

## Special Cases and Exceptions

### Question 24 (Homeostasis)
- **Note:** Includes textbook reference "(theo sgk)"
- **Rule:** Preserve parenthetical note in question text

### Question 35 (Cold resistance)
- **Note:** Includes explanation "(sgk không có cơ chế này nên sai)"
- **Rule:** Keep parenthetical explanation in question text

### Question 62 (Water evaporation)
- **Note:** Marked "(sai theo sgk)" 
- **Rule:** Preserve marking in question text

### Question 107 (Glucose regulation)
- **Note:** May reference endocrine axis complexity
- **Rule:** Maintain exact wording including technical terms

---

## Maintenance Rules

### If Adding New Questions
1. Increment total_questions in metadata
2. Continue numbering sequence (don't reuse IDs)
3. Assign to appropriate section (chapters, mcq_section, or case_studies)
4. Maintain consistent formatting with existing questions
5. Update last_updated timestamp

### If Modifying Existing Questions
1. Never change question_id
2. Update last_updated timestamp
3. Do not modify medical content (only grammar/clarity if necessary)
4. If changing answer key, document reason
5. Update related metadata if applicable

### If Removing Questions
1. DO NOT reuse question IDs
2. Update total_questions count
3. Mark as deprecated rather than deleting
4. Maintain historical record

---

## Cross-Reference Rules

### Questions Referencing Same Topic
- Chapter 11 and MCQ Question 125 both reference "Cung phản xạ điều nhiệt"
- Chapter 12 and MCQ Question 126 both reference "Điều hòa thân nhiệt"
- **Rule:** Thematic consistency should be maintained across sections

### Case Studies References
- Case 1-5 MCQ questions correlate to main database topics
- Case study questions test clinical application of theoretical knowledge
- **Rule:** Case studies should complement not replace main database

---

## Version Control Rules

### Current Version: 1.0
- Initial complete conversion from Word document
- All 120 T/F questions included
- All 9 MCQ questions included
- All 9 case study questions included

### Future Versions
- Version 1.1: Add difficulty levels to all questions
- Version 1.2: Add reference materials and explanations
- Version 2.0: Add image/formula support

---

## Data Accessibility Rules

### Read Rules
- ✅ Question bank can be read by all application instances
- ✅ Metadata can be queried for exam configuration
- ✅ Questions can be selected by chapter, type, or difficulty

### Write Rules
- ❌ NO direct manual JSON editing allowed
- ✅ ONLY through designated conversion tools
- ✅ Changes must go through review and validation
- ✅ ALL changes must be timestamped and logged

### Consistency Rules
- ✅ Single source of truth: question_bank_dai_cuong.json
- ✅ No cached versions without sync mechanism
- ✅ Real-time updates required for production use

---

## End of Rules Document

**Document Version:** 1.0
**Last Updated:** 2026-07-19
**Validation Status:** COMPLETE

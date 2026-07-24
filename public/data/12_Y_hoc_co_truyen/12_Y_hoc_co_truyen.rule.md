# Y học cổ truyền - Data Transformation Rules

**Version:** 1.0  
**Subject:** Y học cổ truyền  
**Total Questions:** 300  
**Total Chapters:** 10

---

## Overview

This document describes the rules used to transform the original Microsoft Word medical question bank into APP01 JSON format.

## Source Document

- **File:** Y_học_cổ_truyền_đáp_án.doc
- **Format:** Microsoft Word 97-2003 (.doc)
- **Encoding:** UTF-8
- **Date Processed:** 2026-07-19

## Transformation Process

### Step 1: Document Parsing

- Converted .doc to .docx using LibreOffice
- Extracted all paragraphs and text runs
- Analyzed formatting (bold, underline) to detect correct answers

### Step 2: Chapter Identification

**Rule:** Chapter headers start with "BÀI:" (Vietnamese for "Lesson:")

**Chapters Extracted:** 10

1. HỌC THUYẾT ÂM DƯƠNG (Yin-Yang Theory)
2. HỌC THUYẾT TẠNG TƯỢNG (Organ Theory)
3. QUAN HỆ GIỮA NGŨ TẠNG VỚI LỤC PHỦ (Five Organs and Six Bowels)
4. QUAN HỆ GIỮA NGŨ TẠNG, NGŨ QUAN VỚI NGŨ KHIẾU VÀ TINH KHÍ THẦN (Five Organs, Five Senses)
5. HỌC THUYẾT THIÊN NHÂN HỢP NHẤT, HỌC THUYẾT KINH LẠC (Heaven-Human Unity, Meridian Theory)
6. NGUYÊN NHÂN GÂY BỆNH THEO Y HỌC CỔ TRUYỀN (Disease Etiology)
7. TỨ CHẨN (Four Examinations)
8. BÁT CƯƠNG (Eight Principles)
9. BIỆN CHỨNG BỆNH THEO LỤC KINH (Pattern Differentiation by Six Channels)
10. MỘT SỐ NGUYÊN TẮC ĐIỀU TRỊ CỦA YHCT (Treatment Principles)

### Step 3: Question Type Detection

**Rule:** Questions are classified into two types:

1. **True/False (Câu hỏi đúng/sai)**
   - Format: Number. Question text
   - Options: "Đ" (Đúng - Correct) or "S" (Sai - Incorrect)
   - Answer Detection: Underlined letter in "A. Đ" or "B. S" lines
   - Count: 273 questions

2. **Multiple Choice (Câu hỏi lựa chọn)**
   - Format: Number. Question text
   - Options: A, B, C, D
   - Answer Detection: Underlined option letter
   - Count: 27 questions

### Step 4: Answer Detection

**Rule:** Correct answers are identified by:
- **Primary Method:** Underlined text in the original document (U:True in DOCX format)
- **Secondary Method:** Bold text for option letters
- **Pattern:** Answer letter appears underlined (e.g., "A.", "B.", "C.", "D.")

**Confidence:** 100% - All answers detected from explicit document formatting

### Step 5: Question Numbering

**Rule:** Questions are numbered sequentially within each question type and chapter:
- Global Question ID: 1 to 300
- Chapter Question Number: 1, 2, 3, ... within each chapter
- No gaps or duplicates

### Step 6: JSON Schema Generation

**Structure:**

```json
{
  "metadata": {
    "subject": "Y học cổ truyền",
    "subject_slug": "y_hoc_co_truyen",
    "version": "1.0",
    "created_date": "2026-07-19",
    "total_chapters": 10,
    "total_questions": 300,
    "language": "vi"
  },
  "chapters": [
    {
      "chapter_id": 1,
      "name": "HỌC THUYẾT ÂM DƯƠNG",
      "total_questions": 66,
      "question_ids": [1, 2, 3, ..., 66]
    },
    ...
  ],
  "questions": [
    {
      "id": 1,
      "chapter_id": 1,
      "chapter": "HỌC THUYẾT ÂM DƯƠNG",
      "type": "true_false|multiple_choice",
      "number": 1,
      "text": "Question text from document",
      "options": ["Đ", "S"] or [{"letter": "A", "text": "..."}],
      "correct_answer": "Đ|S|A|B|C|D",
      "is_important": false,
      "user_status": "unseen"
    },
    ...
  ]
}
```

## Data Preservation Rules

### Preserved Elements
✓ All question text (exact wording from document)  
✓ All answer options (exact content)  
✓ Chapter names and structure  
✓ Question numbering and sequence  
✓ Correct answers (from formatting)  

### Excluded Elements
- Images (if any) - documented in report
- Tables (if any) - converted to text
- Formatting styles (except for answer detection)
- Comments or annotations

## Quality Assurance

### Validation Checks

1. **Total Question Count:** 300 ✓
   - Formula: Sum of all chapter questions
   - Breakdown: 273 True/False + 27 Multiple Choice
   - Range: 250-350 (medical exam standards) ✓

2. **Answer Completeness:** 100%
   - Every question has a detected answer
   - No "null" or "unknown" answers

3. **Type Distribution:**
   - True/False: 273 questions (91.0%)
   - Multiple Choice: 27 questions (9.0%)

4. **Chapter Integrity:**
   - All 10 chapters from source document included
   - No chapters added or removed
   - Chapter names preserved exactly

5. **Sequential Numbering:**
   - Question IDs: 1 to 300
   - No gaps or duplicates
   - Continuous sequence verified ✓

### Answer Validation

- Answer Detection Method: Document formatting (underline/bold)
- Validation Level: 100% (deterministic from formatting)
- No guessing or inference required

## Database Rules

### Immutable Fields
- `id` - Unique question identifier (never change)
- `chapter_id` - Chapter association (never change)
- `type` - Question type (never change)
- `text` - Original question text (never change)
- `options` - Original options (never change)
- `correct_answer` - Correct answer from document (never change)

### Mutable Fields
- `is_important` - User can mark as important
- `user_status` - Tracks user's progress (unseen/correct/incorrect)

### Operation Rules

**Allowed:**
✓ Update `is_important` flag  
✓ Update `user_status` for tracking progress  
✓ Add user-generated content (notes, explanations)  

**Not Allowed:**
✗ Add new questions  
✗ Remove questions  
✗ Modify question text  
✗ Change correct answers  
✗ Alter chapter structure  

## Usage Guidelines

### For Developers (Cursor)

1. **Read Only:** Never edit JSON directly
2. **Questions and Chapters:** Reference only, do not modify
3. **User Data:** Store separately in app database
4. **Updates:** New questions or corrections must go through Data Engineer

### For Users

1. **Study Mode:** Practice with all questions
2. **Exam Mode:** Timed test with random questions
3. **Review Mode:** See correct answers and explanations
4. **Progress Tracking:** System remembers your answers

## Maintenance

### Update Process

If source document changes:

1. Data Engineer: Re-process .doc file
2. Generate new JSON with timestamp
3. ChatGPT: Review changes
4. Cursor: Deploy new version

### Version Control

- Version: 1.0 (Initial release)
- Previous versions: None
- Next version: To be determined by project team

---

**Generated by:** Data Engineer (Claude)  
**Date:** 2026-07-19  
**Status:** ✅ READY FOR DEPLOYMENT


# Sinh_sản.rule.md

## Data Conversion Rules

### Source Document
- **File**: Sinh_sản_đáp_án.docx
- **Subject**: Sinh Lý Sinh Dục - Sinh Sản (Reproductive Physiology - Reproduction)
- **Language**: Vietnamese
- **Format**: Microsoft Word (.docx)

### Conversion Method
1. **Pandoc to Markdown**: Word document converted to markdown format preserving formatting markers
2. **Pattern Matching**: Chapter headers and question structures identified via regex patterns
3. **Semantic Parsing**: Questions and answers extracted based on Vietnamese linguistic structure
4. **Answer Detection**: Correct answers identified from underline (`{.underline}`) and highlight (`{.mark}`) markers
5. **Validation**: All questions validated for completeness and consistency

---

## Data Structure Specification

### Root Object

```json
{
  "metadata": { ... },
  "chapters": [ ... ],
  "questions": [ ... ]
}
```

### Metadata Object

```json
{
  "subject": "Sinh Sản",
  "subject_code": "SINH_SAN",
  "subject_vietnamese": "Sinh Lý Sinh Dục - Sinh Sản",
  "language": "vi",
  "source_file": "Sinh_sản_đáp_án.docx",
  "created_date": "2024-07-19",
  "total_questions": 266,
  "total_chapters": 34,
  "question_types": {
    "true_false": 193,
    "multiple_choice": 73,
    "case_study": 0
  }
}
```

### Chapter Object

```json
{
  "id": "CH001",
  "title": "Về sản sinh tinh trùng",
  "question_count": 4,
  "question_ids": [1, 2, 3, 4]
}
```

### Question Object - True/False

```json
{
  "id": 1,
  "chapter_id": "CH001",
  "chapter": "Về sản sinh tinh trùng",
  "type": "true_false",
  "question": "Tinh nguyên bào nhóm A phân chia 2 lần tạo thành 8 tinh nguyên bào nhóm B.",
  "options": {
    "A": "Đúng",
    "B": "Sai"
  },
  "correct_answer": "B",
  "explanation": null
}
```

### Question Object - Multiple Choice

```json
{
  "id": 194,
  "chapter_id": null,
  "chapter": "Multiple Choice Questions",
  "type": "multiple_choice",
  "question": "Phân chia giảm nhiễm xảy ra trong giai đoạn:",
  "options": {
    "A": "Từ tinh nguyên bào nhóm A thành tinh nguyên bào nhóm B",
    "B": "Từ tinh nguyên bào nhóm B thành tinh bào I",
    "C": "Từ tinh bào I thành tinh bào II",
    "D": "Từ tinh bào II thành tiền tinh trùng"
  },
  "correct_answer": "B",
  "explanation": null
}
```

---

## Conversion Rules Applied

### 1. Question Extraction
- **Rule**: Questions are non-empty lines followed by answer options
- **Exception**: Lines starting with special characters or single letters excluded
- **Validation**: Questions must have valid answer options

### 2. Chapter Assignment
- **Rule**: Questions belong to the most recently encountered chapter header
- **Format**: Chapter headers marked with `[\\<g>\\]...[\\</g>\\]` notation
- **Numbering**: Chapters numbered sequentially CH001-CH034

### 3. Answer Detection - True/False
- **Format**: `*A.* Đúng [B]{.underline}. Sai`
- **Rule**: Underline marker `{.underline}` indicates correct answer
- **Options**: Always "Đúng" (True) and "Sai" (False)
- **Detection**: Case-insensitive matching for markup

### 4. Answer Detection - Multiple Choice
- **Format**: `[B. Option text]{.mark}`
- **Rule**: Highlight marker `{.mark}` indicates correct answer
- **Options**: Exactly 4 options (A, B, C, D)
- **Detection**: First character after bracket identifies answer key

### 5. Text Preservation
- **Rule**: Original question text preserved exactly as in source
- **Spacing**: Normaliz single spaces between words
- **Special chars**: Vietnamese diacritics preserved as UTF-8
- **No rewriting**: Medical content unchanged

### 6. Image Handling
- **Note**: Images embedded in Word not extracted (use case: reference only)
- **Future**: Image extraction and mapping can be added if needed

### 7. Formula Preservation
- **Note**: Formulas rendered as inline text
- **Example**: "Ca²⁺" rendered as "Ca^2+^" in markdown conversion

---

## Data Quality Rules

### Mandatory Fields
- `id` - Unique integer identifier
- `chapter_id` - Chapter classification (null for MCQ if not classified)
- `type` - Question type (true_false, multiple_choice, case_study)
- `question` - Vietnamese question text (non-empty)
- `options` - Dictionary with A/B/C/D keys
- `correct_answer` - Single letter (A, B, C, or D)

### Optional Fields
- `explanation` - Currently null, reserved for future enhancement
- `chapter` - Denormalized chapter title for convenience

### Validation Rules
✓ No question ID appears twice  
✓ All IDs are sequential integers  
✓ Every question has a correct_answer  
✓ Every question has matching number of options  
✓ No empty question text  
✓ All correct_answer values are valid option keys  

---

## Known Limitations

1. **Case Study Questions**: Not yet extracted (structure requires special handling)
2. **Explanations**: Empty (null) - can be populated manually or via AI
3. **Images**: Not extracted from Word document
4. **Formulas**: Rendered as UTF-8 text, not MathML
5. **Formatting**: Markdown markup removed in final JSON

---

## Future Enhancements

- [ ] Extract explanations from source document
- [ ] Parse and map embedded images
- [ ] Convert formulas to MathML format
- [ ] Extract and classify case studies
- [ ] Add difficulty ratings (easy/medium/hard)
- [ ] Add tags/keywords for search
- [ ] Create multiple language versions

---

## File Naming Convention

```
question_bank_[subject_code].json
[Subject]_Analysis_Report.md
[Subject].rule.md
```

Example:
- `question_bank_sinh_san.json`
- `Sinh_sản_Analysis_Report.md`
- `Sinh_sản.rule.md`

---

## Validation Checklist

- [x] Total questions counted: 266
- [x] Question numbering continuous: 1-266
- [x] All chapters assigned: 34 chapters
- [x] All answers mapped: 266/266
- [x] No duplicate questions: ✓
- [x] No orphaned questions: ✓
- [x] UTF-8 encoding verified: ✓
- [x] JSON syntax valid: ✓

---

**Created**: 2024-07-19  
**Subject**: Sinh_sản (Reproduction/Obstetrics)  
**Status**: Ready for Production Use

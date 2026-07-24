# SinhLy.rule.md

## Document Conversion Rules for Sinh_lý_tuần_hoàn_đáp_án.docx

**Document Title:** Cardiovascular Physiology - Answer Key  
**Vietnamese Name:** Sinh lý tuần hoàn (đáp án)  
**Date Created:** July 18, 2026  
**Status:** FROZEN - Based on Analysis Report  
**Scope:** True/False section only (paragraphs 0-492)

---

## 1. DOCUMENT SCOPE

### Primary Section
- **Section Name:** PHẦN ĐÚNG/SAI (True/False Section)
- **Starting Paragraph:** [0]
- **Ending Paragraph:** [492]
- **Content:** 164 True/False questions + 41 chapters

### Excluded Sections
- **PHẦN MCQ** (Multiple Choice section) - Start: paragraph [495]
- **PHẦN CASE LÂM SÀNG** (Case Studies section) - Start: paragraph [931]
- **Reason:** Not part of current conversion scope

---

## 2. CHAPTER EXTRACTION RULES

### Detection Pattern
```
[<g>] [Chapter Name] [</g>]
```

### Extraction Rules
1. **Marker:** Lines that start with `[<g>]` and end with `[</g>]`
2. **Chapter Name:** Extract text between markers (remove brackets)
3. **Count:** Exactly 41 chapters to be extracted
4. **Order:** Sequential (maintain order from document)
5. **Validation:** All chapter names must be unique

### Chapter Properties
- **chapter_id:** 1-41 (sequential, 1-indexed)
- **chapter_name:** Vietnamese text (preserve exactly as written)
- **question_count:** 4 questions per chapter (in T/F section)

### Chapter List (Reference)
```
1. Về cơ chế điều hoà hoạt động tim
2. Về ảnh hưởng của dây thần kinh tự chủ lên tim
3. Về các phản xạ điều hoà tim
4. Về chu kỳ tim ở người bình thường
5. Tiếng tim
6. Các chất điều hoà vận mạch
7. Angiotensin II có tác dụng
8. Về huyết áp động mạch
9. Huyết áp động mạch
10. Về tuần hoàn trong mạch máu
11. Đặc điểm của tĩnh mạch
12. Trong thời kỳ tăng áp
13. Tiếng tim thứ nhất
14. Tính hưng phấn của cơ tim
15. Khoảng PQ trong điện tâm đồ
16. Về đầy thất
17. Thể tích tâm thu
18. Chu chuyển tim sinh lý và chu chuyển tim lâm sàng
19. Thành tâm thất phải mỏng hơn tâm thất trái vì
20. Tâm thất trái có thành dày hơn tâm thất phải vì
21. Ở người bình thường, giai đoạn tâm thất thu
22. Tần số tim tăng khi
23. Tính trơ có chu kỳ
24. Cơ tim hoạt động theo quy luật "tất hoặc không" vì
25. Các chất sau đây gây giãn mạch
26. Những thay đổi sau đây làm tăng huyết áp
27. Khi trương lực mạch máu bình thường, lực co cơ tim giảm làm cho
28. Huyết áp tăng sẽ kích thích bộ phận nhận cảm áp lực gây ra
29. Cơ chế điều hoà làm giảm huyết áp động mạch xảy ra khi
30. Huyết áp động mạch tăng trong
31. Nguyên nhân chính của tuần hoàn tĩnh mạch nửa trên của cơ thể là
32. Nguyên nhân chính của tuần hoàn tĩnh mạch phía dưới của cơ thể là
33. Áp suất thuỷ tĩnh của huyết tương
34. Dịch từ lòng mao mạch di chuyển ra khoảng kẽ tăng lên khi
35. Lưu lượng mạch vành tăng lên khi
36. Lưu lượng máu não tăng lên khi
37. Lưu lượng máu qua phổi tăng lên khi
38. Tiểu động mạch giãn ra khi
39. Kích thích hệ thần kinh giao cảm làm tăng huyết áp do
40. Angiotensin II được tạo ra khi
41. Phản xạ điều hoà huyết áp xảy ra khi
```

---

## 3. QUESTION EXTRACTION RULES

### Question Type
- **Type:** True/False (Đúng/Sai)
- **All 164 questions:** Follow identical format
- **No mixed types:** All questions are True/False only

### Question Detection Pattern
1. **Question Stem:** Any paragraph that:
   - Does not start with `[<g>]` or `[</g>]`
   - Is not empty or `[<br>]`
   - Is followed by an answer line (contains "A. Đúng" and "B. Sai")
   - Contains medical content in Vietnamese

2. **Answer Line:** Paragraph that contains:
   - Starts with `A.` and contains `B.`
   - Contains word "Đúng" (True)
   - Contains word "Sai" (False)

### Question Structure
```
[Paragraph N] [Question Stem Text]
[Paragraph N+1] A. Đúng [TAB] B. Sai
```

### Question Properties
- **question_id:** 1-164 (sequential within chapter)
- **chapter_id:** 1-41 (from detected chapter)
- **question_stem:** Vietnamese text (preserve exactly)
- **question_type:** "true_false"
- **correct_answer:** "A" or "B" (detected from underline)

### Text Preservation Rules
- Keep all Vietnamese text exactly as written
- Preserve medical terminology (no translation)
- Keep special characters: ↑, ↓, →, °, etc.
- Escape reserved JSON characters: `"` → `\"`
- Maintain UTF-8 encoding

### Question Length Specification
- **Minimum:** 9 characters
- **Maximum:** 101 characters
- **Average:** 42 characters
- **Distribution:** 51 questions < 30 chars, rest between 30-101 chars
- **Handling:** All lengths are acceptable for JSON storage

---

## 4. ANSWER DETECTION RULES

### Answer Marking Method
**Marking Type:** UNDERLINE on letter (A or B)

### Answer Detection Algorithm
```
For each answer line containing "A. Đúng" and "B. Sai":
  1. Parse XML runs from paragraph
  2. Check each run's underline property
  3. If run contains "A" and underline=TRUE → answer = "A"
  4. If run contains "B" and underline=TRUE → answer = "B"
  5. Validate: Exactly one letter must be underlined
```

### Validation Rules
- **Each question:** Must have exactly one underlined letter (A or B)
- **No double marking:** Never both A and B underlined
- **No missing marks:** Never neither A nor B underlined
- **No other marks:** Ignore bold, color, italic formatting

### Answer Distribution
- **Correct Answer = A (Đúng/True):** 80 questions
- **Correct Answer = B (Sai/False):** 84 questions
- **Total:** 164 questions
- **Validation check:** Sum must equal 164

### Answer Format in JSON
```json
{
  "correct_answer": "A",  // or "B"
  "answer_type": "true_false"
}
```

---

## 5. FORMATTING RULES

### Text Encoding
- **Language:** Vietnamese
- **Charset:** UTF-8
- **Special characters:** 5,696 instances (preserved)
- **Diacritics:** All Vietnamese marks (á, à, ả, ã, ạ, â, ấ, etc.) preserved exactly

### Line Break Handling
- **Document separator:** `[<br>]` marks end of answer line
- **Extraction rule:** Remove `[<br>]` - not part of question data
- **JSON output:** Do not include separator in text fields

### Tab Character Handling
- **In answer lines:** Multiple tabs between "A. Đúng" and "B. Sai"
- **Extraction rule:** Remove tabs - not part of question data
- **JSON output:** Answer line is split into options, not stored as single line

### Reserved JSON Characters
- **Quote marks:** 2 instances found in document
- **Handling:** Escape as `\"` in JSON string
- **Other characters:** Backslash (0), newline (0), carriage return (0)
- **No other escaping needed**

### Whitespace Handling
- **Leading/trailing spaces:** Strip from question stems
- **Preserve internal spaces:** Keep spacing within questions
- **Multiple spaces:** Treat as single space (normalize)

---

## 6. CHAPTER-TO-QUESTION MAPPING

### Hierarchical Structure
```
Chapter [chapter_id]
  ├─ [chapter_name]
  └─ Questions (4 per chapter)
      ├─ Question 1
      │  ├─ Stem
      │  ├─ Answer: A or B
      │  └─ Chapter: [chapter_id]
      ├─ Question 2
      ├─ Question 3
      └─ Question 4
```

### Mapping Rules
1. **Sequential processing:** Parse document top to bottom
2. **Current chapter tracking:** When `[<g>]...[</g>]` found, update current chapter
3. **Question assignment:** All questions before next chapter belong to current chapter
4. **Validation:** Each chapter must have questions (no empty chapters)
5. **Count:** Total 164 questions ÷ 41 chapters = 4 questions/chapter

### Expected Distribution
- **Chapters with 4 questions:** 41 chapters
- **Chapters with 0 questions:** 0 (validation check)
- **Chapters with >4 questions:** 0 (should not occur)
- **Orphaned questions:** 0 (all must belong to chapter)

---

## 7. DATA VALIDATION RULES

### Completeness Checks
```
✓ Total chapters: must equal 41
✓ Total questions: must equal 164
✓ Questions per chapter: must equal 4
✓ Answer marks: must equal 164 (one per question)
✓ Missing data: must equal 0
✓ Orphaned questions: must equal 0
```

### Answer Validation
```
✓ Answer A count: must equal 80
✓ Answer B count: must equal 84
✓ Total: 80 + 84 = 164
✓ Unanswered: must equal 0
✓ Ambiguous answers: must equal 0
```

### Text Validation
```
✓ Chapter names: 41 unique names, no duplicates
✓ Question stems: 164 non-empty strings
✓ All UTF-8 encoded: no encoding errors
✓ No corrupted characters: all Vietnamese preserved
✓ No null or empty values: all fields populated
```

### Structural Validation
```
✓ Chapter headers: must match pattern [<g>]...[</g>]
✓ Answer lines: must contain "A.", "Đúng", "B.", "Sai"
✓ Answer underline: exactly one letter underlined
✓ No multi-paragraph questions: each fits in one paragraph
```

---

## 8. EDGE CASES & SPECIAL HANDLING

### Edge Case 1: Short Question Stems
**Pattern:** Questions with < 30 characters  
**Count:** 51 questions  
**Examples:**
- "Van tổ chim đóng."
- "Histamin."
- "Vasopressin."
- "Angiotensin II."

**Rule:** Keep as-is - these are valid complete medical statements  
**No concatenation needed:** Each is a standalone question

### Edge Case 2: Answer Line Variations
**Pattern:** Some answer lines have annotations  
**Example:** "A. Đúng  B. Sai (theo kiến thức đúng)"  
**Rule:** Ignore annotation text - only extract answer letter  
**JSON storage:** Annotation is not part of answer, ignore it

### Edge Case 3: Medical Terminology "dây X"
**Pattern:** "Phản xạ mắt-tim làm tim đập chậm lại là thông qua dây X"  
**Meaning:** Cranial Nerve X (Vagus nerve)  
**Rule:** Keep "dây X" as written - preserve original medical terminology  
**No expansion:** Do not change to full name, preserve exact text from document

### Edge Case 4: Mathematical Symbols
**Pattern:** Arrows (→, ↑, ↓) in question text  
**Count:** 6 instances  
**Rule:** Preserve all Unicode characters exactly  
**Example:** "CO2↓, O2↑ kích thích receptor..."  
**JSON handling:** Unicode characters render correctly in UTF-8 JSON

### Edge Case 5: Tab Characters in Answer Lines
**Pattern:** Variable number of tabs between A and B  
**Rule:** Remove all tabs when extracting answer options  
**JSON output:** Store as separate fields (option_a, option_b)  
**No whitespace preservation needed**

### Edge Case 6: Chapter Boundary Detection
**Pattern:** When encountering new `[<g>]...[</g>]`, switch chapter context  
**Rule:** All questions since previous chapter belong to previous chapter  
**Validation:** Each chapter ends before next `[<g>]` marker

---

## 9. JSON OUTPUT SPECIFICATIONS

### Document-Level Metadata
```json
{
  "document_id": "sinh_ly_tuan_hoan",
  "document_name": "Sinh lý tuần hoàn (Cardiovascular Physiology)",
  "document_type": "true_false",
  "language": "vi",
  "charset": "utf-8",
  "total_chapters": 41,
  "total_questions": 164,
  "answer_distribution": {
    "true_count": 80,
    "false_count": 84
  }
}
```

### Chapter-Level Structure
```json
{
  "chapter_id": 1,
  "chapter_name": "Về cơ chế điều hoà hoạt động tim",
  "question_count": 4,
  "questions": [...]
}
```

### Question-Level Structure
```json
{
  "question_id": 1,
  "chapter_id": 1,
  "question_stem": "Trong điều kiện bình thường tim thường xuyên chịu tác dụng trương lực của hệ phó giao cảm.",
  "question_type": "true_false",
  "options": {
    "A": "Đúng",
    "B": "Sai"
  },
  "correct_answer": "A",
  "explanation": null
}
```

### Field Rules
- **question_stem:** Non-empty string, UTF-8 encoded, no leading/trailing whitespace
- **correct_answer:** "A" or "B" only
- **question_type:** "true_false" (fixed value for this document)
- **chapter_id:** 1-41 (integer)
- **question_id:** 1-164 (integer)

---

## 10. CONVERSION PROCESS FLOW

### Step 1: Parse Document
```
Read Sinh_lý_tuần_hoàn_đáp_án.docx
Extract all paragraphs from [0] to [492]
Identify structure: headers, questions, answers
```

### Step 2: Extract Chapters
```
For each paragraph [0-492]:
  If pattern matches [<g>]...[</g>]:
    Extract chapter name
    Add to chapter list
    Increment chapter counter
```

### Step 3: Extract Questions
```
For each paragraph [0-492]:
  If follows chapter header and contains question content:
    Store as question stem
    Get next paragraph (answer line)
    Extract underlined letter (A or B)
    Store with chapter_id and question_id
```

### Step 4: Validate
```
Check:
  ✓ 41 chapters extracted
  ✓ 164 questions extracted
  ✓ All questions answered
  ✓ Answer distribution: 80 A + 84 B = 164
  ✓ No orphaned questions
  ✓ No duplicate chapters
  ✓ All UTF-8 encoded correctly
```

### Step 5: Generate JSON
```
Create question_bank.json with structure:
  {
    "metadata": {...},
    "chapters": [
      {
        "chapter_id": 1,
        "chapter_name": "...",
        "questions": [...]
      },
      ...
    ]
  }
```

---

## 11. QUALITY ASSURANCE CHECKLIST

### Pre-Conversion Verification
- [ ] Document file exists: Sinh_lý_tuần_hoàn_đáp_án.docx
- [ ] File is readable without corruption
- [ ] True/False section paragraphs [0-492] accessible

### Extraction Verification
- [ ] All 41 chapters extracted
- [ ] All 164 questions extracted
- [ ] All 164 answers marked and detected
- [ ] No text corruption during extraction
- [ ] Vietnamese UTF-8 preserved

### Validation Verification
- [ ] 41 chapters = chapter_id 1-41
- [ ] 164 questions = question_id 1-164
- [ ] Answer distribution: 80 A, 84 B
- [ ] No orphaned or duplicate data
- [ ] All chapters have 4 questions

### JSON Verification
- [ ] Valid JSON syntax
- [ ] All required fields present
- [ ] No missing or null values (except explanation field)
- [ ] Proper UTF-8 encoding in JSON
- [ ] Reserved characters properly escaped

### Content Verification
- [ ] All medical terminology preserved
- [ ] Mathematical symbols (↑, ↓, →) preserved
- [ ] Vietnamese diacritics correct
- [ ] Short questions not truncated
- [ ] Long questions not corrupted

---

## 12. KNOWN CONSTRAINTS & LIMITATIONS

### Document-Specific Constraints
1. **Image section separate:** Images are in MC section (not extracted for T/F)
2. **Multiple Choice excluded:** MC section not part of this conversion
3. **Case studies excluded:** Case studies section not part of this conversion
4. **True/False only:** No mixed question types within T/F section

### Formatting Constraints
1. **Underline detection:** Only method to detect correct answer
2. **One answer only:** Each question has exactly one correct answer
3. **No image dependency:** T/F questions are text-only

### Data Constraints
1. **Fixed distribution:** 41 chapters with 4 questions each (no variation)
2. **Answer balance:** 80 True, 84 False (not perfectly balanced)
3. **Medical terminology:** Vietnamese - no translation or expansion

### Technical Constraints
1. **UTF-8 only:** All text must be UTF-8 encoded
2. **No special databases:** All data from document parsing
3. **No external knowledge:** Do not add context or explanations
4. **No modification:** Keep data exactly as written in document

---

## 13. ERROR HANDLING

### Extraction Errors
| Error | Handling |
|-------|----------|
| Missing chapter | Stop - report missing chapter |
| Missing answer | Stop - question unanswered |
| Wrong format | Stop - structure corruption |
| Encoding error | Stop - cannot process Vietnamese |
| Duplicate chapter | Stop - data integrity issue |

### Validation Errors
| Error | Handling |
|-------|----------|
| Chapter count ≠ 41 | Stop - incomplete document |
| Question count ≠ 164 | Stop - missing questions |
| Answer count ≠ 164 | Stop - missing answers |
| Distribution != 80+84 | Stop - answer mismatch |
| Orphaned question | Stop - structural issue |

### Warning Conditions (Non-blocking)
| Condition | Action |
|-----------|--------|
| Reserved JSON chars | Escape and continue |
| Short question < 30 | Log and continue (valid) |
| Math symbols | Continue (valid) |
| Medical terminology | Continue (preserve as-is) |

---

## 14. METADATA SPECIFICATION

### Document Metadata
```
source_file: Sinh_lý_tuần_hoàn_đáp_án.docx
subject: Cardiovascular Physiology
language: Vietnamese (vi)
encoding: UTF-8
document_section: PHẦN ĐÚNG/SAI (True/False)
extraction_date: [DATE]
total_paragraphs_analyzed: 492
```

### Statistical Metadata
```
total_chapters: 41
total_questions: 164
answer_a_count: 80
answer_b_count: 84
average_question_length: 42 characters
shortest_question: 9 characters
longest_question: 101 characters
questions_under_30_chars: 51
```

### Quality Metadata
```
data_completeness: 100%
formatting_consistency: Perfect
answer_completeness: 100%
encoding_errors: 0
text_corruption: 0
data_integrity: Perfect
```

---

## 15. SPECIAL NOTES FOR CONVERSION TEAM

### Important Notes
1. **Medical terminology:** Preserve all Vietnamese medical terms exactly as written
   - "dây X" = Cranial Nerve X (do NOT expand)
   - "tim" = heart (do NOT translate)
   - "mạch" = vessel (do NOT translate)

2. **Short questions are valid:** Questions < 30 chars are complete statements in Vietnamese
   - "Van tổ chim đóng." is a valid, complete question
   - Do NOT combine with other paragraphs

3. **Answer detection is reliable:** Underline method has 100% consistency
   - No ambiguity in answer detection
   - Algorithm: if letter underlined → that's the answer

4. **No image extraction needed:** Images are in separate MC section
   - T/F section has 0 images
   - Focus on text extraction only

5. **UTF-8 is critical:** Vietnamese encoding must be preserved perfectly
   - 5,696 special characters in document
   - Loss of encoding will corrupt medical terms

### For Cursor Development
- All data comes from question_bank.json
- Do NOT modify data structure
- Medical terminology is exact - do NOT simplify
- Answer detection is A or B only
- No explanations provided (explanation field should be null)

### For ChatGPT Review
- Verify all 41 chapters present
- Verify all 164 questions present
- Spot-check 10 random questions for accuracy
- Verify answer distribution (80 A, 84 B)
- Check Vietnamese text preservation
- Validate JSON structure

---

## DOCUMENT STATUS

✅ **FROZEN** - Analysis complete  
✅ **READY** - For JSON conversion  
✅ **VALIDATED** - Zero critical issues  

**Next Step:** Await approval to generate question_bank.json

---

**Rule File Version:** 1.0  
**Last Updated:** July 18, 2026  
**Status:** COMPLETE AND FROZEN

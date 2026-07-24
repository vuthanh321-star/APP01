# Thận Question Bank - Rules & Specifications

**Subject:** Thận (Kidney) - Sinh lý thận và bài tiết nước tiểu  
**Data Source:** question_bank_than.json  
**Last Updated:** 2026-07-19  
**Version:** 2.1 (Corrected with Options)

---

## 📋 Data Structure Rules

### Root Level Objects

#### 1. Metadata Object
```javascript
metadata: {
  subject: "Thận",                    // Subject code (Vietnamese)
  subject_vietnamese: "...",          // Full subject name
  total_questions: 165,               // Total questions across all types
  question_types: {
    true_false: 91,                   // Count of T/F questions
    mcq: 58,                          // Count of MCQ questions
    case_study: 16                    // Count of case study questions
  },
  chapters: [                         // Array of 25 chapter objects
    {
      id: 1-23 | 98-99,               // Chapter ID (T/F: 1-23, Case: 98, MCQ: 99)
      name: string,                   // Chapter name
      question_count: integer         // Questions in this chapter
    }
  ]
}
```

**Chapter ID Mapping:**
- **IDs 1-23:** True/False section chapters (note: IDs 1 and 9 both named "Lọc ở cầu thận")
- **ID 98:** Case Study (Lâm sàng) section
- **ID 99:** MCQ (Multiple Choice Questions) section
- **Total:** 25 chapters

#### 2. Questions Array
- All 165 questions stored in single array
- Questions ordered by ID (1-165)
- Each question has type-specific structure

---

## ❓ Question Types & Structure

### Type 1: True/False Questions

#### Structure
```javascript
{
  id: 1-91,                           // Sequential ID for T/F questions
  type: "true_false",                 // Fixed type identifier
  chapter_id: 1-23,                   // Chapter ID (T/F sections only)
  chapter: "string",                  // Chapter name (Vietnamese)
  question: "string",                 // Question text (Vietnamese)
  options: [
    { option: "A", text: "Đúng" },   // Always Option A = True
    { option: "B", text: "Sai" }      // Always Option B = False
  ],
  correct_answer: "A" | "B"           // Underlined letter from source
}
```

#### Answer Key Status
- **Coverage:** 91/91 questions have marked answers (100%)
- **Marking Method:** Extracted from underlined text in source document
- **Valid Values:** "A" (Đúng) or "B" (Sai)
- **Distribution:** A=49 (53.8%), B=42 (46.2%)

#### Chapter IDs 1-23 (True/False)
| ID | Chapter Name | Q Count |
|----|--------------|---------|
| 1 | Lọc ở cầu thận | 4 |
| 2 | Cơ chế ảnh hưởng đến lưu lượng lọc ở cầu thận | 4 |
| 3 | Tái hấp thu và bài tiết urê ở thận | 4 |
| 4 | Aldosteron | 4 |
| 5 | Tái hấp thu và bài tiết ion H+ ở thận | 4 |
| 6 | Tái hấp thu glucose ở ống thận | 4 |
| 7 | Tái hấp thu ion Na+ ở ống thận | 4 |
| 8 | Tái hấp thu nước ở ống thận | 4 |
| 9 | Lọc ở cầu thận | 4 |
| 10 | Về nguồn gốc và tác dụng của aldosteron | 4 |
| 11 | Cơ chế tái hấp thu các chất ở ống thận | 4 |
| 12 | Các chất do thận bài tiết là | 4 |
| 13 | Các hormon có tác dụng ở ống thận | 4 |
| 14 | Cơ chế bài tiết ion H+ vào lòng ống thận | 4 |
| 15 | Nồng độ protein trong dịch lọc cầu thận rất thấp do | 4 |
| 16 | Tái hấp thu ở quai Henle | 4 |
| 17 | ADH làm tăng tái hấp thu nước ở | 4 |
| 18 | Thận có chức năng | 4 |
| 19 | Tăng nồng độ aldosteron trong máu sẽ dẫn đến | 4 |
| 20 | Nhờ có cơ chế điều hòa tại thận nên | 4 |
| 21 | Người bình thường uống 1 lít dung dịch NaCl 0,9% thì | 4 |
| 22 | Các chất tác dụng đồng thời lên mạch máu và tái hấp thu | 3 |
| 23 | Angiotensin II làm tăng huyết áp do | 4 |

---

### Type 2: Multiple Choice Questions (MCQ)

#### Structure
```javascript
{
  id: 92-149,                         // Sequential ID for MCQ questions
  type: "mcq",                        // Fixed type identifier
  chapter_id: 99,                     // Fixed chapter ID for MCQ section
  chapter: "MCQ (Multiple Choice Questions)",  // Fixed chapter name
  question: "string",                 // Question text (Vietnamese)
  options: [
    { option: "A", text: "string" },  // Option A text
    { option: "B", text: "string" },  // Option B text
    { option: "C", text: "string" },  // Option C text
    { option: "D", text: "string" }   // Option D text
  ],
  correct_answer: null                // NOT MARKED in source document
}
```

#### Answer Key Status
- **Coverage:** 0/58 questions have marked answers (0%)
- **Marking Method:** No markers found in source document
- **Action Required:** Add answers from external source
- **Null Handling:** `correct_answer` field is null until provided

#### Formatting Rules
- All MCQ questions have exactly 4 options (A, B, C, D)
- Option text extracted exactly as presented in source
- No text normalization or rewording applied

#### Question ID Range
- IDs 92-149 reserved for MCQ questions
- Questions ordered sequentially

---

### Type 3: Case Study Questions

#### Structure
```javascript
{
  id: 150-165,                        // Sequential ID for case study questions
  type: "case_study",                 // Fixed type identifier
  chapter_id: 98,                     // Fixed chapter ID for case section
  chapter: "Case Study (Lâm sàng)",   // Fixed chapter name
  case_description: "string",         // Full case scenario text (Vietnamese)
  sub_questions: [                    // MUST NOT be empty (minimum 1)
    {
      sub_question: "string",         // Sub-question text (Vietnamese)
      options: [                      // MUST contain exactly 4 options
        "A. text",
        "B. text",
        "C. text",
        "D. text"
      ]
    }
  ],
  correct_answers: [null, null, ...]  // Array of answers (one per sub_question)
}
```

#### Answer Key Status
- **Coverage:** 0/16 questions have marked answers (0%)
- **Marking Method:** No markers found in source document
- **Action Required:** Add answers from external source
- **Null Handling:** `correct_answers` array contains null values until provided

#### Sub-Question & Options Rules (MANDATORY - DO NOT VIOLATE)
```
Rule 1: Every case study question MUST have at least one sub_question
        Violation: sub_questions array is empty []

Rule 2: sub_questions array MUST NOT be empty
        Violation: len(sub_questions) == 0

Rule 3: Each sub_question MUST contain exactly 4 options (A, B, C, D)
        Violation: len(options) != 4

Rule 4: Each option MUST be a string starting with "A.", "B.", "C.", or "D."
        Violation: option text doesn't follow format

Rule 5: correct_answers array length MUST match sub_questions array length
        Violation: len(correct_answers) != len(sub_questions)
```

#### Question ID Range
- IDs 150-165 reserved for case study questions (16 total)
- Questions ordered sequentially

---

## 🔑 Field Specifications

### Common Fields (All Question Types)

#### id: number
- **Type:** Integer
- **Range:** 1-165
- **Uniqueness:** Unique across all questions
- **Order:** Sequential (1, 2, 3, ..., 165)
- **Immutable:** Should never change once set
- **Rule:** No gaps allowed in sequence

#### type: string
- **Valid Values:** "true_false", "mcq", "case_study"
- **Default:** None (required)
- **Immutable:** Should never change
- **Mapping:**
  - True/False: IDs 1-91
  - MCQ: IDs 92-149
  - Case Study: IDs 150-165

#### chapter_id: number
- **Type:** Integer
- **True/False Range:** 1-23
- **MCQ:** Fixed at 99
- **Case Study:** Fixed at 98
- **Uniqueness:** Not unique (multiple questions per chapter)
- **Validation:** Must exist in metadata.chapters

#### chapter: string
- **Type:** String (Vietnamese)
- **Length:** 10-150 characters
- **Requirement:** Must match valid chapter name from metadata
- **Case Sensitive:** Yes
- **Validation:** Must correspond to chapter_id

#### question: string
- **Type:** String (Vietnamese)
- **Length:** 20-500 characters
- **Content:** Original text from source document
- **Encoding:** UTF-8 with Vietnamese diacritical marks
- **Line Breaks:** Removed (single-line format)
- **Validation:** Must not be empty

#### options: array
- **Type:** Array of objects OR array of strings
- **True/False:** Always 2 items
- **MCQ:** Always 4 items
- **Case Study:** Array within sub_questions, always exactly 4 strings
- **Structure (T/F, MCQ):** `{ option: "A"|"B"|"C"|"D", text: "string" }`
- **Structure (Case Study):** `["A. text", "B. text", "C. text", "D. text"]`
- **Validation:** No empty option text

#### correct_answer: string | null
- **Type:** String or null
- **True/False:** Must be "A" or "B" (not null)
- **MCQ:** Can be "A", "B", "C", "D", or null
- **Case Study:** Use `correct_answers` array instead
- **Validation:** If not null, must match one of the option letters

---

## ✅ Data Validation Rules

### Mandatory Field Presence
```
All Question Types MUST have:
  ✓ id (1-165, sequential)
  ✓ type (true_false|mcq|case_study)
  ✓ chapter_id (1-23|98-99)
  ✓ chapter (string)
  ✓ question or case_description (string, not empty)
  ✓ options (array with correct length)
  ✓ correct_answer or correct_answers
```

### ID Validation Rules
```
Rule 1: IDs must be sequential (1, 2, 3, ..., 165)
Rule 2: No gaps in ID sequence
Rule 3: No duplicate IDs
Rule 4: ID must match question index + 1
Rule 5: Question type must match ID range:
  - True/False: IDs 1-91
  - MCQ: IDs 92-149
  - Case Study: IDs 150-165
```

### Chapter Consistency Rules
```
Rule 1: Every question must have a valid chapter_id
Rule 2: Every chapter_id must be defined in metadata
Rule 3: Question count in metadata must match actual questions
Rule 4: chapter_id must be 1-23 for True/False questions
Rule 5: chapter_id must be 99 for MCQ questions
Rule 6: chapter_id must be 98 for Case Study questions
Rule 7: No questions can use undefined chapter IDs
Rule 8: Note: IDs 1 and 9 both have "Lọc ở cầu thận" - this is intentional
```

### Type Consistency Rules
```
True/False Questions:
  - Must have exactly 2 options (A: Đúng, B: Sai)
  - correct_answer must be "A" or "B" (not null)
  - chapter_id must be 1-23
  - Always both options must be present

MCQ Questions:
  - Must have exactly 4 options (A, B, C, D)
  - correct_answer can be "A", "B", "C", "D", or null
  - chapter_id must be 99
  - chapter must be "MCQ (Multiple Choice Questions)"

Case Study Questions - STRICT VALIDATION:
  - Must have at least 1 sub_question (MANDATORY - violation = empty array)
  - sub_questions array must NOT be empty (MANDATORY)
  - EACH sub_question must have exactly 4 options in options array (MANDATORY)
  - correct_answers array length MUST equal sub_questions array length
  - chapter_id must be 98
  - chapter must be "Case Study (Lâm sàng)"
```

### Text Validation
```
Rule 1: No empty question text
Rule 2: No empty option text
Rule 3: Vietnamese characters properly encoded (UTF-8)
Rule 4: No HTML entities or markup
Rule 5: Preserve original formatting/punctuation
Rule 6: No extraneous whitespace at start/end of text
```

### Answer Validation
```
True/False:
  - All 91 questions MUST have answers (not null)
  - Valid answers: "A" or "B" only
  - Current distribution: A=49 (53.8%), B=42 (46.2%)
  - Acceptable ratio range: 0.8-1.3 (✓ Currently 1.17:1)
  
MCQ:
  - Answers currently null (pending external data)
  - When added, must be "A", "B", "C", or "D"
  - Ratio check: A/B/C/D distribution should be reasonable
  
Case Study:
  - Answers currently null (pending external data)
  - When added, must match one of the 4 options per sub-question
  - correct_answers array length must equal sub_questions array length
```

---

## 📐 Statistical Standards

### Question Distribution
- **Expected:** Chapters should have 3-8 questions each
- **Actual:** All T/F chapters have 3-4 questions each ✓
- **Deviation:** Within acceptable range

### Answer Distribution (True/False Only)
- **Option A (Đúng):** 49 questions (53.8%)
- **Option B (Sai):** 42 questions (46.2%)
- **Ratio:** 1.17:1 (balanced, within expected range 0.8-1.3 ✓)

### Coverage by Type
- True/False: 91 questions (55.2%) - 100% answers
- MCQ: 58 questions (35.2%) - 0% answers (pending)
- Case Study: 16 questions (9.7%) - 0% answers (pending)

---

## 🔄 Update & Modification Rules

### Adding New Answers
1. **For MCQ Questions (92-149):**
   - Update `correct_answer` field to "A", "B", "C", or "D"
   - Do not modify `id`, `type`, `chapter_id`, `question`, or `options`
   - Verify answer matches one of the 4 options

2. **For Case Study Questions (150-165):**
   - Update `correct_answers` array with answers in matching order
   - Length of array must equal length of `sub_questions` array
   - Each answer must match one of the 4 options in corresponding sub_question
   - Do not modify `sub_questions` structure or options

### Data Integrity Rules
- Always re-validate JSON structure after edits
- Verify no ID duplicates introduced
- Confirm answer values are valid
- Test JSON validity with parser
- Verify metadata chapter counts match question assignments
- Ensure no chapter_ids reference undefined chapters
- FOR CASE STUDIES: Verify each sub_question still has exactly 4 options

### Prohibited Modifications
```
NEVER change:
  ✗ Question IDs
  ✗ Question type
  ✗ Chapter assignments for existing questions
  ✗ Question text
  ✗ Options content or order
  ✗ Sub-question text
  ✗ Number of options per sub-question (must always be 4)
  ✗ Metadata chapter IDs
```

---

## ⚠️ Known Limitations

### MCQ Answers Missing
- **Issue:** Source document has no answer markers for 58 MCQ questions
- **Impact:** All MCQ correct_answer fields are null
- **Resolution:** Obtain answer key from instructor/source material
- **Verification:** IDs 92-149

### Case Study Answers Missing
- **Issue:** Source document has no answer markers for 16 case study questions
- **Impact:** All case study correct_answers arrays are null
- **Resolution:** Obtain answer key from instructor/source material
- **Verification:** IDs 150-165

### Chapter ID 9 Note
- **Info:** Chapter ID 9 contains duplicate topic with Chapter ID 1
- **Name:** "Lọc ở cầu thận" appears in both chapters
- **Questions:** Q33-Q36 assigned to Chapter ID 9
- **Status:** Both chapters are structurally valid

### Language
- **Current:** Vietnamese language only
- **Character Support:** UTF-8 encoded
- **Translation:** Not included in this version

---

## 🎯 Usage Guidelines

### For Application Developers
1. Use `type` field to determine question rendering template
2. Display options from `options` array in order (A, B, C, D)
3. For case studies, iterate through `sub_questions` array
4. Display each sub_question with its 4 options
5. Compare user answer to `correct_answer` field
6. Handle null answers gracefully (show "Answer not available")
7. Group questions by `chapter` for section-based learning
8. Validate chapter_id against metadata before displaying

### For Instructors
1. Use `correct_answer` field for automatic grading (True/False only)
2. For MCQ and Case Study: use external answer key until data updated
3. Chapter structure allows targeted practice by topic
4. Answer distribution suitable for balanced assessments
5. Monitor missing answers and update when available

### For Quality Assurance
1. Validate JSON structure using JSON schema validator
2. Check question/answer correlation for True/False section
3. Verify metadata chapters match question assignments
4. Test question randomization doesn't break answer key
5. Monitor null answers - should be added as soon as available
6. FOR CASE STUDIES: Verify each sub_question has exactly 4 options
7. Verify no case study has empty sub_questions array

---

## 📊 Quality Checklist

Before using this data in production:

- [x] JSON syntax validated
- [x] All 165 questions present and sequential
- [x] Chapter metadata matches question assignments
- [x] Chapter ID 9 defined with correct questions
- [x] True/False questions have answers (100%)
- [ ] MCQ questions have answers (0% - PENDING)
- [ ] Case Study questions have answers (0% - PENDING)
- [x] All case studies have valid sub_questions structure
- [x] All case study sub-questions have exactly 4 options
- [x] Answer distribution reasonable
- [x] UTF-8 encoding verified
- [x] No duplicate content
- [x] All chapters numbered correctly

**Overall Status:** ✓ READY FOR USE (with caveats for missing MCQ/Case answers)

---

## 🔗 File References

- **JSON Data:** question_bank_than.json (98+ KB)
- **Analysis Report:** Thận_Analysis_Report.md
- **Rules Document:** Thận.rule.md (this file)
- **Source Document:** Thận_đáp_án.docx

---

**Document Version:** 2.1 (Corrected with Options)  
**Last Modified:** 2026-07-19  
**Author:** Data Engineer Claude  
**Status:** Active / Production Ready

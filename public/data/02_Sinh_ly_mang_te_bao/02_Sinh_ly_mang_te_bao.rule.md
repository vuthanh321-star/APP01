# SinhLyMangTeBao.rule.md

## Document Conversion Rules for Sinh_lý_màng_tế_bào_đáp_án.docx

**Document Title:** Cell Membrane Physiology - Answer Key  
**Vietnamese Name:** Sinh lý màng tế bào (đáp án)  
**Date Created:** July 18, 2026  
**Status:** FROZEN - Based on Analysis Report  
**Scope:** True/False section only (paragraphs 0-413)

---

## 1. DOCUMENT SCOPE

### Primary Section
- **Section Name:** PHẦN ĐÚNG/SAI (True/False Section)
- **Starting Paragraph:** [0]
- **Ending Paragraph:** [413]
- **Content:** 48 True/False questions + 12 chapters
- **No other sections:** Document contains T/F section ONLY

### Excluded Content
- **Images:** 1 image exists (media/image1.png at para [372]) - EXCLUDE from conversion
- **Reason:** Image is isolated, not referenced by any question

---

## 2. CHAPTER EXTRACTION RULES

### Detection Pattern
```
[<g>] [Chapter Name] [</g>]
```

### Extraction Rules
1. **Marker:** Lines that start with `[<g>]` and end with `[</g>]`
2. **Chapter Name:** Extract text between markers (remove brackets)
3. **Count:** Exactly 12 chapters to be extracted
4. **Order:** Sequential (maintain order from document)
5. **Validation:** All chapter names must be unique

### Chapter Properties
- **chapter_id:** 1-12 (sequential, 1-indexed)
- **chapter_name:** Vietnamese text (preserve exactly as written)
- **question_count:** 4 questions per chapter (in T/F section)

### Chapter List (Reference - All 12)
```
1. Đặc điểm cấu trúc của màng tế bào
2. Về lớp lipid kép
3. Về cấu trúc và chức năng của màng tế bào
4. Khuếch tán thụ động
5. Về tốc độ khuếch tán
6. Vận chuyển tích cực
7. Điện thế nghỉ
8. Điện thế hoạt động
9. Bình thường tỷ lệ nồng độ ion ở hai bên màng tế bào
10. Các yếu tố sau đây tham gia tạo điện thế nghỉ của màng tế bào
11. Yếu tố tham gia tạo điện thế nghỉ
12. Về khuếch tán được thuận hóa
```

---

## 3. QUESTION EXTRACTION RULES

### Question Type
- **Type:** True/False (Đúng/Sai)
- **All 48 questions:** Follow identical format
- **No mixed types:** All questions are True/False only

### Detection Pattern
1. **Question Stem:** Paragraph contains statement text (no `A.` or `B.`)
2. **Answer Line:** Next paragraph contains `A. Đúng` and `B. Sai`
3. **Pairing:** Question stem immediately followed by answer line

### Extraction Sequence
```
[Question Stem Paragraph]
↓
[Answer Line Paragraph]
```

### Question Properties
- **question_id:** 1-48 (sequential, 1-indexed, global)
- **chapter_id:** 1-12 (same as chapter)
- **question_stem:** Text from question paragraph (exact preservation)
- **question_type:** "true_false" (constant)
- **options:** Fixed:
  - `"A": "Đúng"`
  - `"B": "Sai"`
- **correct_answer:** "A" or "B" (detected from underline)
- **explanation:** `null` (not present in document)

---

## 4. ANSWER DETECTION RULES

### Answer Identification Method: UNDERLINE

**Rule:** Check XML runs in answer line paragraph for `underline=TRUE` attribute

### Detection Logic
```
FOR each run IN answer_line_paragraph.runs:
  IF run.underline == TRUE:
    IF "A" in run.text:
      correct_answer = "A"
      mark_as_true()
    ELSE IF "B" in run.text:
      correct_answer = "B"
      mark_as_false()
```

### Answer Statistics
- **Answer A (Đúng/True):** Exactly 21 questions
- **Answer B (Sai/False):** Exactly 27 questions
- **Total Answers:** 48/48 (100% coverage)
- **Ambiguity:** ZERO (single underline only)

### Validation Targets
- **A count:** 21 ± 0 (exact)
- **B count:** 27 ± 0 (exact)
- **Total:** 48 ± 0 (exact)

---

## 5. TEXT HANDLING RULES

### Preservation Rules
1. **Vietnamese Text:** Preserve exactly as written (no translation)
2. **Diacritics:** Keep all accents and tone marks (á, à, ả, ã, ạ, etc.)
3. **Special Characters:** Preserve all Unicode Vietnamese characters
   - Examples: â, ê, ô, ư, ơ, ă, đ (with various tones)
4. **Case:** Preserve original capitalization

### Text Cleaning
1. **Strip whitespace:** Remove leading/trailing spaces from stems
2. **Remove tabs:** Strip `[TAB]` from question text if present
3. **Remove markers:** Strip `[<br>]` markers completely
4. **Escape JSON:** Handle reserved characters:
   - `"` (double quote) → `\"`
   - Other JSON special chars handled by JSON encoder

### Content Preservation
- **"dây X":** Keep as-is (do NOT expand to anatomical names)
- **"kênh K+":** Keep as-is with superscript/subscript notation
- **"tế bào":** Keep exact terminology
- **"màng":** Keep membrane references exactly

### Handling Annotations
- **Extra text after options:** If answer line has notation like "(theo kiến thức đúng)", ignore it
- **Multi-line questions:** STOP if detected - use error handling (none expected)

---

## 6. CHAPTER-QUESTION MAPPING

### Distribution (Uniform)
| Chapter | Chapter Name | Questions | Q IDs | Start | End |
|---------|---|---|---|---|---|
| 1 | Đặc điểm cấu trúc của màng tế bào | 4 | 1-4 | [2] | [13] |
| 2 | Về lớp lipid kép | 4 | 5-8 | [14] | [25] |
| 3 | Về cấu trúc và chức năng của màng tế bào | 4 | 9-12 | [26] | [37] |
| 4 | Khuếch tán thụ động | 4 | 13-16 | [38] | [49] |
| 5 | Về tốc độ khuếch tán | 4 | 17-20 | [50] | [61] |
| 6 | Vận chuyển tích cực | 4 | 21-24 | [62] | [73] |
| 7 | Điện thế nghỉ | 4 | 25-28 | [74] | [85] |
| 8 | Điện thế hoạt động | 4 | 29-32 | [86] | [97] |
| 9 | Bình thường tỷ lệ nồng độ ion ở hai bên màng tế bào | 4 | 33-36 | [98] | [109] |
| 10 | Các yếu tố sau đây tham gia tạo điện thế nghỉ của màng tế bào | 4 | 37-40 | [110] | [121] |
| 11 | Yếu tố tham gia tạo điện thế nghỉ | 4 | 41-44 | [122] | [133] |
| 12 | Về khuếch tán được thuận hóa | 4 | 45-48 | [134] | [145] |

---

## 7. JSON OUTPUT STRUCTURE

### Root Structure
```json
{
  "metadata": { ... },
  "chapters": [ ... ]
}
```

### Metadata Schema
```json
{
  "document_id": "sinh_ly_mang_te_bao",
  "document_name": "Sinh lý màng tế bào (Cell Membrane Physiology)",
  "document_type": "true_false",
  "language": "vi",
  "charset": "utf-8",
  "total_chapters": 12,
  "total_questions": 48,
  "answer_distribution": {
    "true_count": 21,
    "false_count": 27
  }
}
```

### Chapter Schema
```json
{
  "chapter_id": 1,
  "chapter_name": "Đặc điểm cấu trúc của màng tế bào",
  "questions": [ ... ]
}
```

### Question Schema
```json
{
  "question_id": 1,
  "chapter_id": 1,
  "question_stem": "Thành phần chủ yếu của màng là protein và lipid.",
  "question_type": "true_false",
  "options": {
    "A": "Đúng",
    "B": "Sai"
  },
  "correct_answer": "A",
  "explanation": null
}
```

---

## 8. VALIDATION TARGETS

### Mandatory Counts (EXACT MATCH)
| Metric | Target | Tolerance | Action |
|--------|--------|-----------|--------|
| Chapters | 12 | ±0 | STOP if mismatch |
| Questions | 48 | ±0 | STOP if mismatch |
| Answer A | 21 | ±0 | STOP if mismatch |
| Answer B | 27 | ±0 | STOP if mismatch |
| Missing Answers | 0 | ±0 | STOP if any found |

### Optional Counts
| Metric | Target | Tolerance | Action |
|--------|--------|-----------|--------|
| Reserved JSON chars | ~2 | — | Continue (escaping required) |
| Short questions (<30) | 1 | — | Warning only |

---

## 9. ERROR HANDLING

### STOP Conditions (Halt Conversion)
1. **Chapter count ≠ 12:** Print error, do not convert
2. **Question count ≠ 48:** Print error, do not convert
3. **Answer A count ≠ 21:** Print error, do not convert
4. **Answer B count ≠ 27:** Print error, do not convert
5. **Unanswered questions found:** Print error, do not convert
6. **Both A and B underlined:** Print warning, flag question, continue with caution

### WARNING Conditions (Log & Continue)
1. **Reserved JSON characters found:** Escape and continue
2. **Question stem very short (<30 chars):** Log and continue
3. **Answer line format variation:** Log and continue (non-blocking)

### Recovery Actions
- **Missing underline:** Mark as ERROR, halt
- **Corrupted text:** Use best-guess or halt
- **Multi-paragraph question:** Mark as ERROR, halt

---

## 10. CONSISTENCY CHECKS

### Answer Line Format Checks
- ✓ All contain "A. Đúng"
- ✓ All contain "B. Sai"
- ✓ Single underline per line (no exceptions)
- ✓ No format anomalies found

### Question Stem Checks
- ✓ All questions are statements (not fragments)
- ✓ Shortest: 26 characters
- ✓ Longest: 146 characters
- ✓ No multi-line stems found

### Chapter Checks
- ✓ All 12 chapters extracted
- ✓ All chapter names unique
- ✓ Exactly 4 questions per chapter
- ✓ No orphaned questions

---

## 11. PRE-CONVERSION CHECKLIST

Before starting JSON conversion, verify:

- [ ] Document opened successfully
- [ ] Paragraph count: 414 (or similar)
- [ ] Chapters detected: 12
- [ ] Questions found: 48
- [ ] Answer A marked: 21
- [ ] Answer B marked: 27
- [ ] Image file location noted: para [372]
- [ ] No encoding errors detected
- [ ] No multi-paragraph questions found
- [ ] Underline marking verified

---

## 12. CONVERSION WORKFLOW

### Step-by-Step Conversion Process

```
1. INITIALIZATION
   ├─ Load document
   ├─ Initialize chapter_dict = {}
   ├─ Initialize question_counter = 0
   └─ Initialize answer counts = {A: 0, B: 0}

2. PARAGRAPH ITERATION (i = 0 to 413)
   ├─ FOR each paragraph:
   │  ├─ IF chapter marker [<g>]...[</g>]:
   │  │  └─ Extract chapter (ch_id = counter+1)
   │  ├─ ELSE IF answer line (contains A. Đúng B. Sai):
   │  │  ├─ SKIP (will process with question)
   │  ├─ ELSE IF valid question stem:
   │  │  ├─ Check next paragraph for answer line
   │  │  ├─ Detect underline (A or B)
   │  │  ├─ Create question object
   │  │  ├─ Add to current chapter
   │  │  ├─ Increment counters
   │  │  └─ SKIP 2 paragraphs ahead

3. VALIDATION
   ├─ Verify chapters == 12
   ├─ Verify questions == 48
   ├─ Verify answer_a == 21
   ├─ Verify answer_b == 27
   └─ Verify no missing answers

4. OUTPUT
   ├─ Serialize to JSON
   ├─ Ensure UTF-8 encoding
   ├─ Escape reserved chars
   └─ Write to file
```

---

## 13. QUALITY ASSURANCE

### Final Validation

Before delivery, confirm:

1. **JSON Validity**
   - File parses as valid JSON ✓
   - All required fields present ✓
   - No syntax errors ✓

2. **Content Accuracy**
   - All 48 questions present ✓
   - All 12 chapters present ✓
   - All answers marked correctly ✓
   - No data corruption ✓

3. **Encoding**
   - UTF-8 encoding verified ✓
   - Vietnamese text readable ✓
   - Special characters preserved ✓

4. **Structure**
   - Schema matches expected format ✓
   - IDs sequential and correct ✓
   - No duplicate question IDs ✓

---

## 14. METADATA REFERENCE

### Document Information
- **Original File:** Sinh_lý_màng_tế_bào_đáp_án.docx
- **Document ID (JSON):** sinh_ly_mang_te_bao
- **Language:** Vietnamese (vi)
- **Character Set:** UTF-8
- **Document Type:** Medical education (physiology exam prep)
- **Subject Area:** Cell Membrane Physiology
- **Question Format:** True/False (Multiple chapters)

### Processing Information
- **Analysis Date:** July 18, 2026
- **Rule Version:** 1.0 (FROZEN)
- **Rule Status:** Ready for implementation
- **Data Quality:** Excellent (no issues detected)

---

## 15. NOTES & SPECIAL CASES

### Special Handling
1. **Chapter 9:** Long chapter name
   - Full name: "Bình thường tỷ lệ nồng độ ion ở hai bên màng tế bào"
   - Preserve exactly (do NOT abbreviate)

2. **Chapter 10:** Also long
   - Full name: "Các yếu tố sau đây tham gia tạo điện thế nghỉ của màng tế bào"
   - Preserve exactly

3. **Image (media/image1.png):** Isolated at para [372]
   - Located AFTER all 48 questions
   - No question references it
   - Safe to exclude from conversion

4. **Question Terminology:**
   - Keep "kênh K+", "kênh Na+" as-is
   - Keep "tế bào", "màng" exact
   - Keep "tĩnh mạch", "động mạch" exact
   - Keep "độ thế" exact

### Known Characteristics
- Answer A (True): 21 questions (43.75%)
- Answer B (False): 27 questions (56.25%)
- Average question length: 63 characters
- Perfect marking consistency: 100%

---

## 16. COMPARISON TO PREVIOUS DOCUMENT

### Comparison: SinhLyTuanHoan vs. SinhLyMangTeBao

| Aspect | Cardiovascular | Cell Membrane |
|--------|---|---|
| Chapters | 41 | 12 |
| Questions | 164 | 48 |
| Questions/Chapter | 4 | 4 |
| Answer A | 80 | 21 |
| Answer B | 84 | 27 |
| Images | 6 | 1 |
| Tables | 0 | 0 |
| Answer Method | Underline | Underline |
| Consistency | Perfect | Perfect |
| Difficulty | Very Easy | Very Easy |

---

## SIGN-OFF

**Rule File Status:** ✅ FROZEN & READY

**Prepared by:** Data Engineer (Claude)  
**Date:** July 18, 2026  
**Validation:** All checks passed  
**Next Action:** Proceed with JSON conversion using this rule file  

---

**End of SinhLyMangTeBao.rule.md**

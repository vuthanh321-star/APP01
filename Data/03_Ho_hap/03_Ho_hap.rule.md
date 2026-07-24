# HOHAP.rule.md

## Document Conversion Rules for Hô_Hấp_đáp_án.docx

**Document Title:** Respiratory Physiology - Answer Key  
**Vietnamese Name:** Hô hấp (đáp án)  
**Date Created:** July 18, 2026  
**Status:** FROZEN - Based on Analysis Report  
**Scope:** True/False section only (paragraphs 0-288)

---

## 1. DOCUMENT SCOPE

### Document Structure (Three Sections)
```
Total Paragraphs: 764

[PHẦN ĐÚNG/SAI] ← TARGET FOR CONVERSION
├─ Paragraphs: [0-288]
├─ Chapters: 22
├─ Questions: 96 (all True/False)
└─ Status: PRIMARY

[PHẦN MCQ]
├─ Paragraphs: [289-551]
├─ Status: EXCLUDE (not counted)

[PHẦN CASE LÂM SÀNG]
├─ Paragraphs: [552-763]
├─ Status: EXCLUDE (not counted)
```

### Primary Section
- **Section Name:** PHẦN ĐÚNG/SAI (True/False Section)
- **Starting Paragraph:** [0]
- **Ending Paragraph:** [288]
- **Content:** 96 True/False questions + 22 chapters
- **No other T/F sections:** Document contains single T/F section

### Excluded Content
- **Images:** 6 images exist (image1-5, image8) at para [521+] - EXCLUDE
  - Reason: Images located in MCQ and CASE sections, after T/F section boundary
- **Tables:** 1 table exists in CASE section - EXCLUDE
  - Reason: Located after T/F section boundary
- **MCQ Section:** Paragraphs [289-551] - EXCLUDE
  - Reason: Different question type, separate section
- **CASE Section:** Paragraphs [552-763] - EXCLUDE
  - Reason: Clinical case studies, separate section

---

## 2. CHAPTER EXTRACTION RULES

### Detection Pattern
```
[<g>] [Chapter Name] [</g>]
```

### Extraction Rules
1. **Marker:** Lines that start with `[<g>]` and end with `[</g>]`
2. **Range:** Only chapters detected within paragraphs [0-288]
3. **Chapter Name:** Extract text between markers (remove brackets)
4. **Count:** Exactly 22 chapters to be extracted
5. **Order:** Sequential (maintain order from document)
6. **Validation:** All chapter names must be unique

### Chapter Properties
- **chapter_id:** 1-22 (sequential, 1-indexed)
- **chapter_name:** Vietnamese text (preserve exactly as written)
- **question_count:** Varies (mostly 4, Ch 11 has 12)

### All 22 Chapters (Reference List)

**Chapters 1-10 (4 questions each):**
```
1. Màng hô hấp
2. Trao đổi khí ở màng hô hấp
3. Áp suất âm khoang màng phổi
4. Áp suất khoang màng phổi
5. Các yếu tố ảnh hưởng đến sự phân ly HbO2
6. Hoạt động của trung tâm hô hấp
7. Các dạng vận chuyển của O2 và CO2
8. Sự khuếch tán của O2 và CO2  qua màng hô hấp có đặc điểm
9. Sự trao đổi O2ở phổi và mô
10. Các yếu tố tham gia điều hòa hô hấp
```

**Chapter 11 (12 questions - NON-UNIFORM):**
```
11. Ở trẻ mới sinh khi có nhịp thở đầu tiên
```

**Chapters 12-22 (4 questions each):**
```
12. Về thông khí, tưới máu giữa đỉnh phổi và đáy phổi
13. Khi tắc nghẽn một phế quản thùy thì tại vùng này phân áp oxy (PO2) trong máu mao mạch phổi sẽ
14. Khi tăng thông khí sẽ dẫn đến
15. Sức cản đường thở
16. Ở tư thế đứng, lưu lượng máu
17. Ở thì hít vào
18. Phương pháp phế lưu đo được
19. Khi tắc hoàn toàn động mạch phổi trái
20. Thở ra gắng sức
21. Vận chuyển CO2 từ mô về phổi
22. Ở bệnh nhân hen phế quản
```

### Special Note on Chapter 11
- **Chapter 11** contains **12 questions** (not standard 4)
- This is valid medical content: comprehensive newborn respiratory physiology
- Do NOT treat as error; preserve all 12 questions for this chapter

---

## 3. QUESTION EXTRACTION RULES

### Question Type
- **Type:** True/False (Đúng/Sai)
- **All 96 questions:** Follow identical format
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
- **question_id:** 1-96 (sequential, 1-indexed, global)
- **chapter_id:** 1-22 (same as chapter)
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
- **Answer A (Đúng/True):** Exactly 50 questions (52.1%)
- **Answer B (Sai/False):** Exactly 46 questions (47.9%)
- **Total Answers:** 96/96 (100% coverage)
- **Ambiguity:** ZERO (single underline only)

### Validation Targets
- **A count:** 50 ± 0 (exact)
- **B count:** 46 ± 0 (exact)
- **Total:** 96 ± 0 (exact)

---

## 5. TEXT HANDLING RULES

### Preservation Rules
1. **Vietnamese Text:** Preserve exactly as written (no translation)
2. **Diacritics:** Keep all accents and tone marks (á, à, ả, ã, ạ, etc.)
3. **Special Characters:** Preserve all Unicode Vietnamese characters
   - Examples: â, ê, ô, ư, ơ, ă, đ (with various tones)
4. **Case:** Preserve original capitalization
5. **Medical Terminology:** Keep exact as-is
   - Examples: "phế nang", "mao mạch", "HbO2", "surfactant", etc.

### Text Cleaning
1. **Strip whitespace:** Remove leading/trailing spaces from stems
2. **Remove tabs:** Strip `[TAB]` from question text if present
3. **Remove markers:** Strip `[<br>]` markers completely
4. **Escape JSON:** Handle reserved characters (if any found)
   - No quotes detected (0 found)

### Content Preservation
- **"O2", "CO2":** Keep exact with subscript notation
- **"HbO2":** Keep as-is with oxygen notation
- **"PO2", "PCO2":** Keep with subscripts exact
- **"phế nang", "mao mạch":** Keep exact medical terminology
- **Abbreviations:** FVC, FEV1, etc. - keep as-is if in questions

### Handling Annotations
- **Extra text after options:** If answer line has notation, ignore it
- **Multi-line questions:** STOP if detected - use error handling (none expected)

---

## 6. CHAPTER-QUESTION MAPPING

### Distribution (Mostly Uniform with One Exception)

| Chapter | Chapter Name | Questions | Q IDs | Standard |
|---------|---|---|---|---|
| 1 | Màng hô hấp | 4 | 1-4 | ✓ Yes |
| 2 | Trao đổi khí ở màng hô hấp | 4 | 5-8 | ✓ Yes |
| 3 | Áp suất âm khoang màng phổi | 4 | 9-12 | ✓ Yes |
| 4 | Áp suất khoang màng phổi | 4 | 13-16 | ✓ Yes |
| 5 | Các yếu tố ảnh hưởng đến sự phân ly HbO2 | 4 | 17-20 | ✓ Yes |
| 6 | Hoạt động của trung tâm hô hấp | 4 | 21-24 | ✓ Yes |
| 7 | Các dạng vận chuyển của O2 và CO2 | 4 | 25-28 | ✓ Yes |
| 8 | Sự khuếch tán của O2 và CO2  qua màng hô hấp có đặc điểm | 4 | 29-32 | ✓ Yes |
| 9 | Sự trao đổi O2ở phổi và mô | 4 | 33-36 | ✓ Yes |
| 10 | Các yếu tố tham gia điều hòa hô hấp | 4 | 37-40 | ✓ Yes |
| 11 | Ở trẻ mới sinh khi có nhịp thở đầu tiên | **12** | 41-52 | **⚠ No** |
| 12 | Về thông khí, tưới máu giữa đỉnh phổi và đáy phổi | 4 | 53-56 | ✓ Yes |
| 13 | Khi tắc nghẽn một phế quản thùy... | 4 | 57-60 | ✓ Yes |
| 14 | Khi tăng thông khí sẽ dẫn đến | 4 | 61-64 | ✓ Yes |
| 15 | Sức cản đường thở | 4 | 65-68 | ✓ Yes |
| 16 | Ở tư thế đứng, lưu lượng máu | 4 | 69-72 | ✓ Yes |
| 17 | Ở thì hít vào | 4 | 73-76 | ✓ Yes |
| 18 | Phương pháp phế lưu đo được | 4 | 77-80 | ✓ Yes |
| 19 | Khi tắc hoàn toàn động mạch phổi trái | 4 | 81-84 | ✓ Yes |
| 20 | Thở ra gắng sức | 4 | 85-88 | ✓ Yes |
| 21 | Vận chuyển CO2 từ mô về phổi | 4 | 89-92 | ✓ Yes |
| 22 | Ở bệnh nhân hen phế quản | 4 | 93-96 | ✓ Yes |

**Total:** 96 questions across 22 chapters

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
  "document_id": "ho_hap",
  "document_name": "Hô hấp (Respiratory Physiology)",
  "document_type": "true_false",
  "language": "vi",
  "charset": "utf-8",
  "total_chapters": 22,
  "total_questions": 96,
  "answer_distribution": {
    "true_count": 50,
    "false_count": 46
  }
}
```

### Chapter Schema
```json
{
  "chapter_id": 1,
  "chapter_name": "Màng hô hấp",
  "questions": [ ... ]
}
```

### Question Schema
```json
{
  "question_id": 1,
  "chapter_id": 1,
  "question_stem": "Thành của phế nang và thành mao mạch quanh phế nang tạo ra màng hô hấp.",
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
| Chapters | 22 | ±0 | STOP if mismatch |
| Questions | 96 | ±0 | STOP if mismatch |
| Answer A | 50 | ±0 | STOP if mismatch |
| Answer B | 46 | ±0 | STOP if mismatch |
| Missing Answers | 0 | ±0 | STOP if any found |

### Optional Counts
| Metric | Target | Tolerance | Action |
|--------|--------|-----------|--------|
| Reserved JSON chars | 0 | — | Continue (none found) |
| Short questions (<30) | 16 | — | Warning only |
| Ch 11 questions | 12 | ±0 | Expected (non-uniform) |

---

## 9. ERROR HANDLING

### STOP Conditions (Halt Conversion)
1. **Chapter count ≠ 22:** Print error, do not convert
2. **Question count ≠ 96:** Print error, do not convert
3. **Answer A count ≠ 50:** Print error, do not convert
4. **Answer B count ≠ 46:** Print error, do not convert
5. **Unanswered questions found:** Print error, do not convert
6. **Both A and B underlined:** Print warning, flag question, continue with caution

### WARNING Conditions (Log & Continue)
1. **Reserved JSON characters found:** Not expected (0 found), escape if needed
2. **Question stem very short (<30 chars):** Log and continue
3. **Answer line format variation:** Log and continue (non-blocking)
4. **Chapter 11 question count ≠ 12:** Log and continue (if unexpected)

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
- ✓ Shortest: 12 characters (valid medical term)
- ✓ Longest: 140 characters
- ✓ No multi-line stems found

### Chapter Checks
- ✓ All 22 chapters extracted
- ✓ All chapter names unique
- ✓ Ch 1-10: 4 questions each
- ✓ Ch 11: 12 questions (comprehensive)
- ✓ Ch 12-22: 4 questions each
- ✓ No orphaned questions

---

## 11. PRE-CONVERSION CHECKLIST

Before starting JSON conversion, verify:

- [ ] Document opened successfully
- [ ] Paragraph count: 764 total
- [ ] T/F section boundary: [0-288]
- [ ] Chapters detected: 22
- [ ] Questions found: 96
- [ ] Answer A marked: 50
- [ ] Answer B marked: 46
- [ ] Chapter 11 has: 12 questions
- [ ] No encoding errors detected
- [ ] No multi-paragraph questions found
- [ ] Underline marking verified
- [ ] Images after para [288] confirmed
- [ ] Table in CASE section confirmed

---

## 12. CONVERSION WORKFLOW

### Step-by-Step Conversion Process

```
1. INITIALIZATION
   ├─ Load document
   ├─ Initialize chapter_dict = {}
   ├─ Initialize question_counter = 0
   ├─ Initialize current_chapter_id = 0
   ├─ Initialize answer counts = {A: 0, B: 0}
   └─ Set T/F section boundary = 288

2. PARAGRAPH ITERATION (i = 0 to 288)
   ├─ FOR each paragraph:
   │  ├─ IF chapter marker [<g>]...[</g>]:
   │  │  ├─ Extract chapter (ch_id = counter+1)
   │  │  └─ Create chapter entry
   │  ├─ ELSE IF answer line (contains A. Đúng B. Sai):
   │  │  ├─ SKIP (will process with question)
   │  ├─ ELSE IF valid question stem:
   │  │  ├─ Check next paragraph for answer line
   │  │  ├─ Detect underline (A or B)
   │  │  ├─ Create question object
   │  │  ├─ Add to current chapter
   │  │  ├─ Increment counters
   │  │  └─ SKIP 2 paragraphs ahead
   │  └─ ELSE IF i > 288:
   │     └─ STOP iteration

3. VALIDATION
   ├─ Verify chapters == 22
   ├─ Verify questions == 96
   ├─ Verify answer_a == 50
   ├─ Verify answer_b == 46
   ├─ Verify chapter_11_questions == 12
   └─ Verify no missing answers

4. OUTPUT
   ├─ Serialize to JSON
   ├─ Ensure UTF-8 encoding
   ├─ No escaping needed (0 quotes)
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
   - All 96 questions present ✓
   - All 22 chapters present ✓
   - All answers marked correctly ✓
   - Chapter 11 has 12 questions ✓
   - No data corruption ✓

3. **Encoding**
   - UTF-8 encoding verified ✓
   - Vietnamese text readable ✓
   - Special characters preserved ✓

4. **Structure**
   - Schema matches expected format ✓
   - IDs sequential and correct ✓
   - No duplicate question IDs ✓
   - Chapter IDs 1-22 ✓

---

## 14. METADATA REFERENCE

### Document Information
- **Original File:** Hô_Hấp_đáp_án.docx
- **Document ID (JSON):** ho_hap
- **Language:** Vietnamese (vi)
- **Character Set:** UTF-8
- **Document Type:** Medical education (physiology exam prep)
- **Subject Area:** Respiratory Physiology
- **Question Format:** True/False (Multiple chapters)

### Processing Information
- **Analysis Date:** July 18, 2026
- **Rule Version:** 1.0 (FROZEN)
- **Rule Status:** Ready for implementation
- **Data Quality:** Excellent (no issues detected)
- **Sections:** 3 (T/F | MCQ | CASE)

---

## 15. NOTES & SPECIAL CASES

### Special Handling
1. **Chapter 11:** Non-uniform question count
   - Full name: "Ở trẻ mới sinh khi có nhịp thở đầu tiên"
   - Contains: 12 questions (not 4)
   - Preserve exactly (do NOT treat as error)
   - This chapter covers comprehensive newborn respiratory physiology

2. **Long Chapter Names:** Some chapters have extended names
   - Ch 8: "Sự khuếch tán của O2 và CO2  qua màng hô hấp có đặc điểm"
   - Ch 13: "Khi tắc nghẽn một phế quản thùy thì tại vùng này phân áp oxy (PO2) trong máu mao mạch phổi sẽ"
   - Preserve exactly (do NOT abbreviate)

3. **Images:** 6 images located in MCQ and CASE sections
   - Paragraphs: [521, 585, 619, 645, 693, 718]
   - All images AFTER T/F section boundary [288]
   - Safe to exclude from T/F conversion

4. **Table:** 1 spirometry table in CASE section
   - Location: CASE section (para ~580+)
   - No table dependency for T/F conversion
   - Safe to exclude

5. **Question Terminology:**
   - Keep "phế nang" (alveoli) as-is
   - Keep "mao mạch" (capillary) as-is
   - Keep "HbO2", "O2", "CO2" exact
   - Keep "PO2", "PCO2" exact
   - Keep all medical terminology exact

### Known Characteristics
- Answer A (True): 50 questions (52.1%)
- Answer B (False): 46 questions (47.9%)
- Average question length: 52 characters
- Perfect marking consistency: 100%
- 16 very short questions (12-29 chars) - all valid

---

## 16. COMPARISON TO PREVIOUS DOCUMENTS

### Comparison: All Three Documents

| Aspect | SinhLyTuanHoan | SinhLyMangTeBao | **HOHAP** |
|--------|---|---|---|
| Chapters | 41 | 12 | **22** |
| Questions | 164 | 48 | **96** |
| Distribution | Uniform (4) | Uniform (4) | **Mostly uniform (4), except Ch 11 (12)** |
| Answer A | 80 | 21 | **50** |
| Answer B | 84 | 27 | **46** |
| Images | 6 | 1 | **6** |
| Tables | 0 | 0 | **1** |
| Sections | 1 | 1 | **3** |
| Answer Method | Underline | Underline | **Underline** |
| Consistency | Perfect | Perfect | **Perfect** |
| Difficulty | Very Easy | Very Easy | **Easy** |

---

## SIGN-OFF

**Rule File Status:** ✅ FROZEN & READY

**Prepared by:** Data Engineer (Claude)  
**Date:** July 18, 2026  
**Validation:** All checks passed  
**Next Action:** Proceed with JSON conversion using this rule file  

---

**End of HOHAP.rule.md**

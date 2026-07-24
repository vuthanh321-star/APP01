# Nội Tiết (Endocrinology) - Conversion Rules

## Document Source

- **File**: Nội_tiết_đáp_án.docx
- **Subject**: Endocrinology Medical Questions
- **Section Converted**: Phần đúng/sai (True/False Questions Only)

## Conversion Rules Applied

### 1. Question Identification

**Rule**: A question is identified as a True/False item when it contains:
- Statement text (can be single or multiple paragraphs)
- Answer options line: "A. Đúng [TAB] B. Sai"

**Example**:
```
một hormon là một nửa thời gian để nó đào thải hoàn toàn khỏi máu.
A. Đúng    B. Sai
```

### 2. Answer Detection

**Rule**: Correct answer is determined by **underline formatting** on the option letter

- If run containing "A." has `underline=True` → Answer is **A (Đúng - True)**
- If run containing "B." has `underline=True` → Answer is **B (Sai - False)**

**Why Underline**: This is the document's answer key marker. Bold, italic, and highlight are used for content emphasis, not answer marking.

**Example Formatting**:
```
Run 0: "A." (underline=True)  ← Marks this as correct
Run 1: " Đúng" (underline=False)
Run 2: "B." (underline=False)
Run 3: " Sai" (underline=False)
```

### 3. Multi-line Question Handling

**Rule**: When a question spans multiple paragraphs before the answer line:
- Collect all non-empty text lines
- Join with single space: `" ".join(text_parts)`
- Preserve medical terminology exactly

**Example**:
```
Text line 1: "Trong huyết tương, thời gian bán thải của"
Text line 2: "một hormon là một nửa thời gian để nó đào thải hoàn toàn khỏi máu."
Result: "Trong huyết tương, thời gian bán thải của một hormon là một nửa thời gian để nó đào thải hoàn toàn khỏi máu."
```

### 4. Text Preservation

**Rule**: All original Vietnamese text is preserved exactly as-is

**What is preserved**:
- Diacritical marks: ă, â, ê, ô, ơ, ư (Vietnamese vowels)
- Tone marks: à, á, ả, ã, ạ (all tone variations)
- Medical terminology: hormon, huyết tương, tuyến giáp, etc.
- Special formatting indicators if present: [<g>], [</g>], [<br>]

**What is NOT preserved**:
- Highlight color codes (only analyzed for detection, not stored)
- Font styling (bold, italic, underline) except for answer detection
- Paragraph breaks within questions (joined with spaces)

### 5. Question Numbering

**Rule**: Questions are numbered sequentially starting from 1

- Question IDs: 1, 2, 3, ..., 188
- No gaps in numbering
- ID corresponds to position in "Phần đúng/sai" section

### 6. Section Boundaries

**Rule**: True/False section is bounded by:
- **Start**: First paragraph after "Phần đúng/sai" heading
- **End**: First line containing "Phần MCQ" or "Phần case"

**Sections NOT Converted**:
- "Phần MCQ" (Multiple Choice Questions)
- "Phần case" (Case Studies)
- Any content after the first True/False section

### 7. Image Handling

**Rule**: All images in the document are extracted and preserved

**Process**:
- Extract from: Document.part.rels (relationship objects)
- Save format: PNG (original format preserved)
- Naming: sequential `image_1.png` through `image_5.png`
- Storage: `images/` subdirectory
- Metadata: Stored in `image_manifest.json`

**No image linking** in this conversion (content-only conversion)

## JSON Structure

### Top-level Object

```json
{
  "subject": "Nội tiết",
  "subject_english": "Endocrinology",
  "section": "Phần đúng/sai",
  "question_type": "true_false",
  "language": "vi",
  "total_questions": 188,
  "conversion_metadata": { ... },
  "questions": [ ... ]
}
```

### Question Object

```json
{
  "question_id": 1,
  "text": "Complete question text in Vietnamese",
  "type": "true_false",
  "options": {
    "A": "Đúng",
    "B": "Sai"
  },
  "correct_answer": "A",
  "images": ["image_1.png"],
  "chapter": "General Endocrinology"
}
```

**Field Definitions**:
- `question_id`: Integer, 1-188
- `text`: Original Vietnamese text, preserved exactly
- `type`: Always "true_false" for this conversion
- `options`: Fixed object with A="Đúng" and B="Sai"
- `correct_answer`: "A" or "B", detected from underline formatting
- `images`: Array of image filenames if any reference in text (empty array if none)
- `chapter`: Placeholder for future chapter organization (default: "General Endocrinology")

## Validation Checklist

✅ **Before Export**:
1. Total question count: 188
2. Question numbering: 1-188 continuous
3. Answer distribution: A=102, B=86 (balanced)
4. No missing answers: 100% coverage
5. Text preservation: All Vietnamese characters intact
6. Image count: 5 images extracted
7. No duplicates: All questions unique

## Known Limitations

1. **No Chapter Structure**: Original document has no explicit chapter divisions in True/False section, all questions grouped as "General Endocrinology"
2. **No Images Linked**: Images are extracted but not linked to specific questions (requires manual review)
3. **Single Section Only**: Only "Phần đúng/sai" converted; MCQ and Case sections are separate
4. **Language**: Vietnamese only; no English translation provided

## Maintenance Notes

- **Do not modify**: Field names in JSON (required by application)
- **Do not modify**: Question order (sequential numbering depends on order)
- **Do not modify**: Answer markings without re-parsing the source document
- **To add chapters**: Requires manual review and categorization
- **To link images**: Requires manual matching of content references

---

**Rule Version**: 1.0
**Valid For**: Nội_tiết_đáp_án.docx True/False Section
**Conversion Date**: 2026-07-19

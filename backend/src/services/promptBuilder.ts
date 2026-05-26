import { IAssignment, QuestionType } from '../models/Assignment';

export function buildPrompt(assignment: IAssignment): string {
  const totalQuestions = assignment.questionTypes.reduce((sum, qt) => sum + qt.count, 0);
  const totalMarks = assignment.questionTypes.reduce(
    (sum, qt) => sum + qt.count * qt.marksEach,
    0
  );

  const sectionBreakdown = assignment.questionTypes
    .map(
      (qt, i) =>
        `Section ${String.fromCharCode(65 + i)} — ${qt.type}: ${qt.count} question(s) × ${qt.marksEach} mark(s) each`
    )
    .join('\n');

  const fileContext = assignment.fileText
    ? `\n\nReference Material (extracted from uploaded file):\n"""\n${assignment.fileText.slice(0, 6000)}\n"""`
    : '';

  const additionalContext = assignment.additionalInstructions
    ? `\nAdditional Instructions: ${assignment.additionalInstructions}`
    : '';

  return `You are an experienced teacher creating a question paper. Generate a structured question paper in valid JSON format only — no markdown, no explanation, just the JSON object.

Assignment Details:
- Title: ${assignment.title}
- Subject: ${assignment.subject}
- Class: ${assignment.className}
- Due Date: ${assignment.dueDate}
- Total Questions: ${totalQuestions}
- Total Marks: ${totalMarks}

Question Paper Structure:
${sectionBreakdown}
${additionalContext}
${fileContext}

Output a JSON object with this exact structure:
{
  "schoolName": "Delhi Public School",
  "subject": "${assignment.subject}",
  "className": "${assignment.className}",
  "timeAllowed": "<estimated time, e.g. 45 minutes>",
  "totalMarks": ${totalMarks},
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions. Each question carries X marks.",
      "questions": [
        {
          "number": 1,
          "text": "<full question text>",
          "difficulty": "easy" | "medium" | "hard",
          "marks": <marks per question>
        }
      ]
    }
  ]
}

Rules:
- Each section maps to one question type in the order given
- Distribute difficulty: roughly 40% easy, 40% medium, 20% hard per section
- Questions must be relevant to the subject and class level
- Do not include answer keys
- Return only the JSON object, nothing else
`;
}

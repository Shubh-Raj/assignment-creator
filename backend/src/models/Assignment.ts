import mongoose, { Document, Schema } from 'mongoose';

export interface QuestionType {
  type: string;
  count: number;
  marksEach: number;
}

export interface GeneratedQuestion {
  number: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
}

export interface GeneratedSection {
  title: string;
  instruction: string;
  questions: GeneratedQuestion[];
}

export interface AssignmentOutput {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  totalMarks: number;
  sections: GeneratedSection[];
}

export interface IAssignment extends Document {
  title: string;
  dueDate: string;
  subject: string;
  className: string;
  questionTypes: QuestionType[];
  additionalInstructions: string;
  filePath?: string;
  fileText?: string;
  status: 'pending' | 'queued' | 'processing' | 'done' | 'failed';
  output?: AssignmentOutput;
  error?: string;
  jobId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionTypeSchema = new Schema<QuestionType>({
  type: { type: String, required: true },
  count: { type: Number, required: true, min: 1 },
  marksEach: { type: Number, required: true, min: 1 },
});

const GeneratedQuestionSchema = new Schema<GeneratedQuestion>({
  number: Number,
  text: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  marks: Number,
});

const GeneratedSectionSchema = new Schema<GeneratedSection>({
  title: String,
  instruction: String,
  questions: [GeneratedQuestionSchema],
});

const AssignmentOutputSchema = new Schema<AssignmentOutput>({
  schoolName: String,
  subject: String,
  className: String,
  timeAllowed: String,
  totalMarks: Number,
  sections: [GeneratedSectionSchema],
});

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    dueDate: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    questionTypes: { type: [QuestionTypeSchema], required: true },
    additionalInstructions: { type: String, default: '' },
    filePath: { type: String },
    fileText: { type: String },
    status: {
      type: String,
      enum: ['pending', 'queued', 'processing', 'done', 'failed'],
      default: 'pending',
    },
    output: { type: AssignmentOutputSchema },
    error: { type: String },
    jobId: { type: String },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);

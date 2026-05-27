import { create } from 'zustand';

export interface QuestionTypeEntry {
  id: string;
  type: string;
  count: number;
  marksEach: number;
}

export interface AssignmentFormData {
  title: string;
  dueDate: string;
  subject: string;
  className: string;
  questionTypes: QuestionTypeEntry[];
  additionalInstructions: string;
  file: File | null;
}

interface FormStore {
  step: 1 | 2;
  form: AssignmentFormData;
  setStep: (step: 1 | 2) => void;
  updateForm: (data: Partial<AssignmentFormData>) => void;
  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionType: (id: string, data: Partial<QuestionTypeEntry>) => void;
  reset: () => void;
}

const defaultForm: AssignmentFormData = {
  title: '',
  dueDate: '',
  subject: '',
  className: '',
  questionTypes: [
    { id: crypto.randomUUID(), type: 'Multiple Choice Questions', count: 4, marksEach: 1 },
  ],
  additionalInstructions: '',
  file: null,
};

export const useFormStore = create<FormStore>((set) => ({
  step: 1,
  form: defaultForm,
  setStep: (step) => set({ step }),
  updateForm: (data) =>
    set((state) => ({ form: { ...state.form, ...data } })),
  addQuestionType: () =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: [
          ...state.form.questionTypes,
          { id: crypto.randomUUID(), type: 'Short Questions', count: 3, marksEach: 2 },
        ],
      },
    })),
  removeQuestionType: (id) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.filter((qt) => qt.id !== id),
      },
    })),
  updateQuestionType: (id, data) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.map((qt) =>
          qt.id === id ? { ...qt, ...data } : qt
        ),
      },
    })),
  reset: () => set({ step: 1, form: defaultForm }),
}));

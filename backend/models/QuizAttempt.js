import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true }, selected: { type: Number, required: true }, correct: { type: Boolean, required: true },
}, { _id: false });

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  answers: [answerSchema], score: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 1 }, durationSeconds: { type: Number, min: 0, default: 0 },
}, { timestamps: true });
quizAttemptSchema.index({ score: -1, createdAt: 1 });
export default mongoose.model('QuizAttempt', quizAttemptSchema);

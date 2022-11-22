import mongoose from "mongoose";

const Schema = mongoose.Schema


let answerSchema = new Schema({
    questionId: { type: Schema.Types.ObjectId, ref: "questions", default: null },
    value: { type: String, default: null },
    is_correct_answer: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
}, { timestamps: true });

const Answer = mongoose.model('answer', answerSchema);
export default Answer;

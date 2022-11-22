import mongoose from "mongoose";

const Schema = mongoose.Schema


let questionSchema = new Schema({
    question_title: { type: String, default: null },
}, { timestamps: true });

const Question = mongoose.model('question', questionSchema);
export default Question;

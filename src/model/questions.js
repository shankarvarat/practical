import mongoose from "mongoose";

const Schema = mongoose.Schema


let questionSchema = new Schema({
    question_title: { type: String, default: null },
    answer_options: [
        {
            value: { type: String, default: null },
            is_correct_answer: { type: Boolean, default: false },
            is_deleted: { type: Boolean, default: false },
        }
    ]
}, { timestamps: true });

// plugin.applyPlugin();
const Question = mongoose.model('question', questionSchema);
export default Question;

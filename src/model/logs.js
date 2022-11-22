import mongoose from "mongoose";

const Schema = mongoose.Schema


let logSchema = new Schema({
    activity: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: "users", default: null },
    message: { type: String, default: null },
    isQuestion: { type: Boolean, default: null },
    is_correct_answer: { type: Boolean, default: null },
    oldMessage: { type: String, default: null },
}, { timestamps: true });

// plugin.applyPlugin();
const Log = mongoose.model('log', logSchema);
export default Log;

import questionModel from '../model/questions.js'
import mongoose from "mongoose";


class QuestionController {

    addQuestion = async (req, res) => {
        const question_title = req.body.question_title
        const answer_options = req.body.answer_options
        const id = req.body.id 
        var result
        const data = {
            question_title: question_title,
            answer_options: answer_options
        }
        try {
            if (id == -1) {
                result = await questionModel.create(data)
            }
            else {

                const query={_id : new mongoose.Types.ObjectId(id) }
                result = await questionModel.findByIdAndUpdate(query, data)
            }
            res.status(200).json(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}
export default new QuestionController();

import questionModel from '../model/questions.js'
import answerModel from '../model/answers.js'
import logModel from '../model/logs.js'

import mongoose from "mongoose";

class QuestionController {


    addQuestion = async (req, res) => {
        try {
            const question_title = req.body.question_title
            const answer_options = req.body.answer_options
            const id = req.body.id
            var question
            var ids = []
            var logs = []
            var promises = []

            answer_options.forEach(answer_option => {
                if (answer_option.id != -1) {
                    ids.push(new mongoose.Types.ObjectId(answer_option.id))
                }
            });

            if (id == -1) {
                question = await questionModel.create({ question_title: question_title })
                logs.push({
                    activity: "create",
                    user: req.user._id,
                    isQuestion: true,
                    message: question_title
                })

            }
            else {
                question = await questionModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
                if (question_title != question.question_title) {
                    await questionModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { question_title: question_title })
                    logs.push({
                        activity: "update",
                        user: req.user._id,
                        isQuestion: true,
                        message: question_title,
                        oldMessage: question.question_title
                    })
                }
            }
            const correct_answer_option = await answerModel.findOne({
                questionId: new mongoose.Types.ObjectId(question._id),
                is_correct_answer: true
            })

            const allOptionsData = await answerModel.find({
                _id: ids
            })
            await answer_options.forEach(async optionData => {
                if (optionData.id == -1) {
                    promises.push(answerModel.create({
                        questionId: new mongoose.Types.ObjectId(question._id),
                        value: optionData.value,
                        is_correct_answer: optionData.is_correct_answer,
                        is_deleted: optionData.is_deleted,
                    }))
                    logs.push({
                        activity: "create",
                        user: req.user._id,
                        message: optionData.value
                    })

                }
                else {
                    var updatedData = {}
                    var option = allOptionsData.find(option => option.id == optionData.id)
                    if (option) {

                        if (option.value != optionData.value) {
                            updatedData.value = optionData.value,
                                logs.push({
                                    activity: "update",
                                    user: req.user._id,
                                    message: optionData.value,
                                    oldMessage: option.value
                                })

                        }
                        if (option.is_correct_answer != optionData.is_correct_answer) {
                            updatedData.is_correct_answer = optionData.is_correct_answer
                            if (optionData.is_correct_answer == true && option.is_correct_answer != true) {
                                logs.push({
                                    activity: "update",
                                    user: req.user._id,
                                    is_correct_answer: true,
                                    message: optionData.value,
                                    oldMessage: correct_answer_option.value,
                                })
                            }
                            else {
                                logs.push({
                                    activity: "update",
                                    user: req.user._id,
                                    message: optionData.value,
                                    oldMessage: option.value
                                })
                            }
                        }
                        if (option.is_deleted != optionData.is_deleted) {
                            updatedData.is_deleted = optionData.is_deleted

                            logs.push({
                                activity: "delete",
                                user: req.user._id,
                                message: optionData.value,
                            })
                        }
                        promises.push(answerModel.findByIdAndUpdate(option._id, updatedData).exec())
                    }
                }

            });

            promises.push(logModel.insertMany(logs))
            Promise.all(promises).then(result => {
                res.status(200).json(result)
            }
            ).catch(error => {
                res.status(400).json(error)
            })
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}
export default new QuestionController();

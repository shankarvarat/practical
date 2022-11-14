import express from "express";
import QuestionController from "../controllers/questionController.js";
const router = express.Router();
import { verifyToken } from '../middlewares/auth.js'

router.post("/post",verifyToken, QuestionController.addQuestion);


export default router;

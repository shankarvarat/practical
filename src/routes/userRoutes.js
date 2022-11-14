import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post("/add", userController.addUser);
router.post("/login", userController.login);



export default router;

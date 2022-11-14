import express from "express";
import questionRoutes from "./questionRoutes.js";
import userRoutes from "./userRoutes.js"

const router = express.Router();

router.get("/", ((req, res) => {
	const data = "This is base API !";
	return res.status(200).send(data);
}));
router.use("/question", questionRoutes);
router.use("/user", userRoutes);

export default router;

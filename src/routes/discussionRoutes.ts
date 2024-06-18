import express from "express";
import {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByHashtag,
  incrementViewCount,
  likeDiscussion,
} from "../controllers/discussionController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, createDiscussion);
router.put("/:id", protect, updateDiscussion);
router.delete("/:id", protect, deleteDiscussion);
router.get("/search/hashtag", protect, getDiscussionsByHashtag);
router.post("/like", protect, likeDiscussion);
router.get("/:id", protect, incrementViewCount, (req: any, res) =>
  res.status(200).json(req.discussion)
);

export default router;

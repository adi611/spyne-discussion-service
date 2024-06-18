import { Request, Response } from "express";
import Discussion from "../models/discussionModel";
import { TDiscussion } from "../types/types";

export const createDiscussion = async (req: any, res: Response) => {
  const { text, image } = req.body;

  try {
    // Extract hashtags from the text
    const hashtags =
      text
        .match(/#\w+/g)
        ?.map((hashtag: string) => hashtag.slice(1).toLowerCase()) || [];

    const discussion = new Discussion({
      userId: req.user.id,
      text,
      image,
      hashtags,
    } as TDiscussion);

    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDiscussion = async (req: any, res: Response) => {
  const { id } = req.params;
  const { text, image, comments, comment, likes } = req.body;

  try {
    const discussion = await Discussion.findById(id);

    if (discussion) {
      if (discussion.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      // Update text and extract hashtags if provided
      if (text) {
        const extractedHashtags =
          text
            .match(/#\w+/g)
            ?.map((hashtag: string) => hashtag.slice(1).toLowerCase()) || [];
        discussion.text = text;
        discussion.hashtags = extractedHashtags;
      }

      // Update image if provided
      if (image) {
        discussion.image = image;
      }

      // Update comments if provided
      if (comments && Array.isArray(comments)) {
        discussion.comments = comments;
      }

      if (comment) {
        discussion.comments = [...(discussion.comments ?? []), comment];
      }

      // Update likes if provided
      if (likes && Array.isArray(likes)) {
        discussion.likes = likes;
      }

      const updatedDiscussion = await discussion.save();
      res.status(200).json(updatedDiscussion);
    } else {
      res.status(404).json({ message: "Discussion not found" });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDiscussion = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const discussion = await Discussion.findById(id);

    if (discussion) {
      if (discussion.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }

      await Discussion.deleteOne({ _id: discussion._id });
      res.status(200).json({ message: "Discussion removed" });
    } else {
      res.status(404).json({ message: "Discussion not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDiscussionsByHashtag = async (req: Request, res: Response) => {
  const { hashtag } = req.query;

  if (!hashtag || typeof hashtag !== "string") {
    return res
      .status(400)
      .json({ message: "Invalid or missing hashtag parameter" });
  }

  const hashtagToSearch = hashtag.toLowerCase().trim();

  if (!hashtagToSearch) {
    return res.status(400).json({ message: "Hashtag cannot be empty" });
  }

  try {
    const discussions = await Discussion.find({
      hashtags: { $elemMatch: { $eq: hashtagToSearch } },
    });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const incrementViewCount = async (
  req: any,
  res: Response,
  next: Function
) => {
  const { id } = req.params;

  try {
    const discussion = await Discussion.findById(id);

    if (discussion) {
      if (discussion.viewCount !== undefined) {
        discussion.viewCount += 1;
      } else {
        discussion.viewCount = 1;
      }
      await discussion.save();
      req.discussion = discussion;
      next();
    } else {
      res.status(404).json({ message: "Discussion not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const likeDiscussion = async (req: any, res: Response) => {
  const { discussionId } = req.body;

  try {
    const discussion = await Discussion.findById(discussionId);

    if (discussion) {
      const userId = req.user.id;
      discussion.likes =
        userId.toString() !== discussion.userId.toString()
          ? [...(discussion.likes || []), userId]
          : discussion.likes;

      await discussion.save();
      res.status(200).json(discussion);
    } else {
      res.status(404).json({ message: "Discussion not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

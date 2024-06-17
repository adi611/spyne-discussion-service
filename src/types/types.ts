import mongoose from 'mongoose';

export type TDiscussion = {
  user: mongoose.Types.ObjectId;
  text: string;
  image?: string;
  hashtags?: string[];
  createdOn?: Date;
  comments?: mongoose.Types.ObjectId[];
  likes?: mongoose.Types.ObjectId[];
  viewCount?: number;
}
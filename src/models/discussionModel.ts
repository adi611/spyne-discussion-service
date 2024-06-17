import mongoose, { Schema } from 'mongoose';
import { TDiscussion } from '../types/types';

const discussionSchema = new Schema<TDiscussion>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  image: { type: String },
  hashtags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  viewCount: { type: Number, default: 0 },
}, { timestamps: true });

const Discussion = mongoose.model<TDiscussion>('Discussion', discussionSchema);
export default Discussion;

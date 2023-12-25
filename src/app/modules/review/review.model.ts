import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Review = model("Review", ReviewSchema);

export default Review;

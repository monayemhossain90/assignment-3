import { Schema, model } from "mongoose";
import { CourseModel, TCourse, TDetails, TTags } from "./course.interface";
import httpStatus from "http-status";
import AppError from "../../errors/appErrors";

const TagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const DetailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const CourseSchema = new Schema<TCourse, CourseModel>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [TagsSchema],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  durationInWeeks: {
    type: Number,
    required: true,
  },
  details: DetailsSchema,
});

CourseSchema.pre("save", async function (next) {
  const isCourseExist = await Course.findOne({
    title: this.get("title"),
  });
  if (isCourseExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Course with this title already exists"
    );
  }
  next();
});

CourseSchema.statics.isCourseExist = async function (_id: string) {
  const course = await this.findOne({ _id });
  return course;
};

export const Course = model<TCourse, CourseModel>("Course", CourseSchema);

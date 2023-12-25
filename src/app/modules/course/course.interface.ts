import { Model, Types } from "mongoose";

export type TTags = {
  name: string;
  isDeleted: boolean;
};

export type TDetails = {
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTags[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDetails;
};

// Custom Static Methods for Course
export interface CourseModel extends Model<TCourse> {
  isCourseExist(id: number): Promise<TCourse | null>;
}

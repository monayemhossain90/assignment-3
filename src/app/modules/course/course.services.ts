/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";

const createCourse = async (payload: TCourse) => {
  // Calculating duration
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  const durationInWeeks = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7)
  );
  payload.durationInWeeks = durationInWeeks;

  const createdCourse = await Course.create(payload);
  return createdCourse;
};

const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;

  return result;
};

const countCourses = async () => {
  const count = await Course.countDocuments();
  return count;
};

const getCourseByIdWithReview = async (id: string) => {
  const isCourseExist = await Course.isCourseExist(id as any);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  } else {
    const result = await Course.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "courseId",
          as: "reviews",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    const course = result[0];
    return course;
  }
};

const updateCourseById = async (id: string, payload: Partial<TCourse>) => {
  const isCourseExist = await Course.isCourseExist(id as any);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  } else {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const course = await Course.findById(id);

      const { details, tags, ...remaining } = payload;

      const modifiedPayload: Record<string, unknown> = {
        ...remaining,
      };

      if (tags && tags.length) {
        const courseTags = course?.tags.map((tag) => tag.name);

        // New tags
        const newTags = tags.filter((tag) => !courseTags?.includes(tag?.name));
        const deletedNewTags = newTags.filter((tag) => tag.isDeleted);

        // Old tags
        const oldTags = tags.filter((tag) => courseTags?.includes(tag?.name));
        const deletedTags = oldTags.filter((tag) => tag.isDeleted);
        const nonDeletedTags = oldTags.filter((tag) => !tag.isDeleted);

        // check if tag is new
        if (newTags.length) {
          //  check if new tag is deleted
          if (deletedNewTags.length) {
            throw new AppError(
              httpStatus.BAD_REQUEST,
              "New tag cannot be deleted"
            );
          }
          modifiedPayload.$addToSet = {
            tags: {
              $each: newTags
                .filter((tag) => !courseTags?.includes(tag?.name))
                .filter(
                  (tag, index, self) =>
                    self.findIndex((t) => t.name === tag.name) === index
                ),
            },
          };
        }

        // check if tag exists in course
        if (oldTags.length) {
          //  check if tag is deleted
          if (deletedTags.length) {
            modifiedPayload.$pull = {
              tags: {
                name: {
                  $in: deletedTags.map((tag) => tag.name),
                },
              },
            };
          }
          //  check if tag is not deleted
          if (nonDeletedTags.length) {
            const tagNames = nonDeletedTags.map((tag) => tag.name).join(", ");
            throw new AppError(
              httpStatus.BAD_REQUEST,
              `${tagNames} already exists in this course`
            );
          }
        }
      }

      if (details) {
        for (const [key, value] of Object.entries(details)) {
          modifiedPayload[`details.${key}`] = value;
        }
      }

      // if startDate and endDate is modified, then update durationInWeeks
      if (payload.startDate && payload.endDate) {
        const startDate = new Date(payload.startDate);
        const endDate = new Date(payload.endDate);
        const durationInWeeks = Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7)
        );
        modifiedPayload.durationInWeeks = durationInWeeks;
      }

      // if startDate or endDate is modified, then update durationInWeeks
      if (payload.startDate || payload.endDate) {
        const startDate = new Date(
          payload.startDate || course?.startDate || ""
        );
        const endDate = new Date(payload.endDate || course?.endDate || "");
        const durationInWeeks = Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7)
        );
        modifiedPayload.durationInWeeks = durationInWeeks;
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        modifiedPayload,
        {
          new: true,
        }
      );
      await session.commitTransaction();
      session.endSession();
      return updatedCourse;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      const dynamicErrorMessage = (error as Error).message
        ? `Failed to update course. ${(error as Error).message}`
        : "Failed to update course";
      throw new AppError(httpStatus.BAD_REQUEST, dynamicErrorMessage);
    }
  }
};

const getBestCourses = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: "$reviews.rating",
        },
        reviewCount: {
          $size: "$reviews",
        },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        __v: 0,
        reviews: 0,
      },
    },
  ]);
  const course = result[0];
  return course;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getCourseByIdWithReview,
  updateCourseById,
  countCourses,
  getBestCourses,
};

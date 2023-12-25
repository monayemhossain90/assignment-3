/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { ZodError } from "zod";
import handlerCastError from "./handleCastError";
import handlerDuplicateError from "./handleDuplicateError";
import handleValidationError from "./handleValidationError";
import handlerZodError from "./handleZodError";
import AppError from "./appErrors";


const errorPreProcessor = (error: any) => {
  if (error instanceof ZodError) {
    return handlerZodError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(error);
  } else if (error.code && error.code === 11000) {
    return handlerDuplicateError(error);
  } else if (error instanceof mongoose.Error.CastError) {
    return handlerCastError(error);
  } else if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      status: false,
      message: error.message,
      issues: [
        {
          path: "",
          message: error.message,
        },
      ],
    };
  } else {
    return {
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
      issues: [
        {
          path: "",
          message: error.message,
        },
      ],
    };
  }
};

export default errorPreProcessor;

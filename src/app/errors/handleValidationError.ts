import httpStatus from "http-status";
import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "./types";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TErrorResponse => {
  const errorValues = Object.values(err.errors);
  const issues: TErrorIssue[] = [];
  errorValues.forEach((errObj) => {
    issues.push({
      path: errObj.path,
      message: errObj.message,
    });
  });
  // eslint-disable-next-line no-console
  console.log(issues);

  return {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: "Validation Error",
    errorMessage: "Validation Error",
    errorDetails: {
      name: err.name,
      issues,
      errorCode: "validation_error",
    },
  };
};

export default handleValidationError;

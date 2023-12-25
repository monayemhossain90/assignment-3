import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "./types";

const handlerDuplicateError = (
  err: mongoose.Error.ValidationError
): TErrorResponse => {
  const valueRegex = /"(.*?)"/;
  const valueMatches = err.message.match(valueRegex);
  const pathRegex = /index: (.*?) dup key/;
  const pathMatches = pathRegex.exec(err.message)?.[1]?.split("_")?.[0];
  const issues: TErrorIssue[] = [
    {
      path: `${pathMatches}`,
      message: ` Duplicate value for ${valueMatches![1]}`,
    },
  ];

  return {
    statusCode: 409,
    success: false,
    message: `Duplicate Error in ${pathMatches}`,
    errorMessage: `Duplicate value for ${valueMatches![1]}`,
    errorDetails: {
      name: err.name,
      message: err.message,
      issues,
      valueType: `${valueMatches![1]}`,
      errorCode: "duplicate_error",
    },
  };
};

export default handlerDuplicateError;

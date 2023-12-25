/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { TErrorResponse } from "../errors/types";
import errorPreProcessor from "../errors/errorPreProcessor";
import configs from "../configs";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    success: err.status || false,
    message: err.message || "Internal Server Error",
    errorMessage: err.errorMessage || "Something went wrong",
    errorDetails: err.errorDetails || {},
  };

  const processedError = errorPreProcessor(err);
  if (processedError) {
    errorResponse = processedError;
  } else {
    errorResponse = {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      errorMessage: "Error processing the request",
      errorDetails: {},
    };
  }

  res.status(errorResponse?.statusCode).json({
    statusCode: errorResponse.statusCode || 500,
    success: errorResponse.success || false,
    message: errorResponse.message || "Internal Server Error",
    errorMessage: errorResponse.errorMessage || "Something went wrong",
    errorDetails: errorResponse.errorDetails || {},
    stack: configs.node_env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;

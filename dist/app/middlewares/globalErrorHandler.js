"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorPreProcessor_1 = __importDefault(require("../errors/errorPreProcessor"));
const configs_1 = __importDefault(require("../configs"));
const globalErrorHandler = (err, req, res, next) => {
    let errorResponse = {
        statusCode: err.statusCode || 500,
        success: err.status || false,
        message: err.message || "Internal Server Error",
        errorMessage: err.errorMessage || "Something went wrong",
        errorDetails: err.errorDetails || {},
    };
    const processedError = (0, errorPreProcessor_1.default)(err);
    if (processedError) {
        errorResponse = processedError;
    }
    else {
        errorResponse = {
            statusCode: 500,
            success: false,
            message: "Internal Server Error",
            errorMessage: "Error processing the request",
            errorDetails: {},
        };
    }
    res.status(errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.statusCode).json({
        statusCode: errorResponse.statusCode || 500,
        success: errorResponse.success || false,
        message: errorResponse.message || "Internal Server Error",
        errorMessage: errorResponse.errorMessage || "Something went wrong",
        errorDetails: errorResponse.errorDetails || {},
        stack: configs_1.default.node_env === "development" ? err.stack : "",
    });
};
exports.default = globalErrorHandler;

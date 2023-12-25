"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleValidationError = (err) => {
    const errorValues = Object.values(err.errors);
    const issues = [];
    errorValues.forEach((errObj) => {
        issues.push({
            path: errObj.path,
            message: errObj.message,
        });
    });
    // eslint-disable-next-line no-console
    console.log(issues);
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
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
exports.default = handleValidationError;

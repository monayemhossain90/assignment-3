"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (err) => {
    let errorMessage = "";
    const issues = err.issues.map((issue) => {
        const path = issue.path.join(".");
        errorMessage = ` ${path} is ${issue.message}`;
        return {
            code: issue.code,
            message: issue.message,
            errorMessage,
        };
    });
    const errorMessages = issues.map((issue) => issue.errorMessage).join(", ");
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        success: false,
        message: "Validation Error",
        errorMessage: errorMessages,
        errorDetails: {
            issues,
            name: err.name,
        },
        stack: err.stack || "",
    };
};
exports.default = handleZodError;

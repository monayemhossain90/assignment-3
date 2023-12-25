"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const handleZodError_1 = __importDefault(require("./handleZodError"));
const appErrors_1 = __importDefault(require("./appErrors"));
const errorPreProcessor = (error) => {
    if (error instanceof zod_1.ZodError) {
        return (0, handleZodError_1.default)(error);
    }
    else if (error instanceof mongoose_1.default.Error.ValidationError) {
        return (0, handleValidationError_1.default)(error);
    }
    else if (error.code && error.code === 11000) {
        return (0, handleDuplicateError_1.default)(error);
    }
    else if (error instanceof mongoose_1.default.Error.CastError) {
        return (0, handleCastError_1.default)(error);
    }
    else if (error instanceof appErrors_1.default) {
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
    }
    else {
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
exports.default = errorPreProcessor;

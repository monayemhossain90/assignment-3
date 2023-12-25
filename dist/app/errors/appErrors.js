"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        // send the message to Parent class :
        super(message);
        // set statusCode value with Constructor:
        this.statusCode = statusCode;
        // configure stack message:
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;

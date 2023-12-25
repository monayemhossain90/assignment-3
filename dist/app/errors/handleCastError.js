"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const issues = [
        {
            path: err.path || "_id",
            message: ` ${err.value} is not a valid ID!`,
        },
    ];
    // eslint-disable-next-line no-console
    console.log(issues);
    return {
        statusCode: 400,
        success: false,
        message: "Invalid ID",
        errorMessage: `${err.value} is not a valid ID!`,
        errorDetails: {
            stringValue: err.value,
            valueType: typeof err.value,
            kind: err.kind,
            value: err.value,
            path: err.path || "_id",
            reason: err.reason || {},
            name: err.name,
            message: err.message,
        },
        stack: err.stack || "",
    };
};
exports.default = handleCastError;

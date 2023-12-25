"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlerDuplicateError = (err) => {
    var _a, _b, _c;
    const valueRegex = /"(.*?)"/;
    const valueMatches = err.message.match(valueRegex);
    const pathRegex = /index: (.*?) dup key/;
    const pathMatches = (_c = (_b = (_a = pathRegex.exec(err.message)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.split("_")) === null || _c === void 0 ? void 0 : _c[0];
    const issues = [
        {
            path: `${pathMatches}`,
            message: ` Duplicate value for ${valueMatches[1]}`,
        },
    ];
    return {
        statusCode: 409,
        success: false,
        message: `Duplicate Error in ${pathMatches}`,
        errorMessage: `Duplicate value for ${valueMatches[1]}`,
        errorDetails: {
            name: err.name,
            message: err.message,
            issues,
            valueType: `${valueMatches[1]}`,
            errorCode: "duplicate_error",
        },
    };
};
exports.default = handlerDuplicateError;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// App Routes
app.use("/api", routes_1.default);
app.get("/", (req, res, next) => {
    try {
        res.send("Hello World!");
    }
    catch (error) {
        next(error);
    }
});
// Route Not Found
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;

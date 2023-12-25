"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appErrors_1 = __importDefault(require("../errors/appErrors"));
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const { minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level, } = this.query;
        const filterData = {};
        if (minPrice)
            filterData["price"] = { $gte: parseFloat(minPrice) };
        if (maxPrice)
            filterData["price"] = {
                $lte: parseFloat(maxPrice),
            };
        if (minPrice && maxPrice)
            filterData["price"] = {
                $gte: parseFloat(minPrice),
                $lte: parseFloat(maxPrice),
            };
        if (tags)
            filterData["tags.name"] = { $in: tags.split(",") };
        if (startDate)
            filterData["startDate"] = { $gte: startDate };
        if (endDate)
            filterData["endDate"] = { $lte: endDate };
        if (language)
            filterData["language"] = language;
        if (provider)
            filterData["provider"] = provider;
        if (durationInWeeks)
            filterData["durationInWeeks"] = parseInt(durationInWeeks);
        if (level)
            filterData["details.level"] = level;
        const excludeFields = ["sort", "sortOrder", "limit", "skip", "page"];
        excludeFields.forEach((elm) => delete filterData[elm]);
        this.modelQuery = this.modelQuery.find(filterData);
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy;
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) || "asc";
        const sortableFields = [
            "title",
            "price",
            "startDate",
            "endDate",
            "language",
            "durationInWeeks",
        ];
        if (sortBy && sortableFields.includes(sortBy)) {
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder;
            this.modelQuery = this.modelQuery.sort(sortOptions);
        }
        else if (sortBy && !sortableFields.includes(sortBy)) {
            throw new appErrors_1.default(http_status_1.default.BAD_REQUEST, "Invalid sort field");
        }
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;

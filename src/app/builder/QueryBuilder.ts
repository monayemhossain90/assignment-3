import { Query } from "mongoose";
import { SortOrder } from "mongoose";
import httpStatus from "http-status";
import AppError from "../errors/appErrors";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter() {
    const {
      minPrice,
      maxPrice,
      tags,
      startDate,
      endDate,
      language,
      provider,
      durationInWeeks,
      level,
    } = this.query;

    const filterData: Record<string, unknown> = {};

    if (minPrice)
      filterData["price"] = { $gte: parseFloat(minPrice as string) };
    if (maxPrice)
      filterData["price"] = {
        $lte: parseFloat(maxPrice as string),
      };
    if (minPrice && maxPrice)
      filterData["price"] = {
        $gte: parseFloat(minPrice as string),
        $lte: parseFloat(maxPrice as string),
      };
    if (tags) filterData["tags.name"] = { $in: (tags as string).split(",") };
    if (startDate) filterData["startDate"] = { $gte: startDate as string };
    if (endDate) filterData["endDate"] = { $lte: endDate as string };
    if (language) filterData["language"] = language as string;
    if (provider) filterData["provider"] = provider as string;
    if (durationInWeeks)
      filterData["durationInWeeks"] = parseInt(durationInWeeks as string);
    if (level) filterData["details.level"] = level as string;

    const excludeFields = ["sort", "sortOrder", "limit", "skip", "page"];
    excludeFields.forEach((elm) => delete filterData[elm]);
    this.modelQuery = this.modelQuery.find(filterData);
    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy;
    const sortOrder = this?.query?.sortOrder || "asc";
    const sortableFields = [
      "title",
      "price",
      "startDate",
      "endDate",
      "language",
      "durationInWeeks",
    ];

    if (sortBy && sortableFields.includes(sortBy as string)) {
      const sortOptions: { [key: string]: SortOrder } = {};
      sortOptions[sortBy as string] = sortOrder as SortOrder;
      this.modelQuery = this.modelQuery.sort(sortOptions);
    } else if (sortBy && !sortableFields.includes(sortBy as string)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid sort field");
    }

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;

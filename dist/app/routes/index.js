"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = require("../modules/category/category.route");
const course_route_1 = require("../modules/course/course.route");
const courses_route_1 = require("../modules/course/courses.route");
const Review_route_1 = require("../modules/review/Review.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/categories",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/course",
        route: course_route_1.CourseRoute,
    },
    {
        path: "/courses",
        route: courses_route_1.CoursesRoutes,
    },
    {
        path: "/reviews",
        route: Review_route_1.ReviewRoutes,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;

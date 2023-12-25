import { Router } from "express";
import { CategoryRoutes } from "../modules/category/category.route";
import { CourseRoute } from "../modules/course/course.route";
import { CoursesRoutes } from "../modules/course/courses.route";
import { ReviewRoutes } from "../modules/review/Review.route";


const router = Router();

const routes = [
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/course",
    route: CourseRoute,
  },
  {
    path: "/courses",
    route: CoursesRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

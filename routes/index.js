import userRouter from "./userRoutes.js";
import contactRouter from "./contactRoutes.js";
import projectRouter from "./projectRoutes.js";
import qualificationRouter from "./qualificationRoutes.js";
import authRouter from "./authRoutes.js";
const mountRoutes = (app) => {
  const routes = [
    { path: "/users", router: userRouter },
    { path: "/contacts", router: contactRouter },
    { path: "/projects", router: projectRouter },
    { path: "/qualifications", router: qualificationRouter },
    { path: "/auth", router: authRouter}
  ];

  routes.forEach(({ path, router }) => {
    app.use(`/api${path}`, router);
  });
};

export default mountRoutes;
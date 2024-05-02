import Home from "../containers/home/home";
import Login from "../containers/sign-in/sign-in";
import Register from "../containers/sign-up/sign-up";
import AccountLayout from "../layouts/sign";
import MoviesLayout from "../layouts/movies-layout";
import Movies from "../containers/movies/movies";
import Detail from "../containers/detail/detail";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/auth/login", component: Login, layout: AccountLayout },
  { path: "/auth/register", component: Register, layout: AccountLayout },
];

const privateRoutes = [
  { path: "/home", component: Movies, layout: MoviesLayout },
  { path: "/movie/detail/:slug", component: Detail, layout: MoviesLayout }
];

export { publicRoutes, privateRoutes };
enum RoutePath {
  Home = "/",
  Profile = "/profile",
  About = "/about",
  //auth
  Signin = "/signin",
  Signup = "/signup",
  Verification = "/verification",
}

const privatRoutes = [RoutePath.Home, RoutePath.Profile, RoutePath.About];
const authRoutes = [RoutePath.Signin, RoutePath.Signup, RoutePath.Verification];

export { authRoutes, privatRoutes };

export default RoutePath;

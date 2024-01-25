import Home from "./Pages/Home";
import SignIn from "./Pages/Sign";
import PageNotFound from "./Pages/PageNotFound";


let routes = [
    { path: "/", element: <Home /> },
    { path: "/signin", element: <SignIn /> },
    { path: "*", element: <PageNotFound /> },
]

export default routes
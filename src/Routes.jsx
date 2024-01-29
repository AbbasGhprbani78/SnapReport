import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import AddForm from "./Pages/AddForm";

let routes = [
    { path: "home", element: <Home /> },
    { path: "/addnewform", element: <AddForm /> },
    { path: "*", element: <PageNotFound /> },

]

export default routes
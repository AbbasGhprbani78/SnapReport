import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import AddNewForm from "./Pages/AddNewForm";
import AllForm from "./Pages/AllForm";



let routes = [
    { path: "/", element: <Home /> },
    { path: "/addnewform", element: <AddNewForm /> },
    { path: "/allform", element: <AllForm /> },
    { path: "*", element: <PageNotFound /> },

]

export default routes
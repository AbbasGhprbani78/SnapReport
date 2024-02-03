import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import AddNewForm from "./Pages/AddNewForm";



let routes = [
    { path: "/", element: <Home /> },
    { path: "/addnewform", element: <AddNewForm /> },
    { path: "*", element: <PageNotFound /> },

]

export default routes
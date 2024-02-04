import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import AddNewForm from "./Pages/AddNewForm";
import AllForm from "./Pages/AllForm";
import Report from './Pages/Report'



let routes = [
    { path: "/", element: <Home /> },
    { path: "/addnewform", element: <AddNewForm /> },
    { path: "/allform", element: <AllForm /> },
    { path: "/reports", element: <Report /> },
    { path: "*", element: <PageNotFound /> },

]

export default routes
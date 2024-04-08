import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import AddNewForm from "./Pages/AddNewForm";
import AllForm from "./Pages/AllForm";
import FilledForms from './Pages/FlledForms'
import Chat from './Pages/Chat'
import SeniorRoutes from "./Components/SeniorRoutes/SeniorRoutes";
import ManualChat from "./Pages/Manual/ManualChat";
import ManualHome from "./Pages/Manual/ManualHome";
import OrdinaryHome from "./Pages/Ordinary/OrdinaryHome";
import OrdinaryChat from "./Pages/Ordinary/OrdinaryChat";
import OrdinaryRoutes from "./Components/OrdinaryRoutes/OrdinaryRoutes";
import ManualRoutes from "./Components/ManualRoutes.jsx/ManualRoutes";
import PermitForm from "./Pages/Manual/PermitForm";
import AccidentForm from "./Pages/Manual/AccidentForm";
import Report from "./Pages/Report";
import Infractions from './Pages/Manual/Infractions';
import Inspections from './Pages/Manual/Inspections';
import OrdinaryAccidentForm from './Pages/Ordinary/OrdinaryAccidentForm';
import OrdinaryInfractions from './Pages/Ordinary/OrdinaryInfractions';
import OrdinaryInpections from "./Pages/Ordinary/OrdinaryInpections";
import OrdinaryPermitForm from "./Pages/Ordinary/OrdinaryPermitForm";

let routes = [

    { path: "/manualhome", element: <ManualRoutes><ManualHome /></ManualRoutes> },
    { path: "/manualchat", element: <ManualRoutes><ManualChat /></ManualRoutes> },
    { path: "/permitform", element: <ManualRoutes><PermitForm /></ManualRoutes> },
    { path: "/accidentform", element: <ManualRoutes> <AccidentForm /></ManualRoutes> },
    { path: "/violationsform", element: <ManualRoutes> <Infractions /></ManualRoutes> },
    { path: "/inspectionsform", element: <ManualRoutes> <Inspections /></ManualRoutes> },


    { path: "/ordinaryhome", element: <OrdinaryRoutes><OrdinaryHome /></OrdinaryRoutes> },
    { path: "/ordinarychat", element: <OrdinaryRoutes><OrdinaryChat /></OrdinaryRoutes> },
    // { path: "/ordinaryaccidentform", element: <OrdinaryRoutes><Ordinary /></OrdinaryRoutes> },
    // { path: "/ordinaryviolationsform", element: <OrdinaryRoutes><Ordinary /></OrdinaryRoutes> },
    // { path: "/ordinaryinpections", element: <OrdinaryRoutes><Ordinary /></OrdinaryRoutes> },
    // { path: "/ordinarypermitform", element: <OrdinaryRoutes><Ordinary /></OrdinaryRoutes> },

    { path: "/", element: <SeniorRoutes><Home /></SeniorRoutes> },
    { path: "/addnewform", element: <SeniorRoutes><AddNewForm /></SeniorRoutes> },
    { path: "/allform", element: <SeniorRoutes><AllForm /></SeniorRoutes> },
    { path: "/filledforms/:todoid", element: <SeniorRoutes><FilledForms /></SeniorRoutes> },
    { path: "/reports", element: <SeniorRoutes><Report /></SeniorRoutes> },
    { path: "/chat", element: <SeniorRoutes><Chat /></SeniorRoutes> },

    { path: "*", element: <PageNotFound /> },

]

export default routes
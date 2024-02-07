import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SeniorsideBar from './Components/SideBars/SeniorSideBar';
import OrdinarySideBars from './Components/SideBars/OrdinarySideBars'
import ManualSideBar from './Components/SideBars/ManualSideBar'
import SignIn from './Pages/Sign';
import Header from './Components/Header/Header';
import { useMyContext } from './Components/RoleContext';

export const IP = "https://snapreport.ariisco.com"
// export const IP = "http://185.79.156.226:9500"
function App() {
  let router = useRoutes(routes);
  const { sharedData } = useMyContext();


  return (
    <>
      {
        window.location.pathname === "/signin" ?
          <Routes>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          :
          <>
            <Header />
            <div className="d-flex w-100">
              {
                sharedData === "S" ?
                  <SeniorsideBar /> :
                  sharedData === "O" ?
                    <OrdinarySideBars /> :
                    <ManualSideBar />
              }

              {router}
            </div>
          </>

      }
    </>
  )
}



export default App;

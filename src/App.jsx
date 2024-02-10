import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SeniorsideBar from './Components/SideBars/SeniorSideBar';
import OrdinarySideBars from './Components/SideBars/OrdinarySideBars'
import ManualSideBar from './Components/SideBars/ManualSideBar'
import SignIn from './Pages/Sign';
import Form from './Form/Form'

import { useMyContext } from './Components/RoleContext';

export const IP = "https://snapreport.ariisco.com"
// export const IP = "http://185.79.156.226:9500"
function App() {
  let router = useRoutes(routes);
  const { sharedData } = useMyContext();


  return (
    <>
      {
        window.location.pathname === "/login" ?
          <Routes>
            <Route path="/login" element={<SignIn />} />
          </Routes>
          :
          <>

            <div className="d-flex w-100">
              {
                sharedData === "S" ?
                  <SeniorsideBar /> :
                  sharedData === "O" ?
                    <OrdinarySideBars /> :
                    sharedData === "M" ?
                      <ManualSideBar /> : null
              }
              <SeniorsideBar />
              {router}
            </div>
          </>

      }
    </>
    // <>
    //   <Form />
    // </>
  )
}



export default App;

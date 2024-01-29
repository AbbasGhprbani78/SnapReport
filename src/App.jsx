import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SideBar from './Components/SideBar/SideBar';
import SignIn from './Pages/Sign';
import Header from './Components/Header/Header';
import { Col } from 'react-bootstrap';


export const IP = ""

function App() {

  let router = useRoutes(routes);
  return (
    <>
      {

        window.location.pathname === "/signin" ?
          <Routes>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          :
          <div>
            <Header />
            <div className="d-flex w-100">
              <div style={{ width: "20%" }}>
                <SideBar />
              </div>
              {router}
            </div>
          </div>
      }


    </>
  )
}

export default App

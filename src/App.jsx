import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SideBar from './Components/SideBar/SideBar';
import SignIn from './Pages/Sign';
import Header from './Components/Header/Header';
export const IP = "https://snapreport.ariisco.com"
// export const IP = "http://185.79.156.226:9500"
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
              <SideBar />
              {router}
            </div>
          </div>
      }


    </>
  )
}

export default App



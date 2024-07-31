import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SeniorsideBar from './Components/SideBars/SeniorSideBar';
import OrdinarySideBars from './Components/SideBars/OrdinarySideBars'
import ManualSideBar from './Components/SideBars/ManualSideBar'
import SignIn from './Pages/Sign';
import { useMyContext } from './Components/RoleContext';
import { useContext } from 'react';
import { SearchContext } from './Components/Context/SearchContext';
import Search from './Pages/Search/Search';

export const IP = "https://snapreport.ariisco.com"

function App() {
  let router = useRoutes(routes);

  const { sharedData } = useMyContext();
  const { type } = useMyContext()
  const { searchResult, search } = useContext(SearchContext)

  return (
    <>
      {

        window.location.pathname === "/login" ?
          <Routes>
            <Route path="/login" element={<SignIn />} />
          </Routes>
          :
          <>
            <div className="d-flex w-100 main-container">
              {
                (sharedData || type) === "S" ?
                  <SeniorsideBar /> :
                  (sharedData || type) === "O" ?
                    <OrdinarySideBars /> :
                    (sharedData || type) === "M" ?
                      <ManualSideBar /> : null
              }
              <div className='w-100' style={{ overflowX: "hidden" }}>
                {
                  search ?
                    <Search />
                    :
                    <>
                      {router}
                    </>
                }

              </div>
            </div>
          </>
      }
    </>
  )
}

export default App;


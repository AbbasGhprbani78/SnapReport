import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SeniorsideBar from './Components/SideBars/SeniorSideBar';
import OrdinarySideBars from './Components/SideBars/OrdinarySideBars'
import ManualSideBar from './Components/SideBars/ManualSideBar'
import SignIn from './Pages/Sign';
import { useMyContext } from './Components/RoleContext';

export const IP = "https://snapreport.ariisco.com"

function App() {
  let router = useRoutes(routes);

  const { sharedData } = useMyContext();
  const { type } = useMyContext()

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
                {router}
              </div>
            </div>
          </>
      }
    </>
  )
}

export default App;

///modal

{/* <div
  className={`modal-accident-Wrapper ${showModalAccident ? "modal-accident-Wrapper-active " : ""}`}
>
  <div ref={subUserRef} className="modal-accident">
    <div style={{ textAlign: "right", padding: "15px" }}>
      <CloseIcon style={{ cursor: "pointer" }} onClick={hideModal} />
    </div>
    <h3
      className={`title-wraning ${isAccident == 0 ?
        "safe" : isAccident == 1 ?
          "warning" : isAccident == 2 ?
            "danger" : ""}`}>

      {isAccident == 0 ? "No Accident" : isAccident == 1 ? "Warinig" : isAccident == 2 ? "Danger" : ""}
    </h3>
    <p className='text-warnings text-center'>
      {meesageRick && meesageRick}
    </p>
  </div>
</div> */}



{/* <div className='warning-icon-wrapper'>
                            < WarningAmberIcon
                              style={{ cursor: "pointer" }}
                            />
                          </div> */}

{/* <span className='span-warning'>
                                <GppMaybeOutlinedIcon
                                  style={{ color: "#ffffff", cursor: "pointer" }}
                                />
                              </span> */}




{/* <span className='span-Verified'>
                                  <VerifiedUserOutlinedIcon
                                    style={{ color: "#ffffff", cursor: "pointer" }}
                                  />
                                </span> */}
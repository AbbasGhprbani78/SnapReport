import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useRoutes, useLocation } from 'react-router-dom';
import routes from './Routes';
import SeniorsideBar from './Components/SideBars/SeniorSideBar';
import OrdinarySideBars from './Components/SideBars/OrdinarySideBars'
import ManualSideBar from './Components/SideBars/ManualSideBar'
import SignIn from './Pages/Sign';
import { useMyContext } from './Components/RoleContext';
//import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-bootstrap';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
// import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';

export const IP = "https://snapreport.ariisco.com"
// export const IP = "http://185.79.156.226:9500"
function App() {
  let router = useRoutes(routes);

  const subUserRef = useRef(null);
  const { sharedData } = useMyContext();
  const [isAccident, setIsAccident] = useState(null)
  const [meesageRick, setMessageRisk] = useState()
  const { type } = useMyContext()
  const location = useLocation()


  useEffect(() => {

    function handleClickOutside(event) {
      if (subUserRef.current && !subUserRef.current.contains(event.target)) {
        setShowModalAccident(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (location.pathname !== '/login') {
      setIsAccident(localStorage.getItem("levelrick"));
      setMessageRisk(localStorage.getItem("message"));
    }
  }, [location]);



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

                {location.pathname !== '/aireports' &&

                  ((sharedData === "S" || type === "S") || (sharedData === "O" || type === "O")) ?
                  <>
                    {
                      isAccident == 2 ?
                        <Alert className='d-flex align-items-center justify-content-between alert-accident'>
                          <div className='content-alert'>
                            <h4 className='alert-title-ai'>Danger</h4>
                            <p className='alert-text'>{meesageRick}</p>
                            <p>Powered By Snap Report Ai</p>
                          </div>

                        </Alert> :
                        isAccident == 1 ?
                          <Alert className='d-flex align-items-center justify-content-between warningAccident'>
                            <div className='content-alert'>
                              <h4 className='alert-title-ai'>Warning</h4>
                              <p className='alert-text'>zdfdsvfxcvds</p>
                              <p>Powered By Snap Report Ai</p>
                            </div>

                          </Alert> :
                          isAccident == 0 ?
                            <Alert className='d-flex align-items-center justify-content-between noAccident'>
                              <div className='content-alert'>
                                <h4 className='alert-title-ai'>No Accident</h4>
                                <p className='alert-text'>dzgdrhfcb fhdrfxbc</p>
                                <p>Powered By Snap Report Ai</p>
                              </div>

                            </Alert>
                            : ""
                    }
                  </> : null
                }
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
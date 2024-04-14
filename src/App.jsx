import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, json, useRoutes } from 'react-router-dom';
import routes from './Routes';
import SeniorsideBar from './Components/SideBars/SeniorSideBar';
import OrdinarySideBars from './Components/SideBars/OrdinarySideBars'
import ManualSideBar from './Components/SideBars/ManualSideBar'
import SignIn from './Pages/Sign';
import { useMyContext } from './Components/RoleContext';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';

export const IP = "https://snapreport.ariisco.com"
// export const IP = "http://185.79.156.226:9500"
function App() {
  let router = useRoutes(routes);

  const subUserRef = useRef(null);
  const { sharedData } = useMyContext();
  const [showModalAccident, setShowModalAccident] = useState(false)
  const [isAccident, setIsAccident] = useState(localStorage.getItem("levelrick"))
  const { type } = useMyContext()


  const hideModal = () => {
    setShowModalAccident(false)
  }

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
              <div
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

                    {isAccident == 0 ? "No Accident" : isAccident == 1 ? "Warinig" : "Danger"}
                  </h3>
                  <p className='text-warnings'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, sed, ut placeat ex ad deleniti expedita id quisquam non tenetur error esse dolor dolorem hic laborum impedit odit rem inventore?
                  </p>
                </div>
              </div>
              {
                (sharedData || type) === "S" ?
                  <SeniorsideBar /> :
                  (sharedData || type) === "O" ?
                    <OrdinarySideBars /> :
                    (sharedData || type) === "M" ?
                      <ManualSideBar /> : null
              }
              <div className='w-100'>
                {
                  ((sharedData === "S" || type === "S") || (sharedData === "O" || type === "O")) ?
                    <>
                      {
                        isAccident == 2 ?
                          <Alert className='d-flex align-items-center justify-content-between alert-accident'>
                            <div className='content-alert '>
                              <h4>Danger</h4>
                              <p className='alert-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                            </div>
                            < WarningAmberIcon
                              style={{ fontSize: "2rem", cursor: "pointer" }}
                              onClick={() => setShowModalAccident(true)}
                            />
                          </Alert> :
                          isAccident == 1 ?
                            <div className='warningAccident'>
                              <div className='Verifiedwrapper'>
                                <p className='noaccident-text'>Low Rick</p>
                                <span className='span-warning'>
                                  <GppMaybeOutlinedIcon
                                    onClick={() => setShowModalAccident(true)}
                                    style={{ color: "#ffffff", cursor: "pointer" }}
                                  />
                                </span>
                              </div>
                            </div> :
                            <div className='noAccident'>
                              <div className='chevorn'></div>
                              <div className='Verifiedwrapper'>
                                <p className='noaccident-text'>Safe</p>
                                <span className='span-Verified'>
                                  <VerifiedUserOutlinedIcon
                                    onClick={() => setShowModalAccident(true)}
                                    style={{ color: "#ffffff", cursor: "pointer" }}
                                  />
                                </span>
                              </div>
                            </div>
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

// import { useState, useEffect } from 'react'
// import '../../Style/AllForm.css'
// import AddNewForm from './AddNewForm';//
// import FormOverView from '../../Components/FormOverView/FormOverView';//
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';//
// import axios from 'axios';
// import { IP } from '../../App';
// import Header from '../../Components/Header/Header';
// import AiHeader from '../../Components/AiHeader/AiHeader';


// export default function AllForm() {

//     const [showFormGenerate, setShowFormGenerate] = useState(false)
//     const [allformGenerate, setAllFormGenerate] = useState([])
//     const [mainFormGenerate, setMainFormGenerate] = useState(null)
//     const [isDeleteGenerate, setIsDeleteGenerate] = useState(false)

//     const getAllFormGenerate = async () => {
//         const access = localStorage.getItem("access")

//         const headers = {
//             Authorization: `Bearer ${access}`
//         };
//         try {
//             const response = await axios.get(`${IP}/form/get-user-form/`, {
//                 headers,
//             });
//             if (response.status === 200) {
//                 setAllFormGenerate(response.data)
//             }


//         } catch (e) {

//             if (e.response.status === 401) {
//                 localStorage.removeItem('access')
//                 localStorage.removeItem('uuid')
//                 localStorage.removeItem('refresh')
//                 localStorage.removeItem("type")
//             }
//         }
//     }
  
//     const openFormHandlerGenerate = () => {
//         setShowFormGenerate(true)
//         if (!showFormGenerate) {
//             setIsDeleteGenerate(false)
//         }
//     }

//     const backHandlerFormGenerate = () => {
//         setShowFormGenerate(false)
//     }

//     useEffect(() => {
//         getAllFormGenerate()
//     }, [])

//     return (
//         <>
//             {
//                 showFormGenerate ?
//                     <AddNewForm
//                         showForm={showFormGenerate}
//                         back={backHandlerFormGenerate}
//                         mainForm={mainFormGenerate}
//                         isDelete={isDeleteGenerate}
//                         getAllForm={getAllFormGenerate}

//                     /> :
//                     <div style={{ width: "100%" }}>
//                         <Header />
//                         <AiHeader />
//                         <div className={`${allformGenerate.length === 0 ? "emptyForm" : ""} allForm-container`} >
//                             {
//                                 allformGenerate && allformGenerate.length > 0 && allformGenerate.slice().reverse().map(form => (
//                                     <div
//                                         className='item-recent'
//                                         key={form.uuid}
//                                         onClick={() => {
//                                             openFormHandlerGenerate
//                                         }}
//                                         style={{ position: "relative", overflow: "hidden" }}
//                                     >
//                                         <div className="col-container">
//                                             <FormOverView formData={form} />
//                                         </div>
//                                         <div className="actions-form">

//                                             <span
//                                                 style={{ cursor: "pointer" }}
//                                             >
//                                                 <EditCalendarIcon
//                                                     className='editFormIcom'
//                                                     onClick={() => {
//                                                         openFormHandlerGenerate();
//                                                         setMainFormGenerate(form)
//                                                     }}
//                                                 />
//                                             </span>
//                                             <span
//                                                 style={{ cursor: "pointer" }}

//                                             >
//                                                 <DeleteForeverIcon
//                                                     className='deleteFormIcon'
//                                                     onClick={() => {
//                                                         openFormHandlerGenerate()
//                                                         setMainFormGenerate(form)
//                                                         setIsDeleteGenerate(true)
//                                                     }}
//                                                 />
//                                             </span>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </div>

//             }

//         </>
//     )
// }

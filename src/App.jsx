import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import routes from './Routes';
import Form from './Form/Form';
import Form2 from './Form2/Form2';
export const IP = ""

function App() {

  let router = useRoutes(routes);
  return (
    <>
      {router}
      {/* <Form /> */}
      {/* <Form2 /> */}
    </>
  )
}

export default App

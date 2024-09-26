import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import CreateUser from './components/CreateUser';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}

// function Navigation(){
//   return <nav>
//     <ul>
//       <li>
//         <Link to="/userHome">userHome</Link>
//       </li>
//       <li>
//         <Link to="/adminHome">adminHome</Link>
//       </li>
//     </ul>
//   </nav>
// }

export default App

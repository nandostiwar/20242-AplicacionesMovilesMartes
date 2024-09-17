import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    return (  
        <BrowserRouter>
            <Routes>
                <Route index element={<Form callback={setUser}/>}></Route>
                <Route path='/userHome' element={<UserHome user={user}/>}></Route>
                <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
                <Route path='/changePassword' element={<ChangePassword/>}></Route> {/* Ruta para cambiar contraseña */}
            </Routes>
        </BrowserRouter>
    )
}

export default App;

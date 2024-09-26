import './styles/Form.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    
    const home = useNavigate();
    function goHome(){
        home("/");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/credenciales/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            if (response.ok) {
                alert('Usuario creado exitosamente');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Crear Nuevo Usuario</h1>
            <h4>Nombre de Usuario:</h4>
                <input type="text" value={username} className='entry' onChange={(e) => setUsername(e.target.value)} required />
            <br />
            <h4>Contraseña:</h4>
                <input type="password" value={password} className='entry' onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <h4>Rol:</h4>
                <select value={role} className='entry' onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            <br />
            <button type="submit" id="btnEnviar">Crear Usuario</button>
            <button className="link" onClick={goHome}>Volver</button>
        </form>
        
    );
}

export default CreateUser;

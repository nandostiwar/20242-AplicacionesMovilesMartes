import './styles/Form.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const home = useNavigate();
    function goHome(){
        home("/");
    }

    const changePassword = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:4000/v1/credenciales/change-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, oldPassword, newPassword }),
            });
            
            if (response.ok) {
                const data = await response.json();
                alert(data.message);  // Mensaje de éxito
            } else {
                const errorData = await response.json();
                alert(errorData.message);  // Mensaje de error (usuario o contraseña incorrectos)
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <form onSubmit={changePassword}>
            <h1>Cambiar Contraseña</h1>
            <h4 className="txt">Usuario</h4> 
            <input className="entry" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <br />

            <h4 className="txt">Contraseña Anterior</h4> 
            <input className="entry" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            <br />

            <h4 className="txt">Nueva Contraseña</h4>
            <input className="entry" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <br />

            <button type="submit" id="btnEnviar">Cambiar Contraseña</button>
            <button className="link" onClick={goHome}>Volver</button>
        </form>
    );
}

export default ChangePassword;

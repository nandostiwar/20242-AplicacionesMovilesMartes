import { useState } from 'react';

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
            <label>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <br />

            <label>Contraseña Anterior</label>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            <br />

            <label>Nueva Contraseña</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <br />

            <button type="submit">Cambiar Contraseña</button>
        </form>
    );
}

export default ChangePassword;

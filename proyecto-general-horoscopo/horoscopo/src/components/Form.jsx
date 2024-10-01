import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const goTo = useNavigate();

    // Función para validar al usuario (Login)
    const validateUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/v1/auth/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                callback(data.role);
                if (data.role === 'user') {
                    goTo("/userHome");
                } else if (data.role === 'admin') {
                    goTo("/adminHome");
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    };

    // Función para cambiar la contraseña
    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/v1/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password changed successfully');
                setIsChangePassword(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during password change:', error);
            alert('An error occurred while changing the password.');
        }
    };

    return (
        <div>
            {!isChangePassword ? (
                <form onSubmit={validateUser}>
                    <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
                    <h4 className="txt">Nombre de Usuario</h4>
                    <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
                    <h4 className="txt">Contraseña</h4>
                    <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
                    <input type="submit" value="Ingresar" id="btnEnviar" />
                    <button type="button" onClick={() => setIsChangePassword(true)} id="btnChangePassword">
                        Cambiar Contraseña
                    </button>
                </form>
            ) : (
                <form onSubmit={handleChangePassword}>
                    <h1 id="txtCambiar">Cambiar Contraseña</h1>
                    <h4 className="txt">Nombre de Usuario</h4>
                    <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                    <h4 className="txt">Nueva Contraseña</h4>
                    <input type="password" className="entry" onChange={(e) => setNewPassword(e.target.value)} /><br />
                    <input type="submit" value="Cambiar" id="btnEnviar" />
                    <button type="button" onClick={() => setIsChangePassword(false)} id="btnCancel">
                        Cancelar
                    </button>
                </form>
            )}
        </div>
    );
}

export default Form;

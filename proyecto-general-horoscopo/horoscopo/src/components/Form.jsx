import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState(''); // Para nuevo usuario
    const [newPassword, setNewPassword] = useState(''); // Para nuevo usuario
    const navigate = useNavigate();

    // Función para validar el usuario existente (inicio de sesión)
    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();

            if (data && data.success) {
                alert(data.message); // Mensaje de éxito
                callback(data.role);
                navigate(data.role === 'user' ? "/userHome" : "/adminHome");
            } else {
                alert(data.message || 'Error desconocido'); // Mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    // Función para crear un nuevo usuario
    const createUser = async (event) => {
        event.preventDefault(); // Prevenir que la página se recargue
        try {
            const response = await fetch('http://localhost:4000/v1/signos/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: newUsername, password: newPassword }),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            if (data.success) {
                alert(data.message); // Mensaje de éxito
                setNewUsername(''); // Limpiar el campo de nuevo usuario
                setNewPassword(''); // Limpiar el campo de nueva contraseña
            } else {
                alert(data.message || 'Error desconocido'); // Mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            
            {/* Sección para el inicio de sesión */}
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            /><br />

            <h4 className="txt">Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            /><br />

            <input type="submit" value="Ingresar" id="btnEnviar" />
            
            {/* Botón para cambiar contraseña */}
            <button
                type="button"
                id="btnChangePassword"
                onClick={() => navigate('/changePassword')}
            >
                Cambiar Contraseña
            </button>

            {/* Sección para crear un nuevo usuario */}
            <h4 className="txt">Nuevo Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
            /><br />

            <h4 className="txt">Nueva Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
            /><br />

            <button onClick={createUser}>Crear Usuario</button>
        </form>
    );
}

export default Form;

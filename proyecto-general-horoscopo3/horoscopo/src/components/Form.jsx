import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

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

    const handleCreateUser = async (event) => {
        event.preventDefault();
        
        const newUsername = prompt('Ingrese el nombre de usuario que desea crear:');
        const role = prompt('Ingrese el rol (user o admin):');
        const newPassword = prompt('Ingrese la contraseña:');
        
        if (!newUsername || !role || (role !== 'user' && role !== 'admin') || !newPassword) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/auth/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername, password: newPassword, role })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Usuario creado exitosamente');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Ocurrió un error al crear el usuario.');
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        
        const targetUsername = prompt('Ingrese el nombre de usuario para cambiar la contraseña:');
        const newPassword = prompt('Ingrese la nueva contraseña:');
        const role = prompt('Ingrese el rol (user o admin):');

        if (!targetUsername || !newPassword || !role || (role !== 'user' && role !== 'admin')) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/auth/changePassword', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: targetUsername, newPassword, role })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Contraseña actualizada exitosamente');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Ocurrió un error al cambiar la contraseña.');
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username} 
            /><br />
            <h4 className="txt">Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <br />
            <button className="boton-estilo" onClick={handleCreateUser}>Crear Nuevo Usuario</button>
            <button className="boton-estilo" onClick={handleChangePassword}>Cambiar Contraseña</button>
        </form>
    );
}

export default Form;

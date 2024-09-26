import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();

    function goChangePassword(){
        goTo("/change-password");
    }
    function goNewUser(){
        goTo("/create-user");
    }
 
    const validateUser = async (event)=>{
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/credenciales/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.role === 'user') {
                    callback('user');
                    goTo('/userHome');
                } else if (data.role === 'admin') {
                    callback('admin');
                    goTo('/adminHome');
                }
            } else {
                alert('Usuario y/o contraseña incorrectos');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
            <button className='link' onClick={goChangePassword}>Cambiar Contraseña</button>
            <button className='link' onClick={goNewUser}>Crear Usuario</button>
        </form>
    )
}

export default Form;
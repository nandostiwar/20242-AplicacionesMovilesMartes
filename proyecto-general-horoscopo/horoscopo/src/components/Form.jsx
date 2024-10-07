import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import data from '/Aplicaciones moviles/20242-AplicacionesMovilesMartes/proyecto-general-horoscopo/api-json/db/signos.json';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
      try {


        if(username === null || password === null ){
                
          alert("El nombre de usuario o la contraseña no pueden estar vacíos o contener solo espacios en blanco");
         
        }else{

          const response = await fetch('http://localhost:4000/v1/credenciales', {
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }) // Enviar credenciales
          });
               
         
         
  
          const data = await response.json();
  
          console.log("usuario: ", data.user.tipo);
          
          console.log("respuesta; ", response.ok);
  
          if (response.ok) {
            console.log("respuesta; ", response.ok);
            console.log('Inicio de sesión correcto');
      
            // Redirigir según el tipo de usuario
            if (data.user.tipo === 'admin') {
              console.log(data.message); 
              console.log('Redirigiendo a adminHome');
              navigate("/adminHome");
            } else {
              navigate("/userHome");
            }
          } else {
            console.log(data.message); // Mostrar el mensaje de error del servidor
            setError('Nombre de usuario o contraseña incorrectos');
           
          }
          
        }
         
       


      } catch (error) {
        console.error('Error al iniciar sesión', error);
        setError('Error al iniciar sesión');
      }
    };
    
    const validateUser = (event)=>{
        event.preventDefault();

    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 id="txtBienvenida">Bienvenido a nuestroooo portal del Zodiaco2</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <Link to="/cambiarContraseña" className="txt">Cambiar contraseña</Link> <br></br>
            <Link to="/crearUsuario" className="txt">Crear nuevo usuario</Link> <br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
        </form>
    )
}

export default Form;
import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import data from '/Aplicaciones moviles/20242-AplicacionesMovilesMartes/proyecto-general-horoscopo/api-json/db/signos.json';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
      try {
        
        const response = await fetch('http://localhost:4000/v1/credenciales', {
          method: 'POST',
          
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }) // Enviar credenciales
        });
        console.log("ddddd");
        const data = await response.json();

        if (response.ok) {
          console.log('Inicio de sesión correcto');
    
          // Redirigir según el tipo de usuario
          if (data.user.tipo === 'admin') {
            console.log('Redirigiendo a adminHome');
            goTo("/adminHome");
          } else {
            navigate("/userHome");
          }
        } else {
          console.log(data.message); // Mostrar el mensaje de error del servidor
          setError('Nombre de usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error al iniciar sesión', error);
        setError('Error al iniciar sesión');
      }
    };
    
    const validateUser = (event)=>{
        event.preventDefault();



  /*      fetch('/api-json/db/credenciales.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          return response.json();
        })

        .then(users => {
            // Verificamos si el usuario y contraseña coinciden con algún usuario del archivo JSON
            const user = users.find(user => user.username === username && user.password === password);
    
            if (user) {
              // Si el usuario es válido, inicia sesión
              setError(""); // Limpiamos el mensaje de error
              alert("Login exitoso!");
              // Aquí podrías redirigir al usuario a otra página o guardar el estado de la sesión
            } else {
              // Si no coinciden, mostramos un mensaje de error
              setError("Nombre de usuario o contraseña incorrectos");
            }
          })*/

      /* if(username === 'user' && password === 'user2023'){
            callback("user");
            goTo("/userHome");
        }else if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/adminHome");
        }*/
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 id="txtBienvenida">Bienvenido a nuestroooo portal del Zodiaco2</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
        </form>
    )
}

export default Form;
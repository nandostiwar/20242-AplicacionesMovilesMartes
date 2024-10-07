
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function CambiarContrasena(callback) {
  
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [newpassword, setNewpassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const formContrasena = async (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto
    
        
            console.log('cambiar');
            console.log("usuario; ", username);
            console.log("anterior contrasena; ", password);
            console.log("Nueva contrasena; ", newpassword);
            
            if(username === null || password === null || newpassword === null){
                
              alert("El nombre de usuario o la contraseña no pueden estar vacíos o contener solo espacios en blanco");
             
            }else{

              try {
                
              

                fetch(`http://localhost:4000/v1/credenciales/${username}`, {
                  method: 'PATCH',
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({ 
  
                    password: password,
                    newpassword: newpassword
                  
                  })
                  
              })
        
                  console.log("respuesta: ", respuesta)
  
                  const resultado = await respuesta.json();
                  alert(resultado.message);
                  if (respuesta.ok) {
                    console.log('Contraseña actualizada con éxito:', resultado);
                    setError(null); // Limpiar el error
                    navigate('/'); // Redirigir al usuario después de la actualización
                  } else {
                    setError('No se pudo actualizar la contraseña. ' + resultado.message);
                  }
                } catch (error) {
                  console.error('Error al actualizar la contraseña:', error);
                  setError('Error al actualizar la contraseña, intenta de nuevo.');
                }

            }
            
       
      };
 

  return (
    <form onSubmit={formContrasena}>
    <h1 id="txtBienvenida">Cambiar contraseña</h1>
    <h4 className="txt">Nombre de Usuario</h4>  
    <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
    <h4 className="txt">Contraseña anteriro</h4>  
    <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
    <h4 className="txt">Contraseña nueva</h4>  
    <input type="password" className="entry" onChange={(e)=> setNewpassword(e.target.value)}/><br></br>
   
    <input type="submit" value="Cambiar" id="btnEnviar"/>
</form>
  )
} export default CambiarContrasena;

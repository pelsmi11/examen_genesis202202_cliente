import React from 'react';


const botonesBarra = (props) => {
    console.log(props.tipo_usuariot);
    return ( 
        <div>
                    <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={()=> console.log('admin')}
                    >admin</button>
                    <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={()=> console.log('vendor')}
                    >vendor</button>
                    {/* {usuario.tipo_usuario ==='admin' ?
                   (
                     <div>
                    <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={()=> console.log('admin')}
                    >admin</button>
                    <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={()=> console.log('vendor')}
                    >vendor</button>
                    </div>  
                   ) 
                :
                 null
                }
                {usuario.tipo_usuario ==='admin' ?
                   (
                    <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={()=> console.log('vendor')}
                    >vendor</button>
                   ) 
                :
                 null
                } */}
        </div> 
        
     );
}
 
export default botonesBarra;
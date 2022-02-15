import React, {useState, useContext , useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    // extraer los valores del context
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    // En caso que el usuario se haya autenticado o registrado o sea un registro duplicado
    let navigate = useNavigate();
    useEffect(() => {
        if(autenticado){
            
            navigate('/proyectos'); // Lo mandamos a proyectos
        }
 
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, navigate]);

    // State para iniciar secion
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
        tipo_usuario: ''
    });

    // extraer de usuario 

    const {nombre, email, password, confirmar, tipo_usuario} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]  : e.target.value
        }) 
    }

    // cuando se quiere iniciar secion 
    const onSubmit =e=> {
        e.preventDefault();

        // validar que no haya campos vacios
        if(
            nombre.trim()==='' ||
            email.trim()==='' ||
            password.trim()==='' ||
            confirmar.trim()==='' || 
            tipo_usuario.trim()===''
        ){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        // password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error');
            return;
        }

        // los 2 password son iguales
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales','alerta-error');
            return;
        }
        

        // pasarlo al action 
        registrarUsuario({
            nombre,
            email,
            password,
            tipo_usuario
        });


    }
    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="Text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Tu Nombre" 
                        value ={nombre}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="tipo">Tipo de Usuario</label>
                        <select onChange={(e) =>{
                            const selectedUser = e.target.value;
                            guardarUsuario({
                                ...usuario,
                                tipo_usuario  : selectedUser
                            })
                        }}>
                            <option value="">Select</option>
                            <option value="admin">admin</option>
                            <option value="vendor">vendor</option>
                            <option value="normal">normal</option>
                        </select>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Tu Email" 
                        value ={email}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Tu Password" 
                        value={password}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input type="password" 
                        id="confirmar" 
                        name="confirmar" 
                        placeholder="Repite tu password"  
                        value={confirmar}
                        onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Registrarme"/>
                    </div>
                   
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
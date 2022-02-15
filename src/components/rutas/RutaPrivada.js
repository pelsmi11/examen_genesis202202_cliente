import React, {useContext, useEffect} from 'react';
import {  Navigate } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);
    
    //return autenticado && cargando ? <Component {...props} /> : <Navigate replace to="/" />
    return !autenticado && !cargando ? <Navigate replace to="/" /> : <Component {...props} />
}
 
export default RutaPrivada;
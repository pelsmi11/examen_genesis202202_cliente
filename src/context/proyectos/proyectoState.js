import React,{useReducer} from 'react'
//import uuid,{v4 as uuidv4} from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR} from '../../types/index';
import clienteAxios from '../../config/axios';



const ProyectoState = props =>{

    // const proyectos = [
    //     { id:1, nombre: 'Tienda Virtual'},
    //     { id:2, nombre: 'Intranet'},
    //     { id:3, nombre: 'Diseño de Sitio web'},
    //     { id:4, nombre: 'MERN'}
    // ];

    const initialState ={
         proyectos : [],    
        formulario : false,
        errorformulario : false,
        PROYECTO: null,
        mensaje: null
    }

    //dispatch para las acciones 
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //serie de funciones para el crud
    const mostrarFormulario = ()=>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener los proyectos 
    const obtenerProyectos = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch ({
                type :OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    // Agregar nuevo proyectos
    const agregarProyecto = async proyecto =>{
        //proyecto.id = uuidv4()
        try {
            //inserta el proyecto en el state
            const resultado = await clienteAxios.post('/api/proyectos',proyecto);
            //console.log(resultado);
            dispatch({
                type :AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    //VALIDA EL FORMULARIO POR ERRORES
    const mostrarError = () =>{
        dispatch({
            type :VALIDAR_FORMULARIO
        })
    }

    // selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId =>{
        dispatch({
            type : PROYECTO_ACTUAL,
            payload : proyectoId
        })
    }

    // Elimina un proyecto
    const eliminarProyecto = async proyectoId =>{
        
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type : ELIMINAR_PROYECTO,
                payload : proyectoId
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorformulario: state.errorformulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;

import React,{useReducer} from 'react';
//import uuid,{v4 as uuidv4} from 'uuid';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    // ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';
import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        // tareas: [
        //     { id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
        //     { id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
        //     { id: 3, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
        //     { id: 4, nombre: 'Elegir Hostring', estado: true, proyectoId: 4},
        //     { id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
        //     { id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
        //     { id: 7, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
        //     { id: 8, nombre: 'Elegir Plataforma', estado: true, proyectoId: 4},
        //     { id: 9, nombre: 'Elegir Colores', estado: false, proyectoId: 1},
        //     { id: 10, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 2},
        //     { id: 11, nombre: 'Elegir Plataforma', estado: true, proyectoId: 3},
        //     { id: 12, nombre: 'Elegir Colores', estado: false, proyectoId: 4},
        //     { id: 13, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3}
        // ],
        tareasproyecto: [],
        errortarea: false, 
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer,initialState);

    // Crear las funciones 

    // Obtener las tareas de un proyecto en especifico
    const obtenerTareas = async proyecto =>{

        try {
            //console.log(proyecto);
            const resultado = await clienteAxios.get('/api/tareas/',{params: {proyecto}});

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al proyecto seleccionado 
    const agregarTarea = async tarea =>{
        // tarea.id = uuidv4()
        try {
            // eslint-disable-next-line
            const resultado = await clienteAxios.post('/api/tareas/',tarea);
            //console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea = ()=>{
        dispatch({
            type:VALIDAR_TAREA

        })
    }

    // Eliminar tarea por el id
    const eliminarTarea = async (id,proyecto)=>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // cambia el estado de cada tarea 
    // const cambiarEstadoTarea = tarea =>{
    //     dispatch({
    //         type:ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    // Extraer una tarea para edición
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Edita o modifica una tarea 
    const actualizarTarea = async tarea =>{
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
            //console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.error(error);
        }
    }

    //Elimina la tareaseleccionada
    const limpiarTarea=()=>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                //tareas: state.tareas,
                tareasproyecto : state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                // cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
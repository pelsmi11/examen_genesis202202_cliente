import React,{useContext, useEffect, useState} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';
import Ventas from '../ventas/Ventas';


const Proyectos = () => {

    // Extraer la informacion de autenticacion 
    const authContext = useContext(AuthContext);
    const {usuario,usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);

    // estate botones
    const tipyeUser=usuario?.tipo_usuario
    const [botones, setBotones] = useState(tipyeUser);
    
    useEffect(() => {
        setBotones(tipyeUser);
        // eslint-disable-next-line
    },[tipyeUser]);
    console.log(tipyeUser);
    console.log(botones);

    const handleClick = () => {
        window.open("https://public.tableau.com/app/profile/david4237/viz/4to_Dashboard_David_Natareno/Dashboard1");
      };

    

    return ( 
        //
        <div className="contenedor-app" >
            <Sidebar/>
            <div className="seccion-principal">
                <Barra />
                <main>
                    {tipyeUser==='admin'?
                    <div>
                    <button 
                    className="btn btn-secundario "
                    onClick={()=> setBotones('admin')}
                    >admin</button>
                    <button 
                    className="btn btn-secundario "
                    onClick={()=> setBotones('vendor')}
                    >vendor</button>
                    
                    <button 
                    className="btn btn-secundario"
                    onClick={()=> setBotones('normal')}
                    >normal</button>
                    </div> 
                    :null}
                    {tipyeUser==='vendor'?
                    <div>
                    <button 
                    className="btn btn-secundario "
                    onClick={()=> setBotones('vendor')}
                    >vendor</button>
                    <button 
                    className="btn btn-secundario"
                    onClick={()=> setBotones('normal')}
                    >normal</button>
                    </div> 
                    :null}
                    {/* {tipyeUser==='normal'?
                    <div>
                    <button 
                    className="btn btn-secundario"
                    onClick={()=> setBotones('normal')}
                    >normal</button>
                    </div> 
                    :null}                 */}
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        {botones==='admin'?
                        <button type="button" className="btn btn-block btn-primario"
                        onClick={handleClick}
                        >
                          DASHBOARD TABLEAU
                        </button>
                        :null}
                        
                        {botones==='vendor'?<Ventas/>:null}
                        {botones==='normal'?<ListadoTareas/>:null}
                        
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;
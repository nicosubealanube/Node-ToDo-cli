import colors from 'colors';
import {inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tareas} from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) {
        //establece tareas
        tareas.cargarTareasFromArray( tareasDB);
    }

    do{
        //printea el menu
        opt = await inquirerMenu();
        
        switch(opt){
            case '1':
                //create option
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletados(true);
            break;
            case '4':
                tareas.listarPendientesCompletados(false);
            break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toogleCompletadas(ids);
            break;
            
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if (id !== '0') {
                const ok = await confirmar('Esta seguro que desea borrar?')
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada correctamente')
                }
                }
            break;


        }

        guardarDB(tareas.listadoArr);
        await pausa();
    
    } while( opt !== '0');
}

main();

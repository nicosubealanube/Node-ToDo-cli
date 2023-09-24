import { Tarea } from './tarea.js';

class Tareas {

    _listado = {
        'abc': 123
    };

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }
    
    constructor(){
        this._listado={};
    }

    borrarTarea(id = ''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []) {
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
    
        console.log();
        this.listadoArr.forEach( (tarea, index) => {
            const idx = `${index + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${ idx} ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletados( completadas = true) {
        
        console.log();
        let indice = 0;
        this.listadoArr.forEach( (tarea) => {
            
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                //mostrar completadas
            if( completadoEn ){
                indice += 1;
                console.log(`${ (indice + '.').green} ${desc} :: ${completadoEn.green}`);
            } }
            else {
                //mostrar pendientes
            if( !completadoEn ){
                indice += 1;
                console.log(`${ (indice + '.').green} ${desc} :: ${estado}`);
            }
        }
            
      
    })
    }

    toogleCompletadas ( ids = []) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
                
            }
        })
     }
}


export {Tareas};
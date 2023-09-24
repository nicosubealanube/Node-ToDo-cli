import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue } Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.blue } Listar tarea`
            },
            {
                value: '3',
                name: `${'3'.blue } Tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.blue } Tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.blue } Completar tarea`
            },
            {
                value: '6',
                name: `${'6'.blue } Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.blue } Salir`
            },
        ]
    }
]

const inquirerMenu = async() => {

    //console.clear();
    console.log('====================='.green);
    console.log('Seleccione una opcion'.white);
    console.log('=====================\n'.green);

    const {option} = await inquirer.prompt(preguntas);

    return option;
}

const pausa = async()=> {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green} para continuar`
        }
    ]
    console.log(`\n`);
    await inquirer.prompt(question);
}

const leerInput = async(message)=>{

    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0) {
                    return 'por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

    const listadoTareasBorrar = async(tareas = []) => {
        
        const choices = tareas.map( (tarea, i) => {

            const idx = `${i + 1}.`.green;

            return {
                value: tarea.id,
                name: `${ idx } ${tarea.desc}`
            }
        });
        choices.unshift({
            value: '0',
            name: '0.'.green + ' Cancelar'
        })
        
        const preguntas = [{
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }]
        const {id} = await inquirer.prompt(preguntas);
        return id;
    }

    const confirmar = async (message) => {
        const question = [{
            type: 'confirm',
            name: 'ok',
            message
        }];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

    const mostrarListadoChecklist = async(tareas = []) => {
        
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    
    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}



export {inquirerMenu, listadoTareasBorrar, mostrarListadoChecklist, confirmar, pausa, leerInput};
import { addAllPreviousTasks } from './taskAddition.js';
import { editTask, getTasks } from './apiScripts.js';


document.addEventListener("DOMContentLoaded", async function () {
    console.log('El DOM está listo');
    const columns = document.querySelectorAll('.card-content');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });



    const tasks = document.querySelectorAll('.task');
    tasks.forEach((task, index) => {
        task.addEventListener('dragstart', drag);
        task.draggable = true;
    });

    let previousTasks = await getTasks();
    addAllPreviousTasks(previousTasks);
});

export function allowDrop(ev) {
    ev.preventDefault();
}

export function drag(ev) {
    console.log("Drag start", ev.target.id);
    try {
        ev.dataTransfer.setData("text", ev.target.id);
        console.log('EXITOSO')
    } catch (error) {
        console.error("Error al intentar arrastrar", error);
    }
}

export function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log("Drop", data);
    const taskElement = document.getElementById(data);
    if (!taskElement) {
        console.error(`No se encontró un elemento con el ID: ${data}`);
        return;
    }


    const dropTarget = ev.target.closest('.card');
    if (dropTarget) {
        try {
            const card = ev.target.closest('.card');
            card.querySelector('.card-content').appendChild(taskElement);
            editTask({
                id: taskElement.id,
                status: card.id
            })

        } catch (error) {
            console.error("Error al intentar soltar", error);
        }
    }
}

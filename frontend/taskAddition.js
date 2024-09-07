import { allowDrop, drag, drop } from './start.js';
import { addTask } from './apiScripts.js';

export function addAllPreviousTasks(tasks) {
    console.log('Adding previous tasks from API')

    tasks.forEach(task => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.draggable = true;
        newTask.addEventListener('dragstart', drag);
        newTask.id = `${task.id}`;
        newTask.addEventListener('click', function (event) {
            document.getElementById('taskModalEdit').classList.add("is-active")
            document.getElementById('titleEdit').value = event.currentTarget.querySelector('#titleTask').textContent;
            document.getElementById('descriptionEdit').value = event.currentTarget.querySelector('#desc').textContent;
            document.getElementById('stateEdit').value = event.currentTarget.querySelector('#status').textContent;
            document.getElementById('assignEdit').value = event.currentTarget.querySelector('#assignee').textContent;
            document.getElementById('dateEdit').value = event.currentTarget.querySelector('#finalDate').textContent;
            document.getElementById('priorityEdit').value = event.currentTarget.querySelector('#priorityTask').textContent;
            window.taskToEdit = event.currentTarget
        })

        newTask.innerHTML =
            `<h3 id="titleTask" >${task.title}</h3>
                <p id="desc" >${task.description}</p>
                <p id="status" class="hide">${task.status}</p>
                <p id="assignee" class="hide">${task.assign}</p>
                <p id="finalDate" class="hide">${task.finalDate}</p>
                <p id="priorityTask" class="hide">${task.priority}</p>`;
        const column = document.getElementById(task.status);
        if (column) {
            column.querySelector('.card-content').appendChild(newTask);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const taskButton = document.getElementById("addTask") // Asigna el ID del botón "Título Descripción"
    const taskModal = document.createElement("div")
    taskModal.id = "taskModal"
    taskModal.className = "modal"


    const modalBackground = document.createElement("div")
    modalBackground.className = "modal-background"
    taskModal.appendChild(modalBackground)

    const modalContent = document.createElement("div")
    modalContent.className = "modal-content"
    taskModal.appendChild(modalContent)

    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.id = "title"
    titleInput.placeholder = "Título"

    const descriptionTextarea = document.createElement("textarea")
    descriptionTextarea.id = "description"
    descriptionTextarea.placeholder = "Descripción"

    const assignInput = document.createElement("input")
    assignInput.type = "text"
    assignInput.id = "assign"
    assignInput.placeholder = "Asignado"

    const priorityInput = document.createElement("select")
    priorityInput.id = "priority"

    const priorityOption1 = document.createElement("option")
    priorityOption1.textContent = "1"
    priorityOption1.value = "1"
    const priorityOption2 = document.createElement("option")
    priorityOption2.textContent = "2"
    priorityOption2.value = "2"
    const priorityOption3 = document.createElement("option")
    priorityOption3.textContent = "3"
    priorityOption3.value = "3"
    const priorityOption4 = document.createElement("option")
    priorityOption4.textContent = "4"
    priorityOption4.value = "4"
    const priorityOption5 = document.createElement("option")
    priorityOption5.textContent = "5"
    priorityOption5.value = "5"

    priorityInput.appendChild(priorityOption1)
    priorityInput.appendChild(priorityOption2)
    priorityInput.appendChild(priorityOption3)
    priorityInput.appendChild(priorityOption4)
    priorityInput.appendChild(priorityOption5)

    const stateInput = document.createElement("select")
    stateInput.id = "state"

    const stateOption1 = document.createElement("option")
    stateOption1.textContent = "Backlog"
    stateOption1.value = "backlog"
    const stateOption2 = document.createElement("option")
    stateOption2.textContent = "To do"
    stateOption2.value = "to-do"
    const stateOption3 = document.createElement("option")
    stateOption3.textContent = "In Progress"
    stateOption3.value = "in-progress"
    const stateOption4 = document.createElement("option")
    stateOption4.textContent = "Done"
    stateOption4.value = "done"
    const stateOption5 = document.createElement("option")
    stateOption5.textContent = "Blocked"
    stateOption5.value = "blocked"

    stateInput.appendChild(stateOption1)
    stateInput.appendChild(stateOption2)
    stateInput.appendChild(stateOption3)
    stateInput.appendChild(stateOption4)
    stateInput.appendChild(stateOption5)

    const dateInput = document.createElement("input")
    dateInput.type = "date"
    dateInput.id = "date"

    const acceptButton = document.createElement("button")
    acceptButton.id = "accept"
    acceptButton.textContent = "Aceptar"
    acceptButton.className = "button"

    const cancelButton = document.createElement("button")
    cancelButton.id = "cancel"
    cancelButton.textContent = "Cancelar"
    cancelButton.className = "button"

    const buttonBox = document.createElement("div")
    buttonBox.className = "buttons"
    buttonBox.appendChild(acceptButton)
    buttonBox.appendChild(cancelButton)

    modalContent.appendChild(document.createElement("h2")).textContent = "Nueva tarea"
    modalContent.appendChild(document.createElement("label")).textContent = "Título:"
    modalContent.appendChild(titleInput)
    modalContent.appendChild(document.createElement("br"))

    modalContent.appendChild(document.createElement("label")).textContent = "Descripción:"
    modalContent.appendChild(descriptionTextarea)
    modalContent.appendChild(document.createElement("br"))

    modalContent.appendChild(document.createElement("label")).textContent = "Asignado:"
    modalContent.appendChild(assignInput)
    modalContent.appendChild(document.createElement("br"))

    modalContent.appendChild(document.createElement("label")).textContent = "Prioridad:"
    modalContent.appendChild(priorityInput)
    modalContent.appendChild(document.createElement("br"))

    modalContent.appendChild(document.createElement("label")).textContent = "Estado:"
    modalContent.appendChild(stateInput)
    modalContent.appendChild(document.createElement("br"))

    modalContent.appendChild(document.createElement("label")).textContent = "Fecha:"
    modalContent.appendChild(dateInput)
    modalContent.appendChild(document.createElement("br"))

    modalContent.appendChild(buttonBox)


    document.body.appendChild(taskModal)
    taskButton.addEventListener("click", function () {
        taskModal.classList.add("is-active")
    })

    acceptButton.addEventListener("click", function () {
        taskModal.classList.remove("is-active")
        addTaskToBoard()
    })

    cancelButton.addEventListener("click", function () {
        taskModal.classList.remove("is-active")
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('assign').value = ''
        document.getElementById('date').value = ''
        document.getElementById('priority').value = '1'
        document.getElementById('state').value = 'backlog'

    })

    const columns = document.querySelectorAll('.card');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });

})


async function addTaskToBoard() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const status = document.getElementById('state').value;
    const tasker = document.getElementById('assign').value;
    const finalDate = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    if (title && desc && status) {

        console.log("Hay titulo")

        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.draggable = true;
        newTask.addEventListener('dragstart', drag);
        newTask.addEventListener('click', function (event) {
            document.getElementById('taskModalEdit').classList.add("is-active")
            document.getElementById('titleEdit').value = event.currentTarget.querySelector('#titleTask').textContent;
            document.getElementById('descriptionEdit').value = event.currentTarget.querySelector('#desc').textContent;
            document.getElementById('stateEdit').value = event.currentTarget.querySelector('#status').textContent;
            document.getElementById('assignEdit').value = event.currentTarget.querySelector('#assignee').textContent;
            document.getElementById('dateEdit').value = event.currentTarget.querySelector('#finalDate').textContent;
            document.getElementById('priorityEdit').value = event.currentTarget.querySelector('#priorityTask').textContent;
            window.taskToEdit = event.currentTarget
        })

        newTask.innerHTML =
            `<h3 id="titleTask" >${title}</h3>
                <p id="desc" >${desc}</p>
                <p id="status" class="hide">${status}</p>
                <p id="assignee" class="hide">${tasker}</p>
                <p id="finalDate" class="hide">${finalDate}</p>
                <p id="priorityTask" class="hide">${priority}</p>`;

        console.log("Mi estado es:", status)

        const column = document.getElementById(status);

        if (column) {
            console.log("Hay columna")
            column.querySelector('.card-content').appendChild(newTask);
        }

        const id = await addTask({
            'title': title,
            'description': desc,
            'assign': tasker,
            'finalDate': finalDate,
            'status': status,
            'priority': priority
        });
        newTask.id = id;
        console.log("ID de la tarea:", id)


        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('assign').value = '';
        document.getElementById('date').value = '';
        document.getElementById('priority').value = '1';
        document.getElementById('state').value = 'backlog';

    } else {
        alert('Por favor, complete todos los campos.');
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('assign').value = '';
        document.getElementById('date').value = '';
        document.getElementById('priority').value = '1';
        document.getElementById('state').value = 'backlog';
    }
}
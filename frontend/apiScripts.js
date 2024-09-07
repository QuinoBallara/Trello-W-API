const URL = 'http://localhost:3000/api'

export async function getTasks() {
    let response = await fetch(URL + "/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data = await response.json();
    console.log(data)
    return data;
};

export async function addTask(task) {
    let response = await fetch(URL + "/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    let data = await response.json();
    console.log(data)
    return data.id;
};

export async function editTask(task) {
    let response = await fetch(URL + "/tasks/" + task.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    let data = await response.json();
    console.log(data)
};

export async function deleteTask(taskId) {
    let response = await fetch(URL + "/tasks/" + taskId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(response)
}
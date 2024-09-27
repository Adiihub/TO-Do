console.log("Hello World!!");

let dataInput = document.getElementById('data');
let descriptionInput = document.getElementById('description');
let priorityValue = document.getElementById('priority').value;

async function adddata() {
    let todoValue = dataInput.value;
    let descriptionValue = descriptionInput.value;
    let priorityValue = document.getElementById('priority').value; // Move this inside the function

    await axios.post('http://localhost:3300/create', {
        todoValue: todoValue,
        description: descriptionValue,
        priority: priorityValue 
    })
    .then((response) => {
        console.log(response.data);
        dataInput.value = '';
        descriptionInput.value = '';
        getdata(); 
    })
    .catch((error) => {
        console.error('Error creating Todo:', error);
    });
}


function getdata() {
    axios.get('http://localhost:3300/get')
        .then(res => {
            console.log(res.data);
            let todoList = res.data;

            todoList.sort((a, b) => {
                if (a.priority === 'high' && b.priority === 'low') {
                    return -1;
                } else if (a.priority === 'low' && b.priority === 'high') {
                    return 1;
                } else {
                    return 0;
                }
            });

            let listElement = document.getElementById('list');
            listElement.innerHTML = '';

            todoList.forEach(todo => {
                let listItem = document.createElement('li');
                listItem.className = 'flex justify-between p-3 my-2 border-gray-200';

                let textContainer = document.createElement('div');
                textContainer.className = 'flex flex-col';

                let todoText = document.createElement('span');
                todoText.className = 'font-bold';
                todoText.textContent = `${todo.todoValue} [Priority: ${todo.priority}]`;

                let descriptionText = document.createElement('div');
                descriptionText.className = 'text-gray-600';
                descriptionText.textContent = todo.description || '';

                textContainer.appendChild(todoText);
                textContainer.appendChild(descriptionText);

                let buttonContainer = document.createElement('div');
                buttonContainer.className = 'flex';

                let updateButton = document.createElement('button');
                updateButton.className = "ml-4 p-2 bg-orange-400 text-white rounded-md hover:bg-orange-600";
                updateButton.textContent = 'Update';
                updateButton.onclick = () => updateTodo(todo._id);


                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'ml-4 p-2 bg-orange-400 text-white rounded-md hover:bg-orange-600'; // Margin-left for spacing
                deleteButton.onclick = () => deleteTodo(todo._id);

                buttonContainer.appendChild(updateButton);
                buttonContainer.appendChild(deleteButton);

                listItem.appendChild(textContainer);
                listItem.appendChild(buttonContainer);

                listElement.appendChild(listItem);
            });

        })
        .catch(error => {
            console.log("Error fetching Data");
        });
}

getdata();


async function deleteTodo(id) {
    await axios.delete(`http://localhost:3300/delete/${id}`)
        .then(response => {
            console.log(response.data);
            getdata();
        })
        .catch(error => {
            console.error('Error deleting Todo:', error);
        });
}

async function updateTodo(id) {
    const newTodoValue = prompt("Enter new todo value:");
    const newDescriptionValue = prompt("Enter new description value:");

    if (newTodoValue !== null) {
        const updatedData = {
            todoValue: newTodoValue,
            description: newDescriptionValue ? newDescriptionValue : ''
        };

        await axios.put(`http://localhost:3300/update/${id}`, updatedData)
            .then(response => {
                console.log(response.data);
                getdata();
            })
            .catch(error => {
                console.error('Error updating Task:', error);
            });
    }
}


let express = require('express');
let app = express();

let mongoose = require('mongoose')
const Todo = require('./models/ToDo')

app.use(express.json());
app.use(express.static('public'));


mongoose.connect('mongodb+srv://aditi71:hqqSbm7u@cluster0.9zzft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    () => console.log('DataBase Connected')
)

// for Create
app.post('/create', (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
    .then(() => {
        console.log("TOdO Created");
        res.status(201).json({message: "Todo Created Successfully!"});
    })
    .catch((error) => {
        console.log("Error Creating Todo", error);
        res.status(404).send("Error Getting Data");
    });
});


//read data
app.get('/get', (req, res) => {
    Todo.find()
    .then((data) => {
        res.json(data);
    })
    .catch(() => {
        res.status(404).send("Error Getting Data");
    })
});


// for Updating
app.put('/update/:id', (req, res) => {
    let Id = req.params.id;
    Todo.findByIdAndUpdate(Id, req.body)                
    .then(() => {
        console.log("TOdO Updated");
        res.status(201).json({message: "Todo Updated Successfully!"});
    })
    .catch((error) => {
        console.log("Error Updating Todo", error);
        res.status(404).send("Error Getting Data");
    })
});


// for Delete
app.delete('/delete/:id', (req, res) => {
    let Id = req.params.id;
    Todo.findByIdAndDelete(Id)
    .then((deletedTodo) => {
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({message: 'Todo deleted Successfully'});
    })
});


const port = 3300;
app.listen(port, () => console.log("Server running on the port " + port)); 
import express from 'express';


const app = express();
const __dirname = import.meta.dirname;
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

// Log all incoming request data
app.use((req, res, next) => {
    console.log('--- Incoming Request ---');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    if (req.body && Object.keys(req.body).length) {
        console.log('Body:', req.body);
    }
    if (req.query && Object.keys(req.query).length) {
        console.log('Query:', req.query);
    }
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/pages/home.htm")
})

app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + "/pages/user.htm")
})
app.get('/getUser', (req, res) => {
    const response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    }
    console.log("Response is ", response)
    res.end(`Received data: ${JSON.stringify(response)}`)
})


// --- STUDENT CRUD ---
let students = [];

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.studentID === req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// POST create student
app.post('/students', (req, res) => {
    const { studentID, section, firstName, lastName } = req.body;
    if (!studentID) {
        return res.status(400).json({ message: 'studentID is required' });
    }
    const exists = students.some(s => s.studentID === studentID);
    if (exists) {
        return res.status(409).json({ message: 'Student already exists' });
    }
    const student = { studentID, section, firstName, lastName };
    students.push(student);
    res.status(201).json({ message: 'Student created', student });
});

// PUT update student
app.put('/students/:id', (req, res) => {
    const idx = students.findIndex(s => s.studentID === req.params.id);
    if (idx === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }
    const { section, firstName, lastName } = req.body;
    students[idx] = { ...students[idx], section, firstName, lastName };
    res.json({ message: 'Student updated', student: students[idx] });
});

// DELETE student
app.delete('/students/:id', (req, res) => {
    const idx = students.findIndex(s => s.studentID === req.params.id);
    if (idx === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }
    const removed = students.splice(idx, 1);
    res.json({ message: 'Student deleted', student: removed[0] });
});

app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + "/pages/admin.htm")
})
app.get('/getAdmin', (req, res) => {
    const response = {
        adminID: req.query.adminID,
        department: req.query.department,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    }
    console.log("Response is ", response)
    res.end(`Received data: ${JSON.stringify(response)}`)
})

app.get('/user', (req, res) => {
    const userId = req.query.id;
    const userName = req.query.name;
    if (userId && userName) {
        res.send(`<html><body><h1>${userName}'s ID is: ${userId}</h1></body></html>`);
    } else {
        res.status(400).send('User ID and name are required');
    }
})

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://localhost:${port}`);
})
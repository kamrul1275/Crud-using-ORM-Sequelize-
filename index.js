const express = require('express');
const sequelize = require('./database');
const { Employee, Salary } = require('./models');

const app = express();
const port = 3000;

// Middleware

app.use(express.json());

const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

// Call the functions
syncDatabase();




    // 1. Create Employee
// 1. Create Employee
app.post('/employees', async (req, res) => {
    try {
        const { name, position } = req.body;
        const employee = await Employee.create({ name, position });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: 'Error creating employee' });
    }
});


// 1. Create Salary
app.post('/salary', async (req, res) => {
    try {
        const createSalary = req.body;
        console.log(createSalary);

        const salaries = await Salary.create(createSalary);
        res.status(201).json({ message: 'Salaries created successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error creating salaries' });
    }
});


    

// 2. Read All Employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll({ include: Salary });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employees' });
    }
});


// 2. Read All Salaries

app.get('/salaries', async (req, res) => {
    const salaries = await Salary.findAll({ include: Employee });
    res.json(salaries);
});


// Read specific employee
app.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const employee = await Employee.findByPk(id, { include: Salary });
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});



app.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    console.log("find id:", id);

    try {
        const { name, position } = req.body;

        console.log("name:", name);
        console.log("position:", position);

        const employee = await Employee.findByPk(id);
        if (employee) {
            employee.name = name;
            employee.position = position;
            await employee.save();
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});








//delete employee
app.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (employee) {
        await employee.destroy();
        res.json({ message: 'Employee deleted successfully' });
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


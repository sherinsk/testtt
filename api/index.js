const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.post('/students', async (req, res) => {
  const { name, age, mark } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        name,
        age,
        mark,
      },
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create student' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch students' });
  }
});

app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch student' });
  }
});

app.patch('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, mark } = req.body;
  try {
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        name,
        age,
        mark,
      },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update student' });
  }
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete student' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



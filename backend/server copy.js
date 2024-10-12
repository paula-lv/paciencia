const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ModelUser = require('./models/userModel');
const ModelTema = require('./models/temaModel');
const ModelEjercicio = require('./models/ejercicioModel');
const ModelCurso = require('./models/curso.model');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/webmates', {
    
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Rutas básicas
app.get('/', async(req, res) => {
  res.send('Hola, el servidor está funcionandoooo');
});

//Rutas usuarios
app.get('/users', async(req, res) => {
    //res.send('Hola, el servidor está funcionandoooo');
    const respuesta = await ModelUser.find({})
    res.send(respuesta)
});

app.get('/users/:id', async(req, res) => {
  const id = req.params.id
  const respuesta = await ModelUser.findById(id)
  res.send(respuesta)
});

app.post("/users", async(req, res)=> {
  const body = req.body
  const respuesta = await ModelUser.create(body)
  res.send(respuesta)
})

app.put("/users/:id", async(req, res)=> {
  const id = req.params.id
  const body = req.body
  const respuesta = await ModelUser.findOneAndUpdate({_id:id}, body)
  res.send(respuesta)
})

app.delete('/users/:id', async(req, res) => {
  const id = req.params.id
  const respuesta = await ModelUser.deleteOne({_id: id})
  res.send(respuesta)
});

//Rutas cursos
app.get('/cursos', async(req, res) => {
  //res.send('Hola, el servidor está funcionandoooo');
  const respuesta = await ModelCurso.find({})
  res.send(respuesta)
});

app.get('/cursos/:id', async(req, res) => {
const id = req.params.id
const respuesta = await ModelCurso.findById(id)
res.send(respuesta)
});

app.post("/cursos", async(req, res)=> {
const body = req.body
const respuesta = await ModelCurso.create(body)
res.send(respuesta)
})

app.put("/cursos/:id", async(req, res)=> {
const id = req.params.id
const body = req.body
const respuesta = await ModelCurso.findOneAndUpdate({_id:id}, body)
res.send(respuesta)
})

app.delete('/cursos/:id', async(req, res) => {
const id = req.params.id
const respuesta = await ModelCurso.deleteOne({_id: id})
res.send(respuesta)
});

//Rutas temas
app.get('/temas', async(req, res) => {
  //res.send('Hola, el servidor está funcionandoooo');
  const respuesta = await ModelTema.find({})
  res.send(respuesta)
});

app.get('/temas/:id', async(req, res) => {
const id = req.params.id
const respuesta = await ModelTema.findById(id)
res.send(respuesta)
});

app.post("/temas", async(req, res)=> {
const body = req.body
const respuesta = await ModelTema.create(body)
res.send(respuesta)
})

app.put("/temas/:id", async(req, res)=> {
const id = req.params.id
const body = req.body
const respuesta = await ModelTema.findOneAndUpdate({_id:id}, body)
res.send(respuesta)
})

app.delete('/temas/:id', async(req, res) => {
const id = req.params.id
const respuesta = await ModelTema.deleteOne({_id: id})
res.send(respuesta)
});

//Rutas ejercicios
app.get('/ejercicios', async(req, res) => {
  //res.send('Hola, el servidor está funcionandoooo');
  const respuesta = await ModelEjercicio.find({})
  res.send(respuesta)
});

app.get('/ejercicios/:id', async(req, res) => {
const id = req.params.id
const respuesta = await ModelEjercicio.findById(id)
res.send(respuesta)
});

app.post("/ejercicios", async(req, res)=> {
const body = req.body
const respuesta = await ModelEjercicio.create(body)
res.send(respuesta)
})

app.put("/ejercicios/:id", async(req, res)=> {
const id = req.params.id
const body = req.body
const respuesta = await ModelEjercicio.findOneAndUpdate({_id:id}, body)
res.send(respuesta)
})

app.delete('/ejercicios/:id', async(req, res) => {
const id = req.params.id
const respuesta = await ModelEjercicio.deleteOne({_id: id})
res.send(respuesta)
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

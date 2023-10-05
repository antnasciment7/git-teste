const express = require('express')
const mongo = require('mongoose')
const app = express()

app.use(express.json())

mongo.connect('mongodb://127.0.0.1/crud')
.then(() => console.log('mongo...'))

let User = mongo.model('usuarios', new mongo.Schema({
    name: String,
    email: String,
    password: String
}))

app.post('/criar', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let senha = req.body.password
    User.create({
        name,
        email,
        senha,
    }).then(() => {
        res.send({ message: "Seus dados foram salvos." })
    }).catch(err => res.send({ message: err }))
})
app.get('/mostrar/:name', async (req, res) => {
    const dados = await User.find({ name: req.params.name })
        res.send({ message: "Aqui estão seus dados.", dados })
    })
app.delete('/apagar/:name', async (req, res) => {
    await User.deleteOne({ name: req.params.name })
    res.send({ message: "Dados deletados." })
})
app.put('/atualizar/:name', async (req, res) => {
    await User.findOneAndUpdate({ name: req.params.name }, req.body)    
    res.send({ message: "Seus dados foram salvos."})
})

app.use((req, res) => {
    res.send({ message: 'Rota não encontrada ou indisponível.' })
})

app.listen(8080, () => console.log('Servidor em rota: 8080'))